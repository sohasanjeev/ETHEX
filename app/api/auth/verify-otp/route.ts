import { NextResponse } from 'next/server';
import { verifyOtpToken } from '@/lib/auth/otp';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const rawIdentifier = (body.phone || body.mobile || body.email || '').toString().trim();
    const otp = (body.otp || body.code || '').toString().trim();
    const otpToken = body.otpToken || '';

    if (!rawIdentifier || !otp) {
      return NextResponse.json(
        { error: 'Mobile number/email and 6-digit OTP code are required' },
        { status: 400 }
      );
    }

    const cleanIdentifier = rawIdentifier.replace(/^\+91/, '').replace(/\s+/g, '').toLowerCase();
    const cleanOtp = otp.toString().trim();

    // 1. Universal testing fallback
    if (cleanOtp === '123456') {
      return NextResponse.json({
        success: true,
        verified: true,
        message: 'OTP verified successfully (Demo code)',
      });
    }

    // 2. Stateless HMAC token verification (Serverless-proof)
    if (otpToken) {
      const verification = verifyOtpToken(cleanIdentifier, cleanOtp, otpToken);
      if (verification.valid) {
        return NextResponse.json({
          success: true,
          verified: true,
          message: 'OTP verified successfully',
        });
      }
      return NextResponse.json(
        { error: verification.reason || 'Invalid or expired OTP code' },
        { status: 400 }
      );
    }

    // 3. Fallback if client didn't supply otpToken
    return NextResponse.json(
      { error: 'Invalid OTP code. Please use the test code 123456 or request a new code.' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Verify OTP error:', error);
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}
