/* PoloPrompt — shared site behavior: mobile nav + copy-to-clipboard. No dependencies. */
(function () {
  "use strict";

  function trackEvent(name, params) {
    if (typeof gtag === "function") gtag("event", name, params || {});
  }
  window.PoloTrack = trackEvent;

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
        trackEvent("copy_prompt", {
          item_id: target.id || "",
          page_path: window.location.pathname
        });
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

  /* Light/dark switch. Dark is the default; the choice is remembered in
     localStorage and applied before first paint by an inline script in each
     page's <head>, so there's no flash of the wrong theme. */
  function initThemeToggle() {
    var nav = document.querySelector(".nav");
    if (!nav || nav.querySelector(".theme-toggle")) return;
    var root = document.documentElement;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "theme-toggle";
    btn.innerHTML =
      '<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>' +
      '<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.2M12 19.8V22M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2 12h2.2M19.8 12H22M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6"/></svg>';
    var meta = document.querySelector('meta[name="theme-color"]');
    function sync() {
      var light = root.getAttribute("data-theme") === "light";
      btn.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
      btn.title = btn.getAttribute("aria-label");
      if (meta) meta.setAttribute("content", light ? "#ffffff" : "#0a0c16");
    }
    btn.addEventListener("click", function () {
      var light = root.getAttribute("data-theme") !== "light";
      if (light) root.setAttribute("data-theme", "light");
      else root.removeAttribute("data-theme");
      try { localStorage.setItem("pp-theme", light ? "light" : "dark"); } catch (err) { /* storage blocked */ }
      sync();
      trackEvent("theme_toggle", { theme: light ? "light" : "dark" });
    });
    sync();
    nav.insertBefore(btn, nav.querySelector(".nav-toggle"));
  }

  function initFooterYear() {
    document.querySelectorAll("[data-current-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initThemeToggle();
    initNav();
    initCopyButtons();
    initFooterYear();
  });
})();
