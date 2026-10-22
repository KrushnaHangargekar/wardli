/**
 * History Service — Exact Outfit History and Wear Tracking
 * Manages persistent wear records, snapshots, grouping, and wear-count calculations.
 */

import { createOutfitEvent, createGarmentSnapshot } from '../domain/models.js';
import { AVAILABILITY_STATUS } from '../domain/constants.js';
import { storage } from './storage.js';

export class HistoryService {
  constructor(storageRepo = storage) {
    this.storage = storageRepo;
  }

  /**
   * Record an outfit as worn ("I Wore This")
   * Creates an immutable wear event with snapshots of each item.
   */
  recordWear({
    userId = this.storage.getCurrentUserId(),
    outfitId = null,
    itemIds = [],
    wearDate = new Date().toISOString().split('T')[0],
    wearTime = new Date().toTimeString().substring(0, 5),
    occasion = 'Casual',
    notes = '',
    updateGarmentStatus = true
  }) {
    if (!userId) throw new Error('User ID required');
    if (!Array.isArray(itemIds) || itemIds.length === 0) {
      throw new Error('At least one item must be selected to record wear');
    }

    // 1. Gather exact snapshots of all worn items
    const itemSnapshots = [];
    itemIds.forEach(id => {
      const garment = this.storage.getGarment(id, userId);
      if (garment) {
        itemSnapshots.push(createGarmentSnapshot(garment));
      } else {
        // Fallback placeholder if garment was deleted previously
        itemSnapshots.push({
          id,
          name: 'Archived Item',
          category: 'Garment',
          photoUrl: '',
          primaryColor: 'Unknown',
          isArchived: true
        });
      }
    });

    // 2. Create the immutable outfit event
    const event = createOutfitEvent({
      userId,
      outfitId,
      itemIds,
      itemSnapshots,
      wearDate,
      wearTime,
      occasion,
      notes
    });

    this.storage.saveHistoryEvent(event, userId);

    // 3. Increment wear counts and update garment availability to Worn
    itemIds.forEach(id => {
      const g = this.storage.getGarment(id, userId);
      if (g) {
        const updates = { wearCount: (g.wearCount || 0) + 1 };
        if (updateGarmentStatus && g.status === AVAILABILITY_STATUS.CLEAN) {
          updates.status = AVAILABILITY_STATUS.WORN;
        }
        this.storage.updateGarment(id, updates, userId);
      }
    });

    return event;
  }

  /**
   * Manually add a past outfit entry
   */
  addManualPastOutfit({
    userId = this.storage.getCurrentUserId(),
    outfitId = null,
    itemIds = [],
    wearDate,
    wearTime = null,
    occasion = 'Casual',
    notes = ''
  }) {
    if (!wearDate) {
      throw new Error('Valid past wearDate (YYYY-MM-DD) is required');
    }
    // Past manual adds should not automatically change current status to Worn if the date is in the past,
    // but should increment total wear count.
    const isToday = wearDate === new Date().toISOString().split('T')[0];
    return this.recordWear({
      userId,
      outfitId,
      itemIds,
      wearDate,
      wearTime,
      occasion,
      notes,
      updateGarmentStatus: isToday
    });
  }

  /**
   * Correct or edit an existing history entry
   */
  updateHistoryEntry(id, updates, userId = this.storage.getCurrentUserId()) {
    const existing = this.storage.getHistoryEvent(id, userId);
    if (!existing) throw new Error(`History entry not found: ${id}`);

    // If itemIds are being updated, reconcile wear counts
    if (updates.itemIds && Array.isArray(updates.itemIds)) {
      const oldIds = new Set(existing.itemIds);
      const newIds = new Set(updates.itemIds);

      // Removed items get -1 wear count
      oldIds.forEach(oldId => {
        if (!newIds.has(oldId)) {
          const g = this.storage.getGarment(oldId, userId);
          if (g) {
            this.storage.updateGarment(oldId, { wearCount: Math.max(0, (g.wearCount || 1) - 1) }, userId);
          }
        }
      });

      // Added items get +1 wear count
      newIds.forEach(newId => {
        if (!oldIds.has(newId)) {
          const g = this.storage.getGarment(newId, userId);
          if (g) {
            this.storage.updateGarment(newId, { wearCount: (g.wearCount || 0) + 1 }, userId);
          }
        }
      });

      // Re-snapshot new items
      const newSnapshots = updates.itemIds.map(itemId => {
        const g = this.storage.getGarment(itemId, userId);
        return g ? createGarmentSnapshot(g) : { id: itemId, name: 'Item', isArchived: true };
      });
      updates.itemSnapshots = newSnapshots;
    }

    return this.storage.updateHistoryEvent(id, updates, userId);
  }

  /**
   * Delete a history entry and decrement wear counts
   */
  deleteHistoryEntry(id, userId = this.storage.getCurrentUserId()) {
    const existing = this.storage.getHistoryEvent(id, userId);
    if (!existing) return false;

    // Decrement wear counts for recorded items
    existing.itemIds.forEach(itemId => {
      const g = this.storage.getGarment(itemId, userId);
      if (g) {
        this.storage.updateGarment(itemId, { wearCount: Math.max(0, (g.wearCount || 1) - 1) }, userId);
      }
    });

    return this.storage.deleteHistoryEvent(id, userId);
  }

  /**
   * Retrieve wear history grouped by Day, Week, or Month
   */
  getGroupedHistory(userId = this.storage.getCurrentUserId(), groupBy = 'day', filters = {}) {
    const events = this.storage.getHistoryEvents(userId, filters);
    const groups = new Map();

    const todayStr = new Date().toISOString().split('T')[0];
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterdayStr = yesterdayDate.toISOString().split('T')[0];

    events.forEach(event => {
      let groupKey;
      let groupTitle;
      const date = new Date(event.wearDate + 'T00:00:00');

      if (groupBy === 'day') {
        groupKey = event.wearDate;
        if (event.wearDate === todayStr) {
          groupTitle = 'Today';
        } else if (event.wearDate === yesterdayStr) {
          groupTitle = 'Yesterday';
        } else {
          groupTitle = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
        }
      } else if (groupBy === 'week') {
        // Find Monday of the week
        const dayOfWeek = (date.getDay() + 6) % 7; // Monday = 0
        const monday = new Date(date);
        monday.setDate(date.getDate() - dayOfWeek);
        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);
        groupKey = monday.toISOString().split('T')[0];
        groupTitle = `${monday.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })} – ${sunday.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}`;
      } else {
        // Month
        groupKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        groupTitle = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      }

      if (!groups.has(groupKey)) {
        groups.set(groupKey, {
          key: groupKey,
          title: groupTitle,
          date: event.wearDate,
          count: 0,
          events: []
        });
      }

      const group = groups.get(groupKey);
      group.count += 1;
      group.events.push(event);
    });

    return Array.from(groups.values());
  }

  /**
   * Recalculate wear counts for all garments from historical events
   * Guarantees 100% empirical consistency.
   */
  reconcileWearCounts(userId = this.storage.getCurrentUserId()) {
    const events = this.storage.getHistoryEvents(userId);
    const counts = {};

    events.forEach(e => {
      e.itemIds.forEach(id => {
        counts[id] = (counts[id] || 0) + 1;
      });
    });

    const garments = this.storage.getGarments(userId, { includeArchived: true });
    garments.forEach(g => {
      const correctCount = counts[g.id] || 0;
      if (g.wearCount !== correctCount) {
        this.storage.updateGarment(g.id, { wearCount: correctCount }, userId);
      }
    });

    return counts;
  }
}

export const historyService = new HistoryService();
