/* One-time migration: reads the existing static blog/*.html files plus the
   badge/read-time metadata from blog.html's card list, and inserts them into
   the blog_posts table. Safe to re-run (upserts by slug). */
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const pool = require("./db");

const BLOG_DIR = path.join(__dirname, "..", "blog");
const BLOG_HTML = path.join(__dirname, "..", "blog.html");

function decodeEntities(str) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, "\"")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function extractCardMeta() {
  const html = fs.readFileSync(BLOG_HTML, "utf8");
  const cardRe = /<a class="card" href="\/blog\/([^"]+)">\s*<span class="badge"[^>]*>([^<]+)<\/span>\s*<h3>([^<]+)<\/h3>\s*<p>([\s\S]*?)<\/p>\s*<p class="muted"[^>]*>(\d+) min read<\/p>/g;
  const meta = {};
  let m;
  while ((m = cardRe.exec(html))) {
    meta[m[1]] = { badge: m[2], readMinutes: parseInt(m[5], 10) };
  }
  return meta;
}

function extractPost(filePath, slug, cardMeta) {
  const html = fs.readFileSync(filePath, "utf8");

  const titleRaw = (html.match(/<title>([\s\S]*?)\s*\|\s*PoloPrompt<\/title>/) || [])[1];
  const descriptionRaw = (html.match(/<meta name="description" content="([^"]*)">/) || [])[1];
  const title = titleRaw && decodeEntities(titleRaw);
  const description = descriptionRaw && decodeEntities(descriptionRaw);
  const datePublished = (html.match(/"datePublished":\s*"([^"]+)"/) || [])[1] || new Date().toISOString().slice(0, 10);

  const proseMatch = html.match(/<div class="container prose">([\s\S]*?)<\/div>\s*<\/section>/);
  if (!proseMatch) throw new Error(`Could not find prose content in ${filePath}`);
  let prose = proseMatch[1];
  // Drop the leading <h1>...</h1> — the template renders the title separately.
  prose = prose.replace(/^\s*<h1>[\s\S]*?<\/h1>\s*/, "").trim();

  const meta = cardMeta[slug] || { badge: "General", readMinutes: 5 };

  if (!title || !description) throw new Error(`Missing title/description in ${filePath}`);

  return {
    slug,
    title,
    description,
    badge: decodeEntities(meta.badge),
    readMinutes: meta.readMinutes,
    contentHtml: prose,
    publishedAt: datePublished
  };
}

async function main() {
  const cardMeta = extractCardMeta();
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".html"));

  console.log(`Migrating ${files.length} blog posts...`);
  for (const file of files) {
    const slug = file.replace(/\.html$/, "");
    const post = extractPost(path.join(BLOG_DIR, file), slug, cardMeta);
    await pool.query(
      `INSERT INTO blog_posts (slug, title, description, badge, read_minutes, content_html, published_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         title = VALUES(title), description = VALUES(description), badge = VALUES(badge),
         read_minutes = VALUES(read_minutes), content_html = VALUES(content_html),
         published_at = VALUES(published_at)`,
      [post.slug, post.title, post.description, post.badge, post.readMinutes, post.contentHtml, post.publishedAt]
    );
    console.log(`  ✓ ${slug}`);
  }
  console.log("Migration complete.");
  await pool.end();
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exitCode = 1;
});
