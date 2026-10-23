/**
 * Profile & Settings Screen with Multi-User Authentication & Privacy Controls
 */

import { storage } from '../../services/storage.js';
import { authService } from '../../services/authService.js';
import { BRAND_SVGS } from '../assets.js';
import { getCuratedSeedWardrobe } from '../../services/seedData.js';
import { CURRENCIES } from '../../domain/constants.js';

export function renderProfileScreen({ onUserSwitched, onRefreshAll, onOpenLogin, onOpenSignup, onLogout }) {
  const container = document.createElement('div');
  container.className = 'profile-screen';

  function renderContent() {
    const currentUserId = storage.getCurrentUserId();
    const session = authService.getSession();
    const profile = storage.getProfile(currentUserId) || {
      id: currentUserId,
      displayName: session?.name || 'Wardli User',
      email: session?.email || `${currentUserId}@wardli.style`,
      repeatAvoidanceDays: 7,
      customCategories: ['Outerwear', 'Activewear']
    };

    const allAccounts = authService.getAllAccounts();
    const activeCurrency = storage.getCurrency();

    container.innerHTML = `
      <div style="text-align: center; margin-bottom: 20px; padding-top: 10px;">
        <div style="width: 50px; height: 50px; margin: 0 auto 12px auto;">
          ${BRAND_SVGS.appIcon}
        </div>
        <h2 style="font-size: 24px; font-weight: 800; letter-spacing: -0.8px; color: #000000;">wardli</h2>
        <p style="font-size: 13px; color: #71717A; font-weight: 500;">Your wardrobe. Your everyday style.</p>
      </div>

      <!-- Current Account Card with Log Out & Auth Actions -->
      <div style="background: #FFFFFF; border: 1px solid #E5E5E5; border-radius: 16px; padding: 18px; margin-bottom: 16px;">
        <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 12px;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <h3 style="font-size: 16px; font-weight: 800; color: #000000;">${profile.displayName || 'Wardli User'}</h3>
              <span style="font-size: 11px; font-weight: 700; color: ${session?.isDemo ? '#D97706' : '#059669'}; background: ${session?.isDemo ? '#FFFBEB' : '#ECFDF5'}; padding: 2px 8px; border-radius: 6px;">
                ${session?.isDemo ? 'Demo Mode' : 'Authenticated'}
              </span>
            </div>
            <p style="font-size: 12px; color: #71717A; margin-top: 2px;">
              ${profile.email || `${currentUserId}@wardli.style`}
            </p>
          </div>
          <div style="width: 40px; height: 40px; border-radius: 50%; background: #000000; color: #FFFFFF; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 14px;">
            ${(profile.displayName || 'U').charAt(0).toUpperCase()}
          </div>
        </div>

        <div style="display: flex; gap: 8px; margin-top: 14px;">
          <button id="btn-profile-logout" class="btn btn-secondary btn-sm" style="flex: 1; color: #DC2626; border-color: #FCA5A5; background: #FEF2F2;">
            Log Out
          </button>
          <button id="btn-profile-login" class="btn btn-secondary btn-sm" style="flex: 1;">
            Log In
          </button>
          <button id="btn-profile-signup" class="btn btn-primary btn-sm" style="flex: 1;">
            Sign Up
          </button>
        </div>
      </div>

      <!-- Currency Preference Settings -->
      <div style="background: #FFFFFF; border: 1px solid #E5E5E5; border-radius: 16px; padding: 16px; margin-bottom: 16px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
          <h3 style="font-size: 14px; font-weight: 800; color: #000000;">Currency</h3>
          <span style="font-size: 12px; font-weight: 700; color: #000000; background: #F4F4F5; padding: 2px 8px; border-radius: 6px;">
            ${activeCurrency.code} (${activeCurrency.symbol})
          </span>
        </div>
        <p style="font-size: 12px; color: #71717A; margin-bottom: 12px;">
          Select your currency for wardrobe valuation and cost-per-wear analytics.
        </p>

        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px;">
          ${Object.values(CURRENCIES).map(curr => `
            <button class="currency-btn" data-currency="${curr.code}" style="
              display: flex; flex-direction: column; align-items: center; justify-content: center;
              padding: 10px 4px; border-radius: 10px; border: 1px solid ${curr.code === activeCurrency.code ? '#000000' : '#E5E5E5'};
              background: ${curr.code === activeCurrency.code ? '#000000' : '#FFFFFF'};
              color: ${curr.code === activeCurrency.code ? '#FFFFFF' : '#000000'};
              cursor: pointer; font-family: inherit; transition: all 0.15s ease;
            ">
              <span style="font-size: 16px; font-weight: 800;">${curr.symbol}</span>
              <span style="font-size: 11px; font-weight: 600; margin-top: 2px;">${curr.code}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Multi-User Account Switcher (Owner-Level Isolation) -->
      <div style="background: #FFFFFF; border: 1px solid #E5E5E5; border-radius: 16px; padding: 16px; margin-bottom: 16px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
          <h3 style="font-size: 14px; font-weight: 800; color: #000000;">Switch Active Account</h3>
          <span style="font-size: 11px; font-weight: 700; color: #059669; background: #ECFDF5; padding: 2px 8px; border-radius: 6px;">
            Owner-Isolated
          </span>
        </div>
        <p style="font-size: 12px; color: #71717A; margin-bottom: 12px;">
          Wardli enforces strict user data isolation. Switching accounts proves that User A cannot see or modify User B's wardrobe, photos, or history.
        </p>

        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${allAccounts.map(u => `
            <div class="user-switch-item" data-user-id="${u.id}" style="
              display: flex; align-items: center; justify-content: space-between;
              padding: 10px 14px; border-radius: 10px; border: 1px solid ${u.id === currentUserId ? '#000000' : '#E5E5E5'};
              background: ${u.id === currentUserId ? '#FAFAFA' : '#FFFFFF'}; cursor: pointer;
            ">
              <div>
                <div style="font-size: 13px; font-weight: 700; color: #000000;">${u.name}</div>
                <div style="font-size: 11px; color: #71717A;">${u.email} ${u.isDemo ? '(Demo)' : ''}</div>
              </div>
              ${u.id === currentUserId ? '<span style="font-size: 12px; font-weight: 800; color: #000000;">Active</span>' : '<span style="font-size: 11px; color: #A1A1AA;">Switch &rarr;</span>'}
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

      <!-- PWA Mobile App Installation -->
      <div style="background: #FFFFFF; border: 1px solid #E5E5E5; border-radius: 16px; padding: 16px; margin-bottom: 16px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
          <h3 style="font-size: 14px; font-weight: 800; color: #000000;">Install Mobile App</h3>
          <span style="font-size: 11px; font-weight: 700; color: #2563EB; background: #EFF6FF; padding: 2px 8px; border-radius: 6px;">
            PWA Ready
          </span>
        </div>
        <p style="font-size: 12px; color: #71717A; margin-bottom: 12px; line-height: 1.5;">
          Install Wardli directly on your home screen for full-screen offline access without downloading from app stores.
        </p>

        <button id="btn-install-pwa" class="btn btn-primary btn-sm" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px;">
          <span>📲</span> <span>Install Wardli to Home Screen</span>
        </button>
        <div id="pwa-install-hint" style="display: none; font-size: 11px; color: #71717A; margin-top: 8px; text-align: center; background: #FAFAFA; padding: 8px; border-radius: 8px;">
          To install on iPhone/iPad: Tap <strong>Share (↑)</strong> in Safari, then tap <strong>Add to Home Screen</strong>.
        </div>
      </div>

      <!-- Backup, Privacy & Reset -->
      <div style="background: #FFFFFF; border: 1px solid #E5E5E5; border-radius: 16px; padding: 16px; margin-bottom: 24px;">
        <h3 style="font-size: 14px; font-weight: 800; color: #000000; margin-bottom: 12px;">Data Management & Backup</h3>

        <div style="display: flex; flex-direction: column; gap: 8px;">
          <button id="btn-export-json" class="btn btn-secondary btn-sm" style="width: 100%;">
            Export Wardrobe &amp; History (JSON)
          </button>
          <button id="btn-reseed-data" class="btn btn-secondary btn-sm" style="width: 100%;">
            Reset &amp; Load Demo Wardrobe
          </button>
          <a href="/website/index.html" target="_blank" class="btn btn-secondary btn-sm" style="width: 100%; text-decoration: none;">
            View Marketing Website &rarr;
          </a>
        </div>
      </div>
    `;

    // Auth actions
    const logoutBtn = container.querySelector('#btn-profile-logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to log out of this account?')) {
          authService.logout();
          if (onLogout) {
            onLogout();
          } else {
            renderContent();
            onRefreshAll();
          }
        }
      });
    }

    const loginBtn = container.querySelector('#btn-profile-login');
    if (loginBtn) {
      loginBtn.addEventListener('click', () => {
        if (onOpenLogin) onOpenLogin();
      });
    }

    const signupBtn = container.querySelector('#btn-profile-signup');
    if (signupBtn) {
      signupBtn.addEventListener('click', () => {
        if (onOpenSignup) onOpenSignup();
      });
    }

    // PWA Install Button
    const pwaBtn = container.querySelector('#btn-install-pwa');
    const pwaHint = container.querySelector('#pwa-install-hint');
    if (pwaBtn) {
      pwaBtn.addEventListener('click', async () => {
        if (window.deferredPrompt) {
          window.deferredPrompt.prompt();
          const { outcome } = await window.deferredPrompt.userChoice;
          if (outcome === 'accepted') {
            window.deferredPrompt = null;
            pwaBtn.textContent = '✓ Wardli Installed!';
            pwaBtn.disabled = true;
          }
        } else {
          // If already installed or on iOS/Safari
          if (pwaHint) {
            pwaHint.style.display = pwaHint.style.display === 'none' ? 'block' : 'none';
          }
        }
      });
    }

    // Account switch listeners
    container.querySelectorAll('.user-switch-item').forEach(item => {
      item.addEventListener('click', () => {
        const targetUserId = item.getAttribute('data-user-id');
        if (targetUserId !== currentUserId) {
          storage.setCurrentUserId(targetUserId);

          // If switching to Jordan Lee, seed minimalist if empty
          if (targetUserId === 'user_minimalist' && storage.getGarments(targetUserId).length === 0) {
            const seed = getCuratedSeedWardrobe(targetUserId);
            seed.garments = seed.garments.slice(0, 6);
            seed.events = seed.events.slice(0, 3);
            storage.saveProfile({ ...seed.profile, displayName: 'Jordan Lee' });
            seed.garments.forEach(g => storage.saveGarment(g, targetUserId));
            seed.events.forEach(e => storage.saveHistoryEvent(e, targetUserId));
          }

          const targetAccount = allAccounts.find(a => a.id === targetUserId);
          if (targetAccount) {
            authService.setSession(targetAccount);
          }

          onUserSwitched(targetUserId);
        }
      });
    });

    // Currency selector listeners
    container.querySelectorAll('[data-currency]').forEach(btn => {
      btn.addEventListener('click', () => {
        const code = btn.getAttribute('data-currency');
        storage.setCurrency(code);
        renderContent();
        onRefreshAll();
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
