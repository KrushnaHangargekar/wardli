/**
 * Profile & Settings Screen with Multi-User Switcher & Privacy Audit
 */

import { storage } from '../../services/storage.js';
import { BRAND_SVGS } from '../assets.js';
import { getCuratedSeedWardrobe } from '../../services/seedData.js';

export function renderProfileScreen({ onUserSwitched, onRefreshAll }) {
  const container = document.createElement('div');
  container.className = 'profile-screen';

  function renderContent() {
    const currentUserId = storage.getCurrentUserId();
    const profile = storage.getProfile(currentUserId) || {
      id: currentUserId,
      displayName: 'Wardli User',
      email: 'user@wardli.style',
      repeatAvoidanceDays: 7,
      customCategories: ['Outerwear', 'Activewear']
    };

    const presetUsers = [
      { id: 'user_default', name: 'Alex Chen', role: 'Full Capsule Wardrobe' },
      { id: 'user_minimalist', name: 'Jordan Lee', role: 'Minimalist Wardrobe' },
      { id: 'user_fresh', name: 'New User', role: 'Empty State Test' }
    ];

    container.innerHTML = `
      <div style="text-align: center; margin-bottom: 24px; padding-top: 10px;">
        <div style="width: 50px; height: 50px; margin: 0 auto 12px auto;">
          ${BRAND_SVGS.appIcon}
        </div>
        <h2 style="font-size: 24px; font-weight: 800; letter-spacing: -0.8px; color: #000000;">wardli</h2>
        <p style="font-size: 13px; color: #71717A; font-weight: 500;">Your wardrobe. Your everyday style.</p>
      </div>

      <!-- Multi-User Account Switcher (Testing Owner-Level Isolation) -->
      <div style="background: #FFFFFF; border: 1px solid #E5E5E5; border-radius: 16px; padding: 16px; margin-bottom: 16px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <h3 style="font-size: 14px; font-weight: 800; color: #000000;">Switch Active Account</h3>
          <span style="font-size: 11px; font-weight: 700; color: #059669; background: #ECFDF5; padding: 2px 8px; border-radius: 6px;">
            🔒 Owner Isolated
          </span>
        </div>
        <p style="font-size: 12px; color: #71717A; margin-bottom: 12px;">
          Wardli enforces strict user data isolation. Switching accounts proves that User A cannot see or modify User B's wardrobe, photos, or history.
        </p>

        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${presetUsers.map(u => `
            <div class="user-switch-item" data-user-id="${u.id}" style="
              display: flex; align-items: center; justify-content: space-between;
              padding: 10px 14px; border-radius: 10px; border: 1px solid ${u.id === currentUserId ? '#000000' : '#E5E5E5'};
              background: ${u.id === currentUserId ? '#FAFAFA' : '#FFFFFF'}; cursor: pointer;
            ">
              <div>
                <div style="font-size: 13px; font-weight: 700; color: #000000;">${u.name}</div>
                <div style="font-size: 11px; color: #71717A;">${u.role} (${u.id})</div>
              </div>
              ${u.id === currentUserId ? '<span style="font-size: 12px; font-weight: 800; color: #000000;">Active ✓</span>' : '<span style="font-size: 11px; color: #A1A1AA;">Switch &rarr;</span>'}
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Repeat Avoidance Window Settings -->
      <div style="background: #FFFFFF; border: 1px solid #E5E5E5; border-radius: 16px; padding: 16px; margin-bottom: 16px;">
        <h3 style="font-size: 14px; font-weight: 800; color: #000000; margin-bottom: 4px;">Outfit Repetition Control</h3>
        <p style="font-size: 12px; color: #71717A; margin-bottom: 14px;">
          Configure how many days Wardli should avoid suggesting recently worn items when suitable alternatives exist.
        </p>

        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
          <span style="font-size: 13px; font-weight: 600;">Avoidance Window:</span>
          <span id="window-val-label" style="font-size: 15px; font-weight: 800; color: #000000;">${profile.repeatAvoidanceDays || 7} days</span>
        </div>

        <input type="range" id="avoidance-slider" min="3" max="30" value="${profile.repeatAvoidanceDays || 7}" style="width: 100%; accent-color: #000000; cursor: pointer;">
        <div style="display: flex; justify-content: space-between; font-size: 10px; color: #A1A1AA; margin-top: 4px;">
          <span>3 days (Minimal)</span>
          <span>7 days (Recommended)</span>
          <span>30 days (Strict)</span>
        </div>
      </div>

      <!-- Custom Categories Management -->
      <div style="background: #FFFFFF; border: 1px solid #E5E5E5; border-radius: 16px; padding: 16px; margin-bottom: 16px;">
        <h3 style="font-size: 14px; font-weight: 800; color: #000000; margin-bottom: 4px;">Custom Categories</h3>
        <p style="font-size: 12px; color: #71717A; margin-bottom: 12px;">
          Extensible wardrobe organization beyond Tops, Bottoms, Footwear and Accessories.
        </p>

        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;">
          ${(profile.customCategories || []).map(cat => `
            <div style="display: flex; align-items: center; gap: 6px; background: #F4F4F5; border: 1px solid #E5E5E5; padding: 4px 10px; border-radius: 8px; font-size: 12px; font-weight: 600;">
              <span>${cat}</span>
              <button data-delete-cat="${cat}" style="background: none; border: none; color: #A1A1AA; cursor: pointer;">&times;</button>
            </div>
          `).join('')}
        </div>

        <button id="btn-add-cat-profile" class="btn btn-secondary btn-sm" style="width: 100%;">
          + Add New Custom Category
        </button>
      </div>

      <!-- Backup, Privacy & Reset -->
      <div style="background: #FFFFFF; border: 1px solid #E5E5E5; border-radius: 16px; padding: 16px; margin-bottom: 24px;">
        <h3 style="font-size: 14px; font-weight: 800; color: #000000; margin-bottom: 12px;">Data Management & Backup</h3>

        <div style="display: flex; flex-direction: column; gap: 8px;">
          <button id="btn-export-json" class="btn btn-secondary btn-sm" style="width: 100%;">
            📥 Export Wardrobe & History (JSON)
          </button>
          <button id="btn-reseed-data" class="btn btn-secondary btn-sm" style="width: 100%;">
            🔄 Reset & Load Curated Demo Wardrobe
          </button>
          <a href="/website/index.html" target="_blank" class="btn btn-secondary btn-sm" style="width: 100%; text-decoration: none;">
            🌐 View Public Marketing Website &rarr;
          </a>
        </div>
      </div>
    `;

    // Account switch listeners
    container.querySelectorAll('.user-switch-item').forEach(item => {
      item.addEventListener('click', () => {
        const targetUserId = item.getAttribute('data-user-id');
        if (targetUserId !== currentUserId) {
          storage.setCurrentUserId(targetUserId);

          // If switching to Jordan Lee, seed minimalist if empty
          if (targetUserId === 'user_minimalist' && storage.getGarments(targetUserId).length === 0) {
            const seed = getCuratedSeedWardrobe(targetUserId);
            // Smaller capsule
            seed.garments = seed.garments.slice(0, 6);
            seed.events = seed.events.slice(0, 3);
            storage.saveProfile({ ...seed.profile, displayName: 'Jordan Lee' });
            seed.garments.forEach(g => storage.saveGarment(g, targetUserId));
            seed.events.forEach(e => storage.saveHistoryEvent(e, targetUserId));
          }

          onUserSwitched(targetUserId);
        }
      });
    });

    // Avoidance slider listener
    const slider = container.querySelector('#avoidance-slider');
    const label = container.querySelector('#window-val-label');
    if (slider) {
      slider.addEventListener('input', (e) => {
        const val = Number(e.target.value);
        if (label) label.textContent = `${val} days`;
        profile.repeatAvoidanceDays = val;
        storage.saveProfile(profile);
      });
    }

    // Add category listener
    const addCatBtn = container.querySelector('#btn-add-cat-profile');
    if (addCatBtn) {
      addCatBtn.addEventListener('click', () => {
        const cat = prompt('Enter custom category name:');
        if (cat && cat.trim()) {
          if (!profile.customCategories) profile.customCategories = [];
          if (!profile.customCategories.includes(cat.trim())) {
            profile.customCategories.push(cat.trim());
            storage.saveProfile(profile);
            renderContent();
            onRefreshAll();
          }
        }
      });
    }

    // Delete category
    container.querySelectorAll('[data-delete-cat]').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-delete-cat');
        profile.customCategories = (profile.customCategories || []).filter(c => c !== cat);
        storage.saveProfile(profile);
        renderContent();
        onRefreshAll();
      });
    });

    // Export JSON
    const exportBtn = container.querySelector('#btn-export-json');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        const data = storage.exportAllUserData(currentUserId);
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `wardli_backup_${currentUserId}.json`;
        a.click();
      });
    }

    // Reseed demo data
    const reseedBtn = container.querySelector('#btn-reseed-data');
    if (reseedBtn) {
      reseedBtn.addEventListener('click', () => {
        if (confirm('Reset this account and reload curated seed items & wear history?')) {
          storage.clearUserData(currentUserId);
          const seed = getCuratedSeedWardrobe(currentUserId);
          storage.saveProfile(seed.profile);
          seed.garments.forEach(g => storage.saveGarment(g, currentUserId));
          seed.events.forEach(e => storage.saveHistoryEvent(e, currentUserId));
          seed.plannedOutfits.forEach(p => storage.savePlannedOutfit(p, currentUserId));
          alert('Curated demo wardrobe and history reloaded!');
          onRefreshAll();
          renderContent();
        }
      });
    }
  }

  renderContent();

  return {
    element: container,
    refresh: renderContent
  };
}
