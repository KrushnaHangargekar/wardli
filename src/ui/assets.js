/**
 * Wardli High-Aesthetic Minimalist SVG Asset Library
 * Provides crisp, monochromatic silhouette and line representations
 * for tops, bottoms, footwear, accessories, and brand logos.
 */

export const BRAND_SVGS = {
  // Primary App Icon: Black rounded-square with white lowercase 'w.'
  appIcon: `
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="wardli-logo-svg">
      <rect width="100" height="100" rx="22" fill="#000000"/>
      <path d="M26 36L34.5 64L43 38H49L57.5 64L66 36H73L61 74H54L46 48L38 74H31L19 36H26Z" fill="#FFFFFF"/>
      <circle cx="76.5" cy="71" r="3.5" fill="#FFFFFF"/>
    </svg>
  `,

  // Light App Icon: White background, black 'w.'
  appIconLight: `
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="wardli-logo-svg">
      <rect width="100" height="100" rx="22" fill="#FFFFFF" stroke="#E5E5E5" stroke-width="2"/>
      <path d="M26 36L34.5 64L43 38H49L57.5 64L66 36H73L61 74H54L46 48L38 74H31L19 36H26Z" fill="#000000"/>
      <circle cx="76.5" cy="71" r="3.5" fill="#000000"/>
    </svg>
  `,

  // Wordmark: 'wardli' in modern bold lowercase
  wordmark: `
    <svg viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="wardli-wordmark-svg">
      <text x="0" y="30" font-family="Inter, -apple-system, sans-serif" font-size="32" font-weight="800" letter-spacing="-1.5" fill="currentColor">wardli</text>
    </svg>
  `,

  // Feature icons (matching design sheet outline style)
  wardrobeIcon: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3c0 .7.3 1.3.8 1.8L2 14v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4l-7.8-7.2c.5-.5.8-1.1.8-1.8a3 3 0 0 0-3-3z"/>
    </svg>
  `,
  outfitIcon: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z"/>
    </svg>
  `,
  plannerIcon: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
      <line x1="16" x2="16" y1="2" y2="6"/>
      <line x1="8" x2="8" y1="2" y2="6"/>
      <line x1="3" x2="21" y1="10" y2="10"/>
    </svg>
  `,
  historyIcon: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  `,
  savedIcon: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
    </svg>
  `,
  analyticsIcon: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
      <line x1="18" x2="18" y1="20" y2="10"/>
      <line x1="12" x2="12" y1="20" y2="4"/>
      <line x1="6" x2="6" y1="20" y2="14"/>
    </svg>
  `,
  profileIcon: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="8" r="5"/>
      <path d="M20 21a8 8 0 0 0-16 0"/>
    </svg>
  `
};

/**
 * Returns a sleek, stylized minimal SVG graphic for any garment
 */
export function getGarmentSvg(category = 'Tops', subcategory = 'T-shirt', color = '#1F1F1F') {
  const cat = (category || '').toLowerCase();
  const sub = (subcategory || '').toLowerCase();

  // Dynamic stroke/fill based on primary color
  const isLight = ['white', '#ffffff', 'cream', '#fffdd0', 'beige'].includes(color.toLowerCase());
  const strokeColor = isLight ? '#27272A' : '#18181B';
  const fillColor = isLight ? '#F4F4F5' : color.startsWith('#') ? color : '#27272A';

  if (cat === 'tops') {
    if (sub.includes('shirt')) {
      // Button-down shirt
      return `
        <svg viewBox="0 0 120 120" fill="none" class="item-illustration" xmlns="http://www.w3.org/2000/svg">
          <path d="M35 25L45 15H75L85 25L108 40L95 62L82 52V105H38V52L25 62L12 40L35 25Z" fill="${fillColor}" stroke="${strokeColor}" stroke-width="2.5" stroke-linejoin="round"/>
          <path d="M60 15V105" stroke="${isLight ? '#71717A' : '#52525B'}" stroke-width="1.5" stroke-dasharray="2 3"/>
          <path d="M45 15L60 30L75 15" stroke="${strokeColor}" stroke-width="2" fill="none"/>
        </svg>
      `;
    } else if (sub.includes('hoodie')) {
      // Hoodie
      return `
        <svg viewBox="0 0 120 120" fill="none" class="item-illustration" xmlns="http://www.w3.org/2000/svg">
          <path d="M38 28C38 18 48 12 60 12C72 12 82 18 82 28L106 42L94 66L82 56V106H38V56L26 66L14 42L38 28Z" fill="${fillColor}" stroke="${strokeColor}" stroke-width="2.5" stroke-linejoin="round"/>
          <path d="M48 24C48 34 72 34 72 24" stroke="${strokeColor}" stroke-width="2"/>
          <rect x="46" y="80" width="28" height="18" rx="3" stroke="${isLight ? '#71717A' : '#52525B'}" stroke-width="1.5" fill="none"/>
        </svg>
      `;
    } else if (sub.includes('jacket') || sub.includes('coat')) {
      // Jacket
      return `
        <svg viewBox="0 0 120 120" fill="none" class="item-illustration" xmlns="http://www.w3.org/2000/svg">
          <path d="M34 26L48 18H72L86 26L108 44L94 68L84 56V108H36V56L26 68L12 44L34 26Z" fill="${fillColor}" stroke="${strokeColor}" stroke-width="2.5" stroke-linejoin="round"/>
          <path d="M48 18L58 48H62L72 18" stroke="${strokeColor}" stroke-width="2"/>
          <line x1="60" y1="48" x2="60" y2="108" stroke="${isLight ? '#71717A' : '#52525B'}" stroke-width="2"/>
        </svg>
      `;
    } else {
      // Minimalist T-shirt (box silhouette)
      return `
        <svg viewBox="0 0 120 120" fill="none" class="item-illustration" xmlns="http://www.w3.org/2000/svg">
          <path d="M36 22C42 27 78 27 84 22L106 38L92 60L82 52V104H38V52L28 60L14 38L36 22Z" fill="${fillColor}" stroke="${strokeColor}" stroke-width="2.5" stroke-linejoin="round"/>
          <path d="M46 22C46 29 74 29 74 22" stroke="${strokeColor}" stroke-width="2"/>
        </svg>
      `;
    }
  }

  if (cat === 'bottoms') {
    if (sub.includes('short')) {
      // Shorts
      return `
        <svg viewBox="0 0 120 120" fill="none" class="item-illustration" xmlns="http://www.w3.org/2000/svg">
          <path d="M36 20H84L90 74H64L60 48L56 74H30L36 20Z" fill="${fillColor}" stroke="${strokeColor}" stroke-width="2.5" stroke-linejoin="round"/>
          <line x1="36" y1="28" x2="84" y2="28" stroke="${isLight ? '#71717A' : '#52525B'}" stroke-width="1.5"/>
        </svg>
      `;
    } else {
      // Trousers / Jeans
      return `
        <svg viewBox="0 0 120 120" fill="none" class="item-illustration" xmlns="http://www.w3.org/2000/svg">
          <path d="M38 18H82L88 108H64L60 54L56 108H32L38 18Z" fill="${fillColor}" stroke="${strokeColor}" stroke-width="2.5" stroke-linejoin="round"/>
          <line x1="38" y1="26" x2="82" y2="26" stroke="${isLight ? '#71717A' : '#52525B'}" stroke-width="1.5"/>
          <line x1="60" y1="26" x2="60" y2="48" stroke="${isLight ? '#71717A' : '#52525B'}" stroke-width="1.5"/>
        </svg>
      `;
    }
  }

  if (cat === 'footwear') {
    if (sub.includes('boot')) {
      // Boots
      return `
        <svg viewBox="0 0 120 120" fill="none" class="item-illustration" xmlns="http://www.w3.org/2000/svg">
          <path d="M42 30H70V65L96 74C102 76 104 84 98 90L92 94H26C22 94 20 88 22 84L32 60L42 30Z" fill="${fillColor}" stroke="${strokeColor}" stroke-width="2.5" stroke-linejoin="round"/>
          <path d="M22 94H94" stroke="${strokeColor}" stroke-width="4"/>
        </svg>
      `;
    } else if (sub.includes('formal') || sub.includes('derbies') || sub.includes('loafer')) {
      // Formal Derbies / Loafers
      return `
        <svg viewBox="0 0 120 120" fill="none" class="item-illustration" xmlns="http://www.w3.org/2000/svg">
          <path d="M26 62C34 50 56 50 68 58L98 68C106 72 104 84 96 86H20C16 86 16 74 26 62Z" fill="${fillColor}" stroke="${strokeColor}" stroke-width="2.5" stroke-linejoin="round"/>
          <path d="M18 86H98" stroke="${strokeColor}" stroke-width="4"/>
          <rect x="22" y="86" width="16" height="5" fill="${strokeColor}"/>
        </svg>
      `;
    } else {
      // Minimal Low Sneakers
      return `
        <svg viewBox="0 0 120 120" fill="none" class="item-illustration" xmlns="http://www.w3.org/2000/svg">
          <path d="M28 58C36 48 54 48 64 54L96 64C104 68 104 78 98 84H20C16 84 16 72 28 58Z" fill="${fillColor}" stroke="${strokeColor}" stroke-width="2.5" stroke-linejoin="round"/>
          <line x1="48" y1="56" x2="60" y2="66" stroke="${isLight ? '#71717A' : '#52525B'}" stroke-width="1.5"/>
          <line x1="56" y1="58" x2="68" y2="68" stroke="${isLight ? '#71717A' : '#52525B'}" stroke-width="1.5"/>
          <path d="M18 84H98" stroke="${strokeColor}" stroke-width="5" stroke-linecap="round"/>
        </svg>
      `;
    }
  }

  // ACCESSORIES
  if (cat === 'accessories') {
    if (sub.includes('watch')) {
      return `
        <svg viewBox="0 0 120 120" fill="none" class="item-illustration" xmlns="http://www.w3.org/2000/svg">
          <rect x="48" y="14" width="24" height="92" rx="3" fill="${fillColor}" stroke="${strokeColor}" stroke-width="2"/>
          <circle cx="60" cy="60" r="24" fill="#FFFFFF" stroke="${strokeColor}" stroke-width="3"/>
          <circle cx="60" cy="60" r="2" fill="${strokeColor}"/>
          <line x1="60" y1="60" x2="60" y2="44" stroke="${strokeColor}" stroke-width="2" stroke-linecap="round"/>
          <line x1="60" y1="60" x2="72" y2="60" stroke="${strokeColor}" stroke-width="2" stroke-linecap="round"/>
        </svg>
      `;
    } else if (sub.includes('sunglasses')) {
      return `
        <svg viewBox="0 0 120 120" fill="none" class="item-illustration" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="48" width="34" height="26" rx="6" fill="${fillColor}" stroke="${strokeColor}" stroke-width="2.5"/>
          <rect x="66" y="48" width="34" height="26" rx="6" fill="${fillColor}" stroke="${strokeColor}" stroke-width="2.5"/>
          <path d="M54 54C57 51 63 51 66 54" stroke="${strokeColor}" stroke-width="2.5"/>
          <line x1="20" y1="52" x2="10" y2="46" stroke="${strokeColor}" stroke-width="2"/>
          <line x1="100" y1="52" x2="110" y2="46" stroke="${strokeColor}" stroke-width="2"/>
        </svg>
      `;
    } else if (sub.includes('belt')) {
      return `
        <svg viewBox="0 0 120 120" fill="none" class="item-illustration" xmlns="http://www.w3.org/2000/svg">
          <rect x="18" y="50" width="84" height="20" rx="3" fill="${fillColor}" stroke="${strokeColor}" stroke-width="2"/>
          <rect x="48" y="44" width="24" height="32" rx="4" stroke="${strokeColor}" stroke-width="3" fill="#FFFFFF"/>
          <line x1="60" y1="50" x2="60" y2="70" stroke="${strokeColor}" stroke-width="3"/>
        </svg>
      `;
    } else if (sub.includes('ring')) {
      return `
        <svg viewBox="0 0 120 120" fill="none" class="item-illustration" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="60" cy="62" rx="26" ry="24" stroke="${strokeColor}" stroke-width="4" fill="none"/>
          <rect x="46" y="36" width="28" height="14" rx="3" fill="${fillColor}" stroke="${strokeColor}" stroke-width="2"/>
        </svg>
      `;
    } else if (sub.includes('bag') || sub.includes('backpack')) {
      return `
        <svg viewBox="0 0 120 120" fill="none" class="item-illustration" xmlns="http://www.w3.org/2000/svg">
          <path d="M48 30C48 22 72 22 72 30" stroke="${strokeColor}" stroke-width="2.5" fill="none"/>
          <rect x="30" y="30" width="60" height="66" rx="8" fill="${fillColor}" stroke="${strokeColor}" stroke-width="2.5"/>
          <rect x="40" y="60" width="40" height="26" rx="4" stroke="${isLight ? '#71717A' : '#52525B'}" stroke-width="1.5" fill="none"/>
        </svg>
      `;
    } else if (sub.includes('cap') || sub.includes('hat')) {
      return `
        <svg viewBox="0 0 120 120" fill="none" class="item-illustration" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 65C30 40 90 40 90 65" stroke="${strokeColor}" stroke-width="2.5" fill="${fillColor}"/>
          <path d="M22 65C22 65 50 62 98 68C104 69 104 74 98 75H22C18 75 18 65 22 65Z" fill="${strokeColor}"/>
          <circle cx="60" cy="40" r="3" fill="${strokeColor}"/>
        </svg>
      `;
    } else {
      // General minimal accessory icon
      return `
        <svg viewBox="0 0 120 120" fill="none" class="item-illustration" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="30" stroke="${strokeColor}" stroke-width="2.5" fill="${fillColor}"/>
          <path d="M48 60L56 68L72 52" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
    }
  }

  // Fallback
  return `
    <svg viewBox="0 0 120 120" fill="none" class="item-illustration" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="30" width="60" height="60" rx="8" fill="${fillColor}" stroke="${strokeColor}" stroke-width="2"/>
    </svg>
  `;
}
