const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET /api/blog-posts — list, newest first (card list on /blog)
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT slug, title, description, badge, read_minutes, published_at FROM blog_posts ORDER BY published_at DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load blog posts." });
  }
});

// GET /api/blog-posts/:slug — full post content
router.get("/:slug", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT slug, title, description, badge, read_minutes, content_html, published_at, updated_at FROM blog_posts WHERE slug = ?",
      [req.params.slug]
    );
    if (!rows.length) return res.status(404).json({ error: "Post not found." });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load post." });
  }
});

module.exports = router;
