# Trend Log

A running log of the weekly AI-trend research job(s) for PoloPrompt. This branch is **never merged into `main`** and is not deployed — it exists purely as a visibility/audit trail of what each job evaluated and decided.

Each entry: date, job name, the trend/topic evaluated, decision (Promoted/Rejected), a one-line reason, and (if promoted) the PR opened.

---

## 2026-09-25 — Library

- **Trend evaluated:** Miniature diorama / "tiny world" AI photo trend — shrinking any photo (a room, pet, landmark, daily activity) into a physically-accurate miniature diorama, sold with an everyday scale-reference object (coin, matchstick, grain of rice) placed beside it.
- **Decision:** Promoted
- **Reason:** Multiple independent sources (miraflow.ai, perfectcorp.com, aialvin substack, aipromptlibrary.app, botgadgets.com, live TikTok content) confirm it as one of the dominant AI photo formats as of August–September 2026, distinct from the more saturated "AI action figure" trend, with no existing coverage in the library.
- **PR:** https://github.com/parthpatel0517/Poloprompt/pull/2

## 2026-09-25 — Image

- **Trend evaluated:** "AI action figure" / toyification trend — restyling a photo as a boxed collectible action figure in a plastic blister pack on a printed backer card, with small accessories in their own molded tray.
- **Decision:** Promoted
- **Reason:** Confirmed as one of the most widely covered AI image trends of 2026 across multiple independent sources (eWeek, Vanikya, Imagera AI, TechTimes — with reported scale of 890k+ TikTok videos and Pinterest searches up 580% YoY), and not covered by any of the 12 existing entries in `assets/js/image-trends-data.js` (the closest, "3D Animated Character," is a stylized character render, not a packaged toy).
- **PR:** https://github.com/parthpatel0517/Poloprompt/pull/3

## 2026-09-25 — Blog

- **Trend evaluated:** AI image generators finally getting text rendering right — Google's Nano Banana Pro (Gemini 3 Pro Image) and OpenAI's ChatGPT Images 2.5 (shipped Sept 8, 2026) both treat in-image text as symbolic content rather than pixel texture, making legible signs/posters/infographics a realistic AI-first task if prompted correctly.
- **Decision:** Promoted
- **Reason:** Confirmed current via multiple independent sources (OpenAI's own Sept 8, 2026 announcement plus Unite.AI/implicator.ai/MindStudio coverage of ChatGPT Images 2.5; Google's Gemini docs plus DEV Community/apiyi.com/imagine.art/sider.ai prompting guides for Nano Banana Pro's text rendering). Not covered by any existing entry in `assets/js/blog-data.js` or `assets/js/prompt-library-data.js`. Targeted long-tail phrase: "how to get ai image generators to render text correctly."
- **PR:** https://github.com/parthpatel0517/Poloprompt/pull/4

## 2026-10-02 — Image

- **Trend evaluated:** "80s mall studio glamour portrait" AI trend — restyling a selfie with big voluminous feathered hair, soft-focus studio lighting, and a glowing pastel laser-gradient backdrop, part of the broader viral "1980s AI photo" wave.
- **Decision:** Promoted
- **Reason:** Independently confirmed current and viral as of the week of Sept 8–10, 2026 across multiple outlets (Khaleej Times, Business Today, Outlook India, Free Press Journal), spreading globally from Bollywood to UAE/Western creators. Checked against all 13 existing entries in `assets/js/image-trends-data.js` (including the not-yet-merged "AI action figure" entry from PR #3) — no overlap with the existing 90s disposable-camera, Y2K digicam, Vintage Polaroid, or Vaporwave entries. Targeted long-tail phrase: "AI prompt to turn my photo into an 80s mall glamour portrait."
- **PR:** https://github.com/parthpatel0517/Poloprompt/pull/5
