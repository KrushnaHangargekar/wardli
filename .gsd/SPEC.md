# Specification: Wardli — MVP Feature Update (Outfit History + Accessories)

Status: FINALIZED
Date: 2026-10-23
Version: 1.0.0

## 1. Project Overview & Brand Identity
- **Brand Name**: Wardli
- **Tagline**: "Your wardrobe. Your everyday style."
- **Logo**: Black rounded-square icon with a white lowercase "w."
- **Wordmark**: Lowercase "wardli"
- **Visual Style**: Premium, minimal, monochromatic (#000000, #FFFFFF, #1F1F1F, #E5E5E5)
- **Constraint**: Zero AI integration. All suggestions, compatibility, and repetitions are deterministic rule-based algorithms.
- **Architectural Separation**: The public marketing website is kept distinct from the core Wardli application.

## 2. Wardrobe & Accessories Domain
- **Categories**:
  - Tops (T-shirts, shirts, hoodies, sweaters, jackets)
  - Bottoms (jeans, trousers, shorts, skirts, etc.)
  - Footwear (sneakers, formal shoes, boots, sandals, slippers)
  - Accessories (watches, belts, sunglasses, jewellery, rings, chains, bracelets, earrings, wallets, bags, backpacks, caps, hats, scarves, ties, socks)
  - Custom Categories (user-defined extensible categories)
- **Garment Model**:
  - `id`: Unique identifier
  - `userId`: Owner ID
  - `name`: Garment name
  - `category`: Category string
  - `subcategory`: Specific subcategory
  - `photoUrl`: Image URL / SVG representation / local image
  - `primaryColor`: Color hex/name
  - `secondaryColor`: Optional secondary color
  - `occasions`: Array of occasions (College, Office, Casual, Party, Formal, Travel)
  - `status`: Clean | Worn | In Laundry | Reserved
  - `purchasePrice`: Optional number
  - `purchaseDate`: Optional ISO date
  - `wearCount`: Non-negative integer (derived/synchronized from history)
  - `isArchived`: Soft-delete flag
  - `createdAt`: ISO timestamp
- **Privacy**: Strict owner-level isolation; user data cannot be accessed across different accounts.

## 3. Outfit Builder & Rule-Based Suggestions
- **Suggestion Engine**:
  - Generates up to 3 compatible outfit suggestions per occasion request.
  - Composition: 1 Top + 1 Bottom + 1 Footwear + 0 to 3 compatible Accessories.
  - Rules:
    - Availability: Never include items with status != Clean (strictly exclude In Laundry, Reserved, Worn).
    - Color Compatibility: Classic harmony (Monochrome, Neutrals, High Contrast, Harmonious pairs).
    - Occasion Match: Scored based on occasion tags.
    - Repetition Scoring: Penalizes items worn inside the configurable avoidance window.
    - Fallback: Deterministic best-match fallback if strict constraints cannot yield 3 options.
- **Interactive Editing**:
  - Single-item swap: Replace any top, bottom, shoes, or accessory without altering the rest.
  - Accessory removal: Remove optional accessories independently.
  - Actions: Save, Favourite, Reject, and "I Wore This".

## 4. Exact Outfit History
- **Wear Record (`outfit_events`)**:
  - `id`: Event ID
  - `userId`: Owner ID
  - `outfitId`: Optional saved outfit ID
  - `itemIds`: Exact array of garment/accessory IDs worn
  - `itemSnapshots`: Full JSON snapshot of each item's state at wear time (preserves history if item is archived/edited)
  - `wearDate`: ISO date (YYYY-MM-DD)
  - `wearTime`: Optional time (HH:mm)
  - `occasion`: Occasion string
  - `notes`: Optional user notes
  - `createdAt`: Timestamp
- **History UI**:
  - Grouped by Day, Week, and Month.
  - Detail view showing every top, bottom, shoe, and accessory photo and specs.
  - Manual entry of past outfits (pick date, select wardrobe items, occasion, notes).
  - Editing/correction of existing history entries (date, notes, items).
  - Deletion of history entries (with wear count decrement).
  - Search by date and filter by occasion.
  - Strict Rule: Planned outfits or generated outfits DO NOT count as worn unless explicitly confirmed by user.

## 5. Outfit Repetition Control
- Configurable avoidance window (default 7 days, adjustable 3 to 30 days).
- Formula assigns recency penalties to garments and accessories.
- Clear indication of whether an outfit has been worn before based on verified history.

## 6. Weekly Planner
- Calendar interface for scheduling outfits for future dates (`planned_outfits`).
- Planning does not increment wear count.
- Status flags & warnings for items marked "In Laundry" or "Reserved".
- One-tap "Mark as Worn" converts planned outfit into an exact wear history record.

## 7. Wardrobe Analytics
- Most-worn & least-worn garments.
- Most-worn accessories.
- Outfits recorded by month.
- Outfit repetition rate and unique combinations score.
- Cost-per-wear (CPW = purchasePrice / wearCount) for priced items.
- Empty states when history is sparse.

## 8. Security & Multi-User Isolation
- Multi-user data isolation.
- Production Firestore Security Rules and Storage rules.
