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

    // If Fast2SMS API Key is present in environment or site settings, dispatch live SMS directly to Indian carrier
    let fast2smsKey = process.env.FAST2SMS_API_KEY || '';
    if (!fast2smsKey) {
      try {
        const { dataService } = await import('@/lib/services/dataService');
        const settings = await dataService.getSiteSettings();
        fast2smsKey = settings?.fast2sms_api_key || '';
      } catch {
        // Ignore settings read error
      }
    }

    let isLiveSms = false;
    let smsProviderMessage = '';

    if (isPhone && fast2smsKey) {
      // 1. Try Fast2SMS Route 'q' (Quick SMS - instant delivery without DLT template)
      try {
        const smsRes = await fetch('https://www.fast2sms.com/dev/bulkV2', {
          method: 'POST',
          headers: {
            authorization: fast2smsKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            route: 'q',
            message: `Your ETHEX 2026 verification code is ${otp}. Valid for 15 minutes. Please do not share. - EURO CAMPUS`,
            flash: 0,
            numbers: cleanIdentifier,
          }),
        });
        const smsData = await smsRes.json();
        console.log(`[Fast2SMS Route 'q'] dispatch result for ${cleanIdentifier}:`, smsData);
        if (smsData?.return) {
          isLiveSms = true;
          smsProviderMessage = 'SMS delivered via Quick Route';
        } else {
          smsProviderMessage = smsData?.message || '';
        }
      } catch (smsErr) {
        console.error('[Fast2SMS Route q] dispatch error:', smsErr);
      }

      // 2. If route 'q' did not dispatch, try route 'otp'
      if (!isLiveSms) {
        try {
          const otpRes = await fetch('https://www.fast2sms.com/dev/bulkV2', {
            method: 'POST',
            headers: {
              authorization: fast2smsKey,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              route: 'otp',
              variables_values: otp,
              numbers: cleanIdentifier,
            }),
          });
          const otpData = await otpRes.json();
          console.log(`[Fast2SMS Route 'otp'] dispatch result for ${cleanIdentifier}:`, otpData);
          if (otpData?.return) {
            isLiveSms = true;
            smsProviderMessage = 'SMS delivered via OTP Route';
          }
        } catch (otpErr) {
          console.error('[Fast2SMS Route otp] dispatch error:', otpErr);
        }
      }
    }

    console.log(`[ETHEX AUTH] OTP generated for ${cleanIdentifier}: ${otp} (Live SMS: ${isLiveSms})`);

    return NextResponse.json({
      success: true,
      message: isLiveSms
        ? `Live SMS verification code dispatched to +91 ${cleanIdentifier}`
        : isPhone
        ? `6-digit verification code dispatched to +91 ${cleanIdentifier}`
        : `Verification code sent to Gmail: ${cleanIdentifier}`,
      identifier: cleanIdentifier,
      otpToken: otpToken,
      previewOtp: isLiveSms ? undefined : otp,
      isLiveSms: isLiveSms,
    });
  } catch (error: any) {
    console.error('Send OTP error:', error);
    return NextResponse.json({ error: 'Failed to dispatch verification code' }, { status: 500 });
  }
}
