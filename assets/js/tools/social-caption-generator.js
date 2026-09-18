(function () {
  "use strict";

  var platformNotes = {
    "Instagram Reels": "Format for Instagram Reels: caption can run 125-2200 characters but the first line must work as a stand-alone on-screen hook. Include 3-5 relevant hashtags at the end, mixed between broad and niche.",
    "TikTok": "Format for TikTok: keep the caption short and punchy (roughly 150 characters or fewer performs best), casual and conversational in tone, with 3-4 hashtags including at least one trending/niche tag.",
    "YouTube Shorts": "Format for YouTube Shorts: a short, curiosity-driven caption (under 100 characters ideally), since most of the message should live in the video's on-screen text. Include 2-3 hashtags at the end.",
    "LinkedIn": "Format for LinkedIn: a longer, value-driven caption (typically 3-6 short paragraphs or a mix of short lines and line breaks) written in a professional but conversational voice, ending with a discussion question. Use 3-5 hashtags at the very end, not inline.",
    "X / Twitter": "Format for X / Twitter: a concise caption under 280 characters, punchy and direct, with at most 1-2 hashtags (or none) since hashtags tend to reduce engagement on this platform."
  };

  var goalCtaNotes = {
    "Grow Followers": "The CTA should invite the viewer to follow the account for more content like this (e.g. 'Follow for more' framed around a specific value promise).",
    "Drive Website Clicks": "The CTA should clearly direct the viewer to click the link in bio or a stated URL, with a specific reason to click now.",
    "Boost Engagement/Comments": "The CTA should explicitly ask a question or invite a specific type of comment (e.g. 'Which one are you? Comment below') to maximize replies.",
    "Promote a Product": "The CTA should highlight the product's key benefit and give a clear next step to purchase or learn more, without sounding overly salesy."
  };

  var toneNotes = {
    Bold: "confident, direct, and attention-grabbing",
    Witty: "clever, playful, and a little unexpected",
    Inspirational: "uplifting and motivational, focused on transformation or possibility",
    Educational: "clear, informative, and focused on teaching one specific takeaway",
    Relatable: "casual and conversational, like talking to a friend"
  };

  var BANNED_PHRASES = "unlock, elevate, game-changer, in today's fast-paced world, dive into, let's be real, plot twist, main character energy (unless genuinely relevant), it's giving ..., no cap, level up your";

  var FEW_SHOT = "EXAMPLE OF THE QUALITY BAR (different topic, do not reuse this content):\nHOOK (curiosity): \"I stopped answering emails after 6pm and my clients respect me more now.\"\nHOOK (bold claim): \"Your inbox is not an emergency room. Stop treating it like one.\"\nHOOK (relatable pain): \"POV: it's 9pm and you're still 'just replying to one more email.'\"\n— notice each hook is a specific, concrete moment, not an abstract statement like \"Work-life balance matters.\"";

  function buildPrompt(data) {
    var platformNote = platformNotes[data.platform] || "";
    var ctaNote = goalCtaNotes[data.goal] || "";
    var toneNote = toneNotes[data.tone] || data.tone;
    var hookCount = data.hookCount || 3;

    return [
      "You are a social media copywriter who specializes in scroll-stopping short-form content, not a generic assistant summarizing a topic.",
      "",
      "TASK: Write hook and caption options for a " + data.platform + " post.",
      "",
      "POST TOPIC: " + data.topic,
      "",
      "GOAL: " + data.goal + ". " + ctaNote,
      "",
      "TONE: " + data.tone + " — " + toneNote + ". Keep this tone consistent across every hook and the caption.",
      "",
      "PLATFORM REQUIREMENTS: " + platformNote,
      "",
      FEW_SHOT,
      "",
      "HARD CONSTRAINTS:",
      "- Never use these overused social-media clichés or close variants of them: " + BANNED_PHRASES + ".",
      "- Each hook must reference a specific, concrete moment or claim — not an abstract statement about the topic.",
      "- No emoji spam — at most 1-2 emoji total across the entire caption, only if genuinely fitting the tone.",
      "",
      "OUTPUT INSTRUCTIONS:",
      "1. HOOKS: Write " + hookCount + " different scroll-stopping hook options (the first line/on-screen text viewers see). Each must work as a stand-alone attention-grabber and take a genuinely different angle (e.g. curiosity, bold claim, relatable pain point) — label each with its angle in parentheses like the example.",
      "2. CAPTION: Write one full caption that matches the platform's length and formatting conventions described above.",
      "3. CTA: End the caption with a call-to-action matching the stated goal.",
      "4. Include appropriate hashtags per the platform requirements above.",
      "- Return only the finished hooks, caption, and CTA, clearly labeled — no preamble, no explanation of your process.",
      "- Before finalizing, silently re-check every hard constraint above and fix any violation."
    ].join("\n");
  }

  function init() {
    var form = document.getElementById("caption-form");
    var output = document.getElementById("caption-output");
    var outputWrap = document.getElementById("caption-output-wrap");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var topicInput = document.getElementById("post-topic");
      var topic = topicInput.value.trim();
      if (!topic) {
        topicInput.focus();
        return;
      }

      var data = {
        topic: topic,
        platform: document.getElementById("platform-select").value,
        goal: document.getElementById("goal-select").value,
        tone: document.getElementById("tone-select").value,
        hookCount: parseInt(document.getElementById("hook-count").value, 10) || 3
      };

      output.textContent = buildPrompt(data);
      outputWrap.hidden = false;
      outputWrap.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
