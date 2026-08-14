import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, child, onValue } from 'firebase/database';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const isPlaceholder = (value) =>
  typeof value === 'string' && value.includes('your_');

const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
    firebaseConfig.projectId &&
    firebaseConfig.databaseURL &&
    !isPlaceholder(firebaseConfig.apiKey) &&
    !isPlaceholder(firebaseConfig.projectId) &&
    !isPlaceholder(firebaseConfig.databaseURL),
);

let app = null;
let database = null;

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    database = getDatabase(app);
  } catch (error) {
    console.warn('Firebase initialization failed:', error);
  }
} else if (import.meta.env.DEV) {
  console.warn(
    'Firebase is not configured. Copy .env.example to .env and add your credentials. Using local default content.',
  );
}

export { app, database };
export const isFirebaseEnabled = () => Boolean(database);

// ============================================================
// FIREBASE HELPER FUNCTIONS
// ============================================================

export const firebaseSet = async (path, data) => {
  if (!database) return false;

  try {
    await set(ref(database, path), data);
    // Dispatch event to notify listeners
    window.dispatchEvent(new CustomEvent('firebaseDataUpdated', { detail: { path, data } }));
    return true;
  } catch (error) {
    console.error('Firebase set error:', error);
    return false;
  }
};

export const firebaseGet = async (path) => {
  if (!database) return null;

  try {
    const snapshot = await get(child(ref(database), path));
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return null;
  } catch (error) {
    console.error('Firebase get error:', error);
    return null;
  }
};

// Real-time listener
export const firebaseOnValue = (path, callback) => {
  if (!database) {
    callback(null);
    return () => {};
  }

  const unsubscribe = onValue(ref(database, path), (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.val());
    } else {
      callback(null);
    }
  });
  return unsubscribe;
};
