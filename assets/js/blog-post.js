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
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
