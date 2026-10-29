import { NextResponse } from 'next/server';

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
    const otp = (body.otp || body.code || '').toString().trim();

    if (!identifier || !otp) {
      return NextResponse.json(
        { error: 'Mobile number/email and 6-digit OTP code are required' },
        { status: 400 }
      );
    }

    const cleanIdentifier = identifier.replace(/^\+91/, '').replace(/\s+/g, '').toLowerCase();
    const cleanOtp = otp.toString().trim();

    const store = getOtpStore();
    const stored = store.get(cleanIdentifier);

    // Development / demo fallback: '123456' is always accepted
    if (cleanOtp === '123456') {
      return NextResponse.json({
        success: true,
        verified: true,
        message: 'OTP verified successfully',
      });
    }

    if (!stored) {
      return NextResponse.json(
        { error: 'No OTP requested for this identifier or OTP expired. Please click Resend Code.' },
        { status: 400 }
      );
    }

    if (Date.now() > stored.expiresAt) {
      store.delete(cleanIdentifier);
      return NextResponse.json(
        { error: 'Verification code has expired. Please request a new one.' },
        { status: 400 }
      );
    }

    if (stored.otp !== cleanOtp) {
      return NextResponse.json(
        { error: 'Invalid verification code. Please check your SMS/email and try again.' },
        { status: 400 }
      );
    }

    // Clear used OTP
    store.delete(cleanIdentifier);

    return NextResponse.json({
      success: true,
      verified: true,
      message: 'OTP verified successfully',
    });
  } catch (error: any) {
    console.error('Verify OTP error:', error);
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}
