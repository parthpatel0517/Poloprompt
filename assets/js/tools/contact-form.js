/* PoloPrompt — Contact page form handler. Posts to the backend (server/) if API_BASE
   is set below. Until then, tells visitors the form isn't connected yet and points
   them at the mailto links above instead — it never fails silently. */
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

  function init() {
    var form = document.getElementById("contact-form");
    if (!form) return;

    var nameInput = document.getElementById("contact-name");
    var emailInput = document.getElementById("contact-email");
    var reasonSelect = document.getElementById("contact-reason");
    var messageInput = document.getElementById("contact-message");
    var status = document.getElementById("contact-form-status");
    var button = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var email = emailInput.value.trim();
      var message = messageInput.value.trim();

      if (!isValidEmail(email)) {
        setStatus(status, "Enter a valid email address.", "is-error");
        emailInput.focus();
        return;
      }
      if (!message) {
        setStatus(status, "Please write a message before sending.", "is-error");
        messageInput.focus();
        return;
      }

      if (!API_BASE) {
        setStatus(status, "This form isn't connected yet — please use one of the email addresses above instead.", "is-error");
        return;
      }

      var originalLabel = button.textContent;
      button.disabled = true;
      button.textContent = "Sending...";
      setStatus(status, "", null);

      fetch(API_BASE + "/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name: nameInput.value.trim(),
          email: email,
          reason: reasonSelect.value,
          message: message
        })
      })
        .then(function (res) {
          if (!res.ok) throw new Error("Request failed");
          setStatus(status, "Message sent — thanks! We'll reply as soon as we can.", "is-success");
          form.reset();
        })
        .catch(function () {
          setStatus(status, "Something went wrong sending that. Please try again or email us directly.", "is-error");
        })
        .finally(function () {
          button.disabled = false;
          button.textContent = originalLabel;
        });
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
