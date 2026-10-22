/**
 * Wardli Application Main Entry Point & Screen Orchestrator
 */

import { storage } from './services/storage.js';
import { initializeSeedDataIfEmpty } from './services/seedData.js';
import { BRAND_SVGS } from './ui/assets.js';
import { modalManager } from './ui/modals.js';
import { renderOnboardingScreen } from './ui/screens/onboardingScreen.js';
import { renderWardrobeScreen } from './ui/screens/wardrobeScreen.js';
import { renderSuggestionsScreen } from './ui/screens/suggestionsScreen.js';
import { renderHistoryScreen } from './ui/screens/historyScreen.js';
import { renderPlannerScreen } from './ui/screens/plannerScreen.js';
import { renderAnalyticsScreen } from './ui/screens/analyticsScreen.js';
import { renderProfileScreen } from './ui/screens/profileScreen.js';

class WardliApp {
  constructor() {
    this.currentScreen = 'wardrobe';
    this.isExpandedView = false;
    this.screenControllers = {};

    // Initialize curated seed data for first run
    initializeSeedDataIfEmpty(storage);

    this.initDOM();
    this.attachGlobalEvents();
    this.navigateTo(this.currentScreen);
  }

  initDOM() {
    const root = document.getElementById('app-root');
    root.innerHTML = `
      <div class="app-viewport-wrapper">
        <div class="device-frame" id="device-frame-container">
          <!-- Android Status Bar -->
          <div class="device-status-bar">
            <span>9:41</span>
            <div class="device-notch"></div>
            <div style="display: flex; gap: 4px; align-items: center;">
              <span>5G</span>
              <span style="font-size: 11px;">100%</span>
            </div>
          </div>

          <!-- Top App Bar -->
          <header class="app-header">
            <a href="#" class="app-brand-lockup" id="brand-home-link">
              <div class="app-icon-mini">w.</div>
              <span class="app-brand-title">wardli</span>
            </a>

            <div class="header-actions">
              <button class="user-badge-btn" id="header-user-btn" title="Switch User / Account Isolation">
                <span class="user-dot"></span>
                <span id="header-user-name">Alex</span>
              </button>
              <button class="icon-btn-toggle" id="btn-toggle-view" title="Toggle Mobile Mockup / Expanded View">
                📱
              </button>
            </div>
          </header>

          <!-- Dynamic Screen Viewport -->
          <main class="app-screen-container" id="screen-viewport"></main>

          <!-- Bottom Navigation Bar -->
          <nav class="bottom-nav" id="bottom-nav-bar">
            <button class="nav-item active" data-nav="wardrobe">
              ${BRAND_SVGS.wardrobeIcon}
              <span>Wardrobe</span>
            </button>
            <button class="nav-item" data-nav="outfits">
              ${BRAND_SVGS.outfitIcon}
              <span>Outfits</span>
            </button>
            <button class="nav-item" data-nav="planner">
              ${BRAND_SVGS.plannerIcon}
              <span>Planner</span>
            </button>
            <button class="nav-item" data-nav="history">
              ${BRAND_SVGS.historyIcon}
              <span>History</span>
            </button>
            <button class="nav-item" data-nav="analytics">
              ${BRAND_SVGS.analyticsIcon}
              <span>Insights</span>
            </button>
            <button class="nav-item" data-nav="profile">
              ${BRAND_SVGS.profileIcon}
              <span>Profile</span>
            </button>
          </nav>
        </div>
      </div>
    `;

    this.viewport = document.getElementById('screen-viewport');
    this.deviceFrame = document.getElementById('device-frame-container');
    this.navBar = document.getElementById('bottom-nav-bar');
    this.updateUserBadge();
  }

  updateUserBadge() {
    const userBtn = document.getElementById('header-user-name');
    const userId = storage.getCurrentUserId();
    const profile = storage.getProfile(userId);
    if (userBtn) {
      userBtn.textContent = profile?.displayName ? profile.displayName.split(' ')[0] : 'User';
    }
  }

  attachGlobalEvents() {
    // Navigation bar clicks
    this.navBar.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        const target = item.getAttribute('data-nav');
        this.navigateTo(target);
      });
    });

    // Brand lockup click -> Onboarding / Home
    document.getElementById('brand-home-link').addEventListener('click', (e) => {
      e.preventDefault();
      this.navigateTo('onboarding');
    });

    // User badge click -> Profile & Multi-User Switcher
    document.getElementById('header-user-btn').addEventListener('click', () => {
      this.navigateTo('profile');
    });

    // View toggle (Mobile frame vs Expanded)
    document.getElementById('btn-toggle-view').addEventListener('click', () => {
      this.isExpandedView = !this.isExpandedView;
      this.deviceFrame.classList.toggle('expanded-view', this.isExpandedView);
      document.getElementById('btn-toggle-view').textContent = this.isExpandedView ? '💻' : '📱';
    });
  }

  navigateTo(screenKey) {
    this.currentScreen = screenKey;
    this.viewport.innerHTML = '';

    // Update bottom nav active indicator
    this.navBar.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-nav') === screenKey);
    });

    // Render targeted screen
    if (screenKey === 'onboarding') {
      const screen = renderOnboardingScreen(() => this.navigateTo('wardrobe'));
      this.viewport.appendChild(screen);
    } else if (screenKey === 'wardrobe') {
      const ctrl = renderWardrobeScreen({
        onOpenAddItem: () => {
          modalManager.openAddGarment({
            onSaved: () => this.refreshCurrentScreen()
          });
        },
        onOpenItemDetail: (id) => {
          modalManager.openGarmentDetail(id, {
            onUpdated: () => this.refreshCurrentScreen(),
            onDeleted: () => this.refreshCurrentScreen()
          });
        },
        onRefresh: () => this.refreshCurrentScreen()
      });
      this.screenControllers[screenKey] = ctrl;
      this.viewport.appendChild(ctrl.element);
    } else if (screenKey === 'outfits') {
      const ctrl = renderSuggestionsScreen({
        onOpenSwapDrawer: (params) => modalManager.openSwapDrawer(params),
        onNavigateHistory: () => this.navigateTo('history'),
        onRefreshAll: () => this.refreshAll()
      });
      this.screenControllers[screenKey] = ctrl;
      this.viewport.appendChild(ctrl.element);
    } else if (screenKey === 'planner') {
      const ctrl = renderPlannerScreen({
        onOpenPlanModal: (date) => {
          modalManager.openSchedulePlan(date, {
            onScheduled: () => this.refreshCurrentScreen()
          });
        },
        onRefreshAll: () => this.refreshAll(),
        onNavigateHistory: () => this.navigateTo('history')
      });
      this.screenControllers[screenKey] = ctrl;
      this.viewport.appendChild(ctrl.element);
    } else if (screenKey === 'history') {
      const ctrl = renderHistoryScreen({
        onOpenManualLog: () => {
          modalManager.openManualLog({
            onLogged: () => {
              this.refreshCurrentScreen();
              this.refreshAll();
            }
          });
        },
        onOpenHistoryDetail: (id) => {
          modalManager.openHistoryDetail(id, {
            onUpdated: () => this.refreshCurrentScreen(),
            onDeleted: () => {
              this.refreshCurrentScreen();
              this.refreshAll();
            }
          });
        },
        onOpenLeaderboard: () => modalManager.openLeaderboard()
      });
      this.screenControllers[screenKey] = ctrl;
      this.viewport.appendChild(ctrl.element);
    } else if (screenKey === 'analytics') {
      const ctrl = renderAnalyticsScreen({
        onOpenGarmentDetail: (id) => {
          modalManager.openGarmentDetail(id, {
            onUpdated: () => this.refreshCurrentScreen(),
            onDeleted: () => this.refreshCurrentScreen()
          });
        }
      });
      this.screenControllers[screenKey] = ctrl;
      this.viewport.appendChild(ctrl.element);
    } else if (screenKey === 'profile') {
      const ctrl = renderProfileScreen({
        onUserSwitched: () => {
          this.updateUserBadge();
          this.refreshAll();
          this.navigateTo('wardrobe');
        },
        onRefreshAll: () => this.refreshAll()
      });
      this.screenControllers[screenKey] = ctrl;
      this.viewport.appendChild(ctrl.element);
    }

    this.viewport.scrollTop = 0;
  }

  refreshCurrentScreen() {
    if (this.screenControllers[this.currentScreen]?.refresh) {
      this.screenControllers[this.currentScreen].refresh();
    }
  }

  refreshAll() {
    Object.values(this.screenControllers).forEach(ctrl => {
      if (ctrl?.refresh) ctrl.refresh();
    });
    this.updateUserBadge();
  }
}

// Bootstrap application on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.wardliApp = new WardliApp();
});
