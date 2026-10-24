import { NextResponse } from 'next/server';

// Module-level persistent OTP store
const getOtpStore = () => {
  if (!(globalThis as any).__ethex_otps__) {
    (globalThis as any).__ethex_otps__ = new Map<string, { otp: string; expiresAt: number }>();
  }
  return (globalThis as any).__ethex_otps__ as Map<string, { otp: string; expiresAt: number }>;
};

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid Gmail address is required' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Generate secure 6-digit numeric OTP code
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    const store = getOtpStore();
    store.set(normalizedEmail, { otp, expiresAt });

    console.log(`[ETHEX OTP] Generated OTP for ${normalizedEmail}: ${otp}`);

    return NextResponse.json({
      success: true,
      message: `Verification code sent to ${normalizedEmail}`,
      previewOtp: otp,
    });
  } catch (error: any) {
    console.error('Send OTP error:', error);
    return NextResponse.json({ error: 'Failed to dispatch verification code' }, { status: 500 });
  }
}
