/**
 * Wardli Curated Demonstration Wardrobe & Seed Data
 * Provides a realistic, aesthetic capsule wardrobe with tops, bottoms, shoes, accessories,
 * wear history snapshots, and planned calendar entries.
 */

import { AVAILABILITY_STATUS } from '../domain/constants.js';
import { createGarment, createOutfitEvent, createPlannedOutfit, createProfile, createGarmentSnapshot } from '../domain/models.js';

export function getCuratedSeedWardrobe(userId = 'user_default') {
  const profile = createProfile({
    id: userId,
    displayName: 'Alex Chen',
    email: 'alex@wardli.style',
    repeatAvoidanceDays: 7,
    customCategories: ['Outerwear', 'Activewear']
  });

  const garments = [
    // TOPS
    createGarment({
      id: 'g_top_1',
      userId,
      name: 'Heavyweight Relaxed Tee',
      category: 'Tops',
      subcategory: 'T-shirt',
      primaryColor: 'Black',
      secondaryColor: null,
      occasions: ['Casual', 'College', 'Travel'],
      status: AVAILABILITY_STATUS.CLEAN,
      purchasePrice: 38,
      purchaseDate: '2026-08-15',
      wearCount: 6
    }),
    createGarment({
      id: 'g_top_2',
      userId,
      name: 'Boxy Cotton Tee',
      category: 'Tops',
      subcategory: 'T-shirt',
      primaryColor: 'White',
      secondaryColor: null,
      occasions: ['Casual', 'College', 'Party'],
      status: AVAILABILITY_STATUS.CLEAN,
      purchasePrice: 32,
      purchaseDate: '2026-08-20',
      wearCount: 5
    }),
    createGarment({
      id: 'g_top_3',
      userId,
      name: 'Charcoal Knit Sweater',
      category: 'Tops',
      subcategory: 'Sweater',
      primaryColor: 'Charcoal',
      secondaryColor: null,
      occasions: ['Office', 'Formal', 'Casual'],
      status: AVAILABILITY_STATUS.CLEAN,
      purchasePrice: 95,
      purchaseDate: '2026-09-05',
      wearCount: 4
    }),
    createGarment({
      id: 'g_top_4',
      userId,
      name: 'Oxford Button-Down Shirt',
      category: 'Tops',
      subcategory: 'Shirt',
      primaryColor: 'White',
      secondaryColor: null,
      occasions: ['Office', 'Formal', 'Party'],
      status: AVAILABILITY_STATUS.CLEAN,
      purchasePrice: 65,
      purchaseDate: '2026-07-12',
      wearCount: 3
    }),
    createGarment({
      id: 'g_top_5',
      userId,
      name: 'Minimalist Black Overshirt',
      category: 'Tops',
      subcategory: 'Jacket',
      primaryColor: 'Black',
      secondaryColor: null,
      occasions: ['Office', 'Casual', 'Party', 'College'],
      status: AVAILABILITY_STATUS.CLEAN,
      purchasePrice: 110,
      purchaseDate: '2026-06-10',
      wearCount: 7
    }),
    createGarment({
      id: 'g_top_6',
      userId,
      name: 'Structured Fleece Hoodie',
      category: 'Tops',
      subcategory: 'Hoodie',
      primaryColor: 'Grey',
      secondaryColor: null,
      occasions: ['Casual', 'College', 'Travel'],
      status: AVAILABILITY_STATUS.IN_LAUNDRY, // Testing warning
      purchasePrice: 75,
      purchaseDate: '2026-09-18',
      wearCount: 2
    }),
    createGarment({
      id: 'g_top_7',
      userId,
      name: 'Tailored Wool Overcoat',
      category: 'Tops',
      subcategory: 'Jacket',
      primaryColor: 'Beige',
      secondaryColor: null,
      occasions: ['Formal', 'Party'],
      status: AVAILABILITY_STATUS.RESERVED, // Testing reserved
      purchasePrice: 220,
      purchaseDate: '2026-05-14',
      wearCount: 1
    }),

    // BOTTOMS
    createGarment({
      id: 'g_bot_1',
      userId,
      name: 'Relaxed Pleated Trousers',
      category: 'Bottoms',
      subcategory: 'Trousers',
      primaryColor: 'Black',
      secondaryColor: null,
      occasions: ['Office', 'Formal', 'Casual', 'Party'],
      status: AVAILABILITY_STATUS.CLEAN,
      purchasePrice: 85,
      purchaseDate: '2026-07-22',
      wearCount: 7
    }),
    createGarment({
      id: 'g_bot_2',
      userId,
      name: 'Straight Leg Selvedge Jeans',
      category: 'Bottoms',
      subcategory: 'Jeans',
      primaryColor: 'Navy',
      secondaryColor: null,
      occasions: ['Casual', 'College', 'Travel', 'Party'],
      status: AVAILABILITY_STATUS.CLEAN,
      purchasePrice: 115,
      purchaseDate: '2026-08-01',
      wearCount: 8
    }),
    createGarment({
      id: 'g_bot_3',
      userId,
      name: 'Wide-Leg Minimal Chinos',
      category: 'Bottoms',
      subcategory: 'Chinos',
      primaryColor: 'Khaki',
      secondaryColor: null,
      occasions: ['Casual', 'College', 'Office'],
      status: AVAILABILITY_STATUS.CLEAN,
      purchasePrice: 70,
      purchaseDate: '2026-09-02',
      wearCount: 3
    }),
    createGarment({
      id: 'g_bot_4',
      userId,
      name: 'Tailored Linen Shorts',
      category: 'Bottoms',
      subcategory: 'Shorts',
      primaryColor: 'Charcoal',
      secondaryColor: null,
      occasions: ['Casual', 'Travel'],
      status: AVAILABILITY_STATUS.CLEAN,
      purchasePrice: 48,
      purchaseDate: '2026-06-25',
      wearCount: 2
    }),

    // FOOTWEAR
    createGarment({
      id: 'g_shoe_1',
      userId,
      name: 'Clean Leather Low Sneakers',
      category: 'Footwear',
      subcategory: 'Sneakers',
      primaryColor: 'White',
      secondaryColor: null,
      occasions: ['Casual', 'College', 'Office', 'Travel'],
      status: AVAILABILITY_STATUS.CLEAN,
      purchasePrice: 130,
      purchaseDate: '2026-07-15',
      wearCount: 10
    }),
    createGarment({
      id: 'g_shoe_2',
      userId,
      name: 'Chunky Sole Leather Derbies',
      category: 'Footwear',
      subcategory: 'Formal Shoes',
      primaryColor: 'Black',
      secondaryColor: null,
      occasions: ['Formal', 'Office', 'Party'],
      status: AVAILABILITY_STATUS.CLEAN,
      purchasePrice: 160,
      purchaseDate: '2026-05-10',
      wearCount: 5
    }),
    createGarment({
      id: 'g_shoe_3',
      userId,
      name: 'Suede Chelsea Boots',
      category: 'Footwear',
      subcategory: 'Boots',
      primaryColor: 'Brown',
      secondaryColor: null,
      occasions: ['Casual', 'Office', 'Party'],
      status: AVAILABILITY_STATUS.CLEAN,
      purchasePrice: 175,
      purchaseDate: '2026-08-30',
      wearCount: 4
    }),

    // ACCESSORIES
    createGarment({
      id: 'g_acc_1',
      userId,
      name: 'Minimal Chronograph Watch',
      category: 'Accessories',
      subcategory: 'Watch',
      primaryColor: 'Black',
      secondaryColor: 'White',
      occasions: ['Casual', 'Office', 'Formal', 'Party', 'College'],
      status: AVAILABILITY_STATUS.CLEAN,
      purchasePrice: 145,
      purchaseDate: '2026-04-10',
      wearCount: 9
    }),
    createGarment({
      id: 'g_acc_2',
      userId,
      name: 'Matte Leather Belt',
      category: 'Accessories',
      subcategory: 'Belt',
      primaryColor: 'Black',
      secondaryColor: null,
      occasions: ['Casual', 'Office', 'Formal'],
      status: AVAILABILITY_STATUS.CLEAN,
      purchasePrice: 42,
      purchaseDate: '2026-06-01',
      wearCount: 8
    }),
    createGarment({
      id: 'g_acc_3',
      userId,
      name: 'Geometric Acetate Sunglasses',
      category: 'Accessories',
      subcategory: 'Sunglasses',
      primaryColor: 'Black',
      secondaryColor: null,
      occasions: ['Casual', 'Travel', 'Party'],
      status: AVAILABILITY_STATUS.CLEAN,
      purchasePrice: 65,
      purchaseDate: '2026-07-04',
      wearCount: 6
    }),
    createGarment({
      id: 'g_acc_4',
      userId,
      name: 'Sterling Silver Signet Ring',
      category: 'Accessories',
      subcategory: 'Ring',
      primaryColor: 'Grey',
      secondaryColor: null,
      occasions: ['Party', 'Casual', 'College'],
      status: AVAILABILITY_STATUS.CLEAN,
      purchasePrice: 50,
      purchaseDate: '2026-08-12',
      wearCount: 5
    }),
    createGarment({
      id: 'g_acc_5',
      userId,
      name: 'Everyday Minimalist Backpack',
      category: 'Accessories',
      subcategory: 'Backpack',
      primaryColor: 'Charcoal',
      secondaryColor: null,
      occasions: ['College', 'Office', 'Travel'],
      status: AVAILABILITY_STATUS.CLEAN,
      purchasePrice: 90,
      purchaseDate: '2026-08-25',
      wearCount: 7
    }),
    createGarment({
      id: 'g_acc_6',
      userId,
      name: 'Wardli "w." Embroidered Cap',
      category: 'Accessories',
      subcategory: 'Cap',
      primaryColor: 'Black',
      secondaryColor: 'White',
      occasions: ['Casual', 'College', 'Travel'],
      status: AVAILABILITY_STATUS.CLEAN,
      purchasePrice: 28,
      purchaseDate: '2026-09-01',
      wearCount: 4
    })
  ];

  const garmentMap = new Map(garments.map(g => [g.id, g]));

  // Helper to build history event with snapshots
  function makeHistoryEvent(id, date, occasion, topId, botId, shoeId, accIds, notes = '') {
    const itemIds = [topId, botId, shoeId, ...accIds];
    const snapshots = itemIds.map(itemId => {
      const g = garmentMap.get(itemId);
      return g ? createGarmentSnapshot(g) : null;
    }).filter(Boolean);

    return createOutfitEvent({
      id,
      userId,
      itemIds,
      itemSnapshots: snapshots,
      wearDate: date,
      wearTime: '09:30',
      occasion,
      notes
    });
  }

  // Pre-seeded wear events matching screenshot groups (Today, Yesterday, 20 Dec, 19 Dec, 18 Dec)
  const today = new Date().toISOString().split('T')[0];
  const d1 = new Date(); d1.setDate(d1.getDate() - 1); const yesterday = d1.toISOString().split('T')[0];
  const d2 = new Date(); d2.setDate(d2.getDate() - 3); const date3Ago = d2.toISOString().split('T')[0];
  const d3 = new Date(); d3.setDate(d3.getDate() - 4); const date4Ago = d3.toISOString().split('T')[0];
  const d4 = new Date(); d4.setDate(d4.getDate() - 6); const date6Ago = d4.toISOString().split('T')[0];

  const events = [
    makeHistoryEvent('evt_demo_1', today, 'Casual', 'g_top_1', 'g_bot_2', 'g_shoe_1', ['g_acc_1', 'g_acc_6'], 'Morning coffee & campus visit'),
    makeHistoryEvent('evt_demo_2', today, 'Party', 'g_top_5', 'g_bot_1', 'g_shoe_2', ['g_acc_1', 'g_acc_4'], 'Evening gallery opening look'),
    makeHistoryEvent('evt_demo_3', yesterday, 'College', 'g_top_2', 'g_bot_2', 'g_shoe_1', ['g_acc_5'], 'Design studio class'),
    makeHistoryEvent('evt_demo_4', yesterday, 'Casual', 'g_top_1', 'g_bot_3', 'g_shoe_1', ['g_acc_3'], 'Afternoon stroll'),
    makeHistoryEvent('evt_demo_5', date3Ago, 'Office', 'g_top_4', 'g_bot_1', 'g_shoe_2', ['g_acc_1', 'g_acc_2'], 'Client presentation outfit'),
    makeHistoryEvent('evt_demo_6', date4Ago, 'Travel', 'g_top_2', 'g_bot_2', 'g_shoe_1', ['g_acc_3', 'g_acc_5'], 'Weekend getaway travel look'),
    makeHistoryEvent('evt_demo_7', date6Ago, 'Formal', 'g_top_3', 'g_bot_1', 'g_shoe_2', ['g_acc_1'], 'Formal dinner banquet')
  ];

  // Pre-seeded planned outfits for weekly planner
  const p1 = new Date(); p1.setDate(p1.getDate() + 1); const planDate1 = p1.toISOString().split('T')[0];
  const p2 = new Date(); p2.setDate(p2.getDate() + 2); const planDate2 = p2.toISOString().split('T')[0];
  const p3 = new Date(); p3.setDate(p3.getDate() + 3); const planDate3 = p3.toISOString().split('T')[0];

  const plannedOutfits = [
    createPlannedOutfit({
      id: 'plan_demo_1',
      userId,
      topId: 'g_top_4',
      bottomId: 'g_bot_1',
      footwearId: 'g_shoe_2',
      accessoryIds: ['g_acc_1', 'g_acc_2'],
      plannedDate: planDate1,
      occasion: 'Office',
      notes: 'Quarterly review meeting',
      status: 'Planned'
    }),
    createPlannedOutfit({
      id: 'plan_demo_2',
      userId,
      topId: 'g_top_6', // Note: g_top_6 is In Laundry, will show warning!
      bottomId: 'g_bot_2',
      footwearId: 'g_shoe_1',
      accessoryIds: ['g_acc_5'],
      plannedDate: planDate2,
      occasion: 'College',
      notes: 'Library study session',
      status: 'Planned'
    }),
    createPlannedOutfit({
      id: 'plan_demo_3',
      userId,
      topId: 'g_top_5',
      bottomId: 'g_bot_3',
      footwearId: 'g_shoe_1',
      accessoryIds: ['g_acc_3', 'g_acc_4'],
      plannedDate: planDate3,
      occasion: 'Casual',
      notes: 'Saturday brunch with friends',
      status: 'Planned'
    })
  ];

  return {
    profile,
    garments,
    events,
    plannedOutfits
  };
}

export function initializeSeedDataIfEmpty(storageRepo) {
  const currentUserId = storageRepo.getCurrentUserId();
  const existingGarments = storageRepo.getGarments(currentUserId, { includeArchived: true });

  if (existingGarments.length === 0) {
    const seed = getCuratedSeedWardrobe(currentUserId);
    storageRepo.saveProfile(seed.profile);
    seed.garments.forEach(g => storageRepo.saveGarment(g, currentUserId));
    seed.events.forEach(e => storageRepo.saveHistoryEvent(e, currentUserId));
    seed.plannedOutfits.forEach(p => storageRepo.savePlannedOutfit(p, currentUserId));
    return true;
  }
  return false;
}
