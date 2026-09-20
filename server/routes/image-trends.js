const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET /api/image-trends — trending image styles for the homepage showcase
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, theme, description, image_url, prompt, tags FROM image_trends ORDER BY sort_order ASC"
    );
    const trends = rows.map((r) => ({
      ...r,
      tags: typeof r.tags === "string" ? JSON.parse(r.tags) : r.tags
    }));
    res.json(trends);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load image trends." });
  }
});

module.exports = router;
