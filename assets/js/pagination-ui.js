/* PoloPrompt — shared pagination markup renderer, used by library.js (dynamic,
   filtered results) and list-pagination.js (static card grids). Renders a
   windowed page list with ellipses once there are more than a handful of pages,
   so this doesn't turn into a wall of buttons as content grows. */
var PoloPagination = (function () {
  "use strict";

  function pageList(current, total) {
    var delta = total <= 7 ? total : 1;
    var range = [];
    for (var i = 1; i <= total; i++) {
      if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
        range.push(i);
      }
    }
    var withDots = [];
    var last = null;
    range.forEach(function (i) {
      if (last !== null) {
        if (i - last === 2) withDots.push(last + 1);
        else if (i - last > 2) withDots.push("…");
      }
      withDots.push(i);
      last = i;
    });
    return withDots;
  }

  function render(current, total) {
    if (total <= 1) return "";
    var html = "<span class=\"visually-hidden\" aria-live=\"polite\">Page " + current + " of " + total + "</span>";
    html += "<button type=\"button\" class=\"pagination-nav\" data-page=\"prev\"" + (current === 1 ? " disabled" : "") + " aria-label=\"Previous page\">‹</button>";
    pageList(current, total).forEach(function (item) {
      if (item === "…") {
        html += "<span class=\"pagination-ellipsis\" aria-hidden=\"true\">…</span>";
      } else {
        html += "<button type=\"button\" data-page=\"" + item + "\" class=\"" + (item === current ? "active" : "") + "\" aria-current=\"" + (item === current ? "page" : "false") + "\">" + item + "</button>";
      }
    });
    html += "<button type=\"button\" class=\"pagination-nav\" data-page=\"next\"" + (current === total ? " disabled" : "") + " aria-label=\"Next page\">›</button>";
    return html;
  }

  return { render: render };
})();
