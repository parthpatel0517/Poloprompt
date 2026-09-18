const express = require("express");
const router = express.Router();
const pool = require("../db");

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || "");
}

// POST /api/contact  { name?, email, reason: "help"|"support", message }
router.post("/", async (req, res) => {
  const { name, email, reason, message } = req.body || {};
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "A valid email is required." });
  }
  if (!message || !message.trim()) {
    return res.status(400).json({ error: "Message can't be empty." });
  }

  const safeReason = reason === "support" ? "support" : "help";

  try {
    await pool.query(
      "INSERT INTO contact_messages (name, email, reason, message) VALUES (?, ?, ?, ?)",
      [name || null, email.trim(), safeReason, message.trim()]
    );
    res.status(201).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not send your message." });
  }
});

module.exports = router;
