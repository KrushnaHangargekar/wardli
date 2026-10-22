/**
 * Wardli Domain Models and Factory Functions
 */

import { AVAILABILITY_STATUS } from './constants.js';

export function createGarment({
  id = `garm_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
  userId,
  name,
  category,
  subcategory = '',
  photoUrl = '',
  primaryColor = 'Black',
  secondaryColor = null,
  occasions = ['Casual'],
  status = AVAILABILITY_STATUS.CLEAN,
  purchasePrice = null,
  purchaseDate = null,
  wearCount = 0,
  isArchived = false,
  createdAt = new Date().toISOString(),
  updatedAt = new Date().toISOString()
}) {
  if (!userId) throw new Error('Garment requires a valid userId');
  if (!name || typeof name !== 'string' || !name.trim()) throw new Error('Garment requires a valid name');
  if (!category || typeof category !== 'string' || !category.trim()) throw new Error('Garment requires a valid category');

  return {
    id,
    userId,
    name: name.trim(),
    category: category.trim(),
    subcategory: subcategory ? subcategory.trim() : '',
    photoUrl: photoUrl || '',
    primaryColor: primaryColor || 'Black',
    secondaryColor: secondaryColor || null,
    occasions: Array.isArray(occasions) && occasions.length > 0 ? occasions : ['Casual'],
    status: Object.values(AVAILABILITY_STATUS).includes(status) ? status : AVAILABILITY_STATUS.CLEAN,
    purchasePrice: purchasePrice !== null && !isNaN(Number(purchasePrice)) ? Number(purchasePrice) : null,
    purchaseDate: purchaseDate || null,
    wearCount: Number(wearCount) || 0,
    isArchived: Boolean(isArchived),
    createdAt,
    updatedAt
  };
}

export function createGarmentSnapshot(garment) {
  if (!garment) return null;
  return {
    id: garment.id,
    name: garment.name,
    category: garment.category,
    subcategory: garment.subcategory,
    photoUrl: garment.photoUrl,
    primaryColor: garment.primaryColor,
    secondaryColor: garment.secondaryColor,
    occasions: [...(garment.occasions || [])],
    purchasePrice: garment.purchasePrice,
    isArchived: Boolean(garment.isArchived)
  };
}

export function createOutfit({
  id = `outfit_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
  userId,
  name = 'Saved Outfit',
  occasion = 'Casual',
  topId,
  bottomId,
  footwearId,
  accessoryIds = [],
  isFavorite = false,
  createdAt = new Date().toISOString()
}) {
  if (!userId) throw new Error('Outfit requires a valid userId');
  if (!topId || !bottomId || !footwearId) {
    throw new Error('Outfit requires topId, bottomId, and footwearId');
  }

  return {
    id,
    userId,
    name: name.trim(),
    occasion,
    topId,
    bottomId,
    footwearId,
    accessoryIds: Array.isArray(accessoryIds) ? [...accessoryIds] : [],
    isFavorite: Boolean(isFavorite),
    createdAt
  };
}

export function createOutfitEvent({
  id = `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
  userId,
  outfitId = null,
  itemIds = [],
  itemSnapshots = [],
  wearDate = new Date().toISOString().split('T')[0],
  wearTime = null,
  occasion = 'Casual',
  notes = '',
  createdAt = new Date().toISOString()
}) {
  if (!userId) throw new Error('OutfitEvent requires a valid userId');
  if (!Array.isArray(itemIds) || itemIds.length === 0) {
    throw new Error('OutfitEvent requires at least one worn item ID');
  }

  return {
    id,
    userId,
    outfitId: outfitId || null,
    itemIds: [...itemIds],
    // Deep immutable snapshot of items worn to prevent loss if item is deleted or updated later
    itemSnapshots: itemSnapshots.map(s => ({ ...s })),
    wearDate, // YYYY-MM-DD
    wearTime: wearTime || null, // HH:mm
    occasion: occasion || 'Casual',
    notes: (notes || '').trim(),
    createdAt
  };
}

export function createPlannedOutfit({
  id = `plan_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
  userId,
  outfitId = null,
  topId,
  bottomId,
  footwearId,
  accessoryIds = [],
  plannedDate = new Date().toISOString().split('T')[0],
  occasion = 'Casual',
  notes = '',
  status = 'Planned', // 'Planned' | 'Worn' | 'Cancelled'
  historyEventId = null,
  createdAt = new Date().toISOString()
}) {
  if (!userId) throw new Error('PlannedOutfit requires a valid userId');
  if (!topId || !bottomId || !footwearId) {
    throw new Error('PlannedOutfit requires topId, bottomId, and footwearId');
  }

  return {
    id,
    userId,
    outfitId: outfitId || null,
    topId,
    bottomId,
    footwearId,
    accessoryIds: Array.isArray(accessoryIds) ? [...accessoryIds] : [],
    plannedDate,
    occasion,
    notes: (notes || '').trim(),
    status,
    historyEventId: historyEventId || null,
    createdAt
  };
}

export function createProfile({
  id,
  displayName = 'Wardli User',
  email = 'user@wardli.style',
  repeatAvoidanceDays = 7,
  customCategories = [],
  createdAt = new Date().toISOString()
}) {
  if (!id) throw new Error('Profile requires an id (userId)');
  return {
    id,
    displayName,
    email,
    repeatAvoidanceDays: Math.max(1, Number(repeatAvoidanceDays) || 7),
    customCategories: Array.isArray(customCategories) ? [...customCategories] : [],
    createdAt
  };
}
