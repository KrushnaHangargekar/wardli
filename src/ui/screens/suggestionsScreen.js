/**
 * Outfit Builder and Suggestions Screen
 * Matching design sheet: 03_outfit_suggestion.png
 * Deterministic rule-based recommendations, single-item swaps, accessory removal, and "I Wore This".
 */

import { storage } from '../../services/storage.js';
import { suggestionEngine } from '../../services/suggestionEngine.js';
import { historyService } from '../../services/historyService.js';
import { OCCASIONS } from '../../domain/constants.js';
import { createOutfit } from '../../domain/models.js';
import { getGarmentSvg } from '../assets.js';

export function renderSuggestionsScreen({ onOpenSwapDrawer, onNavigateHistory, onRefreshAll }) {
  const container = document.createElement('div');
  container.className = 'suggestions-screen';

  let selectedOccasion = 'Casual';
  let selectedWeather = null;
  let activeIndex = 0;
  let currentSuggestions = [];
  let currentOutfit = null;

  function loadSuggestions() {
    const userId = storage.getCurrentUserId();
    const result = suggestionEngine.generateSuggestions({
      occasion: selectedOccasion,
      weather: selectedWeather,
      userId,
      maxResults: 3
    });

    currentSuggestions = result.suggestions || [];
    activeIndex = 0;
    currentOutfit = currentSuggestions.length > 0 ? { ...currentSuggestions[0] } : null;
    renderContent();
  }

  function renderContent() {
    const userId = storage.getCurrentUserId();
    const profile = storage.getProfile(userId);
    const avoidanceDays = profile?.repeatAvoidanceDays || 7;

    container.innerHTML = `
      <div class="screen-header">
        <div>
          <h2 class="screen-title">Today's Outfit</h2>
          <p class="screen-subtitle">Here's your look for today.</p>
        </div>
        <div style="font-size: 11px; font-weight: 600; background: #F4F4F5; padding: 4px 8px; border-radius: 6px; color: #52525B;">
          Avoid: ${avoidanceDays}d window
        </div>
      </div>

      <!-- Occasion Pill Bar -->
      <div class="filter-pill-bar" id="occasion-pills">
        ${OCCASIONS.map(occ => `
          <button class="pill-btn ${occ === selectedOccasion ? 'active' : ''}" data-occ="${occ}">
            ${occ}
          </button>
        `).join('')}
      </div>

      <!-- Weather Filter Pill Bar -->
      <div style="display: flex; align-items: center; gap: 6px; overflow-x: auto; padding: 0 0 12px 0;" id="weather-pills">
        <span style="font-size: 11px; font-weight: 700; color: #71717A; white-space: nowrap; margin-right: 2px;">Climate:</span>
        <button class="pill-btn ${selectedWeather === null ? 'active' : ''}" data-weather="all" style="font-size: 11px; padding: 4px 9px;">
          Any
        </button>
        <button class="pill-btn ${selectedWeather === 'cold' ? 'active' : ''}" data-weather="cold" style="font-size: 11px; padding: 4px 9px;">
          ❄️ Cold (<18°C)
        </button>
        <button class="pill-btn ${selectedWeather === 'warm' ? 'active' : ''}" data-weather="warm" style="font-size: 11px; padding: 4px 9px;">
          ☀️ Warm (>24°C)
        </button>
        <button class="pill-btn ${selectedWeather === 'rain' ? 'active' : ''}" data-weather="rain" style="font-size: 11px; padding: 4px 9px;">
          🌧️ Rain
        </button>
      </div>

      ${!currentOutfit ? `
        <div class="empty-state" style="margin-top: 30px;">
          <div style="width: 40px; height: 40px; border-radius: 10px; background: #F4F4F5; margin: 0 auto 14px; display: flex; align-items: center; justify-content: center;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#71717A" stroke-width="2"><path d="M12 2a3 3 0 0 0-3 3c0 .7.3 1.3.8 1.8L2 14v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4l-7.8-7.2c.5-.5.8-1.1.8-1.8a3 3 0 0 0-3-3z"/></svg>
          </div>
          <h3 class="empty-state-title">No clean outfits available</h3>
          <p class="empty-state-desc">You need at least one clean Top, Bottom, and Footwear to generate suggestions.</p>
          <p style="font-size: 12px; color: #71717A; margin-top: 6px;">Check your wardrobe to make sure garments are not marked In Laundry or Reserved.</p>
        </div>
      ` : `
        <div class="suggestion-card">
          <!-- Outfit Visual Canvas -->
          <div class="outfit-display-canvas">
            <!-- Top Slot -->
            <div class="outfit-slot" data-slot="Tops">
              <div class="outfit-slot-media" title="Tap to replace top">
                ${getGarmentSvg(currentOutfit.top.category, currentOutfit.top.subcategory, currentOutfit.top.primaryColor)}
                <span class="slot-swap-hint">Swap</span>
              </div>
              <div class="slot-label">Top</div>
              <div class="slot-name">${currentOutfit.top.name}</div>
            </div>

            <!-- Bottom Slot -->
            <div class="outfit-slot" data-slot="Bottoms">
              <div class="outfit-slot-media" title="Tap to replace bottom">
                ${getGarmentSvg(currentOutfit.bottom.category, currentOutfit.bottom.subcategory, currentOutfit.bottom.primaryColor)}
                <span class="slot-swap-hint">Swap</span>
              </div>
              <div class="slot-label">Bottom</div>
              <div class="slot-name">${currentOutfit.bottom.name}</div>
            </div>

            <!-- Footwear Slot -->
            <div class="outfit-slot" data-slot="Footwear">
              <div class="outfit-slot-media" title="Tap to replace footwear">
                ${getGarmentSvg(currentOutfit.footwear.category, currentOutfit.footwear.subcategory, currentOutfit.footwear.primaryColor)}
                <span class="slot-swap-hint">Swap</span>
              </div>
              <div class="slot-label">Footwear</div>
              <div class="slot-name">${currentOutfit.footwear.name}</div>
            </div>

            <!-- Accessories Slot / Summary -->
            <div class="outfit-slot" data-slot="Accessories">
              <div class="outfit-slot-media" title="Tap to add/replace accessories">
                ${currentOutfit.accessories && currentOutfit.accessories.length > 0
                  ? getGarmentSvg(currentOutfit.accessories[0].category, currentOutfit.accessories[0].subcategory, currentOutfit.accessories[0].primaryColor)
                  : `<div style="color: #A1A1AA; font-size: 11px; text-align: center;">+ Add<br>Accessory</div>`
                }
                <span class="slot-swap-hint">Swap</span>
              </div>
              <div class="slot-label">Accessories</div>
              <div class="slot-name">${currentOutfit.accessories?.length || 0} selected</div>
            </div>

            <!-- Accessories Chips Strip with Delete Buttons -->
            ${currentOutfit.accessories && currentOutfit.accessories.length > 0 ? `
              <div class="accessories-strip">
                ${currentOutfit.accessories.map(acc => `
                  <div class="accessory-chip">
                    ${getGarmentSvg(acc.category, acc.subcategory, acc.primaryColor)}
                    <span>${acc.name}</span>
                    <button class="accessory-remove-btn" data-remove-acc="${acc.id}" title="Remove accessory">&times;</button>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>

          <!-- History & Repetition Indicator Badge -->
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 4px 6px; font-size: 12px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              ${currentOutfit.historyInfo?.hasBeenWorn ? `
                <span style="color: #D97706; font-weight: 600;">
                  Worn ${currentOutfit.historyInfo.totalWears}&times; &mdash; Last: ${currentOutfit.historyInfo.lastWornDate}
                </span>
              ` : `
                <span style="color: #059669; font-weight: 600;">
                  Not yet recorded
                </span>
              `}
            </div>
            <div style="font-weight: 700; color: #71717A;">
              Score: ${currentOutfit.score || 95}
            </div>
          </div>

          <!-- Carousel Pagination Dots -->
          <div class="carousel-dots">
            ${currentSuggestions.map((_, i) => `
              <div class="dot ${i === activeIndex ? 'active' : ''}" data-index="${i}"></div>
            `).join('')}
          </div>

          <!-- Main Actions -->
          <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 4px;">
            <button id="btn-i-wore-this" class="btn btn-primary" style="padding: 14px; font-size: 15px; border-radius: 14px;">
              I Wore This
            </button>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <button id="btn-save-outfit" class="btn btn-secondary btn-sm" style="padding: 10px;">
                Save Outfit
              </button>
              <button id="btn-try-another" class="btn btn-secondary btn-sm" style="padding: 10px;">
                Next (${activeIndex + 1}/${currentSuggestions.length})
              </button>
            </div>
          </div>
        </div>
      `}
    `;

    // Occasion pill listeners
    container.querySelectorAll('#occasion-pills .pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedOccasion = btn.getAttribute('data-occ');
        loadSuggestions();
      });
    });

    // Weather pill listeners
    container.querySelectorAll('#weather-pills .pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-weather');
        selectedWeather = val === 'all' ? null : val;
        loadSuggestions();
      });
    });

    if (!currentOutfit) return;

    // Carousel dots listeners
    container.querySelectorAll('.dot').forEach(dot => {
      dot.addEventListener('click', () => {
        const idx = Number(dot.getAttribute('data-index'));
        if (currentSuggestions[idx]) {
          activeIndex = idx;
          currentOutfit = { ...currentSuggestions[idx] };
          renderContent();
        }
      });
    });

    // Slot swap listeners
    container.querySelectorAll('.outfit-slot').forEach(slotEl => {
      slotEl.addEventListener('click', () => {
        const slotCategory = slotEl.getAttribute('data-slot');
        onOpenSwapDrawer({
          category: slotCategory,
          currentOutfit,
          occasion: selectedOccasion,
          onItemChosen: (newItem) => {
            currentOutfit = suggestionEngine.replaceSingleItem(currentOutfit, slotCategory, newItem);
            renderContent();
          }
        });
      });
    });

    // Accessory remove buttons
    container.querySelectorAll('[data-remove-acc]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const accId = btn.getAttribute('data-remove-acc');
        currentOutfit = suggestionEngine.removeAccessory(currentOutfit, accId);
        renderContent();
      });
    });

    // Action: Try Another Outfit
    const tryAnotherBtn = container.querySelector('#btn-try-another');
    if (tryAnotherBtn) {
      tryAnotherBtn.addEventListener('click', () => {
        if (currentSuggestions.length > 1) {
          activeIndex = (activeIndex + 1) % currentSuggestions.length;
          currentOutfit = { ...currentSuggestions[activeIndex] };
          renderContent();
        }
      });
    }

    // Action: Save Outfit
    const saveOutfitBtn = container.querySelector('#btn-save-outfit');
    if (saveOutfitBtn) {
      saveOutfitBtn.addEventListener('click', () => {
        const accIds = (currentOutfit.accessories || []).map(a => a.id);
        const outfit = createOutfit({
          userId,
          name: `${selectedOccasion} Look`,
          occasion: selectedOccasion,
          topId: currentOutfit.top.id,
          bottomId: currentOutfit.bottom.id,
          footwearId: currentOutfit.footwear.id,
          accessoryIds: accIds,
          isFavorite: true
        });
        storage.saveOutfit(outfit, userId);
        alert(`Saved "${outfit.name}" to your favorites!`);
      });
    }

    // Action: I WORE THIS
    const woreThisBtn = container.querySelector('#btn-i-wore-this');
    if (woreThisBtn) {
      woreThisBtn.addEventListener('click', () => {
        const accIds = (currentOutfit.accessories || []).map(a => a.id);
        const allWornIds = [
          currentOutfit.top.id,
          currentOutfit.bottom.id,
          currentOutfit.footwear.id,
          ...accIds
        ];

        const notes = prompt('Any notes about today\'s outfit? (Optional)', '') || '';

        const event = historyService.recordWear({
          userId,
          itemIds: allWornIds,
          wearDate: new Date().toISOString().split('T')[0],
          occasion: selectedOccasion,
          notes: notes.trim(),
          updateGarmentStatus: true
        });

        alert(`Recorded! Wore ${allWornIds.length} items on ${event.wearDate}. Saved to exact wear history.`);
        onRefreshAll();
        onNavigateHistory();
      });
    }
  }

  loadSuggestions();

  return {
    element: container,
    refresh: loadSuggestions
  };
}
