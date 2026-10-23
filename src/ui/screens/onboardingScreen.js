/**
 * Wardli Hero & Onboarding Screen
 * Designed with Antigravity / Linear luxury aesthetics:
 * Floating holographic capsule pedestal, ambient glow, 3D tilt, and high-impact typography.
 */

import { BRAND_SVGS } from '../assets.js';

export function renderOnboardingScreen({ onGetStarted, onOpenLogin, onOpenSignup }) {
  const container = document.createElement('div');
  container.className = 'onboarding-screen';

  container.innerHTML = `
    <!-- Top Hero Badge & Headline -->
    <div class="onboarding-hero-header">
      <div class="onboarding-pill-badge">
        <span class="badge-dot"></span>
        <span>The Zero-AI Digital Wardrobe</span>
      </div>

      <div class="onboarding-brand-title">
        <div class="brand-icon-glow">
          ${BRAND_SVGS.appIcon}
        </div>
        <h1 class="brand-headline">wardli</h1>
      </div>

      <p class="brand-tagline">
        Your wardrobe. Your everyday style.
      </p>
    </div>

    <!-- Living Holographic Pedestal / Clothes Rail Card -->
    <div class="clothes-rail-pedestal" id="interactive-pedestal">
      <div class="pedestal-ambient-glow"></div>

      <!-- Floating Feature Badges -->
      <div class="floating-badge badge-top-left">
        <span class="badge-icon">🏷️</span>
        <span>Curated Capsule</span>
      </div>
      <div class="floating-badge badge-top-right">
        <span class="badge-icon">⚡</span>
        <span>Deterministic Rules</span>
      </div>
      <div class="floating-badge badge-bottom">
        <span class="badge-icon">📊</span>
        <span>Cost-Per-Wear Insights</span>
      </div>

      <!-- Interactive SVG Rail Graphic -->
      <div class="rail-svg-wrapper">
        <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="rail-svg">
          <!-- Rail frame -->
          <line x1="20" y1="30" x2="260" y2="30" stroke="#27272A" stroke-width="4" stroke-linecap="round"/>
          <line x1="40" y1="30" x2="30" y2="180" stroke="#27272A" stroke-width="3.5" stroke-linecap="round"/>
          <line x1="240" y1="30" x2="250" y2="180" stroke="#27272A" stroke-width="3.5" stroke-linecap="round"/>
          <line x1="15" y1="180" x2="55" y2="180" stroke="#27272A" stroke-width="3.5" stroke-linecap="round"/>
          <line x1="225" y1="180" x2="265" y2="180" stroke="#27272A" stroke-width="3.5" stroke-linecap="round"/>

          <!-- Garments with subtle swaying animations -->
          <!-- Garment 1: Black Coat -->
          <g class="hanger-group garment-sway-1">
            <path d="M70 30L60 45H80L70 30Z" stroke="#71717A" stroke-width="1.5" fill="none"/>
            <path d="M54 45L66 40H74L86 45L84 135H56L54 45Z" fill="#18181B"/>
          </g>

          <!-- Garment 2: White Shirt -->
          <g class="hanger-group garment-sway-2">
            <path d="M110 30L100 45H120L110 30Z" stroke="#71717A" stroke-width="1.5" fill="none"/>
            <path d="M96 45L106 40H114L124 45L122 125H98L96 45Z" fill="#F4F4F5" stroke="#D4D4D8" stroke-width="1.5"/>
          </g>

          <!-- Garment 3: Grey Knit -->
          <g class="hanger-group garment-sway-3">
            <path d="M150 30L140 45H160L150 30Z" stroke="#71717A" stroke-width="1.5" fill="none"/>
            <path d="M136 45L146 40H154L164 45L162 120H138L136 45Z" fill="#52525B"/>
          </g>

          <!-- Garment 4: Black Hoodie -->
          <g class="hanger-group garment-sway-4">
            <path d="M190 30L180 45H200L190 30Z" stroke="#71717A" stroke-width="1.5" fill="none"/>
            <path d="M176 45L186 40H194L204 45L202 128H178L176 45Z" fill="#27272A"/>
          </g>

          <!-- Minimal accent plant -->
          <circle cx="255" cy="165" r="12" fill="#E4E4E7"/>
          <path d="M255 165Q260 145 252 135Q245 150 255 165Z" fill="#10B981"/>
        </svg>
      </div>

      <div class="pedestal-caption">
        <span class="sparkle">✦</span>
        <span>Living Digital Capsule</span>
        <span class="sparkle">✦</span>
      </div>
    </div>

    <!-- Onboarding CTAs & Action Controls -->
    <div class="onboarding-actions-card">
      <p class="onboarding-description">
        Organize clothing &amp; accessories, receive rule-based daily looks, and track exact wear history with zero guesswork.
      </p>

      <div class="onboarding-btn-group">
        <button id="btn-onboarding-signup" class="btn-glow-primary">
          <span>Create Free Account</span>
          <span class="btn-arrow">&rarr;</span>
        </button>

        <button id="btn-onboarding-login" class="btn-glass-secondary">
          <span>Log In</span>
        </button>

        <button id="btn-onboarding-demo" class="btn-demo-link">
          <span>Explore with Demo Wardrobe (Alex Chen) &rarr;</span>
        </button>
      </div>
    </div>
  `;

  // Attach button listeners
  container.querySelector('#btn-onboarding-signup').addEventListener('click', onOpenSignup);
  container.querySelector('#btn-onboarding-login').addEventListener('click', onOpenLogin);
  container.querySelector('#btn-onboarding-demo').addEventListener('click', onGetStarted);

  // 3D Tilt interactive parallax on pedestal
  const pedestal = container.querySelector('#interactive-pedestal');
  if (pedestal) {
    pedestal.addEventListener('mousemove', (e) => {
      const rect = pedestal.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (-y / rect.height) * 14;
      const rotateY = (x / rect.width) * 14;
      pedestal.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    pedestal.addEventListener('mouseleave', () => {
      pedestal.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  return container;
}
