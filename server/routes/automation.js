const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET /api/automation-ideas?industry=X&goal=Y
// Falls back to the industry's generic ideas (goal IS NULL) if no exact match exists,
// mirroring the original client-side getIdeas() behavior.
router.get("/", async (req, res) => {
  const { industry, goal } = req.query;
  if (!industry || !goal) {
    return res.status(400).json({ error: "industry and goal query params are required." });
  }

  try {
    const [exact] = await pool.query(
      "SELECT name, steps, prompt FROM automation_ideas WHERE industry = ? AND goal = ? ORDER BY sort_order",
      [industry, goal]
    );
    if (exact.length) return res.json(exact);

    const [fallback] = await pool.query(
      "SELECT name, steps, prompt FROM automation_ideas WHERE industry = ? AND goal IS NULL ORDER BY sort_order",
      [industry]
    );
    res.json(fallback);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load automation ideas." });
  }
});

module.exports = router;
