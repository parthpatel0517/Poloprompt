# PoloPrompt Backend

A small Node.js + Express + MySQL API backing the Prompt Library, the Automation Idea
Finder, the Blog, newsletter signups, and the Contact form. The Templates page and
the tool pages themselves stay static HTML — they're navigation, not editorial
content — see "Why not everything?" below.

## Local setup (already done once on this machine)

1. **Database** — XAMPP's MySQL must be running. Then, from `server/`:
   ```
   mysql -u root < sql/schema.sql   # creates the `poloprompt` database + 5 tables
   ```
2. **Config** — copy `.env.example` to `.env` and adjust if your MySQL isn't the
   XAMPP default (root user, no password, port 3306).
3. **Install deps**: `npm install`
4. **Seed the data**: `npm run seed` — reads directly from
   `assets/js/prompt-library-data.js`, `assets/js/automation-ideas-data.js`,
   `assets/js/blog-data.js`, and `assets/js/image-trends-data.js`, so the
   database always starts in sync with what's in the repo. Re-run this any
   time one of those files changes (e.g. after merging a PR from the
   trend-content routines) — merging doesn't update the live database by
   itself.
5. **Run it**: `npm start` → listens on `http://localhost:3000` by default.

## Wiring the front-end to it

These files each have an `API_BASE` constant near the top — set it to wherever this
server is running:

- `assets/js/library.js` — prompt library search/filter
- `assets/js/blog.js` — blog post listing
- `assets/js/blog-post.js` — single blog post (renders by slug from the URL)
- `assets/js/image-trends.js` — homepage "Trending Image Styles" showcase
- `assets/js/tools/ai-automation-idea-finder.js` — automation idea finder
- `assets/js/newsletter.js` — footer newsletter signup (every page)
- `assets/js/tools/contact-form.js` — Contact page form

The prompt library, blog, automation finder, and image trends showcase
**fall back automatically** to their bundled static data files
(`assets/js/prompt-library-data.js`, `assets/js/blog-data.js`,
`assets/js/automation-ideas-data.js`, `assets/js/image-trends-data.js`) if the
API is unreachable — so the site keeps working even if this backend isn't deployed or
is temporarily down. The newsletter and contact forms don't have a static
fallback (there's nowhere for that data to go without a backend) — they show an
honest "not connected yet" message instead of failing silently.

## API reference

| Method | Path                       | Body / Query                              | Notes |
|--------|----------------------------|--------------------------------------------|-------|
| GET    | `/api/prompts`             | —                                          | Full library; site filters locally |
| GET    | `/api/blog-posts`          | —                                          | List for the /blog index page |
| GET    | `/api/blog-posts/:slug`    | —                                          | Single post, rendered by `blog/post.html` |
| GET    | `/api/image-trends`        | —                                          | Homepage "Trending Image Styles" showcase |
| GET    | `/api/automation-ideas`    | `?industry=X&goal=Y`                       | Falls back to the industry's generic ideas if no exact match |
| POST   | `/api/newsletter`          | `{ email, sourcePage? }`                   | Upserts by email |
| POST   | `/api/contact`             | `{ name?, email, reason, message }`        | `reason` is `"help"` or `"support"` |

## Deploying this to Hostinger

This was built for local development/testing first. To put it live alongside
poloprompt.com:

1. **Check whether your Hostinger plan supports Node.js hosting.** In hPanel,
   look for a "Node.js" section under your website's tools (separate from the
   PHP/HTML site type you're currently using). Not all shared hosting tiers
   include it — if yours doesn't, you'd need to either upgrade, or host this
   API elsewhere (e.g. Railway, Render — both have free tiers) while the static
   site stays on Hostinger, pointing `API_BASE` at that external URL instead.
2. **Database**: Hostinger's shared MySQL (available in hPanel → Databases)
   works the same way — just run `sql/schema.sql` against it via phpMyAdmin,
   update `.env` with those real credentials, and re-run `npm run seed`.
3. **CORS**: set `CORS_ORIGIN` in `.env` to `https://poloprompt.com` (not
   `localhost`) once live.
4. Update the four `API_BASE` constants in the front-end files to the real
   deployed API URL, then re-upload those files.

## Why not everything is in the database

The Prompt Library, Automation Idea Finder, and Blog are all database-driven —
structured content rendered client-side via JavaScript, with a static bundled
fallback for resilience if the API is down.

**The pre-render step exists because pure client-side rendering wasn't enough.**
When the Blog first moved from static HTML files to JS-fetched database content,
this section warned that content missing from the initial page source is a real
SEO risk. That risk landed: AdSense rejected the site for "low value content"
while a 1,200-word blog post was showing crawlers ~190 words of nav and footer,
and the Prompt Library's 66 entries were an empty `<div>`.

The fix is `npm run prerender` (see the root `package.json` and
`scripts/prerender.js`), which bakes the same markup the front-end JS produces
directly into the HTML — per-post files at `blog/<slug>.html`, plus the card
grids on `library.html`, `blog.html`, `image-library.html`, and `index.html`.
The JS still runs and hydrates on top for search, filtering, and pagination, so
behavior is unchanged for visitors while crawlers get the real content. Because
Hostinger deploys the repo as-is with no build step, the generated HTML is
committed to the repo.

**This means data changes now need two commands, not one:** `npm run seed` in
`server/` to update the live database, and `npm run prerender` from the repo
root to regenerate the HTML. Run both after merging a trend-content PR, or the
site and the database drift apart.

The **six tool generator pages** stay static HTML.
They're navigation/UI, not editorial content with a "source of truth" worth
storing centrally — there's nothing meaningful to gain from moving them.
