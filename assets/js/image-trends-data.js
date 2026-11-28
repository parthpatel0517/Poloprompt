/* PoloPrompt — bundled fallback for the homepage "Trending Image Styles" section.
   Field names match the /api/image-trends response shape exactly (snake_case).
   image_url points at an original illustrated preview of each style
   (assets/img/trends/<id>.webp, alt text "... style illustration"). They are
   drawn artwork, not AI outputs, so nothing on the page claims to be a real
   result of the prompt. Swap in a genuine example image any time; clear the
   field and the card falls back to a labelled colour tile. */
var IMAGE_TRENDS = [
  {
    id: "trend-90s-film",
    theme: "90's Film Photo",
    description: "Grainy disposable-camera colors, soft flash, and that faded photo-lab look everyone's nostalgic for.",
    image_url: "/assets/img/trends/trend-90s-film.webp",
    prompt: "Turn this photo into a 1990s disposable camera photograph: warm faded colors, visible film grain, soft on-camera flash, slightly overexposed highlights, a printed photo-lab date stamp in the corner, and a slightly blurry candid feel. Keep the person's face, pose, and outfit exactly as in the original photo.",
    tags: ["Retro", "Film Grain", "Nostalgic", "Portrait"],
    sort_order: 1
  },
  {
    id: "trend-y2k-digital",
    theme: "Y2K Digital Aesthetic",
    description: "Early-2000s digicam flash, chunky glossy UI chrome, and butterfly-clip sparkle energy.",
    image_url: "/assets/img/trends/trend-y2k-digital.webp",
    prompt: "Restyle this photo in a Y2K digital camera aesthetic: harsh direct flash, slightly blown-out skin tones, low-resolution digicam softness, chunky glossy chrome UI stickers and sparkle overlays in the corners, a small timestamp in the bottom right. Keep the subject's face, pose, and outfit exactly as in the original photo.",
    tags: ["Retro", "Y2K", "Flash Photography", "Portrait"],
    sort_order: 2
  },
  {
    id: "trend-ghibli-anime",
    theme: "Studio Ghibli Anime",
    description: "Hand-painted backgrounds, soft lighting, and warm watercolor skies in the Ghibli style.",
    image_url: "/assets/img/trends/trend-ghibli-anime.webp",
    prompt: "Reimagine this photo as a Studio Ghibli-style anime illustration: soft hand-painted textures, warm watercolor lighting, gentle line art, a dreamy pastel-toned background, and expressive but natural facial features. Keep the subject's pose, hairstyle, and outfit recognizable from the original photo.",
    tags: ["Anime", "Illustration", "Fantasy", "Portrait"],
    sort_order: 3
  },
  {
    id: "trend-cyberpunk-neon",
    theme: "Cyberpunk Neon",
    description: "Rain-slicked streets, magenta and cyan neon glow, futuristic city-at-night energy.",
    image_url: "/assets/img/trends/trend-cyberpunk-neon.webp",
    prompt: "Transform this photo into a cyberpunk neon portrait: dramatic magenta and cyan neon lighting on the face, a blurred futuristic rain-slicked city street at night in the background, subtle chromatic aberration, and a cinematic moody atmosphere. Keep the subject's face, pose, and outfit recognizable from the original photo.",
    tags: ["Cyberpunk", "Neon", "Cinematic", "Portrait"],
    sort_order: 4
  },
  {
    id: "trend-vintage-polaroid",
    theme: "Vintage Polaroid",
    description: "Instant-film white border, soft contrast, and a warm nostalgic color cast.",
    image_url: "/assets/img/trends/trend-vintage-polaroid.webp",
    prompt: "Convert this photo into a vintage instant-film Polaroid: soft muted contrast, a warm yellow-and-brown color cast, gentle vignette in the corners, light film grain, and a classic thick white Polaroid border with rounded corners. Keep the subject's face, pose, and outfit exactly as in the original photo.",
    tags: ["Retro", "Nostalgic", "Film Grain", "Portrait"],
    sort_order: 5
  },
  {
    id: "trend-renaissance-painting",
    theme: "Renaissance Oil Painting",
    description: "Rich chiaroscuro lighting and classical brushwork, like a portrait hanging in a museum.",
    image_url: "/assets/img/trends/trend-renaissance-painting.webp",
    prompt: "Reimagine this photo as a Renaissance-era oil painting portrait: rich chiaroscuro lighting, deep shadows, classical brushwork texture, an ornate dark background, and period-appropriate soft glazing on the skin. Keep the subject's face, pose, and general outfit silhouette recognizable from the original photo.",
    tags: ["Painting", "Classical", "Fine Art", "Portrait"],
    sort_order: 6
  },
  {
    id: "trend-vaporwave",
    theme: "Vaporwave Aesthetic",
    description: "Pastel pink-and-purple gradients, retro-futuristic grids, and dreamy 80s/90s digital nostalgia.",
    image_url: "/assets/img/trends/trend-vaporwave.webp",
    prompt: "Restyle this photo with a vaporwave aesthetic: pastel pink-and-purple gradient lighting, a glowing retro grid horizon in the background, soft chromatic glow, subtle VHS scanlines, and a dreamy retro-futuristic mood. Keep the subject's face, pose, and outfit recognizable from the original photo.",
    tags: ["Vaporwave", "Retro", "Neon", "Portrait"],
    sort_order: 7
  },
  {
    id: "trend-film-noir",
    theme: "Film Noir Black & White",
    description: "High-contrast black-and-white lighting, hard shadows, and moody detective-movie drama.",
    image_url: "/assets/img/trends/trend-film-noir.webp",
    prompt: "Convert this photo into a classic film noir black-and-white portrait: high-contrast lighting, hard venetian-blind shadows, deep blacks and crisp whites, a smoky moody atmosphere, and a dramatic cinematic 1940s detective-movie feel. Keep the subject's face, pose, and outfit recognizable from the original photo.",
    tags: ["Black & White", "Cinematic", "Moody", "Portrait"],
    sort_order: 8
  },
  {
    id: "trend-3d-animated",
    theme: "3D Animated Character",
    description: "Glossy 3D-animated character look with soft studio lighting and big expressive eyes.",
    image_url: "/assets/img/trends/trend-3d-animated.webp",
    prompt: "Turn this photo into a glossy stylized 3D-animated character render: smooth rounded proportions, big expressive eyes, soft studio three-point lighting, subtle subsurface skin scattering, and a clean simple background. Keep the subject's hairstyle, outfit colors, and general likeness recognizable from the original photo.",
    tags: ["3D", "Animated", "Character", "Portrait"],
    sort_order: 9
  },
  {
    id: "trend-fantasy-character",
    theme: "Fantasy Character",
    description: "Epic fantasy portrait with ornate armor, a magical glow, and dramatic cinematic lighting.",
    image_url: "/assets/img/trends/trend-fantasy-character.webp",
    prompt: "Reimagine this photo as an epic fantasy character portrait: ornate detailed armor or robes, a subtle magical glow around the hands or eyes, dramatic rim lighting, a misty ancient-ruins or enchanted-forest background, and painterly digital-art texture. Keep the subject's face and general likeness recognizable from the original photo.",
    tags: ["Fantasy", "Character", "Cinematic", "Portrait"],
    sort_order: 10
  },
  {
    id: "trend-paper-craft",
    theme: "Infographic / Paper Craft",
    description: "Flat paper-cutout illustration with layered shadows, popular for clean social media posts.",
    image_url: "/assets/img/trends/trend-paper-craft.webp",
    prompt: "Restyle this photo as a layered paper-craft illustration: flat cut-paper shapes, soft drop shadows between layers, simple bold color blocking, clean minimal shapes instead of fine detail, and a subtle craft-paper texture. Keep the subject's pose and general silhouette recognizable from the original photo.",
    tags: ["Paper Craft", "Infographic", "Illustration", "Portrait"],
    sort_order: 11
  },
  {
    id: "trend-festive-portrait",
    theme: "Patriotic / Festive Portrait",
    description: "Warm festival lighting and flag-inspired colors, popular for holiday and celebration posts.",
    image_url: "/assets/img/trends/trend-festive-portrait.webp",
    prompt: "Restyle this photo as a warm festive celebration portrait: soft golden-hour lighting, gentle bokeh from string lights or fireworks in the background, warm patriotic color grading, and a joyful festive atmosphere. Keep the subject's face, pose, and outfit exactly as in the original photo.",
    tags: ["Patriotic", "Festive", "Portrait", "Nature"],
    sort_order: 12
  },
  {
    id: "trend-action-figure-box",
    theme: "Action Figure in a Box",
    description: "You as a collectible toy sealed in blister packaging, with a custom name, tagline and job-themed accessories.",
    image_url: "/assets/img/trends/trend-action-figure-box.webp",
    prompt: "Turn the person in this photo into a collectible action figure sealed in retail blister packaging: a clear molded plastic bubble on a bold printed backing card with the name '[YOUR NAME]' in toy-brand lettering across the top, and three small accessories that match their job or hobbies in molded slots beside the figure. Painted-vinyl finish with visible shoulder and knee joints, bright even studio lighting and a plain light-grey background. Keep the person's face, hairstyle and outfit recognizable from the original photo.",
    tags: ["Toy", "3D", "Character", "Portrait"],
    sort_order: 13
  },
  {
    id: "trend-claymation",
    theme: "Claymation Character",
    description: "Handmade plasticine look with fingerprints, chunky proportions and a tiny stop-motion set.",
    image_url: "/assets/img/trends/trend-claymation.webp",
    prompt: "Transform this photo into a claymation stop-motion still: the person sculpted from matte plasticine with visible fingerprints and tool marks, slightly oversized head and hands, standing on a miniature handmade set built from felt, cardboard and clay props. Warm tabletop lighting with small soft shadows and a gently blurred background. Keep the person's face, hairstyle and outfit recognizable from the original photo.",
    tags: ["3D", "Claymation", "Character", "Portrait"],
    sort_order: 14
  },
  {
    id: "trend-chibi-sticker",
    theme: "Chibi Sticker Sheet",
    description: "Cute big-head mini versions of you in six expressions, each with a white die-cut sticker border.",
    image_url: "/assets/img/trends/trend-chibi-sticker.webp",
    prompt: "Create a sticker sheet of the person in this photo in a cute chibi style: oversized head, small rounded body, big expressive eyes. Show six stickers in a neat grid, each with a different expression or pose (waving, laughing, sleepy, thumbs up, surprised, heart hands), thick white die-cut borders, clean bold outlines and flat pastel colors on a plain white background. Keep the person's hairstyle, outfit and key features recognizable from the original photo.",
    tags: ["Anime", "Illustration", "Sticker", "Portrait"],
    sort_order: 15
  },
  {
    id: "trend-pixel-art",
    theme: "16-Bit Pixel Art",
    description: "Retro video-game portrait with crisp square pixels, a limited palette and a classic RPG frame.",
    image_url: "/assets/img/trends/trend-pixel-art.webp",
    prompt: "Convert this photo into a 16-bit pixel art character portrait from a classic 1990s role-playing game: a strict pixel grid with no blur or anti-aliasing, a limited palette of about 24 colors, 1-pixel dark outlines, a head-and-shoulders three-quarter view, and a simple dithered background inside a decorative pixel UI frame. Keep the person's face shape, hairstyle and outfit colors recognizable from the original photo.",
    tags: ["Retro", "Pixel Art", "Gaming", "Portrait"],
    sort_order: 16
  },
  {
    id: "trend-comic-book",
    theme: "Comic Book Pop Art",
    description: "Bold ink outlines, halftone dots and punchy primary colors, like a panel from a vintage comic.",
    image_url: "/assets/img/trends/trend-comic-book.webp",
    prompt: "Restyle this photo as a vintage comic book panel: bold black ink outlines, visible Ben-Day halftone dots in the shading, a punchy limited palette of red, yellow, blue and black, dramatic speed lines or a radiating burst in the background, and slightly exaggerated heroic lighting. No speech bubbles or text. Keep the person's face, pose and outfit recognizable from the original photo.",
    tags: ["Comic", "Illustration", "Pop Art", "Portrait"],
    sort_order: 17
  },
  {
    id: "trend-watercolor",
    theme: "Watercolor Portrait",
    description: "Soft washes, blooming edges and visible paper texture for a delicate hand-painted look.",
    image_url: "/assets/img/trends/trend-watercolor.webp",
    prompt: "Repaint this photo as a loose watercolor portrait: soft transparent washes, colors blooming and bleeding at the edges, a few confident pencil sketch lines showing through, areas of untouched white paper, and visible cold-press paper texture. Keep the palette fresh and light with deeper pigment only around the eyes and hair. Keep the person's face, pose and outfit recognizable from the original photo.",
    tags: ["Painting", "Watercolor", "Fine Art", "Portrait"],
    sort_order: 18
  }
];
