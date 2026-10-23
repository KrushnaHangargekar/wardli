/**
 * Wardrobe Screen & Garment Management
 * Matching design sheet: 02_wardrobe.png
 */

import { storage, formatCurrency } from '../../services/storage.js';
import { AVAILABILITY_STATUS, DEFAULT_SUBCATEGORIES, OCCASIONS, COLOR_PALETTES } from '../../domain/constants.js';
import { createGarment } from '../../domain/models.js';
import { getGarmentSvg } from '../assets.js';

export function renderWardrobeScreen({ onOpenAddItem, onOpenItemDetail, onRefresh }) {
  const container = document.createElement('div');
  container.className = 'wardrobe-screen';

  let activeCategory = 'All';
  let activeStatus = 'All';

  function renderContent() {
    const userId = storage.getCurrentUserId();
    const profile = storage.getProfile(userId);
    const customCats = profile?.customCategories || [];

    const categories = ['All', 'Tops', 'Bottoms', 'Footwear', 'Accessories', ...customCats];
    const garments = storage.getGarments(userId, {
      includeArchived: false,
      category: activeCategory,
      status: activeStatus
    });

    container.innerHTML = `
      <div class="screen-header">
        <div>
          <h2 class="screen-title">My Wardrobe</h2>
          <p class="screen-subtitle">${garments.length} items in collection</p>
        </div>
        <button id="btn-add-item-trigger" class="btn btn-primary btn-sm">
          + Add Item
        </button>
      </div>

      <!-- Category Filter Pills -->
      <div class="filter-pill-bar" id="category-pills">
        ${categories.map(cat => `
          <button class="pill-btn ${cat === activeCategory ? 'active' : ''}" data-category="${cat}">
            ${cat}
          </button>
        `).join('')}
      </div>

      <!-- Secondary Status Bar -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; font-size: 12px; color: #71717A;">
        <div style="display: flex; align-items: center; gap: 6px; overflow-x: auto;">
          <span>Status:</span>
          ${['All', 'Clean', 'Worn', 'In Laundry', 'Reserved'].map(st => `
            <button class="pill-btn btn-sm ${st === activeStatus ? 'active' : ''}" data-status="${st}" style="padding: 2px 8px; font-size: 11px;">
              ${st}
            </button>
          `).join('')}
        </div>
        <button id="btn-add-custom-cat" style="background: none; border: none; font-size: 11px; font-weight: 600; color: #18181B; cursor: pointer; text-decoration: underline;">
          + Category
        </button>
      </div>

      <!-- Garments Grid -->
      ${garments.length === 0 ? `
        <div class="empty-state">
          <div style="width: 40px; height: 40px; border-radius: 10px; background: #F4F4F5; margin: 0 auto 14px; display: flex; align-items: center; justify-content: center;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#71717A" stroke-width="2"><path d="M12 2a3 3 0 0 0-3 3c0 .7.3 1.3.8 1.8L2 14v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4l-7.8-7.2c.5-.5.8-1.1.8-1.8a3 3 0 0 0-3-3z"/></svg>
          </div>
          <h3 class="empty-state-title">No items found</h3>
          <p class="empty-state-desc">There are no items matching "${activeCategory}" with status "${activeStatus}".</p>
          <button id="btn-empty-add" class="btn btn-secondary btn-sm" style="margin-top: 10px;">
            + Add First Item
          </button>
        </div>
      ` : `
        <div class="garment-grid">
          ${garments.map(item => {
            const statusClass = item.status.toLowerCase().replace(' ', '-');
            const cpw = item.purchasePrice && (item.wearCount || 0) > 0
              ? `${formatCurrency(Math.round(item.purchasePrice / item.wearCount))}/wear`
              : item.purchasePrice ? `${formatCurrency(item.purchasePrice)}` : '';

            return `
              <div class="garment-card" data-id="${item.id}">
                <div class="garment-card-media">
                  ${getGarmentSvg(item.category, item.subcategory, item.primaryColor)}
                  <div style="position: absolute; top: 6px; left: 6px;">
                    <span class="status-badge ${statusClass}">${item.status}</span>
                  </div>
                  ${cpw ? `
                    <div style="position: absolute; bottom: 6px; right: 6px; font-size: 10px; font-weight: 700; background: rgba(0,0,0,0.6); color: #fff; padding: 2px 6px; border-radius: 4px;">
                      ${cpw}
                    </div>
                  ` : ''}
                </div>
                <div class="garment-card-title" title="${item.name}">${item.name}</div>
                <div class="garment-card-meta">
                  <span>${item.subcategory || item.category}</span>
                  <span class="wear-count-tag">${item.wearCount || 0} ${item.wearCount === 1 ? 'wear' : 'wears'}</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `}
    `;

    // Attach category filter listeners
    container.querySelectorAll('#category-pills .pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCategory = btn.getAttribute('data-category');
        renderContent();
      });
    });

    // Attach status filter listeners
    container.querySelectorAll('[data-status]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeStatus = btn.getAttribute('data-status');
        renderContent();
      });
    });

    // Add item trigger
    const addBtn = container.querySelector('#btn-add-item-trigger');
    if (addBtn) addBtn.addEventListener('click', onOpenAddItem);
    const emptyAddBtn = container.querySelector('#btn-empty-add');
    if (emptyAddBtn) emptyAddBtn.addEventListener('click', onOpenAddItem);

    // Add custom category
    const addCatBtn = container.querySelector('#btn-add-custom-cat');
    if (addCatBtn) {
      addCatBtn.addEventListener('click', () => {
        const catName = prompt('Enter new wardrobe category name (e.g. Activewear, Ethnic, Outerwear):');
        if (catName && catName.trim()) {
          const trimmed = catName.trim();
          const p = storage.getProfile(userId) || { id: userId, customCategories: [] };
          if (!p.customCategories) p.customCategories = [];
          if (!p.customCategories.includes(trimmed)) {
            p.customCategories.push(trimmed);
            storage.saveProfile(p);
            activeCategory = trimmed;
            renderContent();
          }
        }
      });
    }

    // Garment detail triggers
    container.querySelectorAll('.garment-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        onOpenItemDetail(id);
      });
    });
  }

  renderContent();
  return {
    element: container,
    refresh: renderContent
  };
}
