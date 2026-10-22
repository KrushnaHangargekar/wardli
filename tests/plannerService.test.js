import test from 'node:test';
import assert from 'node:assert/strict';
import { StorageRepository } from '../src/services/storage.js';
import { HistoryService } from '../src/services/historyService.js';
import { PlannerService } from '../src/services/plannerService.js';
import { createGarment } from '../src/domain/models.js';
import { AVAILABILITY_STATUS } from '../src/domain/constants.js';

test('PlannerService — Planning Separation, Laundry Warnings & Mark as Worn', async (t) => {
  const repo = new StorageRepository();
  const history = new HistoryService(repo);
  const planner = new PlannerService(repo, history);
  const userId = 'test_user_planner';

  // Seed test items
  const topClean = repo.saveGarment(createGarment({
    userId,
    name: 'Clean Shirt',
    category: 'Tops',
    status: AVAILABILITY_STATUS.CLEAN
  }), userId);

  const topLaundry = repo.saveGarment(createGarment({
    userId,
    name: 'Laundry Hoodie',
    category: 'Tops',
    status: AVAILABILITY_STATUS.IN_LAUNDRY
  }), userId);

  const bottom = repo.saveGarment(createGarment({
    userId,
    name: 'Black Pants',
    category: 'Bottoms',
    status: AVAILABILITY_STATUS.CLEAN
  }), userId);

  const shoes = repo.saveGarment(createGarment({
    userId,
    name: 'Derbies',
    category: 'Footwear',
    status: AVAILABILITY_STATUS.CLEAN
  }), userId);

  let plan1;
  await t.test('Scheduling an outfit does NOT increment wear counts', () => {
    plan1 = planner.scheduleOutfit({
      userId,
      topId: topClean.id,
      bottomId: bottom.id,
      footwearId: shoes.id,
      plannedDate: '2026-10-28',
      occasion: 'Office',
      notes: 'Future office day'
    });

    assert.ok(plan1.id);
    assert.equal(plan1.status, 'Planned');

    // Crucial check: wearCount MUST remain 0!
    assert.equal(repo.getGarment(topClean.id, userId).wearCount, 0, 'Planning must not increment top wear count');
    assert.equal(repo.getGarment(bottom.id, userId).wearCount, 0, 'Planning must not increment bottom wear count');
    assert.equal(repo.getGarment(shoes.id, userId).wearCount, 0, 'Planning must not increment shoes wear count');

    // History events must remain 0
    assert.equal(repo.getHistoryEvents(userId).length, 0, 'Planning must not create history events');
  });

  await t.test('Real-time warnings are generated when a planned garment is In Laundry or Reserved', () => {
    const planWithLaundry = planner.scheduleOutfit({
      userId,
      topId: topLaundry.id, // In Laundry!
      bottomId: bottom.id,
      footwearId: shoes.id,
      plannedDate: '2026-10-29',
      occasion: 'Casual'
    });

    const decoratedPlans = planner.getDecoratedPlans({ userId });
    const decoratedLaundryPlan = decoratedPlans.find(p => p.id === planWithLaundry.id);

    assert.ok(decoratedLaundryPlan.hasWarnings, 'Should flag warning for In Laundry item');
    assert.equal(decoratedLaundryPlan.warnings.length, 1);
    assert.equal(decoratedLaundryPlan.warnings[0].status, AVAILABILITY_STATUS.IN_LAUNDRY);
  });

  await t.test('markPlanAsWorn creates exact history record and increments wear count', () => {
    const result = planner.markPlanAsWorn({
      planId: plan1.id,
      actualWearDate: '2026-10-28',
      notes: 'Completed day at office',
      userId
    });

    assert.equal(result.plan.status, 'Worn');
    assert.ok(result.historyEvent.id);
    assert.equal(result.historyEvent.wearDate, '2026-10-28');

    // Now wear counts MUST be incremented to 1
    assert.equal(repo.getGarment(topClean.id, userId).wearCount, 1);
    assert.equal(repo.getGarment(bottom.id, userId).wearCount, 1);
    assert.equal(repo.getGarment(shoes.id, userId).wearCount, 1);

    // History event count is now 1
    assert.equal(repo.getHistoryEvents(userId).length, 1);
  });
});
