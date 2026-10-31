import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyBg_fqOSll7wqRJOWxboT-BJtMEoAv9br8',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'euro-ethex.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'euro-ethex',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'euro-ethex.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '18637869243',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:18637869243:web:b40b650c7d441f3566d99e',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-3DDCX5BZSP',
};

// Safely initialize Firebase app singleton
export const getFirebaseApp = () => {
  if (!getApps().length) {
    return initializeApp(firebaseConfig);
  }
  return getApp();
};

export const getFirebaseAuth = (): Auth | null => {
  if (typeof window === 'undefined') return null;
  return getAuth(getFirebaseApp());
};
