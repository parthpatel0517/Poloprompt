# PoloPrompt Backend

A small Node.js + Express + MySQL API backing the Prompt Library, the Automation Idea
Finder, newsletter signups, and the Contact form. Everything else on the site (blog
posts, all other pages) stays static HTML — see "Why not everything?" below.

## Local setup (already done once on this machine)

1. **Database** — XAMPP's MySQL must be running. Then, from `server/`:
   ```
   mysql -u root < sql/schema.sql   # creates the `poloprompt` database + 4 tables
   ```
2. **Config** — copy `.env.example` to `.env` and adjust if your MySQL isn't the
   XAMPP default (root user, no password, port 3306).
3. **Install deps**: `npm install`
4. **Seed the data**: `npm run seed` — reads directly from
   `assets/js/prompt-library-data.js` and `assets/js/automation-ideas-data.js`,
   so the database always starts in sync with what's in the repo.
5. **Run it**: `npm start` → listens on `http://localhost:3000` by default.

## Wiring the front-end to it

Three files each have an `API_BASE` (or `NEWSLETTER_ENDPOINT`-style) constant near
the top — set it to wherever this server is running:

- `assets/js/library.js` — prompt library search/filter
- `assets/js/tools/ai-automation-idea-finder.js` — automation idea finder
- `assets/js/newsletter.js` — footer newsletter signup (every page)
- `assets/js/tools/contact-form.js` — Contact page form

The prompt library and automation finder **fall back automatically** to their
bundled static data files if the API is unreachable — so the site keeps working
even if this backend isn't deployed or is temporarily down. The newsletter and
contact forms don't have a static fallback (there's nowhere for that data to go
without a backend) — they show an honest "not connected yet" message instead of
failing silently.

## API reference

| Method | Path                    | Body / Query                              | Notes |
|--------|-------------------------|--------------------------------------------|-------|
| GET    | `/api/prompts`          | —                                          | Full library; site filters locally |
| GET    | `/api/automation-ideas` | `?industry=X&goal=Y`                       | Falls back to the industry's generic ideas if no exact match |
| POST   | `/api/newsletter`       | `{ email, sourcePage? }`                   | Upserts by email |
| POST   | `/api/contact`          | `{ name?, email, reason, message }`        | `reason` is `"help"` or `"support"` |

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

You asked to move "all page data" server-side. The Prompt Library and Automation
Idea Finder are genuinely well-suited to this — structured, searchable data that's
already rendered client-side via JavaScript either way, so moving its source from
a bundled file to an API call changes nothing about how Google sees the page.

The **blog posts** were deliberately left as static HTML. They're full-content
pages where the text is already in the initial page source — exactly what search
engines want. Serving them from a database via a JS fetch would mean the content
isn't present until after a script runs, which can hurt indexing unless paired
with server-side rendering (a much bigger, separate project). Static HTML is
simply the better tool for that job here.
