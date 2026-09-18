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

async function main() {
  try {
    await seedPrompts();
    await seedAutomationIdeas();
    console.log("Seed complete.");
  } catch (err) {
    console.error("Seed failed:", err);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

main();
