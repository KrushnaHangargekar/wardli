/**
 * Onboarding / Splash Screen
 * Matching design sheet: 01_onboarding.png
 */

import { BRAND_SVGS } from '../assets.js';

export function renderOnboardingScreen(onGetStarted) {
  const container = document.createElement('div');
  container.className = 'onboarding-screen';
  container.style.cssText = `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    min-height: 750px;
    height: 100%;
    padding: 30px 10px 20px 10px;
    text-align: center;
  `;

  container.innerHTML = `
    <div style="margin-top: 20px;">
      <div style="width: 54px; height: 54px; margin: 0 auto 16px auto;">
        ${BRAND_SVGS.appIcon}
      </div>
      <h1 style="font-size: 32px; font-weight: 800; letter-spacing: -1.2px; color: #000000; margin-bottom: 6px;">wardli</h1>
      <p style="font-size: 15px; color: #71717A; font-weight: 500;">Your wardrobe. Your everyday style.</p>
    </div>

    <!-- Minimalist Clothes Rail Graphic -->
    <div style="width: 100%; max-width: 320px; margin: 40px auto; background: #FAFAFA; border: 1px solid #E5E5E5; border-radius: 20px; padding: 28px 16px; position: relative;">
      <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: auto;">
        <!-- Rail frame -->
        <line x1="20" y1="30" x2="260" y2="30" stroke="#1F1F1F" stroke-width="4" stroke-linecap="round"/>
        <line x1="40" y1="30" x2="30" y2="180" stroke="#1F1F1F" stroke-width="3.5" stroke-linecap="round"/>
        <line x1="240" y1="30" x2="250" y2="180" stroke="#1F1F1F" stroke-width="3.5" stroke-linecap="round"/>
        <line x1="15" y1="180" x2="55" y2="180" stroke="#1F1F1F" stroke-width="3" stroke-linecap="round"/>
        <line x1="225" y1="180" x2="265" y2="180" stroke="#1F1F1F" stroke-width="3" stroke-linecap="round"/>

        <!-- Hangers & Hanging Garments -->
        <!-- Garment 1: Black Coat -->
        <path d="M70 30L60 45H80L70 30Z" stroke="#71717A" stroke-width="1.5" fill="none"/>
        <path d="M54 45L66 40H74L86 45L84 135H56L54 45Z" fill="#18181B"/>

        <!-- Garment 2: White Shirt -->
        <path d="M110 30L100 45H120L110 30Z" stroke="#71717A" stroke-width="1.5" fill="none"/>
        <path d="M96 45L106 40H114L124 45L122 125H98L96 45Z" fill="#F4F4F5" stroke="#D4D4D8" stroke-width="1.5"/>

        <!-- Garment 3: Grey Knit -->
        <path d="M150 30L140 45H160L150 30Z" stroke="#71717A" stroke-width="1.5" fill="none"/>
        <path d="M136 45L146 40H154L164 45L162 120H138L136 45Z" fill="#52525B"/>

        <!-- Garment 4: Black Hoodie -->
        <path d="M190 30L180 45H200L190 30Z" stroke="#71717A" stroke-width="1.5" fill="none"/>
        <path d="M176 45L186 40H194L204 45L202 128H178L176 45Z" fill="#27272A"/>

        <!-- Minimal plant / interior accent -->
        <circle cx="255" cy="165" r="12" fill="#E4E4E7"/>
        <path d="M255 165Q260 145 252 135Q245 150 255 165Z" fill="#059669"/>
      </svg>
      <div style="font-size: 12px; font-weight: 600; color: #71717A; margin-top: 10px;">
        Digital Capsule Wardrobe
      </div>
    </div>

    <div style="width: 100%; max-width: 340px; margin-bottom: 20px;">
      <p style="font-size: 13px; color: #71717A; margin-bottom: 20px; line-height: 1.5;">
        Organize clothing and accessories, get rule-based outfit recommendations, and track exact wear history.
      </p>
      <button id="btn-onboarding-start" class="btn btn-primary btn-block" style="padding: 14px; font-size: 15px; border-radius: 16px;">
        Get Started &rarr;
      </button>
    </div>
  `;

  container.querySelector('#btn-onboarding-start').addEventListener('click', onGetStarted);
  return container;
}
