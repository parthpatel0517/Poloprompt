/* PoloPrompt — generic client-side pagination for static card grids (Blog, Templates).
   Add data-paginate="N" to a .grid container to paginate its direct children N per page.
   All items stay in the initial HTML (so search engines still see every post/card) —
   this only hides the ones outside the current page. Pages of 1 or fewer render no controls. */
(function () {
  "use strict";

  function paginate(grid) {
    var pageSize = parseInt(grid.getAttribute("data-paginate"), 10);
    if (!pageSize || pageSize <= 0) return;

    var items = Array.prototype.slice.call(grid.children);
    var totalPages = Math.ceil(items.length / pageSize);
    if (totalPages <= 1) return;

    var nav = document.createElement("div");
    nav.className = "pagination";
    grid.insertAdjacentElement("afterend", nav);

    var page = 1;

    function render() {
      items.forEach(function (item, i) {
        item.hidden = i < (page - 1) * pageSize || i >= page * pageSize;
      });
      renderNav();
    }

    function renderNav() {
      var html = "<button type=\"button\" data-page=\"prev\"" + (page === 1 ? " disabled" : "") + " aria-label=\"Previous page\">Prev</button>";
      for (var p = 1; p <= totalPages; p++) {
        html += "<button type=\"button\" data-page=\"" + p + "\" class=\"" + (p === page ? "active" : "") + "\" aria-current=\"" + (p === page ? "page" : "false") + "\">" + p + "</button>";
      }
      html += "<button type=\"button\" data-page=\"next\"" + (page === totalPages ? " disabled" : "") + " aria-label=\"Next page\">Next</button>";
      nav.innerHTML = html;
    }

    nav.addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-page]");
      if (!btn || btn.disabled) return;
      var target = btn.getAttribute("data-page");
      if (target === "prev") page = Math.max(1, page - 1);
      else if (target === "next") page = Math.min(totalPages, page + 1);
      else page = parseInt(target, 10);
      render();
      grid.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    render();
  }

  function init() {
    document.querySelectorAll("[data-paginate]").forEach(paginate);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
