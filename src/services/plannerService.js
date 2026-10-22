/**
 * Planner Service — Weekly Planning & Scheduled Outfits
 * Keeps planned outfits strictly separated from wear history.
 * Generates real-time laundry/reserved warnings and handles conversion to wear history.
 */

import { createPlannedOutfit } from '../domain/models.js';
import { AVAILABILITY_STATUS } from '../domain/constants.js';
import { storage } from './storage.js';
import { historyService } from './historyService.js';

export class PlannerService {
  constructor(storageRepo = storage, history = historyService) {
    this.storage = storageRepo;
    this.history = history;
  }

  /**
   * Schedule an outfit for a future date.
   * STRICT: Does NOT increment wear counts.
   */
  scheduleOutfit({
    userId = this.storage.getCurrentUserId(),
    outfitId = null,
    topId,
    bottomId,
    footwearId,
    accessoryIds = [],
    plannedDate,
    occasion = 'Casual',
    notes = ''
  }) {
    if (!plannedDate) throw new Error('Planned date is required');
    if (!topId || !bottomId || !footwearId) {
      throw new Error('topId, bottomId, and footwearId are required to plan an outfit');
    }

    const plan = createPlannedOutfit({
      userId,
      outfitId,
      topId,
      bottomId,
      footwearId,
      accessoryIds,
      plannedDate,
      occasion,
      notes,
      status: 'Planned'
    });

    this.storage.savePlannedOutfit(plan, userId);
    return plan;
  }

  /**
   * Retrieve plans for a date range with real-time laundry/reserved warnings
   */
  getDecoratedPlans({
    userId = this.storage.getCurrentUserId(),
    fromDate = null,
    toDate = null,
    status = null
  } = {}) {
    const rawPlans = this.storage.getPlannedOutfits(userId, { fromDate, toDate, status });

    return rawPlans.map(plan => {
      const top = this.storage.getGarment(plan.topId, userId);
      const bottom = this.storage.getGarment(plan.bottomId, userId);
      const footwear = this.storage.getGarment(plan.footwearId, userId);
      const accessories = (plan.accessoryIds || []).map(id => this.storage.getGarment(id, userId)).filter(Boolean);

      const items = [top, bottom, footwear, ...accessories].filter(Boolean);

      // Check for item warnings: In Laundry or Reserved
      const warnings = [];
      items.forEach(item => {
        if (item.status === AVAILABILITY_STATUS.IN_LAUNDRY) {
          warnings.push({
            itemId: item.id,
            itemName: item.name,
            status: item.status,
            message: `"${item.name}" is currently In Laundry`
          });
        } else if (item.status === AVAILABILITY_STATUS.RESERVED) {
          warnings.push({
            itemId: item.id,
            itemName: item.name,
            status: item.status,
            message: `"${item.name}" is currently Reserved`
          });
        }
      });

      return {
        ...plan,
        top,
        bottom,
        footwear,
        accessories,
        warnings,
        hasWarnings: warnings.length > 0
      };
    });
  }

  /**
   * Convert a planned outfit into a verified wear history record
   * Strictly creates wear record with the actual date and increments wear counts.
   */
  markPlanAsWorn({
    planId,
    actualWearDate = null,
    notes = '',
    userId = this.storage.getCurrentUserId()
  }) {
    const plan = this.storage.getPlannedOutfit(planId, userId);
    if (!plan) throw new Error(`Plan not found: ${planId}`);

    const targetDate = actualWearDate || plan.plannedDate || new Date().toISOString().split('T')[0];
    const itemIds = [plan.topId, plan.bottomId, plan.footwearId, ...(plan.accessoryIds || [])];

    // 1. Record wear via history service (which snapshots items and increments wear count)
    const historyEvent = this.history.recordWear({
      userId,
      outfitId: plan.outfitId,
      itemIds,
      wearDate: targetDate,
      occasion: plan.occasion,
      notes: notes || plan.notes,
      updateGarmentStatus: targetDate === new Date().toISOString().split('T')[0]
    });

    // 2. Mark plan as Worn and link history event ID
    this.storage.updatePlannedOutfit(planId, {
      status: 'Worn',
      historyEventId: historyEvent.id
    }, userId);

    return {
      plan: this.storage.getPlannedOutfit(planId, userId),
      historyEvent
    };
  }

  /**
   * Edit or update an existing plan
   */
  updatePlan(planId, updates, userId = this.storage.getCurrentUserId()) {
    return this.storage.updatePlannedOutfit(planId, updates, userId);
  }

  /**
   * Remove a scheduled plan
   */
  deletePlan(planId, userId = this.storage.getCurrentUserId()) {
    return this.storage.deletePlannedOutfit(planId, userId);
  }
}

export const plannerService = new PlannerService();
