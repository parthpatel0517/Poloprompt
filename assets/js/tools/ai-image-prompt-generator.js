/* PoloPrompt — AI Image Prompt Generator. Runs entirely in the browser.
   Builds a detailed image prompt from a few choices and formats it for the
   target tool: natural-language instructions for ChatGPT / Gemini, a one-line
   prompt with parameters for Midjourney, and positive + negative prompts for
   Stable Diffusion / Flux. */
(function () {
  "use strict";

  var STYLES = {
    photo: { label: "Photorealistic photo", text: "photorealistic photograph, natural textures, true-to-life color, sharp focus", photographic: true },
    cinematic: { label: "Cinematic film still", text: "cinematic film still, color-graded, subtle film grain, widescreen movie framing", photographic: true },
    product: { label: "Product photography", text: "commercial product photography, clean studio set, controlled reflections, crisp detail", photographic: true },
    anime: { label: "Anime illustration", text: "hand-painted anime illustration, clean line art, soft cel shading, painterly background" },
    "3d": { label: "3D animated character", text: "stylized 3D animated render, rounded appealing shapes, soft subsurface lighting, big expressive eyes" },
    watercolor: { label: "Watercolor painting", text: "loose watercolor painting, soft washes, blooming edges, visible paper texture" },
    oil: { label: "Classical oil painting", text: "classical oil painting, visible brushwork, rich glazing, museum-quality portrait lighting" },
    pixel: { label: "16-bit pixel art", text: "16-bit pixel art, crisp square pixels, limited color palette, no anti-aliasing" },
    comic: { label: "Comic book / pop art", text: "vintage comic book art, bold ink outlines, halftone dot shading, punchy primary colors" },
    clay: { label: "Claymation", text: "claymation stop-motion style, handmade plasticine textures, visible fingerprints, miniature handmade set" },
    flat: { label: "Flat vector illustration", text: "minimalist flat vector illustration, simple geometric shapes, limited palette, generous negative space" },
    logo: { label: "Logo / icon design", text: "clean vector logo mark, simple scalable shapes, flat colors, centered on a plain background" },
    cyberpunk: { label: "Cyberpunk neon", text: "cyberpunk neon aesthetic, rain-slicked surfaces, glowing magenta and cyan signs, night city atmosphere" }
  };

  var LIGHTING = {
    auto: "",
    golden: "warm golden-hour sunlight with long soft shadows",
    studio: "soft, even studio lighting with a large key light and gentle fill",
    dramatic: "dramatic chiaroscuro lighting with deep shadows and a single strong light source",
    neon: "colorful neon light spill with strong color contrast",
    overcast: "soft overcast daylight, diffused and shadowless",
    backlit: "backlit with a glowing rim light outlining the subject",
    candle: "warm candlelight with flickering orange tones"
  };

  var SHOTS = {
    auto: { text: "", lens: "" },
    portrait: { text: "close-up portrait framing, subject's face and shoulders filling the frame", lens: "85mm lens at f/1.8, shallow depth of field" },
    medium: { text: "medium shot from the waist up", lens: "50mm lens" },
    wide: { text: "wide establishing shot showing the full scene and environment", lens: "24mm wide-angle lens" },
    flatlay: { text: "top-down overhead flat lay, arranged neatly", lens: "shot from directly above" },
    lowangle: { text: "low-angle hero shot looking up at the subject", lens: "35mm lens" },
    macro: { text: "extreme macro close-up revealing fine detail", lens: "100mm macro lens" },
    isometric: { text: "isometric view at a 30-degree angle", lens: "" }
  };

  var ASPECTS = {
    "1:1": { word: "square", sdxl: "1024 x 1024" },
    "4:5": { word: "portrait", sdxl: "896 x 1152" },
    "9:16": { word: "vertical", sdxl: "768 x 1344" },
    "16:9": { word: "widescreen", sdxl: "1344 x 768" },
    "3:2": { word: "landscape", sdxl: "1216 x 832" }
  };

  var TOOL_NAMES = { chatgpt: "ChatGPT", gemini: "Google Gemini", midjourney: "Midjourney", sd: "Stable Diffusion / Flux" };

  var SD_NEGATIVE = "blurry, low resolution, jpeg artifacts, watermark, signature, extra fingers, deformed hands, distorted face, oversaturated";

  var SURPRISE = [
    "a fox in a tweed jacket reading a newspaper at a Paris café table",
    "a lighthouse on a sea cliff during a thunderstorm",
    "a tiny astronaut tending a greenhouse on the moon",
    "a busy night street-food stall with steam rising from the woks",
    "a cozy reading nook inside a treehouse, rain on the windows",
    "a vintage red bicycle leaning against a wall covered in flowers",
    "a samurai cat standing in falling cherry blossoms",
    "a futuristic city floating above the clouds at sunrise",
    "a steaming bowl of ramen on a wooden counter",
    "an elderly fisherman mending nets on a quiet harbor",
    "a glass terrarium containing a miniature rainforest",
    "a golden retriever wearing sunglasses in a convertible"
  ];

  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function val(id) { var el = document.getElementById(id); return el ? el.value.trim() : ""; }
  function sentence(s) { s = s.trim(); return s ? s.charAt(0).toUpperCase() + s.slice(1) + (/[.!?]$/.test(s) ? "" : ".") : ""; }
  function splitList(s) { return s.split(/[,;\n]+/).map(function (x) { return x.trim(); }).filter(Boolean); }

  function read() {
    return {
      tool: val("img-tool"),
      subject: val("img-subject").replace(/\s+/g, " "),
      fromPhoto: document.getElementById("img-from-photo").checked,
      style: STYLES[val("img-style")] || STYLES.photo,
      lighting: LIGHTING[val("img-lighting")] || "",
      shot: SHOTS[val("img-shot")] || SHOTS.auto,
      mood: val("img-mood"),
      aspect: val("img-aspect") || "1:1",
      text: val("img-text").replace(/"/g, "'"),
      avoid: splitList(val("img-avoid"))
    };
  }

  function buildNatural(d) {
    var a = ASPECTS[d.aspect];
    var lines = [];
    if (d.fromPhoto) {
      lines.push("Using the attached photo as the reference, create a " + a.word + " (" + d.aspect + ") image of " + d.subject + ".");
      lines.push("Keep the main subject's face, features, body proportions and pose clearly recognizable from the photo. Change only the style, lighting and setting described below.");
    } else {
      lines.push("Create a " + a.word + " (" + d.aspect + ") image of " + d.subject + ".");
    }
    lines.push("");
    lines.push("Style: " + sentence(d.style.text));
    if (d.lighting) lines.push("Lighting: " + sentence(d.lighting));
    var comp = [d.shot.text, d.style.photographic ? d.shot.lens : ""].filter(Boolean).join(", ");
    if (comp) lines.push("Composition: " + sentence(comp));
    if (d.mood) lines.push("Mood and colors: " + sentence(d.mood));
    if (d.text) {
      lines.push("Text: include the words \"" + d.text + "\" exactly as written, spelled letter for letter, in clean, legible lettering. Add no other text.");
    } else {
      lines.push("Text: do not add any words, captions, logos or watermarks.");
    }
    if (d.avoid.length) lines.push("Avoid: " + sentence(d.avoid.join(", ")));
    return lines.join("\n");
  }

  function buildMidjourney(d) {
    var parts = [d.subject, d.style.text];
    if (d.lighting) parts.push(d.lighting);
    if (d.shot.text) parts.push(d.shot.text);
    if (d.style.photographic && d.shot.lens) parts.push(d.shot.lens);
    if (d.mood) parts.push(d.mood);
    if (d.text) parts.push("with the text \"" + d.text + "\"");
    var line = (d.fromPhoto ? "[PASTE YOUR IMAGE URL] " : "") + parts.join(", ");
    line += " --ar " + d.aspect;
    if (d.style.photographic) line += " --style raw";
    var no = d.avoid.slice();
    if (!d.text) no.push("text", "watermark");
    if (no.length) line += " --no " + no.join(", ");
    return line;
  }

  function buildSD(d) {
    var pos = [d.subject, d.style.text];
    if (d.lighting) pos.push(d.lighting);
    if (d.shot.text) pos.push(d.shot.text);
    if (d.style.photographic && d.shot.lens) pos.push(d.shot.lens);
    if (d.mood) pos.push(d.mood);
    if (d.text) pos.push("the text \"" + d.text + "\" in clean legible lettering");
    pos.push("highly detailed", "sharp focus");
    var neg = SD_NEGATIVE + (d.text ? "" : ", text") + (d.avoid.length ? ", " + d.avoid.join(", ") : "");
    var out = "POSITIVE PROMPT:\n" + pos.join(", ") + "\n\nNEGATIVE PROMPT:\n" + neg + "\n\nSIZE: " + ASPECTS[d.aspect].sdxl + " (" + d.aspect + ")";
    if (d.fromPhoto) out += "\nMODE: image-to-image with your photo as the init image; start around 0.5-0.6 denoising strength to keep the subject recognizable.";
    return out;
  }

  function tipsFor(d) {
    var tips = {
      chatgpt: "Paste this into ChatGPT" + (d.fromPhoto ? " after attaching your photo" : "") + ". If one detail comes out wrong, reply with just that fix (for example \"keep everything, but make the lighting warmer\") instead of starting over.",
      gemini: "Paste this into Gemini" + (d.fromPhoto ? " after uploading your photo" : "") + ". Gemini is good at follow-up edits, so refine one change at a time in the same chat.",
      midjourney: "Paste this after /imagine in Midjourney" + (d.fromPhoto ? ", replacing the placeholder with your uploaded image link" : "") + ". Keep the parameters (--ar, --no) at the end of the prompt.",
      sd: "Use the positive and negative prompts in separate fields. Many Flux setups ignore negative prompts, so if something keeps appearing, add \"no ...\" to the positive prompt instead."
    };
    var t = tips[d.tool] || tips.chatgpt;
    if (d.text) t += " AI text can still come out misspelled; keep it short and regenerate if needed.";
    return t;
  }

  function build(d) {
    if (d.tool === "midjourney") return buildMidjourney(d);
    if (d.tool === "sd") return buildSD(d);
    return buildNatural(d);
  }

  function init() {
    var form = document.getElementById("image-prompt-form");
    if (!form) return;
    var output = document.getElementById("image-prompt-output");
    var outputWrap = document.getElementById("image-prompt-output-wrap");
    var tips = document.getElementById("image-prompt-tips");
    var heading = document.getElementById("image-prompt-output-title");
    var subject = document.getElementById("img-subject");
    var status = document.getElementById("image-prompt-status");

    function generate(scroll) {
      var d = read();
      if (!d.subject) {
        status.textContent = "Describe what you want to see first, e.g. \"a cozy coffee shop on a rainy evening\".";
        subject.focus();
        return;
      }
      status.textContent = "";
      output.textContent = build(d);
      heading.textContent = "Your " + TOOL_NAMES[d.tool] + " Prompt";
      tips.textContent = tipsFor(d);
      outputWrap.hidden = false;
      if (scroll) outputWrap.scrollIntoView({ behavior: "smooth", block: "start" });
      if (window.PoloTrack) window.PoloTrack("generate_image_prompt", { ai_tool: d.tool, style: val("img-style") });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      generate(true);
    });

    document.getElementById("img-surprise").addEventListener("click", function () {
      subject.value = pick(SURPRISE);
      document.getElementById("img-from-photo").checked = false;
      ["img-style", "img-lighting", "img-shot", "img-aspect"].forEach(function (id) {
        var sel = document.getElementById(id);
        var opts = Array.prototype.filter.call(sel.options, function (o) { return o.value !== "auto"; });
        sel.value = pick(opts).value;
      });
      generate(true);
    });

    // Once a prompt is showing, keep it in sync as options change.
    form.addEventListener("change", function () { if (!outputWrap.hidden && val("img-subject")) generate(false); });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
