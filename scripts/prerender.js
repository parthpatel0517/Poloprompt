/* PoloPrompt — static pre-render step.

   The site's content lives in the database, mirrored in the repo by the
   assets/js/*-data.js files that seed it. Those files are the build input
   here: this script bakes the same content the front-end JavaScript would
   render into the HTML itself, so crawlers, AdSense reviewers, and anyone
   without JavaScript see the real content instead of an empty container.

   The existing JS still runs and hydrates on top for search, filtering, and
   pagination — the markup generated here matches what those scripts produce,
   so nothing visibly shifts when they take over.

   Run it whenever the data files change (i.e. alongside `npm run seed`):
     npm run prerender
*/
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const SITE_URL = "https://poloprompt.com";

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

function escapeHtml(str) {
  return String(str == null ? "" : str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeRe(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/* Writes `inner` into the element with the given id, wrapped in comment
   markers so re-runs replace cleanly instead of nesting. */
function fillContainer(html, id, inner) {
  const start = "<!--PRERENDER:" + id + "-->";
  const end = "<!--/PRERENDER:" + id + "-->";
  const markerRe = new RegExp(escapeRe(start) + "[\\s\\S]*?" + escapeRe(end));
  if (markerRe.test(html)) {
    return html.replace(markerRe, start + inner + end);
  }
  const emptyRe = new RegExp('(<div[^>]*id="' + id + '"[^>]*>)\\s*(<\\/div>)');
  if (!emptyRe.test(html)) return null;
  return html.replace(emptyRe, "$1" + start + inner + end + "$2");
}

/* ---------- card markup (mirrors the front-end JS renderers) ---------- */

function promptCardHtml(item) {
  const tagsHtml = (item.tags || [])
    .map((t) => '<span class="badge">' + escapeHtml(t) + "</span>")
    .join(" ");
  return (
    '<div class="card prompt-card" data-id="' + escapeHtml(item.id) + '">' +
      '<div class="icon">💡</div>' +
      '<span class="badge" style="margin-bottom:8px">' + escapeHtml(item.category) + "</span>" +
      "<h3>" + escapeHtml(item.title) + "</h3>" +
      "<p>" + escapeHtml(item.description) + "</p>" +
      '<div style="margin:10px 0">' + tagsHtml + "</div>" +
      '<button type="button" class="btn btn-secondary btn-block toggle-prompt-btn" data-target="prompt-body-' +
        escapeHtml(item.id) + '">View &amp; Copy Prompt</button>' +
      '<div class="output-wrap prompt-body" id="prompt-body-' + escapeHtml(item.id) + '" hidden>' +
        '<div class="output-head">' +
          "<h3>Full Prompt</h3>" +
          '<button class="btn btn-copy" data-copy-target="#prompt-text-' + escapeHtml(item.id) +
            '">Copy to Clipboard</button>' +
        "</div>" +
        '<pre class="output-block" id="prompt-text-' + escapeHtml(item.id) + '">' +
          escapeHtml(item.prompt) + "</pre>" +
      "</div>" +
    "</div>"
  );
}

function blogCardHtml(post) {
  return (
    '<a class="card" href="/blog/' + encodeURIComponent(post.slug) + '">' +
      '<span class="badge" style="margin-bottom:10px">' + escapeHtml(post.badge) + "</span>" +
      "<h3>" + escapeHtml(post.title) + "</h3>" +
      "<p>" + escapeHtml(post.description) + "</p>" +
      '<p class="muted" style="font-size:.8rem;margin-top:10px">' + post.read_minutes + " min read</p>" +
    "</a>"
  );
}

function imageTrendCardHtml(item) {
  const tagsHtml = (item.tags || [])
    .map((t) => '<span class="badge">' + escapeHtml(t) + "</span>")
    .join("");
  return (
    '<div class="card image-trend-card" data-id="' + escapeHtml(item.id) + '">' +
      '<div class="image-trend-thumb">' +
        '<span class="image-trend-badge">Image Trend</span>' +
        '<img src="' + escapeHtml(item.image_url) + '" alt="' + escapeHtml(item.theme) +
          ' example" loading="lazy">' +
      "</div>" +
      "<h3>" + escapeHtml(item.theme) + "</h3>" +
      '<p class="image-trend-snippet">' + escapeHtml(item.description) + "</p>" +
      '<div class="image-trend-tags">' + tagsHtml + "</div>" +
      '<button type="button" class="btn btn-secondary btn-block toggle-prompt-btn" data-target="trend-body-' +
        escapeHtml(item.id) + '">View &amp; Copy Prompt</button>' +
      '<div class="output-wrap prompt-body" id="trend-body-' + escapeHtml(item.id) + '" hidden>' +
        '<div class="output-head">' +
          "<h3>Prompt</h3>" +
          '<button class="btn btn-copy" data-copy-target="#trend-text-' + escapeHtml(item.id) +
            '">Copy to Clipboard</button>' +
        "</div>" +
        '<pre class="output-block" id="trend-text-' + escapeHtml(item.id) + '">' +
          escapeHtml(item.prompt) + "</pre>" +
      "</div>" +
    "</div>"
  );
}

/* ---------- related-prompt matching (mirrors blog-post.js) ---------- */

const STOPWORDS = {
  the: 1, and: 1, for: 1, that: 1, your: 1, you: 1, with: 1, into: 1, from: 1,
  this: 1, are: 1, have: 1, prompt: 1, prompts: 1, write: 1, writing: 1, ai: 1,
  generator: 1, generators: 1, tool: 1, tools: 1, free: 1, how: 1, what: 1,
  use: 1, using: 1, like: 1, one: 1, sound: 1, sounds: 1, else: 1, everyone: 1,
  make: 1
};

function tokenize(str) {
  return ((str || "").toLowerCase().match(/[a-z0-9]+/g) || []).filter(
    (t) => t.length > 3 && !STOPWORDS[t]
  );
}

function relatedPrompts(post, library) {
  const postTokens = tokenize(post.title + " " + post.badge + " " + post.description);
  return library
    .map((p) => {
      const set = {};
      tokenize(p.category + " " + p.title + " " + (p.tags || []).join(" ")).forEach((t) => {
        set[t] = true;
      });
      let score = 0;
      postTokens.forEach((t) => {
        if (set[t]) score++;
      });
      return { prompt: p, score };
    })
    .filter((s) => s.score >= 2)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((s) => s.prompt);
}

function relatedPromptCardHtml(item) {
  const url =
    "/library?category=" + encodeURIComponent(item.category) + "&q=" + encodeURIComponent(item.title);
  return (
    '<a class="card" href="' + url + '">' +
      '<span class="badge" style="margin-bottom:8px">' + escapeHtml(item.category) + "</span>" +
      "<h3>" + escapeHtml(item.title) + "</h3>" +
      "<p>" + escapeHtml(item.description) + "</p>" +
    "</a>"
  );
}

/* ---------- page builders ---------- */

function writeIfChanged(filePath, html, label) {
  const existing = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : null;
  if (existing === html) {
    console.log("  unchanged: " + label);
    return false;
  }
  fs.writeFileSync(filePath, html, "utf8");
  console.log("  wrote: " + label);
  return true;
}

function prerenderGrid(relPath, containerId, cardsHtml) {
  const filePath = path.join(ROOT, relPath);
  const html = fs.readFileSync(filePath, "utf8");
  const filled = fillContainer(html, containerId, cardsHtml);
  if (filled === null) {
    throw new Error(
      "Could not find an empty <div id=\"" + containerId + "\"> or existing markers in " + relPath
    );
  }
  writeIfChanged(filePath, filled, relPath + " (#" + containerId + ")");
}

function articleSchema(post) {
  const url = SITE_URL + "/blog/" + post.slug;
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    url: url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: post.published_at,
    dateModified: post.published_at,
    author: { "@type": "Organization", name: "PoloPrompt", url: SITE_URL + "/" },
    publisher: { "@type": "Organization", name: "PoloPrompt", url: SITE_URL + "/" }
  });
}

function prerenderBlogPosts(posts, library) {
  const template = fs.readFileSync(path.join(ROOT, "blog", "post.html"), "utf8");

  posts.forEach((post) => {
    let html = template;
    const url = SITE_URL + "/blog/" + post.slug;

    html = html.replace(
      /<title id="post-title-tag">[\s\S]*?<\/title>/,
      '<title id="post-title-tag">' + escapeHtml(post.title) + " | PoloPrompt</title>"
    );
    html = html.replace(
      /<meta name="description" id="post-meta-description"[^>]*>/,
      '<meta name="description" id="post-meta-description" content="' +
        escapeHtml(post.description) + '">'
    );
    html = html.replace(
      /<link rel="canonical" id="post-canonical"[^>]*>/,
      '<link rel="canonical" id="post-canonical" href="' + url + '">'
    );
    html = html.replace(
      /<span id="post-breadcrumb-title">[\s\S]*?<\/span>/,
      '<span id="post-breadcrumb-title">' + escapeHtml(post.title) + "</span>"
    );
    html = html.replace(
      /<\/head>/,
      '<script type="application/ld+json">\n' + articleSchema(post) + "\n</script>\n</head>"
    );
    html = html.replace(
      /<div class="container prose" id="post-body">[\s\S]*?<\/div>\s*<\/section>/,
      '<div class="container prose" id="post-body" data-prerendered="1">' +
        "<h1>" + escapeHtml(post.title) + "</h1>" +
        post.content_html +
      "</div>\n  </section>"
    );

    const related = relatedPrompts(post, library);
    if (related.length) {
      html = html.replace(
        /<section id="related-prompts-section" hidden>/,
        '<section id="related-prompts-section">'
      );
      const filled = fillContainer(
        html,
        "related-prompts-grid",
        related.map(relatedPromptCardHtml).join("")
      );
      if (filled !== null) html = filled;
    }

    writeIfChanged(path.join(ROOT, "blog", post.slug + ".html"), html, "blog/" + post.slug + ".html");
  });
}

function main() {
  const dataDir = path.join(ROOT, "assets", "js");
  const { PROMPT_LIBRARY } = loadGlobalsFromScript(
    path.join(dataDir, "prompt-library-data.js"),
    ["PROMPT_LIBRARY"]
  );
  const { BLOG_POSTS } = loadGlobalsFromScript(path.join(dataDir, "blog-data.js"), ["BLOG_POSTS"]);
  const { IMAGE_TRENDS } = loadGlobalsFromScript(
    path.join(dataDir, "image-trends-data.js"),
    ["IMAGE_TRENDS"]
  );

  const posts = BLOG_POSTS.slice().sort((a, b) =>
    String(b.published_at).localeCompare(String(a.published_at))
  );

  console.log(
    "Pre-rendering " + PROMPT_LIBRARY.length + " prompts, " + posts.length + " posts, " +
    IMAGE_TRENDS.length + " image styles..."
  );

  prerenderGrid("library.html", "library-grid", PROMPT_LIBRARY.map(promptCardHtml).join(""));
  prerenderGrid("blog.html", "blog-grid", posts.map(blogCardHtml).join(""));
  prerenderGrid(
    "image-library.html",
    "image-trends-grid",
    IMAGE_TRENDS.map(imageTrendCardHtml).join("")
  );
  prerenderGrid("index.html", "image-trends-grid", IMAGE_TRENDS.map(imageTrendCardHtml).join(""));

  prerenderBlogPosts(posts, PROMPT_LIBRARY);

  console.log("Pre-render complete.");
}

main();
