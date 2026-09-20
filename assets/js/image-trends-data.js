/* PoloPrompt — bundled fallback for the homepage "Trending Image Styles" section.
   Field names match the /api/image-trends response shape exactly (snake_case).
   image_url points at free placeholder stock photos — swap these for real
   generated examples of each style whenever they're ready. */
var IMAGE_TRENDS = [
  {
    id: "trend-90s-film",
    theme: "90's Film Photo",
    description: "Grainy disposable-camera colors, soft flash, and that faded photo-lab look everyone's nostalgic for.",
    image_url: "https://picsum.photos/seed/poloprompt-90s-film/640/480",
    prompt: "Turn this photo into a 1990s disposable camera photograph: warm faded colors, visible film grain, soft on-camera flash, slightly overexposed highlights, a printed photo-lab date stamp in the corner, and a slightly blurry candid feel. Keep the person's face, pose, and outfit exactly as in the original photo.",
    tags: ["Retro", "Film Grain", "Nostalgic", "Portrait"],
    sort_order: 1
  },
  {
    id: "trend-y2k-digital",
    theme: "Y2K Digital Aesthetic",
    description: "Early-2000s digicam flash, chunky glossy UI chrome, and butterfly-clip sparkle energy.",
    image_url: "https://picsum.photos/seed/poloprompt-y2k/640/480",
    prompt: "Restyle this photo in a Y2K digital camera aesthetic: harsh direct flash, slightly blown-out skin tones, low-resolution digicam softness, chunky glossy chrome UI stickers and sparkle overlays in the corners, a small timestamp in the bottom right. Keep the subject's face, pose, and outfit exactly as in the original photo.",
    tags: ["Retro", "Y2K", "Flash Photography", "Portrait"],
    sort_order: 2
  },
  {
    id: "trend-ghibli-anime",
    theme: "Studio Ghibli Anime",
    description: "Hand-painted backgrounds, soft lighting, and warm watercolor skies in the Ghibli style.",
    image_url: "https://picsum.photos/seed/poloprompt-ghibli/640/480",
    prompt: "Reimagine this photo as a Studio Ghibli-style anime illustration: soft hand-painted textures, warm watercolor lighting, gentle line art, a dreamy pastel-toned background, and expressive but natural facial features. Keep the subject's pose, hairstyle, and outfit recognizable from the original photo.",
    tags: ["Anime", "Illustration", "Fantasy", "Portrait"],
    sort_order: 3
  },
  {
    id: "trend-cyberpunk-neon",
    theme: "Cyberpunk Neon",
    description: "Rain-slicked streets, magenta and cyan neon glow, futuristic city-at-night energy.",
    image_url: "https://picsum.photos/seed/poloprompt-cyberpunk/640/480",
    prompt: "Transform this photo into a cyberpunk neon portrait: dramatic magenta and cyan neon lighting on the face, a blurred futuristic rain-slicked city street at night in the background, subtle chromatic aberration, and a cinematic moody atmosphere. Keep the subject's face, pose, and outfit recognizable from the original photo.",
    tags: ["Cyberpunk", "Neon", "Cinematic", "Portrait"],
    sort_order: 4
  },
  {
    id: "trend-vintage-polaroid",
    theme: "Vintage Polaroid",
    description: "Instant-film white border, soft contrast, and a warm nostalgic color cast.",
    image_url: "https://picsum.photos/seed/poloprompt-polaroid/640/480",
    prompt: "Convert this photo into a vintage instant-film Polaroid: soft muted contrast, a warm yellow-and-brown color cast, gentle vignette in the corners, light film grain, and a classic thick white Polaroid border with rounded corners. Keep the subject's face, pose, and outfit exactly as in the original photo.",
    tags: ["Retro", "Nostalgic", "Film Grain", "Portrait"],
    sort_order: 5
  },
  {
    id: "trend-renaissance-painting",
    theme: "Renaissance Oil Painting",
    description: "Rich chiaroscuro lighting and classical brushwork, like a portrait hanging in a museum.",
    image_url: "https://picsum.photos/seed/poloprompt-renaissance/640/480",
    prompt: "Reimagine this photo as a Renaissance-era oil painting portrait: rich chiaroscuro lighting, deep shadows, classical brushwork texture, an ornate dark background, and period-appropriate soft glazing on the skin. Keep the subject's face, pose, and general outfit silhouette recognizable from the original photo.",
    tags: ["Painting", "Classical", "Fine Art", "Portrait"],
    sort_order: 6
  },
  {
    id: "trend-vaporwave",
    theme: "Vaporwave Aesthetic",
    description: "Pastel pink-and-purple gradients, retro-futuristic grids, and dreamy 80s/90s digital nostalgia.",
    image_url: "https://picsum.photos/seed/poloprompt-vaporwave/640/480",
    prompt: "Restyle this photo with a vaporwave aesthetic: pastel pink-and-purple gradient lighting, a glowing retro grid horizon in the background, soft chromatic glow, subtle VHS scanlines, and a dreamy retro-futuristic mood. Keep the subject's face, pose, and outfit recognizable from the original photo.",
    tags: ["Vaporwave", "Retro", "Neon", "Portrait"],
    sort_order: 7
  },
  {
    id: "trend-film-noir",
    theme: "Film Noir Black & White",
    description: "High-contrast black-and-white lighting, hard shadows, and moody detective-movie drama.",
    image_url: "https://picsum.photos/seed/poloprompt-film-noir/640/480",
    prompt: "Convert this photo into a classic film noir black-and-white portrait: high-contrast lighting, hard venetian-blind shadows, deep blacks and crisp whites, a smoky moody atmosphere, and a dramatic cinematic 1940s detective-movie feel. Keep the subject's face, pose, and outfit recognizable from the original photo.",
    tags: ["Black & White", "Cinematic", "Moody", "Portrait"],
    sort_order: 8
  }
];
