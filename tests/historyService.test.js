import test from 'node:test';
import assert from 'node:assert/strict';
import { StorageRepository } from '../src/services/storage.js';
import { HistoryService } from '../src/services/historyService.js';
import { createGarment } from '../src/domain/models.js';
import { AVAILABILITY_STATUS } from '../src/domain/constants.js';

test('HistoryService — Exact Outfit History & Snapshot Integrity', async (t) => {
  const repo = new StorageRepository();
  const history = new HistoryService(repo);
  const userId = 'test_user_history';

  // Seed 3 test garments
  const top = repo.saveGarment(createGarment({
    userId,
    name: 'Cotton Tee',
    category: 'Tops',
    primaryColor: 'Black',
    status: AVAILABILITY_STATUS.CLEAN,
    purchasePrice: 30
  }), userId);

  const bottom = repo.saveGarment(createGarment({
    userId,
    name: 'Denim Jeans',
    category: 'Bottoms',
    primaryColor: 'Navy',
    status: AVAILABILITY_STATUS.CLEAN,
    purchasePrice: 80
  }), userId);

  const shoes = repo.saveGarment(createGarment({
    userId,
    name: 'Sneakers',
    category: 'Footwear',
    primaryColor: 'White',
    status: AVAILABILITY_STATUS.CLEAN,
    purchasePrice: 100
  }), userId);

  const watch = repo.saveGarment(createGarment({
    userId,
    name: 'Silver Watch',
    category: 'Accessories',
    subcategory: 'Watch',
    primaryColor: 'Silver',
    status: AVAILABILITY_STATUS.CLEAN,
    purchasePrice: 150
  }), userId);

  await t.test('Initial wear counts are 0', () => {
    assert.equal(repo.getGarment(top.id, userId).wearCount, 0);
    assert.equal(repo.getGarment(bottom.id, userId).wearCount, 0);
    assert.equal(repo.getGarment(shoes.id, userId).wearCount, 0);
  });

  let event1;
  await t.test('recordWear creates persistent event and increments wear count', () => {
    event1 = history.recordWear({
      userId,
      itemIds: [top.id, bottom.id, shoes.id, watch.id],
      wearDate: '2026-10-20',
      wearTime: '10:00',
      occasion: 'Casual',
      notes: 'Weekend walk'
    });

    assert.ok(event1.id);
    assert.equal(event1.itemIds.length, 4);
    assert.equal(event1.itemSnapshots.length, 4);
    assert.equal(event1.itemSnapshots[0].name, 'Cotton Tee');

    // Wear count must be 1 for each
    assert.equal(repo.getGarment(top.id, userId).wearCount, 1);
    assert.equal(repo.getGarment(bottom.id, userId).wearCount, 1);
    assert.equal(repo.getGarment(shoes.id, userId).wearCount, 1);
    assert.equal(repo.getGarment(watch.id, userId).wearCount, 1);

    // Status updated to Worn
    assert.equal(repo.getGarment(top.id, userId).status, AVAILABILITY_STATUS.WORN);
  });

  await t.test('Historical snapshot remains intact even if item is modified or archived', () => {
    // Modify garment in wardrobe
    repo.updateGarment(top.id, { name: 'Renamed Tee', isArchived: true }, userId);

    const updatedGarment = repo.getGarment(top.id, userId);
    assert.equal(updatedGarment.name, 'Renamed Tee');
    assert.equal(updatedGarment.isArchived, true);

    // Check historical event snapshot
    const savedEvent = history.storage.getHistoryEvent(event1.id, userId);
    const topSnapshot = savedEvent.itemSnapshots.find(s => s.id === top.id);
    assert.equal(topSnapshot.name, 'Cotton Tee', 'Snapshot name must remain original');
    assert.equal(topSnapshot.isArchived, false, 'Snapshot archived flag must remain false');
  });

  await t.test('Manual past outfit logging properly records past date', () => {
    const pastEvent = history.addManualPastOutfit({
      userId,
      itemIds: [bottom.id, shoes.id],
      wearDate: '2026-09-15',
      occasion: 'College',
      notes: 'Exam day'
    });

    assert.equal(pastEvent.wearDate, '2026-09-15');
    assert.equal(repo.getGarment(bottom.id, userId).wearCount, 2);
    assert.equal(repo.getGarment(shoes.id, userId).wearCount, 2);
  });

  await t.test('Deleting a history entry decrements wear counts', () => {
    const beforeCount = repo.getGarment(bottom.id, userId).wearCount;
    history.deleteHistoryEntry(event1.id, userId);
    const afterCount = repo.getGarment(bottom.id, userId).wearCount;
    assert.equal(afterCount, beforeCount - 1);
  });
});
