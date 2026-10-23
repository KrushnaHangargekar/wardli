/**
 * Wardli Public Marketing Website Script
 * Handles configurable Google Play link hook, waitlist modal,
 * and robust dynamic app base path resolution for GitHub Pages.
 */

// Configuration: Keep Google Play link unset or configurable
const CONFIG = {
  googlePlayUrl: null, // Set to actual Play Store URL when published (e.g. 'https://play.google.com/store/apps/details?id=style.wardli.app')
  isPublished: false
};

document.addEventListener('DOMContentLoaded', () => {
  // 1. Resolve exact App Base URL (immune to GitHub Pages subfolders & trailing slash variations)
  const pathname = window.location.pathname;
  const basePath = pathname.replace(/\/website(\/index\.html|\/)?$/, '') || '';
  const appBaseUrl = window.location.origin + basePath + (basePath.endsWith('/') ? '' : '/');

  // Set Phone Mockup iframe source
  const iframe = document.querySelector('.phone-mockup-inner');
  if (iframe) {
    iframe.src = appBaseUrl;
  }

  // Bind dynamic app links
  document.querySelectorAll('a[data-app-link]').forEach(link => {
    const action = link.getAttribute('data-app-link');
    if (action === 'login') {
      link.href = `${appBaseUrl}?action=login`;
    } else if (action === 'signup') {
      link.href = `${appBaseUrl}?action=signup`;
    } else {
      link.href = appBaseUrl;
    }
  });

  // 2. Waitlist modal & store buttons
  const modal = document.getElementById('waitlist-modal');
  const closeBtn = document.getElementById('close-waitlist-btn');
  const playStoreBtn = document.getElementById('btn-play-store');
  const heroGetAppBtn = document.getElementById('btn-hero-get-app');
  const waitlistForm = document.getElementById('waitlist-form');

  function handleGetAppClick(e) {
    if (CONFIG.isPublished && CONFIG.googlePlayUrl) {
      window.open(CONFIG.googlePlayUrl, '_blank');
    } else {
      e.preventDefault();
      modal.classList.add('open');
    }
  }

  if (playStoreBtn) playStoreBtn.addEventListener('click', handleGetAppClick);
  if (heroGetAppBtn) heroGetAppBtn.addEventListener('click', handleGetAppClick);

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('open');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
    }
  });

  if (waitlistForm) {
    waitlistForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you! You will be notified the instant the Wardli Android app is available on Google Play.');
      modal.classList.remove('open');
    });
  }
});
