/**
 * Analytics Service — Data-Driven Wardrobe Insights
 * Computes most/least worn items, monthly counts, repetition stats, and cost-per-wear.
 * Deterministic and free from external/paid APIs.
 */

import { storage } from './storage.js';

export class AnalyticsService {
  constructor(storageRepo = storage) {
    this.storage = storageRepo;
  }

  getAnalytics(userId = this.storage.getCurrentUserId()) {
    const garments = this.storage.getGarments(userId, { includeArchived: true });
    const events = this.storage.getHistoryEvents(userId);

    const totalRecordedWears = events.length;
    const hasSufficientHistory = totalRecordedWears > 0;

    // Partition garments vs accessories
    const clothingGarments = garments.filter(g => g.category.toLowerCase() !== 'accessories');
    const accessories = garments.filter(g => g.category.toLowerCase() === 'accessories');

    // 1. Most-worn & least-worn garments
    const sortedGarments = [...clothingGarments].sort((a, b) => (b.wearCount || 0) - (a.wearCount || 0));
    const mostWornGarments = sortedGarments.filter(g => (g.wearCount || 0) > 0).slice(0, 5);
    const leastWornGarments = [...clothingGarments]
      .sort((a, b) => (a.wearCount || 0) - (b.wearCount || 0))
      .slice(0, 5);
    const unwornGarmentsCount = clothingGarments.filter(g => (g.wearCount || 0) === 0).length;

    // 2. Most-worn accessories
    const sortedAccessories = [...accessories].sort((a, b) => (b.wearCount || 0) - (a.wearCount || 0));
    const mostWornAccessories = sortedAccessories.filter(a => (a.wearCount || 0) > 0).slice(0, 5);
    const unwornAccessoriesCount = accessories.filter(a => (a.wearCount || 0) === 0).length;

    // 3. Monthly wear records
    const monthlyMap = new Map();
    events.forEach(evt => {
      const monthKey = evt.wearDate.substring(0, 7); // YYYY-MM
      monthlyMap.set(monthKey, (monthlyMap.get(monthKey) || 0) + 1);
    });

    // Sort months chronologically
    const monthlyBreakdown = Array.from(monthlyMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, count]) => {
        const [year, m] = month.split('-');
        const date = new Date(Number(year), Number(m) - 1, 1);
        const label = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        return { month, label, count };
      });

    // 4. Repetition statistics
    const comboMap = new Map();
    events.forEach(evt => {
      const key = [...evt.itemIds].sort().join(',');
      comboMap.set(key, (comboMap.get(key) || 0) + 1);
    });

    const uniqueLooks = comboMap.size;
    const repeatRate = totalRecordedWears > 0
      ? Math.round(((totalRecordedWears - uniqueLooks) / totalRecordedWears) * 100)
      : 0;

    let mostRepeatedCombo = null;
    let maxRepeats = 0;
    for (const [key, count] of comboMap.entries()) {
      if (count > maxRepeats && count > 1) {
        maxRepeats = count;
        mostRepeatedCombo = { itemIds: key.split(','), count };
      }
    }

    // 5. Cost-per-wear (CPW) calculations
    const itemsWithPrice = garments.filter(g => g.purchasePrice !== null && g.purchasePrice > 0);
    const cpwItems = itemsWithPrice.map(g => {
      const wears = Math.max(1, g.wearCount || 0); // avoid divide by zero
      const cpw = Number((g.purchasePrice / wears).toFixed(2));
      return {
        id: g.id,
        name: g.name,
        category: g.category,
        purchasePrice: g.purchasePrice,
        wearCount: g.wearCount || 0,
        costPerWear: cpw,
        isZeroWear: (g.wearCount || 0) === 0
      };
    });

    // Best value (lowest CPW) and investment (highest CPW needing wear)
    const bestValueItems = [...cpwItems]
      .filter(i => i.wearCount > 0)
      .sort((a, b) => a.costPerWear - b.costPerWear)
      .slice(0, 5);

    const highestCpwItems = [...cpwItems]
      .sort((a, b) => b.costPerWear - a.costPerWear)
      .slice(0, 5);

    const totalInvestment = itemsWithPrice.reduce((sum, g) => sum + g.purchasePrice, 0);

    return {
      hasSufficientHistory,
      totalGarments: clothingGarments.length,
      totalAccessories: accessories.length,
      totalRecordedWears,
      unwornGarmentsCount,
      unwornAccessoriesCount,
      mostWornGarments,
      leastWornGarments,
      mostWornAccessories,
      monthlyBreakdown,
      repetition: {
        totalOutfitsRecorded: totalRecordedWears,
        uniqueLooks,
        repeatRatePercentage: repeatRate,
        mostRepeatedCombo
      },
      costPerWear: {
        hasCostData: itemsWithPrice.length > 0,
        totalItemsWithPrice: itemsWithPrice.length,
        totalInvestment: Math.round(totalInvestment),
        bestValueItems,
        highestCpwItems
      }
    };
  }
}

export const analyticsService = new AnalyticsService();
