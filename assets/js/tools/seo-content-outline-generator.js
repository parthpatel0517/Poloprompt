(function () {
  "use strict";

  var contentTypeNotes = {
    "Blog Post": "Structure it as a standard blog post: an engaging introduction, several H2 sections that each answer a sub-question of the main topic, and a conclusion with a takeaway or call-to-action.",
    "Listicle": "Structure it as a numbered listicle: a short introduction explaining the list's value, then one H2 per list item (numbered), each with 1-2 supporting H3 sub-points where useful, and a short closing summary.",
    "How-To Guide": "Structure it as a step-by-step how-to guide: an introduction stating what the reader will accomplish, sequential H2 sections for each major step (numbered), H3 sub-steps where needed, and an FAQ or troubleshooting section near the end.",
    "Comparison Article": "Structure it as a comparison article: an introduction framing the decision, an H2 overview of each option being compared, an H2 head-to-head comparison (ideally suited to a table), and a final H2 verdict/recommendation section.",
    "Landing Page": "Structure it as a landing page: a hero H1 and sub-headline, an H2 benefits section, an H2 social proof/testimonials section, an H2 FAQ section, and a closing H2 call-to-action section."
  };

  var intentNotes = {
    Informational: "The reader is looking to learn or understand the topic — prioritize clear explanations, definitions, and examples over sales language.",
    Commercial: "The reader is comparing options before buying — include comparison points, pros/cons, and criteria for choosing, without being overly salesy.",
    Transactional: "The reader is ready to act or purchase — prioritize clear calls-to-action, pricing/offer clarity, and objection handling.",
    Navigational: "The reader is looking for a specific brand, product, or page — make sure the outline clearly orients them and gets them to the right destination quickly."
  };

  var BANNED_PHRASES = "in today's digital age, in today's fast-paced world, in this article we will explore, let's dive in, dive into, in conclusion, it's important to note, whether you're a beginner or an expert, unlock the power of, at the end of the day, navigating the world of";

  var FEW_SHOT = "EXAMPLE OF THE QUALITY BAR (different topic, do not reuse this content):\nH2: Why Most Meal Prep Fails by Wednesday (~250 words) — covers the real reason (flavor fatigue, not lack of time), not a generic \"benefits of meal prep\" rehash.\nH3: The 3-Container Rule (~150 words) — a specific, actionable sub-tactic, not a vague tip.";

  function buildPrompt(data) {
    var typeNote = contentTypeNotes[data.contentType] || "";
    var intentNote = intentNotes[data.intent] || "";
    var secondaryLine = data.secondary
      ? "Secondary keywords to include naturally throughout the content: " + data.secondary + "."
      : "No secondary keywords were provided — suggest 3-5 relevant secondary keywords yourself and include them naturally in the outline.";
    var titleCount = data.titleCount || 1;
    var titleLine = titleCount > 1
      ? "Provide " + titleCount + " DISTINCT SEO TITLE TAG options (under 60 characters each, all including the target keyword, each taking a different angle — e.g. one benefit-led, one number-led, one question-led) and one META DESCRIPTION (under 155 characters)."
      : "Provide a suggested SEO TITLE TAG (under 60 characters) and META DESCRIPTION (under 155 characters), both including the target keyword.";

    return [
      "You are a senior SEO content strategist who has ranked competitive articles on page 1 of Google, not just a generic writing assistant.",
      "",
      "TASK: Create a complete SEO content outline for a " + data.contentType + " targeting the keyword/topic below.",
      "",
      "TARGET KEYWORD / TOPIC: " + data.keyword,
      "",
      secondaryLine,
      "",
      "CONTENT TYPE: " + data.contentType + ". " + typeNote,
      "",
      "TARGET WORD COUNT: " + data.wordCount + " words total. Assign an approximate word count target to each major section so the total adds up.",
      "",
      "SEARCH INTENT: " + data.intent + ". " + intentNote,
      "",
      FEW_SHOT,
      "",
      "HARD CONSTRAINTS:",
      "- Every H2 must promise something more specific than a generic subtopic label — write it the way a human editor would title a section, not a placeholder like \"Benefits of X.\"",
      "- Never use these overused AI-writing phrases or close variants of them: " + BANNED_PHRASES + ".",
      "- Do not pad the outline with a section that just repeats the introduction's point.",
      "",
      "OUTPUT INSTRUCTIONS:",
      "- " + titleLine,
      "- Provide a suggested H1.",
      "- Provide the full H2/H3 heading structure in outline form, with a one-line note under each heading describing what it should specifically cover (not just what topic it's about).",
      "- Note the approximate word count target next to each H2 section.",
      "- Make sure secondary keywords are distributed naturally across sections rather than stuffed into one place.",
      "- Do not include a preamble like \"Here's your outline\" — start directly with the title tag(s).",
      "- Do not write the full article — output the outline only.",
      "- Before finalizing, silently re-check every hard constraint above and fix any violation."
    ].join("\n");
  }

  function init() {
    var form = document.getElementById("seo-form");
    var output = document.getElementById("seo-output");
    var outputWrap = document.getElementById("seo-output-wrap");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var keywordInput = document.getElementById("keyword");
      var keyword = keywordInput.value.trim();
      if (!keyword) {
        keywordInput.focus();
        return;
      }

      var data = {
        keyword: keyword,
        secondary: document.getElementById("secondary-keywords").value.trim(),
        contentType: document.getElementById("content-type").value,
        wordCount: document.getElementById("word-count").value,
        intent: document.getElementById("search-intent").value,
        titleCount: parseInt(document.getElementById("title-count").value, 10) || 1
      };

      output.textContent = buildPrompt(data);
      outputWrap.hidden = false;
      outputWrap.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
