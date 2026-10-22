import test from 'node:test';
import assert from 'node:assert/strict';
import { StorageRepository } from '../src/services/storage.js';
import { HistoryService } from '../src/services/historyService.js';
import { AnalyticsService } from '../src/services/analyticsService.js';
import { createGarment } from '../src/domain/models.js';
import { AVAILABILITY_STATUS } from '../src/domain/constants.js';

test('Analytics & Multi-User Isolation Tests', async (t) => {
  const repo = new StorageRepository();
  const history = new HistoryService(repo);
  const analytics = new AnalyticsService(repo);

  const userA = 'user_alice';
  const userB = 'user_bob';

  // Seed User A
  const topA = repo.saveGarment(createGarment({
    userId: userA,
    name: 'Tee A',
    category: 'Tops',
    purchasePrice: 40,
    status: AVAILABILITY_STATUS.CLEAN
  }), userA);

  const botA = repo.saveGarment(createGarment({
    userId: userA,
    name: 'Jeans A',
    category: 'Bottoms',
    purchasePrice: 80,
    status: AVAILABILITY_STATUS.CLEAN
  }), userA);

  const accA = repo.saveGarment(createGarment({
    userId: userA,
    name: 'Watch A',
    category: 'Accessories',
    subcategory: 'Watch',
    purchasePrice: 120,
    status: AVAILABILITY_STATUS.CLEAN
  }), userA);

  // Seed User B
  const topB = repo.saveGarment(createGarment({
    userId: userB,
    name: 'Secret Shirt B',
    category: 'Tops',
    status: AVAILABILITY_STATUS.CLEAN
  }), userB);

  await t.test('Multi-User Isolation: User A cannot see User B items', () => {
    const userAGarments = repo.getGarments(userA);
    const userBGarments = repo.getGarments(userB);

    assert.equal(userAGarments.length, 3);
    assert.equal(userBGarments.length, 1);
    assert.ok(userAGarments.every(g => g.userId === userA));
    assert.ok(!userAGarments.some(g => g.name === 'Secret Shirt B'));
  });

  await t.test('Analytics: Empty state correctly flagged when no history', () => {
    const initialStats = analytics.getAnalytics(userA);
    assert.equal(initialStats.hasSufficientHistory, false);
    assert.equal(initialStats.totalRecordedWears, 0);
  });

  await t.test('Analytics: Wear counts, monthly breakdown & Cost-Per-Wear accurately calculated', () => {
    // Record wears for User A
    history.recordWear({
      userId: userA,
      itemIds: [topA.id, botA.id, accA.id],
      wearDate: '2026-10-15',
      occasion: 'Casual'
    });

    history.recordWear({
      userId: userA,
      itemIds: [topA.id, botA.id],
      wearDate: '2026-10-16',
      occasion: 'Office'
    });

    const stats = analytics.getAnalytics(userA);
    assert.equal(stats.hasSufficientHistory, true);
    assert.equal(stats.totalRecordedWears, 2);

    // Top A worn twice ($40 / 2 = $20 CPW)
    const topAStats = stats.costPerWear.bestValueItems.find(i => i.id === topA.id);
    assert.ok(topAStats);
    assert.equal(topAStats.wearCount, 2);
    assert.equal(topAStats.costPerWear, 20);

    // Most worn accessory
    assert.equal(stats.mostWornAccessories.length, 1);
    assert.equal(stats.mostWornAccessories[0].id, accA.id);
    assert.equal(stats.mostWornAccessories[0].wearCount, 1);

    // Monthly breakdown
    assert.equal(stats.monthlyBreakdown.length, 1);
    assert.equal(stats.monthlyBreakdown[0].count, 2);
    assert.equal(stats.monthlyBreakdown[0].month, '2026-10');
  });
});
