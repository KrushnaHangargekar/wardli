/**
 * Wardli Public Marketing Website Script
 * Handles configurable Google Play link hook and waitlist modal
 */

// Configuration: Keep Google Play link unset or configurable
const CONFIG = {
  googlePlayUrl: null, // Set to actual Play Store URL when published (e.g. 'https://play.google.com/store/apps/details?id=style.wardli.app')
  isPublished: false
};

document.addEventListener('DOMContentLoaded', () => {
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
