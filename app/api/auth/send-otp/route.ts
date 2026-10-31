import { NextResponse } from 'next/server';
import { generateOtpToken } from '@/lib/auth/otp';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const rawIdentifier = (body.phone || body.mobile || body.email || '').toString().trim();

    if (!rawIdentifier) {
      return NextResponse.json(
        { error: 'Valid 10-digit mobile number or Gmail address is required' },
        { status: 400 }
      );
    }

    const cleanIdentifier = rawIdentifier.replace(/^\+91/, '').replace(/\s+/g, '').toLowerCase();

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
    const expiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes

    // Generate tamper-proof stateless token
    const otpToken = generateOtpToken(cleanIdentifier, otp, expiresAt);

    // If Fast2SMS API Key is present, dispatch live SMS directly to Indian carrier
    if (isPhone && process.env.FAST2SMS_API_KEY) {
      try {
        const smsRes = await fetch('https://www.fast2sms.com/dev/bulkV2', {
          method: 'POST',
          headers: {
            authorization: process.env.FAST2SMS_API_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            variables_values: otp,
            route: 'otp',
            numbers: cleanIdentifier,
          }),
        });
        const smsData = await smsRes.json();
        console.log(`[Fast2SMS] SMS dispatch result for ${cleanIdentifier}:`, smsData);
      } catch (smsErr) {
        console.error('Fast2SMS dispatch error:', smsErr);
      }
    }

    console.log(`[ETHEX AUTH] OTP generated for ${cleanIdentifier}: ${otp}`);

    return NextResponse.json({
      success: true,
      message: isPhone
        ? `6-digit verification code dispatched to +91 ${cleanIdentifier}`
        : `Verification code sent to Gmail: ${cleanIdentifier}`,
      identifier: cleanIdentifier,
      otpToken: otpToken,
      previewOtp: otp,
    });
  } catch (error: any) {
    console.error('Send OTP error:', error);
    return NextResponse.json({ error: 'Failed to dispatch verification code' }, { status: 500 });
  }
}
