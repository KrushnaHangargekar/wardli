/**
 * Deterministic Rule-Based Outfit Suggestion Engine
 * Implements category compatibility, color theory, occasion matching,
 * user preference weighting, and strict repetition avoidance.
 * ZERO AI / Machine Learning APIs used.
 */

import { AVAILABILITY_STATUS, COLOR_PALETTES, DEFAULT_AVOIDANCE_DAYS } from '../domain/constants.js';
import { storage } from './storage.js';

// Color theory definitions
const NEUTRAL_COLORS = new Set([
  'black', 'white', 'grey', 'gray', 'charcoal', 'navy', 'beige', 'khaki', 'cream', 'denim', 'brown'
]);

export function calculateColorHarmony(color1, color2) {
  if (!color1 || !color2) return 15; // neutral assumption
  const c1 = color1.toLowerCase().trim();
  const c2 = color2.toLowerCase().trim();

  // 1. Same color / Monochrome
  if (c1 === c2) return 25;

  // 2. Both neutrals
  const c1Neutral = NEUTRAL_COLORS.has(c1);
  const c2Neutral = NEUTRAL_COLORS.has(c2);
  if (c1Neutral && c2Neutral) return 30;

  // 3. One neutral + one accent color (classic styling rule)
  if (c1Neutral || c2Neutral) return 25;

  // 4. Complementary / harmonious accents
  const harmoniousPairs = [
    ['blue', 'khaki'],
    ['olive', 'brown'],
    ['burgundy', 'navy'],
    ['olive', 'rust orange'],
    ['emerald green', 'beige']
  ];

  for (const [p1, p2] of harmoniousPairs) {
    if ((c1.includes(p1) && c2.includes(p2)) || (c1.includes(p2) && c2.includes(p1))) {
      return 20;
    }
  }

  // Mild accent match
  return 10;
}

export class SuggestionEngine {
  constructor(storageRepo = storage) {
    this.storage = storageRepo;
  }

  /**
   * Check if outfit has ever been worn in history
   */
  checkWearHistory(topId, bottomId, footwearId, accessoryIds = [], userId = this.storage.getCurrentUserId()) {
    const historyEvents = this.storage.getHistoryEvents(userId);
    const keySet = new Set([topId, bottomId, footwearId]);

    let matchCount = 0;
    let lastWorn = null;

    for (const evt of historyEvents) {
      const evtSet = new Set(evt.itemIds);
      if (evtSet.has(topId) && evtSet.has(bottomId) && evtSet.has(footwearId)) {
        matchCount++;
        if (!lastWorn || evt.wearDate > lastWorn) {
          lastWorn = evt.wearDate;
        }
      }
    }

    return {
      hasBeenWorn: matchCount > 0,
      totalWears: matchCount,
      lastWornDate: lastWorn
    };
  }

  /**
   * Generate up to 3 rule-based suggestions for an occasion
   */
  generateSuggestions({
    occasion = 'Casual',
    userId = this.storage.getCurrentUserId(),
    maxResults = 3
  }) {
    // 1. Get user repeat avoidance days from profile
    const profile = this.storage.getProfile(userId);
    const avoidanceDays = profile?.repeatAvoidanceDays || DEFAULT_AVOIDANCE_DAYS;

    // 2. Load garments: Strictly include only Clean and non-archived garments
    // NEVER include unavailable garments (In Laundry, Reserved, or Worn)
    const availableGarments = this.storage.getGarments(userId, { includeArchived: false })
      .filter(g => g.status === AVAILABILITY_STATUS.CLEAN);

    const tops = availableGarments.filter(g => g.category.toLowerCase() === 'tops');
    const bottoms = availableGarments.filter(g => g.category.toLowerCase() === 'bottoms');
    const footwear = availableGarments.filter(g => g.category.toLowerCase() === 'footwear');
    const accessories = availableGarments.filter(g => g.category.toLowerCase() === 'accessories');

    // If missing core categories, return graceful empty array or message
    if (tops.length === 0 || bottoms.length === 0 || footwear.length === 0) {
      return {
        suggestions: [],
        reason: 'Insufficient clean items. Ensure you have clean Tops, Bottoms, and Footwear.',
        missingCategories: [
          tops.length === 0 ? 'Tops' : null,
          bottoms.length === 0 ? 'Bottoms' : null,
          footwear.length === 0 ? 'Footwear' : null
        ].filter(Boolean)
      };
    }

    // 3. Gather recency data from history events within the avoidance window
    const now = new Date();
    const historyEvents = this.storage.getHistoryEvents(userId);
    const itemRecencyDays = new Map(); // itemId -> days since last worn

    historyEvents.forEach(evt => {
      const evtDate = new Date(evt.wearDate + 'T00:00:00');
      const diffTime = Math.abs(now - evtDate);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      evt.itemIds.forEach(id => {
        if (!itemRecencyDays.has(id) || diffDays < itemRecencyDays.get(id)) {
          itemRecencyDays.set(id, diffDays);
        }
      });
    });

    // 4. Gather feedback (rejected signatures)
    const feedbackList = this.storage.getFeedback(userId);
    const rejectedSignatures = new Set(
      feedbackList.filter(f => f.action === 'rejected').map(f => f.outfitHash)
    );
    const savedOutfits = this.storage.getOutfits(userId);
    const favoritedSignatures = new Set(
      savedOutfits.filter(o => o.isFavorite).map(o => `${o.topId}_${o.bottomId}_${o.footwearId}`)
    );

    // 5. Evaluate and score valid combinations
    const scoredCandidates = [];

    for (const top of tops) {
      for (const bottom of bottoms) {
        for (const shoes of footwear) {
          const comboKey = `${top.id}_${bottom.id}_${shoes.id}`;

          // Heavy penalty if user rejected this combo previously
          if (rejectedSignatures.has(comboKey)) continue;

          let score = 100;

          // Occasion matching
          const topOccasionMatch = top.occasions.includes(occasion);
          const bottomOccasionMatch = bottom.occasions.includes(occasion);
          const shoesOccasionMatch = shoes.occasions.includes(occasion);

          if (topOccasionMatch) score += 35;
          if (bottomOccasionMatch) score += 35;
          if (shoesOccasionMatch) score += 30;

          // Color harmony
          const topBottomHarmony = calculateColorHarmony(top.primaryColor, bottom.primaryColor);
          const bottomShoesHarmony = calculateColorHarmony(bottom.primaryColor, shoes.primaryColor);
          score += topBottomHarmony + bottomShoesHarmony;

          // Favorited bonus
          if (favoritedSignatures.has(comboKey)) {
            score += 25;
          }

          // Repetition Penalty Calculation
          // Penalize items worn recently within the avoidance window
          [top.id, bottom.id, shoes.id].forEach(id => {
            if (itemRecencyDays.has(id)) {
              const daysAgo = itemRecencyDays.get(id);
              if (daysAgo < avoidanceDays) {
                // Higher penalty the more recently it was worn
                const recencyPenalty = (avoidanceDays - daysAgo) * 18;
                score -= recencyPenalty;
              }
            }
          });

          // Exact outfit wear history check
          const wearHistory = this.checkWearHistory(top.id, bottom.id, shoes.id, [], userId);
          if (wearHistory.hasBeenWorn && wearHistory.lastWornDate) {
            const daysAgo = Math.floor((now - new Date(wearHistory.lastWornDate + 'T00:00:00')) / (1000 * 60 * 60 * 24));
            if (daysAgo < avoidanceDays) {
              score -= 60; // Extra penalty for full outfit repetition
            }
          }

          // Pick best matching optional accessories (0 to 2 accessories)
          const matchedAccessories = [];
          if (accessories.length > 0) {
            const sortedAcc = [...accessories].sort((a, b) => {
              const aOccasion = a.occasions.includes(occasion) ? 1 : 0;
              const bOccasion = b.occasions.includes(occasion) ? 1 : 0;
              return bOccasion - aOccasion;
            });

            for (const acc of sortedAcc) {
              if (matchedAccessories.length >= 2) break;
              // Check recency penalty for accessory
              const accDays = itemRecencyDays.get(acc.id);
              if (accDays !== undefined && accDays < avoidanceDays && sortedAcc.length > 2) {
                continue; // prefer accessories not worn recently
              }
              matchedAccessories.push(acc);
            }
          }

          scoredCandidates.push({
            top,
            bottom,
            footwear: shoes,
            accessories: matchedAccessories,
            score,
            historyInfo: wearHistory
          });
        }
      }
    }

    // 6. Sort deterministically by highest score
    scoredCandidates.sort((a, b) => b.score - a.score);

    // 7. Select up to maxResults distinct looks
    // Ensure variety: don't suggest the exact same top & bottom in all 3 suggestions if alternatives exist
    const selected = [];
    const usedTops = new Set();
    const usedBottoms = new Set();

    // First pass: distinct top and bottom
    for (const cand of scoredCandidates) {
      if (selected.length >= maxResults) break;
      if (!usedTops.has(cand.top.id) && !usedBottoms.has(cand.bottom.id)) {
        selected.push(cand);
        usedTops.add(cand.top.id);
        usedBottoms.add(cand.bottom.id);
      }
    }

    // Second pass: fill remaining slots with highest scoring alternatives
    if (selected.length < maxResults) {
      for (const cand of scoredCandidates) {
        if (selected.length >= maxResults) break;
        const alreadySelected = selected.some(
          s => s.top.id === cand.top.id && s.bottom.id === cand.bottom.id && s.footwear.id === cand.footwear.id
        );
        if (!alreadySelected) {
          selected.push(cand);
        }
      }
    }

    // Format output
    const suggestions = selected.map((s, index) => ({
      suggestionIndex: index + 1,
      occasion,
      top: s.top,
      bottom: s.bottom,
      footwear: s.footwear,
      accessories: [...s.accessories],
      score: Math.round(s.score),
      historyInfo: s.historyInfo
    }));

    return {
      suggestions,
      totalCandidates: scoredCandidates.length,
      avoidanceDays
    };
  }

  /**
   * Get available replacement items for a single slot without rebuilding the entire outfit
   */
  getAvailableReplacements({
    category,
    currentOutfit,
    occasion = 'Casual',
    userId = this.storage.getCurrentUserId()
  }) {
    const cleanItems = this.storage.getGarments(userId, {
      includeArchived: false,
      category,
      status: AVAILABILITY_STATUS.CLEAN
    });

    const currentId = currentOutfit ? (
      category.toLowerCase() === 'tops' ? currentOutfit.top?.id :
      category.toLowerCase() === 'bottoms' ? currentOutfit.bottom?.id :
      category.toLowerCase() === 'footwear' ? currentOutfit.footwear?.id : null
    ) : null;

    // Filter out current item and rank by occasion match and recency
    const historyEvents = this.storage.getHistoryEvents(userId);
    const recentWearMap = new Map();
    historyEvents.forEach(e => {
      e.itemIds.forEach(id => {
        if (!recentWearMap.has(id)) {
          recentWearMap.set(id, e.wearDate);
        }
      });
    });

    return cleanItems
      .filter(item => item.id !== currentId)
      .map(item => {
        let compatibilityScore = item.occasions.includes(occasion) ? 30 : 10;
        const lastWorn = recentWearMap.get(item.id);
        return {
          item,
          compatibilityScore,
          lastWornDate: lastWorn || null
        };
      })
      .sort((a, b) => b.compatibilityScore - a.compatibilityScore);
  }

  /**
   * Replace a single item in an outfit
   */
  replaceSingleItem(currentOutfit, category, newItem) {
    if (!currentOutfit || !newItem) return currentOutfit;
    const cat = category.toLowerCase();
    const updated = { ...currentOutfit };

    if (cat === 'tops') {
      updated.top = newItem;
    } else if (cat === 'bottoms') {
      updated.bottom = newItem;
    } else if (cat === 'footwear') {
      updated.footwear = newItem;
    } else if (cat === 'accessories') {
      // If replacing an accessory
      updated.accessories = [...(updated.accessories || []).filter(a => a.id !== newItem.id), newItem];
    }

    // Recheck history info for the newly assembled outfit
    const accIds = (updated.accessories || []).map(a => a.id);
    updated.historyInfo = this.checkWearHistory(
      updated.top.id,
      updated.bottom.id,
      updated.footwear.id,
      accIds
    );

    return updated;
  }

  /**
   * Remove an optional accessory without rebuilding the outfit
   */
  removeAccessory(currentOutfit, accessoryId) {
    if (!currentOutfit) return currentOutfit;
    const updated = { ...currentOutfit };
    updated.accessories = (updated.accessories || []).filter(a => a.id !== accessoryId);

    const accIds = updated.accessories.map(a => a.id);
    updated.historyInfo = this.checkWearHistory(
      updated.top.id,
      updated.bottom.id,
      updated.footwear.id,
      accIds
    );

    return updated;
  }
}

export const suggestionEngine = new SuggestionEngine();
