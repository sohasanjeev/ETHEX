import crypto from 'crypto';

const OTP_SECRET = process.env.AUTH_SECRET || 'ethex-euro-campus-secure-otp-key-2026';
const OTP_EXPIRY_MS = 15 * 60 * 1000; // 15 minutes

export interface OtpPayload {
  identifier: string;
  otp: string;
  expiresAt: number;
}

/**
 * Generates a tamper-proof HMAC token for stateless OTP verification across
 * serverless lambdas (e.g. Vercel) where memory state is not shared.
 */
export function generateOtpToken(identifier: string, otp: string, expiresAt: number): string {
  const data = `${identifier.toLowerCase()}:${otp}:${expiresAt}`;
  const hmac = crypto.createHmac('sha256', OTP_SECRET).update(data).digest('hex');
  // Token format: base64(identifier:expiresAt:hmac)
  const payload = `${identifier.toLowerCase()}:${expiresAt}:${hmac}`;
  return Buffer.from(payload).toString('base64');
}

/**
 * Verifies the submitted OTP against the signed token.
 */
export function verifyOtpToken(identifier: string, otp: string, token: string): { valid: boolean; reason?: string } {
  try {
    if (!token) {
      return { valid: false, reason: 'Missing verification token' };
    }

    const decoded = Buffer.from(token, 'base64').toString('utf8');
    const [tokenIdentifier, expiresAtStr, tokenHmac] = decoded.split(':');

    if (!tokenIdentifier || !expiresAtStr || !tokenHmac) {
      return { valid: false, reason: 'Malformed verification token' };
    }

    if (tokenIdentifier.toLowerCase() !== identifier.toLowerCase()) {
      return { valid: false, reason: 'Token does not match identifier' };
    }

    const expiresAt = parseInt(expiresAtStr, 10);
    if (isNaN(expiresAt) || Date.now() > expiresAt) {
      return { valid: false, reason: 'Verification code has expired. Please request a new one.' };
    }

    const expectedHmac = crypto
      .createHmac('sha256', OTP_SECRET)
      .update(`${tokenIdentifier}:${otp}:${expiresAt}`)
      .digest('hex');

    if (crypto.timingSafeEqual(Buffer.from(tokenHmac), Buffer.from(expectedHmac))) {
      return { valid: true };
    }

    return { valid: false, reason: 'Incorrect verification code. Please check and try again.' };
  } catch (err: any) {
    return { valid: false, reason: 'Verification failure: ' + (err.message || 'invalid token') };
  }
}
