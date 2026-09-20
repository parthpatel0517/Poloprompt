/* PoloPrompt — static prompt library dataset. Original prompts, no external source content. */
var PROMPT_LIBRARY = [

  // ---------- Marketing & Ads ----------
  {
    id: "mkt-facebook-ad-launch",
    category: "Marketing & Ads",
    title: "Facebook Ad Copy for a Product Launch",
    description: "Three ad variations for launching a new product on Meta, each with a different hook angle.",
    tags: ["facebook", "meta ads", "launch", "copywriting"],
    prompt: "You are a senior direct-response copywriter. Write 3 distinct Facebook/Instagram feed ad variations announcing the launch of [PRODUCT NAME], a [ONE-SENTENCE PRODUCT DESCRIPTION] for [TARGET AUDIENCE]. Each variation must use a different hook angle: (1) a bold claim, (2) a relatable pain point, (3) a curiosity gap. For each variation, provide a primary text (max 125 words), a headline (under 40 characters), and a description line (under 30 characters). Avoid generic phrases like 'game-changer' or 'unlock.' End each with a specific call-to-action, not a vague 'Learn more.'"
  },
  {
    id: "mkt-google-search-ads",
    category: "Marketing & Ads",
    title: "Google Search Ads Headline & Description Set",
    description: "A full set of keyword-relevant headlines and descriptions ready for a Google Search campaign.",
    tags: ["google ads", "ppc", "search"],
    prompt: "You are a PPC specialist. For the product/service [PRODUCT/SERVICE NAME + ONE-LINE DESCRIPTION], targeting the keyword '[TARGET KEYWORD]', write: 5 headlines (max 30 characters each, no repeats), 3 description lines (max 90 characters each), and 2 sitelink extension ideas with 25-character descriptions. Every headline must include a distinct value proposition or urgency trigger. Do not use exclamation points more than once total across all assets."
  },
  {
    id: "mkt-competitor-comparison",
    category: "Marketing & Ads",
    title: "Competitor Comparison Landing Page Copy",
    description: "Persuasive but fair comparison copy positioning your product against a named competitor.",
    tags: ["landing page", "positioning", "comparison"],
    prompt: "You are a positioning strategist. Write landing page copy comparing [YOUR PRODUCT] to [COMPETITOR NAME] for a buyer who is already considering both. Structure: a headline naming the real decision the buyer faces (not just 'X vs Y'), a 3-column feature comparison table (list at least 6 real differentiators), an objection-handling section addressing the top reason people hesitate to switch, and a closing CTA. Keep every comparison factual and specific — no vague superiority claims like 'the best choice.'"
  },
  {
    id: "mkt-cold-email-b2b",
    category: "Marketing & Ads",
    title: "Cold B2B Outreach Email",
    description: "A short, personalized-feeling cold email template for B2B sales outreach.",
    tags: ["cold email", "b2b", "sales"],
    prompt: "You are an SDR who writes cold emails with above-average reply rates. Write a cold outreach email introducing [YOUR PRODUCT/SERVICE] to [TARGET ROLE, e.g. 'VP of Operations'] at companies dealing with [SPECIFIC PROBLEM]. Requirements: under 100 words, one clear and specific value proposition (not a feature list), no attachments/links mentioned, ends with a low-friction question (not 'let's hop on a call'). Do not use the words 'synergy,' 'revolutionize,' or 'excited to announce.'"
  },
  {
    id: "mkt-retargeting-ad-copy",
    category: "Marketing & Ads",
    title: "Retargeting Ad Copy for Website Visitors Who Didn't Convert",
    description: "Ad copy aimed at warm visitors who viewed a page but left without buying or signing up.",
    tags: ["retargeting", "meta ads", "conversion"],
    prompt: "You are a direct-response copywriter specializing in retargeting campaigns. Write 2 retargeting ad variations for [PRODUCT/SERVICE] targeting people who viewed [SPECIFIC PAGE, e.g. 'the pricing page' or 'a product page'] but didn't convert. Variation 1 should address the most likely objection that stalled them ([OBJECTION, e.g. price, trust, timing]). Variation 2 should use a specific, time-bound incentive to prompt action now. Each needs a primary text (under 90 words) and a headline (under 40 characters). Do not open with 'Still thinking about...' or 'Don't miss out' — find a more specific angle referencing what they actually looked at."
  },
  {
    id: "mkt-ugc-testimonial-script",
    category: "Marketing & Ads",
    title: "UGC-Style Testimonial Video Script",
    description: "A natural-sounding script for a customer testimonial or UGC-style ad, avoiding scripted-sounding lines.",
    tags: ["ugc", "testimonial", "video script"],
    prompt: "You are a UGC ad strategist. Write a 30-45 second testimonial-style video script for [PRODUCT/SERVICE], spoken from the perspective of a real customer who had [SPECIFIC PROBLEM] before finding it. Structure: an opening line that states the problem in a relatable, unscripted way (not 'I used to struggle with...'), a specific moment describing what changed, one concrete result or detail (a number, a timeframe, a comparison), and a natural closing line — not a hard sales pitch. Write it the way an actual person talks, including a small imperfection or aside, not polished marketing copy."
  },

  // ---------- E-commerce ----------
  {
    id: "ecom-amazon-listing",
    category: "E-commerce",
    title: "Amazon Listing: Title, Bullets & Backend Keywords",
    description: "A complete Amazon-ready listing structured to Amazon's title, bullet, and backend keyword conventions.",
    tags: ["amazon", "listing", "seo"],
    prompt: "You are an Amazon listing optimization specialist. For the product [PRODUCT NAME + CORE MATERIAL/FEATURE], write: a keyword-rich title (Brand + Product + Key Feature + Size/Quantity, under 200 characters), exactly 5 bullet points (each starting with a benefit in capital letters), a short description paragraph, and 6 backend search terms (comma-separated, no words repeated from the title). Do not make any claim (organic, certified, patented) unless I explicitly state it applies."
  },
  {
    id: "ecom-abandoned-cart-email",
    category: "E-commerce",
    title: "Abandoned Cart Recovery Email Sequence",
    description: "A 3-email sequence to win back customers who left items in their cart.",
    tags: ["email", "cart recovery", "retention"],
    prompt: "You are an e-commerce lifecycle marketer. Write a 3-email abandoned cart recovery sequence for [STORE NAME], selling [PRODUCT CATEGORY]. Email 1 (sent 1 hour after abandonment): a friendly reminder, no discount. Email 2 (sent 24 hours later): address a likely objection (shipping cost, sizing, etc.) and include social proof. Email 3 (sent 48 hours later): a time-limited discount code as a last nudge. Each email needs a subject line, preview text, and body under 120 words. Keep the tone helpful, never guilt-tripping."
  },
  {
    id: "ecom-shopify-brand-voice",
    category: "E-commerce",
    title: "Shopify Product Page in a Custom Brand Voice",
    description: "Product page copy written to match a specific brand personality you define.",
    tags: ["shopify", "brand voice", "product page"],
    prompt: "You are a brand copywriter. Write Shopify product page copy for [PRODUCT NAME + FEATURE] in a brand voice best described as [3 ADJECTIVES, e.g. 'playful, direct, a little irreverent']. Include: an SEO title under 70 characters, a 2-3 sentence hero description, 4 short feature bullets, and a meta description under 155 characters. The voice should be consistent and specific enough that a reader could recognize the brand from the writing style alone, not generic 'friendly and professional' copy."
  },
  {
    id: "ecom-review-response",
    category: "E-commerce",
    title: "Response Templates for Negative Product Reviews",
    description: "Professional, de-escalating responses to a 1-2 star review, tailored to the specific complaint.",
    tags: ["customer service", "reviews", "reputation"],
    prompt: "You are a customer experience manager. A customer left this review: \"[PASTE REVIEW TEXT]\". Write a public response that: acknowledges the specific issue raised (not a generic apology), avoids sounding defensive or scripted, offers one concrete next step (refund, replacement, or contact channel), and stays under 80 words. Do not admit fault for anything not stated in the review, and do not use the phrase 'we take this very seriously.'"
  },
  {
    id: "ecom-etsy-listing",
    category: "E-commerce",
    title: "Etsy Listing Title, Tags & Description",
    description: "An Etsy-ready listing formatted for Etsy's search algorithm and handmade/vintage buyer expectations.",
    tags: ["etsy", "listing", "handmade"],
    prompt: "You are an Etsy SEO specialist. For the item [PRODUCT NAME + MATERIALS/STYLE + WHO IT'S FOR], write: a keyword-front-loaded title (under 140 characters, most important keyword first), exactly 13 tags (multi-word phrases, no single generic words, no repeats of title words), and a description that opens with a 2-sentence hook, followed by materials/dimensions/care instructions, and a closing line about processing/shipping. Keep the tone warm and personal, matching how independent sellers actually write — not corporate retail copy."
  },
  {
    id: "ecom-product-comparison-chart",
    category: "E-commerce",
    title: "Product Comparison Chart for a 'Which One Should I Buy' Page",
    description: "Comparison copy helping shoppers choose between several of your own product variants, not a competitor.",
    tags: ["product page", "comparison", "buying guide"],
    prompt: "You are an e-commerce UX copywriter. I sell [NUMBER] variants of [PRODUCT CATEGORY]: [LIST VARIANT NAMES + KEY DIFFERENCE OF EACH]. Write copy for a 'Which one should I buy' comparison section: a one-sentence summary of who each variant is best for, a comparison table with at least 5 real differentiating attributes (not just price), and a short 'still not sure?' paragraph recommending the safest default choice for an undecided buyer. Keep every claim specific and checkable — no vague language like 'great for everyone.'"
  },

  // ---------- SEO & Content ----------
  {
    id: "seo-blog-outline",
    category: "SEO & Content",
    title: "SEO Blog Post Outline with Search Intent Alignment",
    description: "A full heading structure and word-count plan built around a target keyword and search intent.",
    tags: ["seo", "content strategy", "outline"],
    prompt: "You are an SEO content strategist. Build a complete outline for a blog post targeting the keyword '[TARGET KEYWORD]' with [INFORMATIONAL/COMMERCIAL/TRANSACTIONAL] search intent, targeting [WORD COUNT] words total. Include: an SEO title tag (under 60 characters), a meta description (under 155 characters), an H1, and a full H2/H3 structure with a one-line note under each heading describing exactly what it should cover and its approximate word count. Every H2 must promise something specific — no generic labels like 'Benefits of X.'"
  },
  {
    id: "seo-content-refresh",
    category: "SEO & Content",
    title: "Content Refresh Audit for an Underperforming Page",
    description: "A structured audit prompt to diagnose why an existing article isn't ranking and what to fix.",
    tags: ["content audit", "seo", "refresh"],
    prompt: "You are an SEO auditor. I will paste the full text of an existing article below, targeting the keyword '[TARGET KEYWORD]'. Analyze it and return: (1) gaps versus what a searcher with this query intent actually wants answered, (2) sections that are outdated, redundant, or too shallow, (3) 3-5 specific rewrite recommendations with example replacement copy for the weakest section, and (4) 2-3 internal linking opportunities based on typical related topics. Article: [PASTE ARTICLE TEXT]"
  },
  {
    id: "seo-faq-schema",
    category: "SEO & Content",
    title: "FAQ Section Written for Featured Snippets",
    description: "5 FAQ question/answer pairs structured to compete for Google's featured snippet position.",
    tags: ["faq", "featured snippet", "seo"],
    prompt: "You are an SEO content writer specializing in featured snippets. For the topic '[TOPIC/KEYWORD]', write 5 FAQ question-and-answer pairs. Each question should match real search phrasing (start with 'What,' 'How,' 'Why,' or 'Can'). Each answer must lead with a direct, complete answer in the first sentence (40-60 words, snippet-length), then 1-2 sentences of supporting detail. Do not bury the answer after a preamble like 'Great question!' or 'This depends on several factors.'"
  },
  {
    id: "seo-newsletter-repurpose",
    category: "SEO & Content",
    title: "Repurpose a Blog Post into an Email Newsletter",
    description: "Converts long-form blog content into a scannable email format without losing the core value.",
    tags: ["repurposing", "email", "newsletter"],
    prompt: "You are a content repurposing specialist. I will paste a blog post below. Rewrite it as an email newsletter issue: a subject line under 50 characters, a one-sentence preview text, and a body using short paragraphs (2-3 sentences max), one clear takeaway bolded per section, and a single CTA at the end. Keep the core insights intact but cut anything that only makes sense in a long-form SEO context (keyword repetition, meta commentary). Blog post: [PASTE BLOG POST TEXT]"
  },
  {
    id: "seo-listicle-outline",
    category: "SEO & Content",
    title: "Listicle Article Outline (e.g. '10 Best X for Y')",
    description: "A structured outline for a listicle-style article, including entry format and ranking rationale.",
    tags: ["listicle", "outline", "seo"],
    prompt: "You are an SEO content strategist. Build an outline for a listicle titled around '[NUMBER] Best [ITEMS] for [SPECIFIC USE CASE/AUDIENCE]', targeting the keyword '[TARGET KEYWORD]'. Include: a title and meta description optimized for click-through (not just keyword-stuffed), an intro outline (2-3 sentences establishing selection criteria), and for each list entry: a one-line note on what makes it distinct, the specific criteria it should be judged on, and roughly how many words to spend on it. End with a short buyer's guide section covering how to choose, not just another summary of the list."
  },
  {
    id: "seo-internal-linking",
    category: "SEO & Content",
    title: "Internal Linking Plan for an Existing Article",
    description: "Suggests contextual internal links to strengthen an existing page's SEO without forcing unnatural links.",
    tags: ["internal linking", "seo", "site structure"],
    prompt: "You are an SEO strategist focused on site architecture. I'll paste the text of an article targeting '[TARGET KEYWORD]' below, along with a list of other pages on my site: [LIST OTHER PAGE TITLES + URLS + ONE-LINE TOPIC EACH]. Identify 3-5 places in the article where a link to one of those other pages would be genuinely useful to the reader (not forced), suggest natural anchor text for each (never generic 'click here'), and flag if the article is missing an obvious topic that deserves its own linked page. Article: [PASTE ARTICLE TEXT]"
  },

  // ---------- Social Media ----------
  {
    id: "social-reel-hooks",
    category: "Social Media",
    title: "5 Hook Options for a Short-Form Video",
    description: "Five distinct opening lines for a Reel/TikTok/Short, each using a different attention-grabbing angle.",
    tags: ["reels", "tiktok", "hooks"],
    prompt: "You are a short-form video scriptwriter. For a video about [TOPIC], write 5 opening hook lines (the first thing said or shown on screen), each using a genuinely different angle: a bold claim, a relatable pain point, a curiosity gap, a specific number/stat, and a direct question to the viewer. Each hook must reference something concrete, not an abstract statement. Label each with its angle."
  },
  {
    id: "social-linkedin-thought-leadership",
    category: "Social Media",
    title: "LinkedIn Thought Leadership Post",
    description: "A professional but conversational LinkedIn post sharing an opinion or lesson learned.",
    tags: ["linkedin", "thought leadership", "b2b"],
    prompt: "You are a LinkedIn ghostwriter for [YOUR ROLE/INDUSTRY, e.g. 'a marketing agency founder']. Write a LinkedIn post sharing a specific lesson learned from [BRIEF SITUATION/EXPERIENCE]. Structure: a one-line hook that states an opinion or surprising result, 3-4 short paragraphs or line-broken points expanding on it with a concrete example, and a closing line inviting discussion (a genuine question, not 'thoughts?'). Keep total length under 200 words. No hashtags inline — up to 3 at the very end only if relevant."
  },
  {
    id: "social-instagram-carousel",
    category: "Social Media",
    title: "Instagram Carousel Script (Slide by Slide)",
    description: "A slide-by-slide script for an educational Instagram carousel post.",
    tags: ["instagram", "carousel", "education"],
    prompt: "You are a content designer who writes high-saving Instagram carousels. Create a slide-by-slide script (7-9 slides) teaching [TOPIC] to [TARGET AUDIENCE]. Slide 1 is the cover with a specific, curiosity-driven title (not generic like '5 Tips for X'). Each middle slide should cover exactly one idea in under 20 words of on-screen text, with a short speaker-note explaining what visual would support it. The final slide should have a clear CTA (save, follow, or comment a specific word)."
  },
  {
    id: "social-brand-voice-guide",
    category: "Social Media",
    title: "Social Media Brand Voice Guide",
    description: "A reusable one-page voice guide so multiple people can post consistently in your brand's tone.",
    tags: ["brand voice", "style guide", "team"],
    prompt: "You are a brand strategist. Create a one-page social media voice guide for [BRAND NAME], a [BRIEF BRAND DESCRIPTION] targeting [AUDIENCE]. Include: 3 tone adjectives with a one-sentence definition of what each means in practice, a 'do' and 'don't' example sentence for each adjective, a list of 5 words/phrases the brand should never use, and 3 example captions (different post types) written fully in this voice. This should be usable by a new team member with no other context."
  },
  {
    id: "social-twitter-thread",
    category: "Social Media",
    title: "X/Twitter Thread Breaking Down One Idea",
    description: "A multi-tweet thread structured to hook readers on tweet one and keep them reading to the end.",
    tags: ["twitter", "x", "thread"],
    prompt: "You are a writer known for X/Twitter threads that get read to the end. Write a 6-8 tweet thread explaining [TOPIC/IDEA] to [TARGET AUDIENCE]. Tweet 1 must be a hook that creates a specific curiosity gap or states a contrarian claim (no 'Here's a thread on X 🧵'). Each following tweet should cover exactly one point, under 280 characters, ending on a small cliffhanger or logical next question where possible. The final tweet should summarize the core takeaway in one line and end with a specific engagement prompt (not 'thoughts?' or 'RT if you agree')."
  },
  {
    id: "social-youtube-shorts-script",
    category: "Social Media",
    title: "YouTube Shorts Script With On-Screen Text Cues",
    description: "A 30-45 second vertical video script with spoken lines and on-screen text timed to match.",
    tags: ["youtube shorts", "video script", "vertical video"],
    prompt: "You are a short-form video scriptwriter. Write a 30-45 second YouTube Shorts script teaching or explaining [TOPIC] to [TARGET AUDIENCE]. Format as two columns per line: SPOKEN (what's said aloud) and ON-SCREEN TEXT (short punchy text overlay, under 6 words, that reinforces but doesn't just repeat the spoken line). Open with a hook in the first 2 seconds that a viewer would stop scrolling for. End with a one-line CTA that fits the platform (comment a word, follow for part 2, etc.), not a generic 'like and subscribe.'"
  },

  // ---------- Email Marketing ----------
  {
    id: "email-welcome-sequence",
    category: "Email Marketing",
    title: "3-Email Welcome Sequence for New Subscribers",
    description: "An onboarding email sequence that builds trust before making any sales pitch.",
    tags: ["welcome sequence", "onboarding", "email"],
    prompt: "You are an email marketing strategist. Write a 3-email welcome sequence for new subscribers of [BRAND/PRODUCT], a [ONE-LINE DESCRIPTION]. Email 1 (immediate): deliver on whatever was promised to get the signup, and set expectations for what's next. Email 2 (day 2): share the single most useful piece of value you can give for free, no pitch. Email 3 (day 4): introduce the paid offer, framed around the problem established in the previous emails. Each email needs a subject line and body under 150 words."
  },
  {
    id: "email-re-engagement",
    category: "Email Marketing",
    title: "Win-Back Email for Inactive Subscribers",
    description: "A re-engagement email for a list segment that hasn't opened emails in a while.",
    tags: ["re-engagement", "win-back", "email"],
    prompt: "You are a retention email specialist. Write a win-back email for subscribers of [BRAND/PRODUCT] who haven't opened an email in [TIMEFRAME, e.g. '90 days']. The email should: acknowledge the gap without guilt-tripping, remind them specifically what value they signed up for (not a generic 'we miss you'), give one clear reason to re-engage now, and include a one-click way to opt out gracefully if they're no longer interested. Subject line under 50 characters, body under 100 words."
  },
  {
    id: "email-product-update",
    category: "Email Marketing",
    title: "Product Update Announcement Email",
    description: "An email announcing a new feature or product update, framed around customer benefit not feature list.",
    tags: ["product update", "announcement", "email"],
    prompt: "You are a product marketing writer. Write an email announcing [NEW FEATURE/UPDATE] for [PRODUCT NAME]. Lead with the specific problem or friction this solves for the customer, not a feature description. Include: a subject line focused on the benefit, a 2-sentence opening explaining what changed, a short section on how to start using it, and a CTA. Avoid 'we're excited to announce' — open with the customer's problem instead."
  },
  {
    id: "email-cold-followup",
    category: "Email Marketing",
    title: "Follow-Up Email After No Response to a Cold Email",
    description: "A short, non-needy follow-up for a prospect who didn't reply to the first outreach email.",
    tags: ["follow-up", "cold email", "b2b"],
    prompt: "You are an SDR writing a follow-up to a cold email that got no response. Write a short follow-up email (under 60 words) to [TARGET ROLE] regarding [ORIGINAL OFFER/PRODUCT], sent [TIMEFRAME, e.g. '4 days'] after the first email. It should not restate the full original pitch, should not open with 'Just following up' or 'Circling back,' should add one small new piece of information or angle not in the first email, and should end with an easy yes/no question rather than asking for a call."
  },
  {
    id: "email-loyalty-program-launch",
    category: "Email Marketing",
    title: "VIP/Loyalty Program Launch Announcement Email",
    description: "An email introducing a new loyalty or rewards program to existing customers.",
    tags: ["loyalty program", "announcement", "retention"],
    prompt: "You are an e-commerce lifecycle marketer. Write a launch email announcing a new loyalty/VIP program called [PROGRAM NAME] for [BRAND NAME]'s existing customers. Include: a subject line that leads with the specific benefit (not 'Introducing our new rewards program'), a 2-sentence explanation of how earning points/tiers works, 3 concrete examples of rewards members can redeem, and a note that past purchases already count toward their first reward (if true) to create instant momentum. Keep it under 130 words and avoid the phrase 'we're excited to launch.'"
  },

  // ---------- Business & Productivity ----------
  {
    id: "biz-meeting-summary",
    category: "Business & Productivity",
    title: "Turn Rough Meeting Notes into a Clean Summary",
    description: "Converts messy notes or a transcript into a structured summary with clear action items.",
    tags: ["meeting notes", "summary", "productivity"],
    prompt: "You are an executive assistant skilled at distilling meetings into action. I will paste rough notes or a transcript below. Produce: a 2-3 sentence summary of the meeting's purpose and outcome, a bulleted list of key decisions made, and a table of action items with owner and due date (mark 'TBD' if not stated — do not invent names or dates). Keep it under half a page. Notes: [PASTE NOTES/TRANSCRIPT]"
  },
  {
    id: "biz-swot-analysis",
    category: "Business & Productivity",
    title: "SWOT Analysis for a Business Decision",
    description: "A structured SWOT analysis to support a specific business decision you're weighing.",
    tags: ["swot", "strategy", "decision-making"],
    prompt: "You are a business strategy consultant. I'm considering [SPECIFIC DECISION, e.g. 'expanding into a new product category']. Context: [RELEVANT BACKGROUND — company size, market, current situation]. Produce a SWOT analysis with 3-4 specific, non-generic points per quadrant (Strengths, Weaknesses, Opportunities, Threats), each grounded in the context I gave rather than generic business truisms. End with a one-paragraph recommendation stating the single biggest factor that should decide this."
  },
  {
    id: "biz-job-description",
    category: "Business & Productivity",
    title: "Job Description That Attracts the Right Candidates",
    description: "A job posting written to filter for fit, not just list generic responsibilities.",
    tags: ["hiring", "job description", "recruiting"],
    prompt: "You are a recruiting specialist. Write a job description for a [ROLE TITLE] at [COMPANY TYPE/SIZE], reporting to [MANAGER ROLE]. Include: a 2-sentence role summary focused on the outcome this person owns (not a title restatement), 5-6 specific responsibilities (avoid vague ones like 'other duties as assigned'), a 'you'll be a good fit if' section with 4 concrete traits/experiences, and what's explicitly NOT required (to reduce candidate self-selection out). Keep the tone direct, not corporate-generic."
  },
  {
    id: "biz-client-proposal",
    category: "Business & Productivity",
    title: "Client Proposal Outline for a Service Business",
    description: "A structured proposal outline to send a prospective client after a discovery call.",
    tags: ["proposal", "sales", "freelance"],
    prompt: "You are a consultant who writes proposals with a high close rate. Build a proposal outline for [SERVICE OFFERED] for a client whose stated problem is [CLIENT'S PROBLEM FROM DISCOVERY CALL]. Structure: a 'Understanding Your Situation' section that restates their problem specifically (proving you listened), a 'Proposed Approach' section broken into 3 phases with a one-line outcome per phase, a timeline, and pricing presented as an investment tied to the outcome, not a line-item list of hours. Do not include filler sections like generic 'About Us' boilerplate."
  },
  {
    id: "biz-okr-planning",
    category: "Business & Productivity",
    title: "Quarterly OKR Draft for a Team or Department",
    description: "A structured Objectives and Key Results draft based on a stated goal and current constraints.",
    tags: ["okr", "goal-setting", "planning"],
    prompt: "You are an operations strategist experienced in OKR planning. For the [TEAM/DEPARTMENT NAME], whose top priority this quarter is [PRIORITY/GOAL], draft 2-3 Objectives, each with 2-3 measurable Key Results. Every Key Result must be a number or a clearly verifiable binary outcome (not 'improve X' or 'increase awareness'). Ground every objective in the stated priority and current context: [RELEVANT CONSTRAINTS, e.g. team size, budget, timeline]. Flag any objective that seems unrealistic given the constraints instead of writing an aspirational one anyway."
  },
  {
    id: "biz-performance-review",
    category: "Business & Productivity",
    title: "Performance Review Draft From Manager Notes",
    description: "Turns rough manager notes about an employee into a structured, specific performance review draft.",
    tags: ["performance review", "management", "hr"],
    prompt: "You are an experienced manager writing a fair, specific performance review. I'll paste rough notes about [EMPLOYEE ROLE]'s performance this review period below. Write a review draft with sections for: key accomplishments (tied to specific outcomes, not general praise), one or two genuine areas for growth (framed constructively, not vague), and 2-3 concrete goals for next period. Do not invent accomplishments or issues not present in my notes, and avoid corporate-review clichés like 'team player' or 'exceeds expectations' without specifics attached. Notes: [PASTE MANAGER NOTES]"
  },

  // ---------- Customer Support ----------
  {
    id: "support-macro-refund",
    category: "Customer Support",
    title: "Refund Request Response Templates",
    description: "Response templates for approving and for declining a refund request, both keeping the customer relationship intact.",
    tags: ["support", "refund", "templates"],
    prompt: "You are a customer support lead. Write two response templates to a refund request for [PRODUCT/SERVICE]: one for when the refund is APPROVED, and one for when the policy means it must be DECLINED. Both should: acknowledge the specific reason given, avoid sounding like a form letter, and end with a genuine next step. The decline version should offer one alternative (partial credit, extension, etc.) if one exists, and must not sound punitive."
  },
  {
    id: "support-knowledge-base-article",
    category: "Customer Support",
    title: "Knowledge Base Article from a Support Ticket Pattern",
    description: "Turns a recurring support question into a clear, scannable help center article.",
    tags: ["knowledge base", "help center", "documentation"],
    prompt: "You are a technical writer for a support knowledge base. Customers keep asking: '[COMMON QUESTION OR PROBLEM]'. Write a help center article that: has a title matching how a customer would actually search for this, opens with a one-sentence direct answer, then a numbered step-by-step solution (only as many steps as truly needed), and a short 'If this doesn't work' section for the most likely edge case. Avoid marketing language entirely — this should read like clear instructions, not copy."
  },
  {
    id: "support-tone-deescalation",
    category: "Customer Support",
    title: "De-escalation Response for an Angry Customer",
    description: "A calm, non-defensive response template for a customer who is frustrated or upset.",
    tags: ["de-escalation", "support", "tone"],
    prompt: "You are a customer support specialist trained in de-escalation. A customer wrote: '[PASTE CUSTOMER MESSAGE]'. Write a response that: opens by naming their specific frustration (not a generic 'I'm sorry you feel that way'), takes ownership of what's actually the company's responsibility without over-apologizing, states one concrete next action with a timeframe, and closes without sounding scripted. Do not use corporate phrases like 'we value your feedback' or 'your satisfaction is our priority.'"
  },
  {
    id: "support-live-chat-macros",
    category: "Customer Support",
    title: "Live Chat Macro Set for Common Support Scenarios",
    description: "A set of ready-to-use live chat response macros for the most frequent support scenarios.",
    tags: ["live chat", "macros", "support"],
    prompt: "You are a support team lead building a live chat macro library. For [PRODUCT/SERVICE], write 5 short macro responses (under 40 words each) for these scenarios: (1) order/service delay apology with next step, (2) how to reset a password or access account, (3) requesting more information before troubleshooting, (4) escalating to a human/specialist, (5) closing a resolved conversation. Each macro should sound like a real person typed it in the moment, with room to insert specific details in [BRACKETS], not like a canned form response."
  },
  {
    id: "support-churn-save",
    category: "Customer Support",
    title: "Cancellation Save Offer Response",
    description: "A response for when a customer requests to cancel, offering a genuine alternative before processing it.",
    tags: ["churn", "retention", "cancellation"],
    prompt: "You are a customer retention specialist. A customer has requested to cancel [PRODUCT/SERVICE], citing [STATED REASON, e.g. 'too expensive' or 'not using it enough']. Write a response that: acknowledges their specific reason without being pushy, offers exactly one relevant alternative (downgrade, pause, discount, or added support) matched to that reason, and makes clear the cancellation will be processed immediately and without friction if they'd still rather proceed. Do not guilt-trip, and do not offer more than one save attempt in this message."
  },

  // ---------- Automation & Workflow ----------
  {
    id: "auto-zapier-lead-routing",
    category: "Automation & Workflow",
    title: "Lead Routing Automation Blueprint",
    description: "A step-by-step automation plan for routing new leads to the right person automatically.",
    tags: ["zapier", "make.com", "lead routing"],
    prompt: "You are a marketing operations consultant. Design a lead-routing automation for a team where new leads come from [LEAD SOURCE, e.g. 'a Typeform on the pricing page'] and need to reach the right salesperson based on [ROUTING LOGIC, e.g. 'company size or territory']. Output: a numbered trigger-to-action sequence naming specific tools (Zapier, Make.com, CRM, Slack), the exact condition/filter logic needed at each branching point, and one failure-mode to watch for (e.g. duplicate leads, missing fields) with a suggested safeguard."
  },
  {
    id: "auto-onboarding-checklist",
    category: "Automation & Workflow",
    title: "Automated Client Onboarding Checklist Builder",
    description: "A blueprint for automating the repetitive parts of onboarding a new client or employee.",
    tags: ["onboarding", "automation", "checklist"],
    prompt: "You are an operations consultant. Design an automation that triggers when [TRIGGER EVENT, e.g. 'a new client signs a contract in HelloSign'] and handles the repetitive onboarding tasks for [CONTEXT: new client / new employee / new user]. List each task that should be automated (e.g. create folder, send welcome email, create project in tool X), the tool that would perform it, and the order of operations. Flag any step that genuinely still needs a human touch and shouldn't be automated."
  },
  {
    id: "auto-reporting-digest",
    category: "Automation & Workflow",
    title: "Automated Weekly Reporting Digest",
    description: "A blueprint for auto-compiling scattered metrics into one weekly report, no manual copy-paste.",
    tags: ["reporting", "automation", "dashboards"],
    prompt: "You are a data operations specialist. Design an automation that compiles a weekly report by pulling [METRICS, e.g. 'ad spend, new leads, website traffic'] from [DATA SOURCES, e.g. 'Google Sheets, Shopify, Google Analytics'] and delivers it to [DESTINATION, e.g. 'a Slack channel every Monday at 9am']. Specify: the tool that connects each source, the format the final digest should take (table, chart, plain summary), and one sanity-check the automation should perform before sending (e.g. flag if a number is null or wildly off from last week)."
  },
  {
    id: "auto-crm-data-cleanup",
    category: "Automation & Workflow",
    title: "CRM Data Hygiene Automation Blueprint",
    description: "A blueprint for automatically catching and fixing common CRM data quality issues.",
    tags: ["crm", "data hygiene", "automation"],
    prompt: "You are a revenue operations consultant. Design an automation that runs on [CRM NAME, e.g. 'HubSpot'] to catch common data hygiene issues: duplicate contacts, missing required fields on deals past a certain stage, and stale deals with no activity in [TIMEFRAME]. For each issue type, specify: the tool/method used to detect it (native CRM workflow, Zapier, or a scheduled script), the action taken (merge, flag, notify owner), and who gets notified. Note one risk of over-automating this (e.g. auto-merging real duplicates incorrectly) and how to guard against it."
  },
  {
    id: "auto-content-repurposing-pipeline",
    category: "Automation & Workflow",
    title: "Content Repurposing Pipeline Automation",
    description: "A blueprint for automatically turning one piece of long-form content into multiple derivative posts.",
    tags: ["content repurposing", "automation", "social media"],
    prompt: "You are a content operations consultant. Design an automation that triggers when a new long-form piece (e.g. a blog post or podcast episode) is published in [SOURCE, e.g. 'a CMS or Google Doc'], and produces derivative assets: a short social caption, 2-3 pull-quotes formatted for graphics, and an email newsletter blurb. Specify which steps can be fully automated (e.g. via an AI API call triggered by Zapier/Make.com) versus which step still needs human review before publishing, and where in the pipeline that review checkpoint should sit."
  },
  {
    id: "mkt-customer-interview-plan",
    category: "Marketing & Ads",
    title: "Customer Interview Questions for Message Research",
    description: "A focused interview guide for finding the exact words customers use to describe a problem and a result.",
    tags: ["customer research", "messaging", "interviews"],
    prompt: "You are a customer-research lead. Create a 30-minute interview guide for speaking with people who [CUSTOMER TYPE] about how they handle [JOB OR PROBLEM] today. Write 12 open-ended questions in a logical order: current process, friction, failed alternatives, decision criteria, desired outcome, and exact language they use. Include 3 follow-up probes that help uncover specifics without leading the participant. Do not ask hypothetical questions and do not write questions that invite a yes/no answer."
  },
  {
    id: "ecom-review-theme-analysis",
    category: "E-commerce",
    title: "Product Review Theme Analysis",
    description: "Turn a set of customer reviews into product, listing, and support improvements without inventing findings.",
    tags: ["reviews", "product research", "e-commerce"],
    prompt: "You are an e-commerce insights analyst. Analyze the customer reviews pasted below for [PRODUCT]. Group repeated comments into themes and, for each theme, show sentiment, number of reviews supporting it, one short representative quote, and the product/listing/support action it suggests. Then identify the 3 strongest selling points that are safe to use in product copy and the 3 issues that should not be hidden. Do not infer a theme from one review and do not fabricate quotes. REVIEWS: [PASTE REVIEWS]"
  },
  {
    id: "seo-content-brief-from-research",
    category: "SEO & Content",
    title: "Evidence-Led SEO Content Brief",
    description: "A content brief that uses your research notes to define reader intent, structure, evidence, and gaps to fill.",
    tags: ["seo", "content brief", "research"],
    prompt: "You are an SEO editor. Turn the research notes below into a content brief for the keyword [TARGET KEYWORD]. Return: likely reader intent, the specific audience, a recommended angle, H1, H2/H3 outline, questions each section must answer, sources or first-party evidence needed, internal-link opportunities, and claims that require fact-checking. Include a 'what not to write' section identifying generic sections or unsupported claims to avoid. Do not copy competitor wording from the notes. RESEARCH NOTES: [PASTE NOTES]"
  },
  {
    id: "email-welcome-sequence-strategy",
    category: "Email Marketing",
    title: "Value-First Welcome Email Sequence",
    description: "Plan a short welcome sequence that sets expectations, offers immediate value, and earns the next open.",
    tags: ["email", "welcome sequence", "retention"],
    prompt: "You are a lifecycle marketer. Write a 4-email welcome sequence for [BRAND] after someone signs up for [OFFER OR LEAD MAGNET]. Email 1 delivers the promised value and sets expectations. Email 2 helps the reader get one quick result. Email 3 addresses a common barrier or question. Email 4 introduces the most relevant next step or product. For each email provide a subject line, preview text, timing, and body under 180 words. Use only the brand facts provided: [FACTS]. Do not use false urgency or claim results that cannot be supported."
  },
  {
    id: "auto-automation-readiness-audit",
    category: "Automation & Workflow",
    title: "Automation Readiness Audit",
    description: "Identify which recurring processes are safe to automate first, including data, ownership, and failure checks.",
    tags: ["automation", "operations", "process audit"],
    prompt: "You are an automation consultant. Assess these recurring business processes: [LIST PROCESSES]. For each process, score its automation readiness from 1 to 5 based on volume, repeatability, data quality, exception rate, and impact if it fails. Recommend the best first automation, define its trigger, actions, owner, human approval point, error alert, and success metric. Explain which processes should stay manual for now and why. Favor a small, testable workflow over a large fragile one."
  },

  // ---------- Marketing & Ads ----------
  {
    id: "mkt-tiktok-ad-script",
    category: "Marketing & Ads",
    title: "TikTok Ad Script With a Native, Non-Ad Feel",
    description: "A TikTok ad script generator prompt that keeps the pacing and tone native to the platform instead of sounding like a commercial.",
    tags: ["tiktok ads", "ad script", "short-form video"],
    prompt: "You are a TikTok ads creative strategist. Write a 20-30 second ad script for [PRODUCT/SERVICE] aimed at [TARGET AUDIENCE], styled to feel like organic TikTok content, not a commercial. Structure: a scroll-stopping first line (under 3 seconds when spoken), a quick demonstration or proof beat, one specific detail that builds trust (a number, a before/after, a real use case), and a low-pressure CTA. Write it as spoken dialogue with on-screen text cues in brackets. Do not use words like 'amazing,' 'game-changer,' or a hard sales close."
  },
  {
    id: "mkt-value-proposition-statement",
    category: "Marketing & Ads",
    title: "One-Sentence Value Proposition Generator",
    description: "An AI prompt that distills what you do into a single, specific value proposition sentence for headlines and ad copy.",
    tags: ["value proposition", "positioning", "headline"],
    prompt: "You are a positioning consultant. Based on this input — product: [WHAT IT DOES], audience: [WHO IT'S FOR], main outcome: [RESULT THEY GET], and the alternative they'd otherwise use: [CURRENT ALTERNATIVE] — write 5 candidate one-sentence value propositions, each under 20 words. Each must name the specific outcome and audience, not a generic benefit like 'save time' or 'grow your business.' Rank them by clarity and flag any that could apply to a competitor unchanged."
  },

  // ---------- E-commerce ----------
  {
    id: "ecom-category-page-seo-description",
    category: "E-commerce",
    title: "SEO Description for a Product Category Page",
    description: "An AI product description generator prompt built specifically for category/collection pages, not single products.",
    tags: ["seo", "category page", "product description"],
    prompt: "You are an e-commerce SEO copywriter. Write an SEO-optimized description for the category page [CATEGORY NAME], selling [PRODUCT TYPES IN THIS CATEGORY], targeting the search term [TARGET KEYWORD]. Include: a 150-200 word intro paragraph placed above the fold that naturally uses the target keyword and 2-3 related terms, a short buyer's-guide subsection answering one common pre-purchase question, and a meta description under 155 characters. Do not keyword-stuff — every sentence must still read naturally to a shopper."
  },
  {
    id: "ecom-influencer-outreach-email",
    category: "E-commerce",
    title: "Micro-Influencer Outreach Email for Product Seeding",
    description: "A template for reaching out to micro-influencers to seed free product in exchange for authentic content.",
    tags: ["influencer outreach", "product seeding", "email template"],
    prompt: "You are an influencer marketing manager. Write a short outreach email inviting a micro-influencer in the [NICHE] space to receive a free [PRODUCT] in exchange for honest content (no payment, no script required). Requirements: under 120 words, name one specific reason you chose them (reference their content style or audience, using [PLACEHOLDER FOR SPECIFIC DETAIL]), clearly state there's no obligation to post, and include one easy next step. Avoid generic flattery like 'I love your content' without a specific reason attached."
  },

  // ---------- SEO & Content ----------
  {
    id: "seo-meta-title-description-batch",
    category: "SEO & Content",
    title: "Batch Meta Titles & Descriptions for a Page List",
    description: "An AI meta description generator prompt that produces unique, click-worthy tags for a whole list of pages at once.",
    tags: ["meta description", "meta title", "on-page seo"],
    prompt: "You are an on-page SEO specialist. For each page in this list — [PAGE URL/TOPIC, TARGET KEYWORD pairs, one per line] — write a unique meta title (50-60 characters, keyword near the front) and meta description (140-155 characters, includes the keyword plus one specific benefit or detail). No two titles or descriptions may share the same opening words. Flag any page where the target keyword is too similar to another page's, which would cause keyword cannibalization."
  },
  {
    id: "seo-keyword-clustering",
    category: "SEO & Content",
    title: "Keyword Clustering Into Content Topics",
    description: "Group a raw keyword list into topic clusters so you know how many articles to write instead of one per keyword.",
    tags: ["keyword research", "content strategy", "topic clusters"],
    prompt: "You are an SEO content strategist. Group this raw keyword list — [PASTE KEYWORD LIST] — into topic clusters based on shared search intent, not just shared words. For each cluster, provide: a cluster name, the keywords belonging to it, the dominant search intent (informational, commercial, transactional, navigational), and a recommended single article title that could realistically target the whole cluster. Flag any keyword that doesn't fit an existing cluster and may need its own page."
  },

  // ---------- Social Media ----------
  {
    id: "social-pinterest-pin-description",
    category: "Social Media",
    title: "Pinterest Pin Titles & SEO Descriptions",
    description: "Pinterest-optimized pin titles and keyword-rich descriptions built around how Pinterest search actually works.",
    tags: ["pinterest", "pin description", "seo"],
    prompt: "You are a Pinterest marketing specialist. For a pin promoting [CONTENT/PRODUCT, ONE-LINE DESCRIPTION] targeting the search term [TARGET KEYWORD], write: a pin title (under 100 characters, keyword near the start), a pin description (under 500 characters, naturally including the keyword and 2 related terms, written as if helping someone who searched that term), and 3 relevant board name suggestions. Avoid clickbait phrasing that doesn't match what the pin links to."
  },
  {
    id: "social-content-calendar-month",
    category: "Social Media",
    title: "One-Month Social Content Calendar From a Single Theme",
    description: "An AI social media calendar generator prompt that turns one monthly theme into a full posting plan.",
    tags: ["content calendar", "social media planning", "monthly theme"],
    prompt: "You are a social media strategist. Build a 4-week content calendar for [BRAND/PLATFORM] built around the monthly theme [THEME]. For each week, provide 3 post ideas with a one-line hook, the format (reel, carousel, static, thread), and the intended goal (awareness, engagement, or conversion) — no two posts in the month should repeat the same hook angle. End with 2 ideas held in reserve in case a planned post falls through."
  },

  // ---------- Email Marketing ----------
  {
    id: "email-re-permission-campaign",
    category: "Email Marketing",
    title: "Re-Permission Email for List Cleanup",
    description: "An email that asks inactive subscribers to confirm they still want to hear from you, before you clean the list.",
    tags: ["email list cleanup", "re-permission", "deliverability"],
    prompt: "You are an email deliverability specialist. Write a re-permission email to subscribers of [BRAND] who haven't opened an email in [TIME PERIOD]. The email must: acknowledge it's been a while without guilt-tripping, offer one genuine reason to stay (not a generic 'we miss you'), give a single clear action to stay subscribed, and state plainly what happens if they don't act (removal from the list). Subject line and preview text included. Keep the body under 100 words."
  },
  {
    id: "email-subject-line-ab-test",
    category: "Email Marketing",
    title: "Subject Line A/B Test Variant Generator",
    description: "An AI email subject line generator prompt that produces genuinely different angles to A/B test, not minor rewordings.",
    tags: ["subject line", "a/b testing", "email marketing"],
    prompt: "You are an email marketer running subject line tests. For an email about [EMAIL TOPIC/OFFER] going to [AUDIENCE], write 5 subject lines that each use a distinct angle: (1) curiosity, (2) direct benefit, (3) urgency/scarcity, (4) a question, (5) personalization-style. Each under 50 characters. For every subject line, also provide matching preview text under 90 characters. Flag any that could trigger spam filters (e.g. excessive punctuation, all caps, 'free')."
  },

  // ---------- Business & Productivity ----------
  {
    id: "biz-one-page-business-plan",
    category: "Business & Productivity",
    title: "One-Page Business Plan Draft",
    description: "An AI business plan generator prompt that condenses a business idea into a single actionable page, not a 20-page document.",
    tags: ["business plan", "startup", "strategy"],
    prompt: "You are a startup advisor. Using this input — idea: [WHAT THE BUSINESS DOES], target customer: [WHO], problem it solves: [PROBLEM], and how it makes money: [REVENUE MODEL] — write a one-page business plan covering: problem, solution, target customer, revenue model, top 3 risks, and the single next milestone that would validate the idea. Keep every section to 2-3 sentences. Call out any part of the input that's too vague to plan around instead of inventing details."
  },
  {
    id: "biz-pricing-page-strategy",
    category: "Business & Productivity",
    title: "Pricing Page Structure & Objection Handling",
    description: "A pricing page copy generator prompt that structures tiers and pre-answers the objections that stall a purchase decision.",
    tags: ["pricing page", "objection handling", "conversion"],
    prompt: "You are a SaaS pricing strategist. For [PRODUCT] with these tiers — [LIST TIERS AND WHAT'S INCLUDED IN EACH] — write pricing page copy including: a one-line value statement per tier (not just a feature list), a recommended-tier callout with the reason it's recommended, a 3-question FAQ addressing the top objections for this kind of purchase (e.g. contract length, refunds, what happens if they outgrow a tier), and a single guarantee statement only if [GUARANTEE DETAILS] are provided — otherwise omit it rather than inventing one."
  },

  // ---------- Customer Support ----------
  {
    id: "support-faq-from-tickets",
    category: "Customer Support",
    title: "FAQ Page Generated From Recurring Support Tickets",
    description: "An AI FAQ generator prompt that turns a batch of real support tickets into a structured FAQ page.",
    tags: ["faq", "support tickets", "self-service"],
    prompt: "You are a customer support content specialist. Review these support ticket summaries — [PASTE TICKET SUMMARIES] — and group them into recurring question themes. For each theme, write: the question phrased the way a customer would actually type it, a clear answer under 80 words, and a note on which team/article it should link to for more detail. Merge near-duplicate questions instead of listing them separately, and flag any ticket that reveals a product bug rather than a genuine FAQ."
  },
  {
    id: "support-csat-survey-followup",
    category: "Customer Support",
    title: "Follow-Up Message After a Low CSAT Score",
    description: "A customer satisfaction follow-up email template for reaching out after a customer leaves a low support rating.",
    tags: ["csat", "follow-up", "customer satisfaction"],
    prompt: "You are a customer experience manager. Write a follow-up message to a customer who gave a low satisfaction score ([SCORE]/5) after a support interaction about [ISSUE TYPE]. The message must: acknowledge the low score directly without being defensive, ask one specific open question about what went wrong (not a generic 'how can we improve'), offer a concrete next step, and avoid corporate-sounding apology language ('we sincerely apologize for any inconvenience'). Keep it under 90 words."
  },

  // ---------- Automation & Workflow ----------
  {
    id: "auto-slack-notification-rules",
    category: "Automation & Workflow",
    title: "Slack Notification Rules Blueprint to Cut Noise",
    description: "An automation blueprint for routing and filtering Slack notifications so only the alerts that need action get through.",
    tags: ["slack", "automation", "notification rules"],
    prompt: "You are a workflow automation consultant. Given these current notification sources — [LIST TOOLS/EVENTS CURRENTLY POSTING TO SLACK] — design a filtering and routing scheme so each channel only receives notifications someone needs to act on. For each source, specify: which channel it should route to, the condition that should suppress it (e.g. severity below a threshold, duplicate within X minutes), and whether it needs a digest format instead of real-time. Recommend which notifications should be removed entirely rather than rerouted."
  },
  {
    id: "auto-invoice-reminder-sequence",
    category: "Automation & Workflow",
    title: "Automated Invoice Reminder Sequence Blueprint",
    description: "An invoice reminder automation prompt that defines a full overdue-payment sequence, from friendly nudge to escalation.",
    tags: ["invoicing", "automation", "accounts receivable"],
    prompt: "You are an accounts receivable automation consultant. Design an automated invoice reminder sequence for [BUSINESS TYPE] triggered when an invoice becomes overdue. Define, for each stage (due date, 3 days overdue, 14 days overdue, 30 days overdue): the trigger condition, the tone of the message (friendly to firm), the channel (email/SMS), and whether it needs human review before escalation. Specify the point at which the process should hand off to a human instead of continuing automatically."
  }
];
