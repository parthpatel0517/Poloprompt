const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET /api/prompts — returns the full library; the site's library.js does
// searching/filtering locally against this list so typing has no lag.
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, category, title, description, tags, prompt FROM prompts ORDER BY category, title"
    );
    const prompts = rows.map((r) => ({
      ...r,
      tags: typeof r.tags === "string" ? JSON.parse(r.tags) : r.tags
    }));
    res.json(prompts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load prompts." });
  }
});

module.exports = router;
