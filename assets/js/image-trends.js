/* PoloPrompt — homepage "Trending Image Styles" gallery.
   Loads from the backend API (with automatic fallback to the bundled
   IMAGE_TRENDS array if the API is unreachable), then renders a filterable
   grid: search box + popular-tag pills narrow the results client-side,
   matching the browse/search pattern already used on the Prompt Library.
   Each card shows the example image with a style badge overlay, a tag row,
   and a "View & Copy Prompt" toggle for the prompt that recreates that
   look on the user's own photo. */
(function () {
  "use strict";

  var API_BASE = "https://poloprompt-server.onrender.com";
  var MAX_TAGS_SHOWN = 8;

  var state = { query: "", tag: "All" };
  var trends = [];
  var grid, searchInput, tagBar, resultsCount, emptyState;

  function loadTrends() {
    if (!API_BASE) return Promise.resolve(IMAGE_TRENDS);
    return fetch(API_BASE + "/api/image-trends")
      .then(function (res) {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then(function (data) {
        return data && data.length ? data : IMAGE_TRENDS;
      })
      .catch(function () {
        return IMAGE_TRENDS;
      });
  }

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function getPopularTags() {
    var counts = {};
    trends.forEach(function (t) {
      (t.tags || []).forEach(function (tag) {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });
    return Object.keys(counts)
      .sort(function (a, b) { return counts[b] - counts[a]; })
      .slice(0, MAX_TAGS_SHOWN);
  }

  function matches(item) {
    var byTag = state.tag === "All" || (item.tags || []).indexOf(state.tag) !== -1;
    if (!byTag) return false;
    if (!state.query) return true;
    var haystack = (item.theme + " " + item.description + " " + (item.tags || []).join(" ")).toLowerCase();
    return haystack.indexOf(state.query.toLowerCase()) !== -1;
  }

  function cardHtml(item) {
    var tagsHtml = (item.tags || []).map(function (t) {
      return "<span class=\"badge\">" + escapeHtml(t) + "</span>";
    }).join("");
    return (
      "<div class=\"card image-trend-card\" data-id=\"" + item.id + "\">" +
        "<div class=\"image-trend-thumb\">" +
          "<span class=\"image-trend-badge\">Image Trend</span>" +
          "<img src=\"" + escapeHtml(item.image_url) + "\" alt=\"" + escapeHtml(item.theme) + " example\" loading=\"lazy\">" +
        "</div>" +
        "<h3>" + escapeHtml(item.theme) + "</h3>" +
        "<p class=\"image-trend-snippet\">" + escapeHtml(item.description) + "</p>" +
        "<div class=\"image-trend-tags\">" + tagsHtml + "</div>" +
        "<button type=\"button\" class=\"btn btn-secondary btn-block toggle-prompt-btn\" data-target=\"trend-body-" + item.id + "\">View &amp; Copy Prompt</button>" +
        "<div class=\"output-wrap prompt-body\" id=\"trend-body-" + item.id + "\" hidden>" +
          "<div class=\"output-head\">" +
            "<h3>Prompt</h3>" +
            "<button class=\"btn btn-copy\" data-copy-target=\"#trend-text-" + item.id + "\">Copy to Clipboard</button>" +
          "</div>" +
          "<pre class=\"output-block\" id=\"trend-text-" + item.id + "\">" + escapeHtml(item.prompt) + "</pre>" +
        "</div>" +
      "</div>"
    );
  }

  function buildTagBar() {
    var tags = ["All"].concat(getPopularTags());
    tagBar.innerHTML = tags.map(function (t) {
      var active = t === state.tag ? " active" : "";
      return "<button type=\"button\" class=\"btn btn-secondary category-pill" + active + "\" data-tag=\"" + escapeHtml(t) + "\">" + escapeHtml(t) + "</button>";
    }).join("");
  }

  function highlightActiveTag() {
    tagBar.querySelectorAll(".category-pill").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-tag") === state.tag);
    });
  }

  function injectItemListSchema(data) {
    var ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": data.map(function (t, i) {
        return {
          "@type": "ListItem",
          "position": i + 1,
          "url": "https://poloprompt.com/image-library",
          "name": t.theme
        };
      })
    });
    document.head.appendChild(ld);
  }

  function render() {
    var filtered = trends.filter(matches);
    grid.innerHTML = filtered.map(cardHtml).join("");
    resultsCount.textContent = filtered.length + (filtered.length === 1 ? " style found" : " styles found");
    emptyState.hidden = filtered.length !== 0;
  }

  function init() {
    grid = document.getElementById("image-trends-grid");
    if (!grid) return;
    searchInput = document.getElementById("image-trends-search");
    tagBar = document.getElementById("image-trends-tag-bar");
    resultsCount = document.getElementById("image-trends-results-count");
    emptyState = document.getElementById("image-trends-empty-state");

    loadTrends().then(function (data) {
      trends = data;
      injectItemListSchema(data);
      buildTagBar();
      render();
    });

    if (searchInput) {
      searchInput.addEventListener("input", function () {
        state.query = searchInput.value.trim();
        render();
      });
    }

    if (tagBar) {
      tagBar.addEventListener("click", function (e) {
        var btn = e.target.closest(".category-pill");
        if (!btn) return;
        state.tag = btn.getAttribute("data-tag");
        highlightActiveTag();
        render();
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
