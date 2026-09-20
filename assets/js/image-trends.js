/* PoloPrompt — homepage "Trending Image Styles" showcase.
   Loads from the backend API (with automatic fallback to the bundled
   IMAGE_TRENDS array if the API is unreachable), renders one card per style
   with its example image, and lets the user reveal + copy the prompt that
   recreates that style on their own photo. */
(function () {
  "use strict";

  var API_BASE = "https://poloprompt-server.onrender.com";
  var grid;

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

  function cardHtml(item) {
    return (
      "<div class=\"card image-trend-card\" data-id=\"" + item.id + "\">" +
        "<div class=\"image-trend-thumb\">" +
          "<img src=\"" + escapeHtml(item.image_url) + "\" alt=\"" + escapeHtml(item.theme) + " example\" loading=\"lazy\">" +
        "</div>" +
        "<h3>" + escapeHtml(item.theme) + "</h3>" +
        "<p>" + escapeHtml(item.description) + "</p>" +
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

  function render(trends) {
    grid.innerHTML = trends.map(cardHtml).join("");
  }

  function init() {
    grid = document.getElementById("image-trends-grid");
    if (!grid) return;

    loadTrends().then(render);

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
