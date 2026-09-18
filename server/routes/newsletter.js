const express = require("express");
const router = express.Router();
const pool = require("../db");

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || "");
}

// POST /api/newsletter  { email, sourcePage? }
router.post("/", async (req, res) => {
  const { email, sourcePage } = req.body || {};
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "A valid email is required." });
  }

  try {
    await pool.query(
      `INSERT INTO newsletter_subscribers (email, source_page) VALUES (?, ?)
       ON DUPLICATE KEY UPDATE source_page = VALUES(source_page)`,
      [email.trim().toLowerCase(), sourcePage || null]
    );
    res.status(201).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not save your subscription." });
  }
});

module.exports = router;
