/* PoloPrompt — newsletter signup handler.
   Posts to the PoloPrompt backend (server/) if API_BASE is set below. Until then,
   the form stays fully visible but tells visitors signups aren't open yet instead
   of silently failing.

   TO ACTIVATE (using the included Node.js/MySQL backend):
   1. Set up and run the backend in server/ (see server/README.md).
   2. Set API_BASE below to wherever it's running, e.g. "http://localhost:3000"
      for local testing, or your deployed API's URL in production.

   Prefer a third-party form tool instead (Hostinger Reach, Formspree, etc.)?
   Just point API_BASE-style requests at that endpoint instead in submitEmail(). */
(function () {
  "use strict";

  var API_BASE = "https://poloprompt-server.onrender.com";

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function setStatus(el, message, kind) {
    el.textContent = message;
    el.classList.remove("is-success", "is-error");
    if (kind) el.classList.add(kind);
  }

  function submitEmail(email) {
    return fetch(API_BASE + "/api/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ email: email, sourcePage: window.location.pathname })
    });
  }

  function initForm(form) {
    var emailInput = form.querySelector('input[type="email"]');
    var honeypot = form.querySelector(".newsletter-hp");
    var status = form.parentElement.querySelector(".newsletter-status");
    var button = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!status) return;

      // Silently drop obvious bots (honeypot field only bots fill in).
      if (honeypot && honeypot.value) {
        setStatus(status, "Thanks — you're on the list!", "is-success");
        form.reset();
        return;
      }

      var email = emailInput.value.trim();
      if (!isValidEmail(email)) {
        setStatus(status, "Enter a valid email address.", "is-error");
        emailInput.focus();
        return;
      }

      if (!API_BASE) {
        setStatus(status, "Signups aren't open yet — check back soon!", "is-error");
        return;
      }

      var originalLabel = button.textContent;
      button.disabled = true;
      button.textContent = "Joining...";
      setStatus(status, "", null);

      submitEmail(email)
        .then(function (res) {
          if (!res.ok) throw new Error("Request failed");
          setStatus(status, "Thanks — you're on the list!", "is-success");
          form.reset();
        })
        .catch(function () {
          setStatus(status, "Something went wrong. Please try again.", "is-error");
        })
        .finally(function () {
          button.disabled = false;
          button.textContent = originalLabel;
        });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".newsletter-form").forEach(initForm);
  });
})();
