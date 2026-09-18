(function () {
  "use strict";

  var frameworkGuides = {
    AIDA: "Structure the copy using the AIDA framework: (1) ATTENTION — a scroll-stopping opening line or headline, (2) INTEREST — build interest by connecting to a real pain point or desire, (3) DESIRE — show the transformation or benefit vividly, (4) ACTION — a single, clear call-to-action.",
    PAS: "Structure the copy using the PAS framework: (1) PROBLEM — state the specific problem the audience faces, (2) AGITATE — intensify the problem with a relatable consequence, (3) SOLUTION — introduce the product/service as the clear fix, ending with a call-to-action.",
    BAB: "Structure the copy using the Before-After-Bridge framework: (1) BEFORE — describe the audience's current frustrating situation, (2) AFTER — paint a picture of life after using the product/service, (3) BRIDGE — explain how the product/service is the bridge between the two, ending with a call-to-action."
  };

  var platformSpecs = {
    "Meta Ads": "Format: Facebook/Instagram feed ad. Include a primary text (max 125 words), a short headline (under 40 characters), and a description line (under 30 characters). Keep paragraphs short and mobile-friendly.",
    "Google Search Ads": "Format: Google Search ad. Provide 3 headlines (max 30 characters each) and 2 description lines (max 90 characters each), all keyword-relevant and benefit-driven.",
    "YouTube Script": "Format: 30-second YouTube pre-roll video script. Write it as spoken dialogue with short scene/visual cues in brackets, structured for a hook in the first 5 seconds.",
    "Instagram Reels": "Format: 15-30 second Instagram Reels script. Include an on-screen hook text for the first 2 seconds, spoken voiceover lines, and a suggested trending-audio style/pacing note."
  };

  var BANNED_PHRASES = "unlock, unleash, elevate, game-changer, game-changing, revolutionize, revolutionary, seamless, seamlessly, in today's fast-paced world, in today's digital age, look no further, dive into, discover the power of, take it to the next level, at the end of the day, whether you're a ... or a ..., it's important to note";

  function fewShotExample(framework) {
    if (framework === "PAS") {
      return "EXAMPLE OF THE QUALITY BAR (different product, do not reuse this content):\nPROBLEM: Freelancers lose hours every week chasing unpaid invoices.\nAGITATE: Every follow-up email feels awkward, and by the time you're paid, you've already spent the cash mentally three times over.\nSOLUTION: InvoiceFlow auto-chases late payers for you, politely and on schedule, so you get paid without playing debt collector.\nCTA: Start your free 14-day trial — no card required.";
    }
    if (framework === "BAB") {
      return "EXAMPLE OF THE QUALITY BAR (different product, do not reuse this content):\nBEFORE: You're manually copying leads from Instagram DMs into a spreadsheet every night.\nAFTER: Every DM lead lands in your CRM the moment it arrives, tagged and ready to follow up.\nBRIDGE: LeadPipe connects your Instagram inbox to your CRM in one click — no code, no VA required.\nCTA: Connect your first inbox free.";
    }
    return "EXAMPLE OF THE QUALITY BAR (different product, do not reuse this content):\nATTENTION: Your gym bag shouldn't smell like your gym.\nINTEREST: Sweaty gear trapped in a sealed bag breeds bacteria within hours — most bags just hide the smell instead of stopping it.\nDESIRE: FreshPack's ventilated antimicrobial liner keeps kit dry and odor-free for up to 3 days between washes.\nACTION: Grab yours before the pre-season restock sells out.";
  }

  function buildPrompt(data) {
    var frameworkNote = frameworkGuides[data.framework] || "";
    var platformNote = platformSpecs[data.platform] || "";
    var count = data.variantCount || 1;

    var taskLine = count > 1
      ? "TASK: Write " + count + " DISTINCT variations of " + data.platform + " ad copy for the product/service below. Each variation must take a genuinely different creative angle (e.g. one leads with a stat/claim, one leads with a question, one leads with a relatable scenario) — not just reworded synonyms of the same sentence. Label each one \"VARIATION 1\", \"VARIATION 2\", etc."
      : "TASK: Write " + data.platform + " ad copy for the product/service below.";

    return [
      "You are a senior direct-response copywriter with 15 years of experience writing ads that are judged purely on conversion rate, not creativity awards.",
      "",
      taskLine,
      "",
      "PRODUCT/SERVICE: " + data.product,
      "",
      "TONE: " + data.tone + ". Keep the voice consistent in every line.",
      "",
      "FRAMEWORK: " + data.framework + ". " + frameworkNote,
      "",
      "PLATFORM REQUIREMENTS: " + platformNote,
      "",
      fewShotExample(data.framework),
      "",
      "HARD CONSTRAINTS:",
      "- Never use these overused AI-copywriting phrases or close variants of them: " + BANNED_PHRASES + ".",
      "- No invented statistics, awards, or customer counts that weren't given to you above.",
      "- No exclamation points stacked back-to-back, and no more than one per section.",
      "- Every sentence must pass this test: would a skeptical buyer roll their eyes at it? If yes, rewrite it.",
      "",
      "OUTPUT INSTRUCTIONS:",
      "- Return only the final ad copy" + (count > 1 ? ", split into the " + count + " labeled variations" : "") + ", clearly labeled by section using the framework's own labels (e.g. PROBLEM:, AGITATE:, SOLUTION:).",
      "- Do not include a preamble like \"Sure, here's your ad copy\" — start directly with the labeled content.",
      "- Make every word earn its place; cut filler.",
      "- End with one strong, specific call-to-action — not a generic \"Learn more\" unless the platform genuinely requires it.",
      "- Before finalizing, silently re-check every hard constraint above and fix any violation."
    ].join("\n");
  }

  function init() {
    var form = document.getElementById("ad-prompt-form");
    var output = document.getElementById("ad-prompt-output");
    var outputWrap = document.getElementById("ad-prompt-output-wrap");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var product = document.getElementById("product-desc").value.trim();
      if (!product) {
        document.getElementById("product-desc").focus();
        return;
      }
      var data = {
        platform: document.getElementById("platform").value,
        product: product,
        tone: document.getElementById("tone").value,
        framework: document.getElementById("framework").value,
        variantCount: parseInt(document.getElementById("variant-count").value, 10) || 1
      };
      output.textContent = buildPrompt(data);
      outputWrap.hidden = false;
      outputWrap.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
