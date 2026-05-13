import React, { useState, useEffect } from 'react';
import { X, Download } from 'lucide-react';

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Check if user has dismissed the prompt recently
    const dismissedUntil = localStorage.getItem('pwaDismissedUntil');
    if (dismissedUntil && Date.now() < parseInt(dismissedUntil)) {
      return; // Don't show if recently dismissed
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event for later use
      setDeferredPrompt(e);
      // Show our custom install prompt immediately
      setShowPrompt(true);
    };

    // Listen for successful installation
    const handleAppInstalled = () => {
      console.log('PWA was installed');
      setShowPrompt(false);
      setDeferredPrompt(null);
      setIsInstalled(true);
      localStorage.setItem('pwaInstalled', 'true');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Check localStorage for previous installation
    if (localStorage.getItem('pwaInstalled') === 'true') {
      setIsInstalled(true);
      return;
    }

    // Timeout: If beforeinstallprompt hasn't fired after 3 seconds (on slower connections),
    // still show the prompt if we have the deferred event
    const timeoutId = setTimeout(() => {
      // This allows the prompt to show faster on some devices
      console.log('Install prompt timeout triggered');
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      console.warn('Install prompt not yet available');
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
      localStorage.setItem('pwaInstalled', 'true');
      setIsInstalled(true);
    } else {
      console.log('User dismissed the install prompt');
      handleDismiss();
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Remember user dismissed prompt for a week
    localStorage.setItem('pwaDismissedUntil', Date.now() + 7 * 24 * 60 * 60 * 1000);
  };

  // Don't show if already installed or user dismissed it
  if (isInstalled || !showPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div className="bg-dark-100 border border-gold-500/50 rounded-lg shadow-2xl p-5 max-w-sm backdrop-blur-sm">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gold-500/20 rounded-lg flex items-center justify-center">
              <Download className="text-gold-500" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Install BetaTech App</h3>
              <p className="text-xs text-gray-400">Quick access on your device</p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-gray-500 hover:text-gray-400 transition-colors"
            aria-label="Dismiss install prompt"
          >
            <X size={18} />
          </button>
        </div>

        <p className="text-gray-400 text-xs mb-4 leading-relaxed">
          Install our app for faster access, offline support, and a better experience.
        </p>

        <div className="flex gap-2">
          <button
            onClick={handleInstallClick}
            className="flex-1 bg-gold-500 hover:bg-gold-600 text-dark-200 font-semibold py-2 px-4 rounded-lg transition-all duration-300 text-sm"
          >
            Install
          </button>
          <button
            onClick={handleDismiss}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold py-2 px-4 rounded-lg transition-all duration-300 text-sm"
          >
            Not Now
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default InstallPrompt;
