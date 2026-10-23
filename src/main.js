/**
 * Wardli Application Main Entry Point & Screen Orchestrator
 * Integrates Authentication, User Isolation, and Navigation Flow.
 */

import { storage } from './services/storage.js';
import { authService } from './services/authService.js';
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
    this.screenControllers = {};

    // Initialize curated seed data for first demo run
    initializeSeedDataIfEmpty(storage);

    // Check active session or query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const actionParam = urlParams.get('action');

    const session = authService.getSession();
    if (session) {
      storage.setCurrentUserId(session.id);
      this.currentScreen = 'wardrobe';
    } else {
      // If not authenticated, default to onboarding splash
      this.currentScreen = 'onboarding';
    }

    this.initDOM();
    this.attachGlobalEvents();
    this.navigateTo(this.currentScreen);

    // Deep-link triggers from marketing website
    if (actionParam === 'login') {
      setTimeout(() => this.handleOpenLogin(), 300);
    } else if (actionParam === 'signup') {
      setTimeout(() => this.handleOpenSignup(), 300);
    }
  }

  initDOM() {
    const root = document.getElementById('app-root');
    root.innerHTML = `
      <div class="app-layout">
        <!-- Top App Bar -->
        <header class="app-header">
          <div class="app-header-inner">
            <a href="#" class="app-brand-lockup" id="brand-home-link">
              <div class="app-icon-mini">w.</div>
              <span class="app-brand-title">wardli</span>
            </a>

            <div class="header-actions">
              <button class="user-badge-btn" id="header-user-btn" title="View Account Profile">
                <span class="user-dot"></span>
                <span id="header-user-name">Alex</span>
              </button>
              <button id="header-auth-action-btn" class="btn btn-secondary btn-sm" style="font-size: 11px; padding: 4px 10px; border-radius: 8px;">
                Log Out
              </button>
            </div>
          </div>
        </header>

        <!-- Navigation Bar (Adapts responsively to mobile and desktop) -->
        <nav class="bottom-nav" id="bottom-nav-bar">
          <div class="nav-inner">
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
          </div>
        </nav>

        <!-- Dynamic Screen Viewport -->
        <main class="app-screen-container" id="screen-viewport"></main>
      </div>
    `;

    this.viewport = document.getElementById('screen-viewport');
    this.navBar = document.getElementById('bottom-nav-bar');
    this.updateUserBadge();
  }

  updateUserBadge() {
    const userBtn = document.getElementById('header-user-name');
    const authBtn = document.getElementById('header-auth-action-btn');
    const userId = storage.getCurrentUserId();
    const session = authService.getSession();
    const profile = storage.getProfile(userId);

    if (userBtn) {
      if (session) {
        userBtn.textContent = (session.name || profile?.displayName || 'User').split(' ')[0];
      } else {
        userBtn.textContent = 'Guest';
      }
    }

    if (authBtn) {
      if (authService.isAuthenticated()) {
        authBtn.textContent = 'Log Out';
        authBtn.style.color = '#71717A';
      } else {
        authBtn.textContent = 'Log In';
        authBtn.style.color = '#000000';
      }
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

    // Header Auth Action (Log Out or Log In)
    document.getElementById('header-auth-action-btn').addEventListener('click', () => {
      if (authService.isAuthenticated()) {
        this.handleLogout();
      } else {
        this.handleOpenLogin();
      }
    });
  }

  handleOpenLogin() {
    modalManager.openLoginModal({
      onSuccess: (user) => {
        this.updateUserBadge();
        this.refreshAll();
        this.navigateTo('wardrobe');
      },
      onSwitchToSignup: () => {
        setTimeout(() => this.handleOpenSignup(), 260);
      }
    });
  }

  handleOpenSignup() {
    modalManager.openSignupModal({
      onSuccess: (user) => {
        this.updateUserBadge();
        this.refreshAll();
        this.navigateTo('wardrobe');
      },
      onSwitchToLogin: () => {
        setTimeout(() => this.handleOpenLogin(), 260);
      }
    });
  }

  handleLogout() {
    authService.logout();
    this.updateUserBadge();
    this.refreshAll();
    this.navigateTo('onboarding');
  }

  handleDemoEnter() {
    authService.loginAsDemo('user_default');
    this.updateUserBadge();
    this.refreshAll();
    this.navigateTo('wardrobe');
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
      const screen = renderOnboardingScreen({
        onOpenLogin: () => this.handleOpenLogin(),
        onOpenSignup: () => this.handleOpenSignup(),
        onGetStarted: () => this.handleDemoEnter()
      });
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
        onOpenLogin: () => this.handleOpenLogin(),
        onOpenSignup: () => this.handleOpenSignup(),
        onLogout: () => this.handleLogout(),
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
