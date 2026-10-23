/**
 * Storage Service — Multi-User Isolated Repository
 * Works in Browser LocalStorage, Node (in-memory fallback for tests), and exports Firestore schema.
 */

import { createGarmentSnapshot } from '../domain/models.js';
import { CURRENCIES } from '../domain/constants.js';

const STORAGE_PREFIX = 'wardli_v1_';

export class StorageRepository {
  constructor() {
    this.memoryStore = {};
    this.currentUserId = 'user_default';
  }

  isBrowser() {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  getCurrentUserId() {
    return this.currentUserId;
  }

  setCurrentUserId(userId) {
    if (!userId) return;
    this.currentUserId = userId;
  }

  getCurrency() {
    if (this.isBrowser()) {
      try {
        const code = window.localStorage.getItem(this._getKey('preferred_currency'));
        if (code && CURRENCIES[code]) return CURRENCIES[code];
      } catch (e) {
        // fallback
      }
    }
    return this.memoryStore['preferred_currency'] || CURRENCIES.INR;
  }

  setCurrency(code) {
    if (!CURRENCIES[code]) return;
    const curr = CURRENCIES[code];
    if (this.isBrowser()) {
      try {
        window.localStorage.setItem(this._getKey('preferred_currency'), code);
      } catch (e) {
        // fallback
      }
    }
    this.memoryStore['preferred_currency'] = curr;
  }

  _getKey(collection) {
    return `${STORAGE_PREFIX}${collection}`;
  }

  _loadCollection(collection) {
    if (this.isBrowser()) {
      try {
        const raw = window.localStorage.getItem(this._getKey(collection));
        return raw ? JSON.parse(raw) : [];
      } catch (e) {
        console.error(`Error loading collection ${collection}:`, e);
        return [];
      }
    } else {
      return this.memoryStore[collection] || [];
    }
  }

  _saveCollection(collection, items) {
    if (this.isBrowser()) {
      try {
        window.localStorage.setItem(this._getKey(collection), JSON.stringify(items));
      } catch (e) {
        console.error(`Error saving collection ${collection}:`, e);
      }
    } else {
      this.memoryStore[collection] = items;
    }
  }

  // Generic query with owner-level isolation
  _getAll(collection, userId = this.currentUserId) {
    const all = this._loadCollection(collection);
    return all.filter(item => item.userId === userId);
  }

  _getById(collection, id, userId = this.currentUserId) {
    const items = this._getAll(collection, userId);
    return items.find(item => item.id === id) || null;
  }

  _save(collection, item, userId = this.currentUserId) {
    const all = this._loadCollection(collection);
    const existingIndex = all.findIndex(i => i.id === item.id && i.userId === userId);

    const doc = { ...item, userId };
    if (existingIndex >= 0) {
      all[existingIndex] = doc;
    } else {
      all.push(doc);
    }
    this._saveCollection(collection, all);
    return doc;
  }

  _update(collection, id, updates, userId = this.currentUserId) {
    const all = this._loadCollection(collection);
    const index = all.findIndex(i => i.id === id && i.userId === userId);
    if (index === -1) return null;

    all[index] = {
      ...all[index],
      ...updates,
      userId, // Immutable owner
      id,     // Immutable ID
      updatedAt: new Date().toISOString()
    };
    this._saveCollection(collection, all);
    return all[index];
  }

  _delete(collection, id, userId = this.currentUserId) {
    const all = this._loadCollection(collection);
    const filtered = all.filter(i => !(i.id === id && i.userId === userId));
    this._saveCollection(collection, filtered);
    return true;
  }

  // --- Profile methods ---
  getProfile(userId = this.currentUserId) {
    const profiles = this._loadCollection('profiles');
    return profiles.find(p => p.id === userId) || null;
  }

  saveProfile(profile) {
    const profiles = this._loadCollection('profiles');
    const idx = profiles.findIndex(p => p.id === profile.id);
    if (idx >= 0) {
      profiles[idx] = { ...profiles[idx], ...profile };
    } else {
      profiles.push(profile);
    }
    this._saveCollection('profiles', profiles);
    return profile;
  }

  // --- Garments methods ---
  getGarments(userId = this.currentUserId, { includeArchived = false, category = null, status = null } = {}) {
    let items = this._getAll('garments', userId);
    if (!includeArchived) {
      items = items.filter(g => !g.isArchived);
    }
    if (category && category !== 'All') {
      items = items.filter(g => g.category.toLowerCase() === category.toLowerCase());
    }
    if (status && status !== 'All') {
      items = items.filter(g => g.status === status);
    }
    return items;
  }

  getGarment(id, userId = this.currentUserId) {
    return this._getById('garments', id, userId);
  }

  saveGarment(garment, userId = this.currentUserId) {
    return this._save('garments', garment, userId);
  }

  updateGarment(id, updates, userId = this.currentUserId) {
    return this._update('garments', id, updates, userId);
  }

  archiveGarment(id, userId = this.currentUserId) {
    return this._update('garments', id, { isArchived: true }, userId);
  }

  unarchiveGarment(id, userId = this.currentUserId) {
    return this._update('garments', id, { isArchived: false }, userId);
  }

  deleteGarment(id, userId = this.currentUserId) {
    // Soft delete is safest for historical records, but hard delete if explicitly requested
    return this._delete('garments', id, userId);
  }

  // --- Outfits methods ---
  getOutfits(userId = this.currentUserId) {
    return this._getAll('outfits', userId);
  }

  getOutfit(id, userId = this.currentUserId) {
    return this._getById('outfits', id, userId);
  }

  saveOutfit(outfit, userId = this.currentUserId) {
    return this._save('outfits', outfit, userId);
  }

  deleteOutfit(id, userId = this.currentUserId) {
    return this._delete('outfits', id, userId);
  }

  // --- Outfit Events (Wear History) methods ---
  getHistoryEvents(userId = this.currentUserId, { occasion = null, fromDate = null, toDate = null } = {}) {
    let events = this._getAll('outfit_events', userId);

    if (occasion && occasion !== 'All') {
      events = events.filter(e => e.occasion.toLowerCase() === occasion.toLowerCase());
    }
    if (fromDate) {
      events = events.filter(e => e.wearDate >= fromDate);
    }
    if (toDate) {
      events = events.filter(e => e.wearDate <= toDate);
    }

    // Sort descending by date and time
    return events.sort((a, b) => {
      const cmp = b.wearDate.localeCompare(a.wearDate);
      if (cmp !== 0) return cmp;
      return (b.wearTime || '').localeCompare(a.wearTime || '');
    });
  }

  getHistoryEvent(id, userId = this.currentUserId) {
    return this._getById('outfit_events', id, userId);
  }

  saveHistoryEvent(event, userId = this.currentUserId) {
    return this._save('outfit_events', event, userId);
  }

  updateHistoryEvent(id, updates, userId = this.currentUserId) {
    return this._update('outfit_events', id, updates, userId);
  }

  deleteHistoryEvent(id, userId = this.currentUserId) {
    return this._delete('outfit_events', id, userId);
  }

  // --- Planned Outfits methods ---
  getPlannedOutfits(userId = this.currentUserId, { status = null, fromDate = null, toDate = null } = {}) {
    let plans = this._getAll('planned_outfits', userId);
    if (status && status !== 'All') {
      plans = plans.filter(p => p.status === status);
    }
    if (fromDate) {
      plans = plans.filter(p => p.plannedDate >= fromDate);
    }
    if (toDate) {
      plans = plans.filter(p => p.plannedDate <= toDate);
    }
    return plans.sort((a, b) => a.plannedDate.localeCompare(b.plannedDate));
  }

  getPlannedOutfit(id, userId = this.currentUserId) {
    return this._getById('planned_outfits', id, userId);
  }

  savePlannedOutfit(plan, userId = this.currentUserId) {
    return this._save('planned_outfits', plan, userId);
  }

  updatePlannedOutfit(id, updates, userId = this.currentUserId) {
    return this._update('planned_outfits', id, updates, userId);
  }

  deletePlannedOutfit(id, userId = this.currentUserId) {
    return this._delete('planned_outfits', id, userId);
  }

  // --- Feedback methods ---
  getFeedback(userId = this.currentUserId) {
    return this._getAll('outfit_feedback', userId);
  }

  saveFeedback(feedback, userId = this.currentUserId) {
    return this._save('outfit_feedback', feedback, userId);
  }

  // --- Full Export / Import for backup & testing ---
  exportAllUserData(userId = this.currentUserId) {
    return {
      profile: this.getProfile(userId),
      garments: this._getAll('garments', userId),
      outfits: this._getAll('outfits', userId),
      outfit_events: this._getAll('outfit_events', userId),
      planned_outfits: this._getAll('planned_outfits', userId),
      outfit_feedback: this._getAll('outfit_feedback', userId),
      exportedAt: new Date().toISOString()
    };
  }

  importUserData(data, userId = this.currentUserId) {
    if (!data) return false;
    if (data.profile) this.saveProfile({ ...data.profile, id: userId });
    if (Array.isArray(data.garments)) {
      data.garments.forEach(g => this.saveGarment({ ...g, userId }, userId));
    }
    if (Array.isArray(data.outfits)) {
      data.outfits.forEach(o => this.saveOutfit({ ...o, userId }, userId));
    }
    if (Array.isArray(data.outfit_events)) {
      data.outfit_events.forEach(e => this.saveHistoryEvent({ ...e, userId }, userId));
    }
    if (Array.isArray(data.planned_outfits)) {
      data.planned_outfits.forEach(p => this.savePlannedOutfit({ ...p, userId }, userId));
    }
    return true;
  }

  clearUserData(userId = this.currentUserId) {
    const collections = ['garments', 'outfits', 'outfit_events', 'planned_outfits', 'outfit_feedback'];
    collections.forEach(col => {
      const all = this._loadCollection(col);
      const filtered = all.filter(i => i.userId !== userId);
      this._saveCollection(col, filtered);
    });
  }
}

export const storage = new StorageRepository();

export function formatCurrency(amount, currency = storage.getCurrency()) {
  if (amount === null || amount === undefined || isNaN(Number(amount))) return '';
  const num = Number(amount);
  const formatted = num % 1 === 0 ? num.toLocaleString() : num.toFixed(2);
  return `${currency.symbol}${formatted}`;
}
