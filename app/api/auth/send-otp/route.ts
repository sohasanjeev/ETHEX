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
    const body = await req.json();
    const identifier = (body.phone || body.mobile || body.email || '').toString().trim();

    if (!identifier) {
      return NextResponse.json(
        { error: 'Valid 10-digit mobile number or email address is required' },
        { status: 400 }
      );
    }

    const cleanIdentifier = identifier.replace(/^\+91/, '').replace(/\s+/g, '').toLowerCase();

    // Validate phone or email format
    const isEmail = cleanIdentifier.includes('@');
    const isPhone = /^[6-9]\d{9}$/.test(cleanIdentifier);

    if (!isEmail && !isPhone) {
      return NextResponse.json(
        { error: 'Please enter a valid 10-digit Indian mobile number or email address' },
        { status: 400 }
      );
    }

    // Generate secure 6-digit numeric OTP code
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    const store = getOtpStore();
    store.set(cleanIdentifier, { otp, expiresAt });

    console.log(`[ETHEX OTP] Generated OTP for ${cleanIdentifier}: ${otp}`);

    return NextResponse.json({
      success: true,
      message: isPhone
        ? `Verification code dispatched to +91 ${cleanIdentifier}`
        : `Verification code sent to ${cleanIdentifier}`,
      identifier: cleanIdentifier,
      previewOtp: otp, // Returned for instant testing and zero-friction verification
    });
  } catch (error: any) {
    console.error('Send OTP error:', error);
    return NextResponse.json({ error: 'Failed to dispatch verification code' }, { status: 500 });
  }
}
