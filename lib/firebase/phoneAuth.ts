'use client';

import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from 'firebase/auth';
import { getFirebaseAuth } from './client';

// Global window reference to retain reCAPTCHA and ConfirmationResult
declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
    confirmationResult?: ConfirmationResult;
  }
}

/**
 * Initializes an invisible reCAPTCHA verifier attached to a specified button or container.
 */
export const setupInvisibleRecaptcha = (containerId: string = 'recaptcha-container'): RecaptchaVerifier | null => {
  if (typeof window === 'undefined') return null;

  const auth = getFirebaseAuth();
  if (!auth) return null;

  try {
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
      delete window.recaptchaVerifier;
    }

    // Ensure container element exists in DOM
    let container = document.getElementById(containerId);
    if (!container) {
      container = document.createElement('div');
      container.id = containerId;
      document.body.appendChild(container);
    }

    window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      size: 'invisible',
      callback: () => {
        // reCAPTCHA solved - will proceed with phone sign in
      },
      'expired-callback': () => {
        if (window.recaptchaVerifier) {
          window.recaptchaVerifier.clear();
          delete window.recaptchaVerifier;
        }
      },
    });

    return window.recaptchaVerifier;
  } catch (err) {
    console.warn('Firebase RecaptchaVerifier init warning:', err);
    return null;
  }
};

/**
 * Sends a live SMS OTP via Firebase Phone Auth to the specified 10-digit Indian phone number.
 */
export const sendFirebasePhoneOtp = async (
  rawPhone: string,
  containerId: string = 'recaptcha-container'
): Promise<{ success: boolean; isFirebase: boolean; previewOtp?: string; error?: string }> => {
  const cleanPhone = rawPhone.replace(/\D/g, '').slice(-10);
  if (cleanPhone.length !== 10) {
    return { success: false, isFirebase: false, error: 'Please enter a valid 10-digit mobile number' };
  }

  const formattedPhone = `+91${cleanPhone}`;
  const auth = getFirebaseAuth();

  if (auth) {
    try {
      const appVerifier = setupInvisibleRecaptcha(containerId);
      if (appVerifier) {
        const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
        window.confirmationResult = confirmationResult;
        return {
          success: true,
          isFirebase: true,
        };
      }
    } catch (fbErr: any) {
      console.warn('Firebase Phone Auth attempt error:', fbErr?.code || fbErr?.message);
      // If Firebase Phone is not enabled yet in console or domain not whitelisted, fallback seamlessly
    }
  }

  // Seamless Server Fallback
  try {
    const res = await fetch('/api/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: cleanPhone }),
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, isFirebase: false, error: data.error || 'Failed to dispatch OTP' };
    }
    return {
      success: true,
      isFirebase: false,
      previewOtp: data.previewOtp,
    };
  } catch (err: any) {
    return { success: false, isFirebase: false, error: err.message || 'Network error while sending OTP' };
  }
};

/**
 * Verifies the 6-digit OTP code against Firebase or the fallback server token.
 */
export const verifyFirebasePhoneOtp = async (
  otpCode: string,
  phone: string,
  serverOtpToken?: string | null
): Promise<{ success: boolean; user?: any; error?: string }> => {
  const cleanPhone = phone.replace(/\D/g, '').slice(-10);

  // 1. Try Firebase ConfirmationResult first if available
  if (window.confirmationResult) {
    try {
      const credential = await window.confirmationResult.confirm(otpCode.trim());
      return {
        success: true,
        user: credential.user,
      };
    } catch (fbErr: any) {
      console.warn('Firebase confirmation failed, trying fallback:', fbErr?.message);
    }
  }

  // 2. Validate via Server Token
  try {
    const res = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: cleanPhone,
        otp: otpCode.trim(),
        otpToken: serverOtpToken,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.error || 'Invalid 6-digit verification code' };
    }
    return {
      success: true,
      user: { phoneNumber: `+91${cleanPhone}` },
    };
  } catch (err: any) {
    return { success: false, error: err.message || 'OTP Verification failed' };
  }
};
