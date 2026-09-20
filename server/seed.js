/* Populates the database from the site's existing static data files —
   assets/js/prompt-library-data.js and assets/js/automation-ideas-data.js —
   so nothing has to be hand-retyped into SQL. Safe to re-run (upserts prompts,
   fully replaces automation_ideas each time). */
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const pool = require("./db");

function loadGlobalsFromScript(filePath, globalNames) {
  const code = fs.readFileSync(filePath, "utf8");
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  const result = {};
  globalNames.forEach((name) => {
    result[name] = sandbox[name];
  });
  return result;
}

async function seedPrompts() {
  const { PROMPT_LIBRARY } = loadGlobalsFromScript(
    path.join(__dirname, "..", "assets", "js", "prompt-library-data.js"),
    ["PROMPT_LIBRARY"]
  );

  console.log(`Seeding ${PROMPT_LIBRARY.length} prompts...`);
  for (const p of PROMPT_LIBRARY) {
    await pool.query(
      `INSERT INTO prompts (id, category, title, description, tags, prompt)
       VALUES (?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         category = VALUES(category), title = VALUES(title),
         description = VALUES(description), tags = VALUES(tags), prompt = VALUES(prompt)`,
      [p.id, p.category, p.title, p.description, JSON.stringify(p.tags), p.prompt]
    );
  }
}

async function seedAutomationIdeas() {
  const { AUTOMATION_IDEAS, AUTOMATION_FALLBACKS } = loadGlobalsFromScript(
    path.join(__dirname, "..", "assets", "js", "automation-ideas-data.js"),
    ["AUTOMATION_IDEAS", "AUTOMATION_FALLBACKS"]
  );

  await pool.query("DELETE FROM automation_ideas");

  let count = 0;
  for (const key of Object.keys(AUTOMATION_IDEAS)) {
    const [industry, goal] = key.split("|");
    let order = 0;
    for (const idea of AUTOMATION_IDEAS[key]) {
      await pool.query(
        "INSERT INTO automation_ideas (industry, goal, name, steps, prompt, sort_order) VALUES (?, ?, ?, ?, ?, ?)",
        [industry, goal, idea.name, idea.steps, idea.prompt, order++]
      );
      count++;
    }
  }

  for (const industry of Object.keys(AUTOMATION_FALLBACKS)) {
    let order = 0;
    for (const idea of AUTOMATION_FALLBACKS[industry]) {
      await pool.query(
        "INSERT INTO automation_ideas (industry, goal, name, steps, prompt, sort_order) VALUES (?, NULL, ?, ?, ?, ?)",
        [industry, idea.name, idea.steps, idea.prompt, order++]
      );
      count++;
    }
  }
  console.log(`Seeded ${count} automation idea rows (across combos + fallbacks).`);
}

async function seedBlogPosts() {
  const { BLOG_POSTS } = loadGlobalsFromScript(
    path.join(__dirname, "..", "assets", "js", "blog-data.js"),
    ["BLOG_POSTS"]
  );

  console.log(`Seeding ${BLOG_POSTS.length} blog posts...`);
  for (const p of BLOG_POSTS) {
    await pool.query(
      `INSERT INTO blog_posts (slug, title, description, badge, read_minutes, content_html, published_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         title = VALUES(title), description = VALUES(description), badge = VALUES(badge),
         read_minutes = VALUES(read_minutes), content_html = VALUES(content_html),
         published_at = VALUES(published_at)`,
      [p.slug, p.title, p.description, p.badge, p.read_minutes, p.content_html, p.published_at]
    );
  }
}

async function seedImageTrends() {
  const { IMAGE_TRENDS } = loadGlobalsFromScript(
    path.join(__dirname, "..", "assets", "js", "image-trends-data.js"),
    ["IMAGE_TRENDS"]
  );

  console.log(`Seeding ${IMAGE_TRENDS.length} image trends...`);
  for (const t of IMAGE_TRENDS) {
    await pool.query(
      `INSERT INTO image_trends (id, theme, description, image_url, prompt, sort_order)
       VALUES (?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         theme = VALUES(theme), description = VALUES(description),
         image_url = VALUES(image_url), prompt = VALUES(prompt), sort_order = VALUES(sort_order)`,
      [t.id, t.theme, t.description, t.image_url, t.prompt, t.sort_order]
    );
  }
}

async function main() {
  try {
    await seedPrompts();
    await seedAutomationIdeas();
    await seedBlogPosts();
    await seedImageTrends();
    console.log("Seed complete.");
  } catch (err) {
    console.error("Seed failed:", err);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

main();
