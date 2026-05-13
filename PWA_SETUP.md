# PWA Setup Guide - Beta Tech Labs

## ✅ What Has Been Implemented

### 1. **Service Worker** (`public/sw.js`)
- ✅ Caches assets for offline support
- ✅ Network-first strategy for navigation
- ✅ Cache-first strategy for assets
- ✅ Automatic cache cleanup on updates

### 2. **Enhanced Web Manifest** (`public/site.webmanifest`)
- ✅ Full PWA metadata
- ✅ Icons configuration (multiple sizes and purposes)
- ✅ Screenshots for app stores
- ✅ App shortcuts
- ✅ Categories and description

### 3. **PWA Meta Tags** (`index.html`)
- ✅ Mobile web app capable
- ✅ Apple mobile web app support (iOS)
- ✅ Status bar styling
- ✅ Tile image for Windows

### 4. **Install Prompt Component** (`src/components/InstallPrompt.jsx`)
- ✅ Custom install prompt UI
- ✅ Beautiful, non-intrusive design
- ✅ Remembers user dismissal
- ✅ Tracks installation state

### 5. **PWA Utilities** (`src/utils/pwaUtils.js`)
- ✅ Service worker registration
- ✅ PWA installation detection
- ✅ Update checking
- ✅ Display mode detection

### 6. **App Integration** (`src/App.jsx`)
- ✅ Service worker registration on app load
- ✅ Install prompt component included

---

## 🔧 Setup Steps

### Step 1: Generate PWA Icons
The icons are required for PWA installation to work properly.

**Option A: Using Node.js (Recommended for all platforms)**
```bash
npm install --save-dev sharp
npm run generate-icons
```

**Option B: Using ImageMagick (Linux/macOS)**
```bash
# Install ImageMagick
# Ubuntu/Debian:
sudo apt-get install imagemagick

# macOS:
brew install imagemagick

# Run the script
bash scripts/generate-icons.sh
```

**Option C: Manual Icon Generation**
If the above don't work, you can:
1. Use online SVG to PNG converters like:
   - https://convertio.co/svg-png/
   - https://www.zamzar.com/convert/svg-to-png/

2. Export from design tools like Figma, Adobe XD, or Inkscape

3. Required files (create in `public/icons/`):
   - `icon-192x192.png` (192x192 pixels)
   - `icon-512x512.png` (512x512 pixels)
   - `icon-144x144.png` (144x144 pixels)
   - `icon-maskable-192x192.png` (192x192 pixels)
   - `icon-maskable-512x512.png` (512x512 pixels)

---

## 🧪 Testing the PWA

### Desktop Testing
1. Build the project: `npm run build`
2. Preview: `npm run preview`
3. Open Chrome DevTools (F12)
4. Go to **Application > Manifest**
5. Look for "Install" button or prompt
6. Should see the install popup in bottom-right

### Mobile Testing
1. Deploy to production (Vercel already handles this)
2. Open site in Chrome or Edge on Android
3. Look for "Install app" prompt
4. Tap to install on home screen

### Offline Testing
1. Install the PWA
2. Open DevTools > Network
3. Set to "Offline"
4. Navigate the app
5. Should work with cached pages

---

## 📋 Features Enabled by This PWA

### For Users:
- ✅ **Install on Home Screen** - One-click installation
- ✅ **Standalone Mode** - Looks like a native app
- ✅ **Offline Access** - Works without internet
- ✅ **Fast Loading** - Cached assets load instantly
- ✅ **App Shortcuts** - Quick access to key pages
- ✅ **Splash Screen** - Professional app launch experience
- ✅ **App Icon** - Branded home screen icon

### For Developers:
- ✅ **Automatic Updates** - Service worker updates in background
- ✅ **Update Notifications** - Users can refresh for new version
- ✅ **Cache Management** - Old caches cleaned automatically
- ✅ **Error Handling** - Graceful degradation if offline

---

## 🚀 Deployment

When deployed to Vercel:
1. Service worker will be served from `https://your-domain.com/sw.js`
2. Manifest will be at `https://your-domain.com/site.webmanifest`
3. Icons will be at `https://your-domain.com/icons/`
4. PWA fully functional on first visit

**Vercel Configuration:** Already set up with `vercel.json`

---

## 🐛 Troubleshooting

### "Install button not showing"
1. Make sure you're on HTTPS (Vercel provides this)
2. Check if manifest is valid: DevTools > Application > Manifest
3. Ensure all icons are present in `public/icons/`
4. Check console for service worker errors

### "Service worker not working"
1. Verify `public/sw.js` exists
2. Check DevTools > Application > Service Workers
3. Look for errors in DevTools Console
4. Try hard refresh (Ctrl+Shift+R on Windows, Cmd+Shift+R on Mac)

### "Icons not showing"
1. Verify icon files exist: `public/icons/*.png`
2. Check manifest for correct paths
3. Ensure image file sizes are correct (192x192, 512x512, etc.)
4. Use Chrome DevTools > Application > Manifest to see icon preview

### "App not working offline"
1. First, install the PWA
2. Check what's being cached: DevTools > Application > Cache Storage
3. Some API calls won't work offline (this is normal)
4. Static content should load fine

---

## 📦 Files Created

```
public/
  ├── sw.js                          (Service Worker)
  ├── site.webmanifest               (Enhanced manifest)
  └── icons/                         (PWA icons - TO BE GENERATED)
      ├── icon-192x192.png
      ├── icon-512x512.png
      ├── icon-144x144.png
      ├── icon-maskable-192x192.png
      └── icon-maskable-512x512.png

src/
  ├── components/
  │   └── InstallPrompt.jsx          (Install prompt UI)
  ├── utils/
  │   └── pwaUtils.js                (PWA utilities)
  └── App.jsx                        (Updated with PWA integration)

scripts/
  ├── generate-icons.js              (Icon generator - Node.js)
  └── generate-icons.sh              (Icon generator - Bash)
```

---

## 🎯 Next Steps

1. **Generate Icons:**
   ```bash
   npm run generate-icons
   ```

2. **Test Locally:**
   ```bash
   npm run build
   npm run preview
   ```

3. **Test on Mobile:**
   - Deploy to Vercel (already configured)
   - Open on mobile browser
   - Tap install prompt

4. **Monitor Performance:**
   - Use Lighthouse in Chrome DevTools
   - PWA score should be 90+ if all working

5. **Track Installation:**
   - Check browser console for service worker logs
   - Monitor user installations via analytics

---

## 📚 Additional Resources

- [Google PWA Checklist](https://web.dev/progressive-web-apps/)
- [MDN Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [Service Workers Guide](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [PWA on iOS](https://webkit.org/status/#pwa)

---

## ✨ Summary

Your PWA is now ready! The install prompt will appear automatically when users visit the site. They can install it on their home screen or app launcher, and it will work like a native app with offline support and fast loading times.

**Icon generation is the last critical step.** Run `npm run generate-icons` to complete the setup!
