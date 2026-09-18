(function () {
  "use strict";

  var marketplaceSpecs = {
    Amazon: "Format for Amazon: (1) a keyword-rich TITLE of 200 characters or fewer following Amazon's Brand + Product + Key Feature + Size/Quantity pattern, (2) exactly 5 BULLET POINTS, each leading with a benefit in capital letters followed by a short explanation, (3) a short DESCRIPTION paragraph, and (4) a note suggesting 5-6 BACKEND SEARCH TERMS (comma-separated, no repeated words from the title) for Amazon's hidden keyword field.",
    Shopify: "Format for Shopify: (1) an SEO-friendly TITLE under 70 characters, (2) a short, punchy DESCRIPTION of 2-3 sentences written in a confident brand voice suitable for a product page, (3) 3-4 short feature bullet points, and (4) a META DESCRIPTION under 155 characters optimized for Google search snippets.",
    Etsy: "Format for Etsy: (1) a warm, story-driven TITLE that leads with the product and includes 1-2 descriptive keywords, (2) a DESCRIPTION written in a personal, story-driven tone that mentions materials, dimensions, and how the item is made or used, (3) a short note on care/shipping if relevant, and (4) a list of 8-10 SEO TAGS (Etsy allows up to 13, 20 characters each) mixing broad and long-tail search terms.",
    Meesho: "Format for Meesho: (1) a simple, direct TITLE using everyday language (avoid jargon), (2) 3-4 SHORT BULLET POINTS written in plain, easy-to-scan language for price-sensitive mobile shoppers, and (3) a one-line note on value-for-money positioning (e.g. price, combo, or quality reassurance) since Meesho buyers compare prices heavily before purchasing."
  };

  var BANNED_PHRASES = "unlock, elevate, game-changer, must-have, revolutionize, seamless, seamlessly, take your ... to the next level, look no further, perfect for any occasion, whether you're ... or ..., unmatched quality, unparalleled";

  var fewShotByMarketplace = {
    Amazon: "EXAMPLE OF THE QUALITY BAR (different product, do not reuse this content):\nTITLE: KitchenPro Stainless Steel Garlic Press, Heavy-Duty Rust-Proof Mincer with Cleaning Brush\nBULLETS:\nEFFORTLESS MINCING — One squeeze crushes a full clove without pre-peeling, cutting prep time in half.\nBUILT TO LAST — Cast from solid 18/8 stainless steel that resists rust and won't crack like plastic presses.",
    Shopify: "EXAMPLE OF THE QUALITY BAR (different product, do not reuse this content):\nTITLE: Minimalist Leather Card Wallet — Slim RFID-Blocking Design\nDESCRIPTION: Ditch the bulky billfold. This wallet holds six cards and folded cash in a body thinner than your phone case, with RFID-blocking lining so a bump on the subway stays just a bump.",
    Etsy: "EXAMPLE OF THE QUALITY BAR (different product, do not reuse this content):\nTITLE: Hand-Stamped Copper Ring, Custom Coordinates, Personalized Gift\nDESCRIPTION: Each ring is stamped by hand in my small studio from solid copper, so no two are quite alike. Give someone the exact coordinates of the place you met, or the day everything changed.",
    Meesho: "EXAMPLE OF THE QUALITY BAR (different product, do not reuse this content):\nTITLE: Cotton Printed Kurti for Women, Comfortable Daily Wear\nBULLETS:\nSoft cotton fabric, comfortable for all-day wear.\nAvailable in 5 sizes, true to fit.\nPrice includes 3-piece combo — great value for the price."
  };

  function buildPrompt(data) {
    var marketplaceNote = marketplaceSpecs[data.marketplace] || "";
    var fewShot = fewShotByMarketplace[data.marketplace] || "";
    var benefitsLine = data.benefits.length
      ? data.benefits.join(", ")
      : "no specific benefits selected — infer 2-3 believable benefits from the product name/feature";
    var count = data.variantCount || 1;

    var taskLine = count > 1
      ? "TASK: Write " + count + " DISTINCT title + bullet-point options (keep one shared description) for the product below, optimized for " + data.marketplace + ". Each title/bullet set should lead with a different selling angle (e.g. one leads with durability, one with value, one with lifestyle use) — label them \"OPTION 1\", \"OPTION 2\", etc."
      : "TASK: Write a complete product listing (title, bullet points, and description) for the product below, optimized for " + data.marketplace + ".";

    return [
      "You are a senior e-commerce copywriter who has written listings that consistently outrank competitors on " + data.marketplace + ".",
      "",
      taskLine,
      "",
      "PRODUCT NAME / CORE MATERIAL OR FEATURE: " + data.product,
      "",
      "KEY BENEFITS TO HIGHLIGHT: " + benefitsLine + ". Weave these naturally into the bullet points and description rather than listing them as raw words.",
      "",
      "MARKETPLACE FORMATTING REQUIREMENTS: " + marketplaceNote,
      "",
      fewShot,
      "",
      "HARD CONSTRAINTS:",
      "- Never use these overused listing clichés or close variants of them: " + BANNED_PHRASES + ".",
      "- Do not claim certifications, awards, or specs that weren't given to you above.",
      "- No keyword-stuffed run-on sentences — every bullet must read naturally out loud.",
      "- Do not use ALL CAPS for more than the first 2-4 words of a bullet.",
      "",
      "OUTPUT INSTRUCTIONS:",
      "- Return only the finished listing" + (count > 1 ? ", split into the " + count + " labeled options plus the shared description" : "") + ", clearly labeled by section (Title, Bullet Points, Description, and any marketplace-specific extras noted above).",
      "- Use persuasive, benefit-driven language, but keep every claim believable.",
      "- Match the tone and formatting conventions real sellers use on " + data.marketplace + ".",
      "- Do not include a preamble like \"Here's your listing\" — start directly with the labeled content.",
      "- Before finalizing, silently re-check every hard constraint above and fix any violation."
    ].join("\n");
  }

  function init() {
    var form = document.getElementById("product-form");
    var output = document.getElementById("product-output");
    var outputWrap = document.getElementById("product-output-wrap");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var productInput = document.getElementById("product-name");
      var product = productInput.value.trim();
      if (!product) {
        productInput.focus();
        return;
      }

      var benefits = [];
      document.querySelectorAll("#benefits-grid input[type=checkbox]:checked").forEach(function (cb) {
        benefits.push(cb.value);
      });

      var data = {
        product: product,
        benefits: benefits,
        marketplace: document.getElementById("marketplace").value,
        variantCount: parseInt(document.getElementById("variant-count").value, 10) || 1
      };

      output.textContent = buildPrompt(data);
      outputWrap.hidden = false;
      outputWrap.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
