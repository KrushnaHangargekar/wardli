import test from 'node:test';
import assert from 'node:assert/strict';
import { StorageRepository } from '../src/services/storage.js';
import { HistoryService } from '../src/services/historyService.js';
import { SuggestionEngine } from '../src/services/suggestionEngine.js';
import { createGarment, createProfile } from '../src/domain/models.js';
import { AVAILABILITY_STATUS } from '../src/domain/constants.js';

test('SuggestionEngine — Deterministic Rules, Availability, Swap & Repetition Avoidance', async (t) => {
  const repo = new StorageRepository();
  const history = new HistoryService(repo);
  const engine = new SuggestionEngine(repo);
  const userId = 'test_user_suggestions';

  repo.saveProfile(createProfile({ id: userId, repeatAvoidanceDays: 7 }));

  // Seed Clean items
  const cleanTop1 = repo.saveGarment(createGarment({
    userId,
    name: 'Clean Black Tee',
    category: 'Tops',
    primaryColor: 'Black',
    occasions: ['Casual', 'College'],
    status: AVAILABILITY_STATUS.CLEAN
  }), userId);

  const cleanTop2 = repo.saveGarment(createGarment({
    userId,
    name: 'Clean White Shirt',
    category: 'Tops',
    primaryColor: 'White',
    occasions: ['Office', 'Formal'],
    status: AVAILABILITY_STATUS.CLEAN
  }), userId);

  // Unavailable items
  const laundryTop = repo.saveGarment(createGarment({
    userId,
    name: 'Laundry Tee',
    category: 'Tops',
    primaryColor: 'Grey',
    occasions: ['Casual'],
    status: AVAILABILITY_STATUS.IN_LAUNDRY
  }), userId);

  const reservedTop = repo.saveGarment(createGarment({
    userId,
    name: 'Reserved Jacket',
    category: 'Tops',
    primaryColor: 'Black',
    occasions: ['Casual'],
    status: AVAILABILITY_STATUS.RESERVED
  }), userId);

  const wornTop = repo.saveGarment(createGarment({
    userId,
    name: 'Worn Sweater',
    category: 'Tops',
    primaryColor: 'Navy',
    occasions: ['Casual'],
    status: AVAILABILITY_STATUS.WORN
  }), userId);

  const cleanBottom = repo.saveGarment(createGarment({
    userId,
    name: 'Black Chinos',
    category: 'Bottoms',
    primaryColor: 'Black',
    occasions: ['Casual', 'Office'],
    status: AVAILABILITY_STATUS.CLEAN
  }), userId);

  const cleanShoes = repo.saveGarment(createGarment({
    userId,
    name: 'White Sneakers',
    category: 'Footwear',
    primaryColor: 'White',
    occasions: ['Casual', 'Office'],
    status: AVAILABILITY_STATUS.CLEAN
  }), userId);

  const cleanWatch = repo.saveGarment(createGarment({
    userId,
    name: 'Leather Watch',
    category: 'Accessories',
    subcategory: 'Watch',
    primaryColor: 'Black',
    occasions: ['Casual', 'Office'],
    status: AVAILABILITY_STATUS.CLEAN
  }), userId);

  await t.test('Never includes unavailable garments in suggestions', () => {
    const res = engine.generateSuggestions({ occasion: 'Casual', userId, maxResults: 3 });
    assert.ok(res.suggestions.length > 0);

    res.suggestions.forEach(s => {
      assert.notEqual(s.top.id, laundryTop.id, 'Should not suggest In Laundry item');
      assert.notEqual(s.top.id, reservedTop.id, 'Should not suggest Reserved item');
      assert.notEqual(s.top.id, wornTop.id, 'Should not suggest Worn item');
    });
  });

  await t.test('Single-item swap replaces only the targeted slot', () => {
    const res = engine.generateSuggestions({ occasion: 'Casual', userId });
    const initialOutfit = res.suggestions[0];

    const updatedOutfit = engine.replaceSingleItem(initialOutfit, 'Tops', cleanTop2);

    assert.equal(updatedOutfit.top.id, cleanTop2.id, 'Top must be replaced');
    assert.equal(updatedOutfit.bottom.id, initialOutfit.bottom.id, 'Bottom must remain unchanged');
    assert.equal(updatedOutfit.footwear.id, initialOutfit.footwear.id, 'Footwear must remain unchanged');
  });

  await t.test('Remove accessory removes only that accessory', () => {
    const testOutfit = {
      top: cleanTop1,
      bottom: cleanBottom,
      footwear: cleanShoes,
      accessories: [cleanWatch]
    };

    const updated = engine.removeAccessory(testOutfit, cleanWatch.id);
    assert.equal(updated.accessories.length, 0);
    assert.equal(updated.top.id, cleanTop1.id);
  });

  await t.test('Repetition control penalizes recently worn items', () => {
    // Record cleanTop1 as worn today
    history.recordWear({
      userId,
      itemIds: [cleanTop1.id, cleanBottom.id, cleanShoes.id],
      wearDate: new Date().toISOString().split('T')[0],
      occasion: 'Casual',
      updateGarmentStatus: false // keep clean for algorithm test
    });

    const res = engine.generateSuggestions({ occasion: 'Casual', userId });
    // cleanTop2 should rank higher than cleanTop1 due to recency penalty
    if (res.suggestions.length > 1) {
      assert.equal(res.suggestions[0].top.id, cleanTop2.id, 'Unworn/less recently worn top should be preferred');
    }
  });

  await t.test('Fallback: Returns best available outfit when alternatives are limited rather than empty', () => {
    // Both cleanTop1 and cleanTop2 have been worn, but they are still returned as best available
    const res = engine.generateSuggestions({ occasion: 'Casual', userId });
    assert.ok(res.suggestions.length >= 1, 'Must return best available look rather than empty array');
  });
});
