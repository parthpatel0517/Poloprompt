/* PoloPrompt — prompt library browse/search/filter logic.
   Loads once from the backend API (if API_BASE is set) with automatic fallback to the
   bundled PROMPT_LIBRARY (prompt-library-data.js) if the API is unreachable or unset —
   then all searching/filtering happens locally against that in-memory list, so typing
   in the search box never waits on a network request. */
(function () {
  "use strict";

  var API_BASE = "https://poloprompt-server.onrender.com";
  var PAGE_SIZE = 12;

  var state = { query: "", category: "All", page: 1 };
  var library = [];
  var grid, searchInput, categoryBar, resultsCount, emptyState, pagination;

  function loadLibrary() {
    if (!API_BASE) return Promise.resolve(PROMPT_LIBRARY);
    return fetch(API_BASE + "/api/prompts")
      .then(function (res) {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .catch(function () {
        return PROMPT_LIBRARY;
      });
  }

  function getCategories() {
    var set = {};
    library.forEach(function (p) { set[p.category] = true; });
    return Object.keys(set).sort();
  }

  function updateCountBadges() {
    document.querySelectorAll('[data-lib-count="prompts"]').forEach(function (el) {
      el.textContent = library.length;
    });
    document.querySelectorAll('[data-lib-count="categories"]').forEach(function (el) {
      el.textContent = getCategories().length;
    });
  }

  function matches(item) {
    var byCategory = state.category === "All" || item.category === state.category;
    if (!byCategory) return false;
    if (!state.query) return true;
    var haystack = (item.title + " " + item.description + " " + item.category + " " + item.tags.join(" ")).toLowerCase();
    return haystack.indexOf(state.query.toLowerCase()) !== -1;
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function cardHtml(item) {
    var tagsHtml = item.tags.map(function (t) { return "<span class=\"badge\">" + escapeHtml(t) + "</span>"; }).join(" ");
    return (
      "<div class=\"card prompt-card\" data-id=\"" + item.id + "\">" +
        "<div class=\"icon\">💡</div>" +
        "<span class=\"badge\" style=\"margin-bottom:8px\">" + escapeHtml(item.category) + "</span>" +
        "<h3>" + escapeHtml(item.title) + "</h3>" +
        "<p>" + escapeHtml(item.description) + "</p>" +
        "<div style=\"margin:10px 0\">" + tagsHtml + "</div>" +
        "<button type=\"button\" class=\"btn btn-secondary btn-block toggle-prompt-btn\" data-target=\"prompt-body-" + item.id + "\">View &amp; Copy Prompt</button>" +
        "<div class=\"output-wrap prompt-body\" id=\"prompt-body-" + item.id + "\" hidden>" +
          "<div class=\"output-head\">" +
            "<h3>Full Prompt</h3>" +
            "<button class=\"btn btn-copy\" data-copy-target=\"#prompt-text-" + item.id + "\">Copy to Clipboard</button>" +
          "</div>" +
          "<pre class=\"output-block\" id=\"prompt-text-" + item.id + "\">" + escapeHtml(item.prompt) + "</pre>" +
        "</div>" +
      "</div>"
    );
  }

  function render() {
    var filtered = library.filter(matches);
    var totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    if (state.page > totalPages) state.page = totalPages;
    if (state.page < 1) state.page = 1;

    var start = (state.page - 1) * PAGE_SIZE;
    var pageItems = filtered.slice(start, start + PAGE_SIZE);

    grid.innerHTML = pageItems.map(cardHtml).join("");
    resultsCount.textContent = filtered.length + (filtered.length === 1 ? " prompt found" : " prompts found");
    emptyState.hidden = filtered.length !== 0;
    renderPagination(totalPages);
  }

  function renderPagination(totalPages) {
    if (!pagination) return;
    pagination.innerHTML = PoloPagination.render(state.page, totalPages);
  }

  function buildCategoryBar() {
    var categories = ["All"].concat(getCategories());
    categoryBar.innerHTML = categories.map(function (c) {
      var active = c === state.category ? " active" : "";
      return "<button type=\"button\" class=\"btn btn-secondary category-pill" + active + "\" data-category=\"" + escapeHtml(c) + "\">" + escapeHtml(c) + "</button>";
    }).join("");
  }

  function highlightActiveCategory() {
    categoryBar.querySelectorAll(".category-pill").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-category") === state.category);
    });
  }

  function readInitialFilters() {
    var params = new URLSearchParams(window.location.search);
    var cat = params.get("category");
    var q = params.get("q");
    if (cat) state.category = cat;
    if (q) state.query = q;
  }

  function init() {
    grid = document.getElementById("library-grid");
    searchInput = document.getElementById("library-search");
    categoryBar = document.getElementById("category-bar");
    resultsCount = document.getElementById("library-results-count");
    emptyState = document.getElementById("library-empty-state");
    pagination = document.getElementById("library-pagination");

    readInitialFilters();
    if (searchInput) searchInput.value = state.query;

    loadLibrary().then(function (data) {
      library = data;
      updateCountBadges();
      if (!grid) return;
      buildCategoryBar();
      render();
      highlightActiveCategory();
    });

    if (!grid) return;

    if (searchInput) {
      searchInput.addEventListener("input", function () {
        state.query = searchInput.value.trim();
        state.page = 1;
        render();
      });
    }

    categoryBar.addEventListener("click", function (e) {
      var btn = e.target.closest(".category-pill");
      if (!btn) return;
      state.category = btn.getAttribute("data-category");
      state.page = 1;
      highlightActiveCategory();
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

    grid.addEventListener("click", function (e) {
      var btn = e.target.closest(".toggle-prompt-btn");
      if (!btn) return;
      var target = document.getElementById(btn.getAttribute("data-target"));
      if (!target) return;
      var willShow = target.hidden;
      target.hidden = !willShow;
      btn.textContent = willShow ? "Hide Prompt" : "View & Copy Prompt";
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
