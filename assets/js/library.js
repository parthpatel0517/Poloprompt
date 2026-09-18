/* PoloPrompt — prompt library browse/search/filter logic.
   Loads once from the backend API (if API_BASE is set) with automatic fallback to the
   bundled PROMPT_LIBRARY (prompt-library-data.js) if the API is unreachable or unset —
   then all searching/filtering happens locally against that in-memory list, so typing
   in the search box never waits on a network request. */
(function () {
  "use strict";

  var API_BASE = "https://poloprompt-server.onrender.com";

  var state = { query: "", category: "All" };
  var library = [];
  var grid, searchInput, categoryBar, resultsCount, emptyState;

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
    grid.innerHTML = filtered.map(cardHtml).join("");
    resultsCount.textContent = filtered.length + (filtered.length === 1 ? " prompt found" : " prompts found");
    emptyState.hidden = filtered.length !== 0;
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
    if (!grid) return;

    readInitialFilters();
    if (searchInput) searchInput.value = state.query;

    loadLibrary().then(function (data) {
      library = data;
      buildCategoryBar();
      render();
      highlightActiveCategory();
    });

    if (searchInput) {
      searchInput.addEventListener("input", function () {
        state.query = searchInput.value.trim();
        render();
      });
    }

    categoryBar.addEventListener("click", function (e) {
      var btn = e.target.closest(".category-pill");
      if (!btn) return;
      state.category = btn.getAttribute("data-category");
      highlightActiveCategory();
      render();
    });

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
