/* PoloPrompt — blog listing, fully database-driven.
   Loads from the backend API with automatic fallback to the bundled BLOG_POSTS
   (blog-data.js) if the API is unreachable — same resilience pattern as the
   Prompt Library. Posts render into cards linking to /blog/<slug>, which the
   dynamic post template (blog/post.html) fetches and renders by slug. */
(function () {
  "use strict";

  var API_BASE = "https://poloprompt-server.onrender.com";
  var PAGE_SIZE = 6;

  var state = { page: 1 };
  var posts = [];
  var grid, resultsCount, emptyState, pagination;

  function loadPosts() {
    if (!API_BASE) return Promise.resolve(BLOG_POSTS);
    return fetch(API_BASE + "/api/blog-posts")
      .then(function (res) {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .catch(function () {
        return BLOG_POSTS;
      });
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function cardHtml(post) {
    return (
      "<a class=\"card\" href=\"/blog/" + encodeURIComponent(post.slug) + "\">" +
        "<span class=\"badge\" style=\"margin-bottom:10px\">" + escapeHtml(post.badge) + "</span>" +
        "<h3>" + escapeHtml(post.title) + "</h3>" +
        "<p>" + escapeHtml(post.description) + "</p>" +
        "<p class=\"muted\" style=\"font-size:.8rem;margin-top:10px\">" + post.read_minutes + " min read</p>" +
      "</a>"
    );
  }

  function injectItemListSchema(data) {
    var ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": data.map(function (post, i) {
        return {
          "@type": "ListItem",
          "position": i + 1,
          "url": "https://poloprompt.com/blog/" + encodeURIComponent(post.slug),
          "name": post.title
        };
      })
    });
    document.head.appendChild(ld);
  }

  function render() {
    var totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
    if (state.page > totalPages) state.page = totalPages;
    if (state.page < 1) state.page = 1;

    var start = (state.page - 1) * PAGE_SIZE;
    var pageItems = posts.slice(start, start + PAGE_SIZE);

    grid.innerHTML = pageItems.map(cardHtml).join("");
    resultsCount.textContent = posts.length + (posts.length === 1 ? " post" : " posts");
    emptyState.hidden = posts.length !== 0;
    renderPagination(totalPages);
  }

  function renderPagination(totalPages) {
    if (!pagination) return;
    pagination.innerHTML = PoloPagination.render(state.page, totalPages);
  }

  function init() {
    grid = document.getElementById("blog-grid");
    resultsCount = document.getElementById("blog-results-count");
    emptyState = document.getElementById("blog-empty-state");
    pagination = document.getElementById("blog-pagination");
    if (!grid) return;

    loadPosts().then(function (data) {
      posts = data;
      injectItemListSchema(data);
      render();
    });

    if (pagination) {
      pagination.addEventListener("click", function (e) {
        var btn = e.target.closest("button[data-page]");
        if (!btn || btn.disabled) return;
        var target = btn.getAttribute("data-page");
        if (target === "prev") state.page -= 1;
        else if (target === "next") state.page += 1;
        else state.page = parseInt(target, 10);
        render();
        grid.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
