/* Local static server that mimics the clean-URL rules in .htaccess
   (/library -> library.html, /blog/<slug> -> blog/post.html, *.html -> 301 to
   the extension-less URL), so links behave the same as on production.

     npm run dev                                   # front-end against the live API
     LOCAL_API=http://localhost:3000 npm run dev   # front-end against server/ locally

   LOCAL_API rewrites the production API URL in served JS on the fly, so the
   API_BASE constants in the repo never need to be edited for local testing.
   No dependencies — plain Node. PORT defaults to 8080. */
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const PORT = Number(process.env.PORT) || 8080;
const PROD_API = "https://poloprompt-server.onrender.com";
const LOCAL_API = process.env.LOCAL_API || "";

const TYPES = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".json": "application/json",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg",
  ".webp": "image/webp", ".txt": "text/plain; charset=utf-8", ".xml": "application/xml",
};

const isFile = (p) => { try { return fs.statSync(p).isFile(); } catch { return false; } };
const isDir = (p) => { try { return fs.statSync(p).isDirectory(); } catch { return false; } };

function send(res, status, file) {
  const ext = path.extname(file);
  res.writeHead(status, { "Content-Type": TYPES[ext] || "application/octet-stream", "Cache-Control": "no-cache" });
  if (LOCAL_API && ext === ".js") {
    return res.end(fs.readFileSync(file, "utf8").split(PROD_API).join(LOCAL_API));
  }
  fs.createReadStream(file).pipe(res);
}

http.createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");
  let p;
  try { p = decodeURIComponent(url.pathname); } catch { res.writeHead(400); return res.end(); }
  const redirect = (to) => { res.writeHead(301, { Location: to + url.search }); res.end(); };

  if (p === "/index.html") return redirect("/");
  if (p.endsWith(".html") && p !== "/404.html" && !/^\/google[a-z0-9]+\.html$/.test(p)) return redirect(p.slice(0, -5));
  if (p.length > 1 && p.endsWith("/") && isFile(path.join(ROOT, p.slice(0, -1) + ".html"))) return redirect(p.slice(0, -1));

  const abs = path.join(ROOT, p);
  if (abs !== ROOT && !abs.startsWith(ROOT + path.sep)) { res.writeHead(403); return res.end(); }
  if (p === "/") return send(res, 200, path.join(ROOT, "index.html"));
  if (isFile(abs)) return send(res, 200, abs);
  if (isFile(abs + ".html")) return send(res, 200, abs + ".html");
  if (/^\/blog\/[^/]+$/.test(p) && !isDir(abs)) return send(res, 200, path.join(ROOT, "blog/post.html"));
  send(res, 404, path.join(ROOT, "404.html"));
}).listen(PORT, () => {
  console.log(`PoloPrompt site: http://localhost:${PORT}`);
  console.log(LOCAL_API ? `API calls -> ${LOCAL_API}` : `API calls -> ${PROD_API} (set LOCAL_API to use server/ locally)`);
});
