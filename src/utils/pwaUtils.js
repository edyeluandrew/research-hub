// PWA initialization utility
export const registerServiceWorker = async () => {
  // Check if service workers are supported
  if (!('serviceWorker' in navigator)) {
    console.log('Service Workers are not supported in this browser');
    return;
  }

  try {
    // Register the service worker
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    });

    console.log('Service Worker registered successfully:', registration);

    // Listen for updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'activated' && navigator.serviceWorker.controller) {
          // New service worker activated, notify user of update
          console.log('New service worker available');
          // You can show a toast/notification here for app updates
        }
      });
    });

    return registration;
  } catch (error) {
    console.error('Service Worker registration failed:', error);
    // Silently fail - app will work without service worker
    return null;
  }
};

// Check if PWA is installed
export const isPWAInstalled = () => {
  // Check if running in standalone mode (PWA)
  const isStandalone =
    window.navigator.standalone === true ||
    window.matchMedia('(display-mode: standalone)').matches;

  return isStandalone;
};

// Get PWA display mode
export const getPWADisplayMode = () => {
  const isStandalone = window.navigator.standalone === true;
  const displayMode = window.matchMedia('(display-mode: standalone)').matches
    ? 'standalone'
    : 'browser';

  if (isStandalone) {
    return 'standalone';
  }
  return displayMode;
};

// Force service worker update check
export const checkForUpdates = async () => {
  if (!('serviceWorker' in navigator)) return;

  try {
    const registration = await navigator.serviceWorker.getRegistrations();
    registration.forEach((reg) => {
      reg.update();
    });
  } catch (error) {
    console.error('Error checking for updates:', error);
  }
};

export default {
  registerServiceWorker,
  isPWAInstalled,
  getPWADisplayMode,
  checkForUpdates,
};
