/**
 * Wardli Domain Constants & Configuration
 */

export const BRAND = {
  name: 'Wardli',
  tagline: 'Your wardrobe. Your everyday style.',
  wordmark: 'wardli',
  colors: {
    black: '#000000',
    white: '#FFFFFF',
    darkGrey: '#1F1F1F',
    lightGrey: '#E5E5E5',
    subtleGrey: '#F4F4F5',
    textMuted: '#71717A'
  }
};

export const CORE_CATEGORIES = {
  TOPS: 'Tops',
  BOTTOMS: 'Bottoms',
  FOOTWEAR: 'Footwear',
  ACCESSORIES: 'Accessories'
};

export const DEFAULT_SUBCATEGORIES = {
  Tops: ['T-shirt', 'Shirt', 'Hoodie', 'Sweater', 'Jacket', 'Polo', 'Overshirt'],
  Bottoms: ['Jeans', 'Trousers', 'Shorts', 'Skirt', 'Chinos', 'Cargo Pants'],
  Footwear: ['Sneakers', 'Formal Shoes', 'Boots', 'Sandals', 'Slippers', 'Loafers'],
  Accessories: [
    'Watch',
    'Belt',
    'Sunglasses',
    'Jewellery',
    'Ring',
    'Chain',
    'Bracelet',
    'Earrings',
    'Wallet',
    'Bag',
    'Backpack',
    'Cap',
    'Hat',
    'Scarf',
    'Tie',
    'Socks'
  ]
};

export const AVAILABILITY_STATUS = {
  CLEAN: 'Clean',
  WORN: 'Worn',
  IN_LAUNDRY: 'In Laundry',
  RESERVED: 'Reserved'
};

export const OCCASIONS = [
  'Casual',
  'College',
  'Office',
  'Party',
  'Formal',
  'Travel'
];

export const COLOR_PALETTES = [
  { name: 'Black', hex: '#000000', isNeutral: true },
  { name: 'White', hex: '#FFFFFF', isNeutral: true },
  { name: 'Grey', hex: '#808080', isNeutral: true },
  { name: 'Navy', hex: '#001F3F', isNeutral: true },
  { name: 'Charcoal', hex: '#333333', isNeutral: true },
  { name: 'Beige', hex: '#F5F5DC', isNeutral: true },
  { name: 'Khaki', hex: '#C3B091', isNeutral: true },
  { name: 'Brown', hex: '#5C4033', isNeutral: true },
  { name: 'Cream', hex: '#FFFDD0', isNeutral: true },
  { name: 'Olive', hex: '#556B2F', isNeutral: false },
  { name: 'Blue', hex: '#2563EB', isNeutral: false },
  { name: 'Burgundy', hex: '#800020', isNeutral: false },
  { name: 'Emerald Green', hex: '#059669', isNeutral: false },
  { name: 'Rust Orange', hex: '#C2410C', isNeutral: false },
  { name: 'Pastel Pink', hex: '#F472B6', isNeutral: false }
];

export const DEFAULT_AVOIDANCE_DAYS = 7;

export const CURRENCIES = {
  INR: { code: 'INR', symbol: '₹', label: '₹ INR (Indian Rupee)' },
  USD: { code: 'USD', symbol: '$', label: '$ USD (US Dollar)' },
  EUR: { code: 'EUR', symbol: '€', label: '€ EUR (Euro)' },
  GBP: { code: 'GBP', symbol: '£', label: '£ GBP (British Pound)' }
};
