/* PoloPrompt — shared site behavior: mobile nav + copy-to-clipboard. No dependencies. */
(function () {
  "use strict";

  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var links = document.querySelector(".nav-links");
    if (!toggle || !links) return;
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", links.classList.contains("open") ? "true" : "false");
    });

    document.querySelectorAll(".has-dropdown > .nav-link").forEach(function (link) {
      link.addEventListener("click", function (e) {
        if (window.innerWidth > 860) return;
        e.preventDefault();
        link.parentElement.classList.toggle("open");
      });
    });
  }

  function initCopyButtons() {
    document.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-copy-target]");
      if (!btn) return;
      var target = document.querySelector(btn.getAttribute("data-copy-target"));
      if (!target) return;
      var text = target.innerText || target.textContent || "";
      if (!text.trim()) return;

      var restore = btn.textContent;
      var done = function () {
        btn.textContent = "Copied!";
        btn.classList.add("copied");
        setTimeout(function () {
          btn.textContent = restore;
          btn.classList.remove("copied");
        }, 1800);
      };

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done).catch(function () {
          fallbackCopy(text, done);
        });
      } else {
        fallbackCopy(text, done);
      }
    });
  }

  function fallbackCopy(text, done) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); done(); } catch (err) { /* clipboard unavailable */ }
    document.body.removeChild(ta);
  }

  function initFooterYear() {
    document.querySelectorAll("[data-current-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initCopyButtons();
    initFooterYear();
  });
})();
