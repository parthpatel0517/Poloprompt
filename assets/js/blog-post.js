/* PoloPrompt — single blog post, fully database-driven.
   Reads the slug from the URL path, fetches the post from the backend API
   (falling back to the bundled BLOG_POSTS if the API is unreachable — same
   resilience pattern as the rest of the site), then renders title, meta
   description, canonical, JSON-LD, breadcrumb, and content into this shared
   template. */
(function () {
  "use strict";

  var API_BASE = "https://poloprompt-server.onrender.com";

  function getSlug() {
    var parts = window.location.pathname.split("/").filter(Boolean);
    // parts look like ["blog", "<slug>"]
    return decodeURIComponent(parts[1] || "");
  }

  function loadPost(slug) {
    var fallback = function () {
      var match = (typeof BLOG_POSTS !== "undefined" ? BLOG_POSTS : []).filter(function (p) {
        return p.slug === slug;
      })[0];
      return match || null;
    };

    if (!API_BASE) return Promise.resolve(fallback());
    return fetch(API_BASE + "/api/blog-posts/" + encodeURIComponent(slug))
      .then(function (res) {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .catch(function () {
        return fallback();
      });
  }

  function setMeta(post, slug) {
    var url = "https://poloprompt.com/blog/" + slug;
    document.title = post.title + " | PoloPrompt";
    document.getElementById("post-title-tag").textContent = post.title + " | PoloPrompt";
    document.getElementById("post-meta-description").setAttribute("content", post.description);
    document.getElementById("post-canonical").setAttribute("href", url);
    document.getElementById("post-breadcrumb-title").textContent = post.title;

    var ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.title,
      "description": post.description,
      "url": url,
      "mainEntityOfPage": { "@type": "WebPage", "@id": url },
      "datePublished": post.published_at,
      "dateModified": post.updated_at || post.published_at,
      "author": { "@type": "Organization", "name": "PoloPrompt", "url": "https://poloprompt.com/" },
      "publisher": { "@type": "Organization", "name": "PoloPrompt", "url": "https://poloprompt.com/" }
    });
    document.head.appendChild(ld);
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function render(post) {
    var body = document.getElementById("post-body");
    body.innerHTML =
      "<h1>" + escapeHtml(post.title) + "</h1>" +
      post.content_html;
  }

  var STOPWORDS = {
    "the": true, "and": true, "for": true, "that": true, "your": true, "you": true,
    "with": true, "into": true, "from": true, "this": true, "are": true, "have": true,
    "prompt": true, "prompts": true, "write": true, "writing": true, "ai": true,
    "generator": true, "generators": true, "tool": true, "tools": true, "free": true,
    "how": true, "what": true, "use": true, "using": true, "like": true, "one": true,
    "sound": true, "sounds": true, "else": true, "everyone": true, "make": true
  };

  function tokenize(str) {
    return ((str || "").toLowerCase().match(/[a-z0-9]+/g) || []).filter(function (t) {
      return t.length > 3 && !STOPWORDS[t];
    });
  }

  function loadPromptLibrary() {
    if (!API_BASE) return Promise.resolve(typeof PROMPT_LIBRARY !== "undefined" ? PROMPT_LIBRARY : []);
    return fetch(API_BASE + "/api/prompts")
      .then(function (res) {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .catch(function () {
        return typeof PROMPT_LIBRARY !== "undefined" ? PROMPT_LIBRARY : [];
      });
  }

  function scorePrompt(post, prompt) {
    var postTokens = tokenize(post.title + " " + post.badge + " " + post.description);
    var promptTokens = tokenize(prompt.category + " " + prompt.title + " " + (prompt.tags || []).join(" "));
    var set = {};
    promptTokens.forEach(function (t) { set[t] = true; });
    var score = 0;
    postTokens.forEach(function (t) { if (set[t]) score++; });
    return score;
  }

  function relatedPromptCardHtml(item) {
    var url = "/library?category=" + encodeURIComponent(item.category) + "&q=" + encodeURIComponent(item.title);
    return (
      "<a class=\"card\" href=\"" + url + "\">" +
        "<span class=\"badge\" style=\"margin-bottom:8px\">" + escapeHtml(item.category) + "</span>" +
        "<h3>" + escapeHtml(item.title) + "</h3>" +
        "<p>" + escapeHtml(item.description) + "</p>" +
      "</a>"
    );
  }

  function renderRelatedPrompts(post) {
    loadPromptLibrary().then(function (library) {
      var scored = library
        .map(function (p) { return { prompt: p, score: scorePrompt(post, p) }; })
        .filter(function (s) { return s.score >= 2; })
        .sort(function (a, b) { return b.score - a.score; })
        .slice(0, 3);

      if (!scored.length) return;

      var section = document.getElementById("related-prompts-section");
      var grid = document.getElementById("related-prompts-grid");
      if (!section || !grid) return;
      grid.innerHTML = scored.map(function (s) { return relatedPromptCardHtml(s.prompt); }).join("");
      section.hidden = false;
    });
  }

  function renderNotFound() {
    document.getElementById("post-body").innerHTML =
      "<h1>Post Not Found</h1>" +
      "<p>This post may have been moved or removed. Head back to the <a href=\"/blog\">blog index</a> to find something else.</p>";
  }

  function init() {
    var slug = getSlug();
    if (!slug) { renderNotFound(); return; }

    loadPost(slug).then(function (post) {
      if (!post) { renderNotFound(); return; }
      setMeta(post, slug);
      render(post);
      renderRelatedPrompts(post);
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
