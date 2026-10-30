import { NextResponse } from 'next/server';
import { verifyOtpToken } from '@/lib/auth/otp';
import { dataService } from '@/lib/services/dataService';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, portal, phone, mobile, otp, otpToken } = body;
    const identifier = (phone || mobile || email || '').toString().trim();

    // 1. OTP-BASED LOGIN (Mobile number or Email with OTP)
    if (otp) {
      if (!identifier) {
        return NextResponse.json(
          { error: 'Mobile number or email is required with OTP' },
          { status: 400 }
        );
      }

      const cleanIdentifier = identifier.replace(/^\+91/, '').replace(/\s+/g, '').toLowerCase();
      const cleanOtp = otp.toString().trim();

      // Verify OTP: either demo '123456' OR stateless token verification
      let isValidOtp = cleanOtp === '123456';
      if (!isValidOtp && otpToken) {
        const check = verifyOtpToken(cleanIdentifier, cleanOtp, otpToken);
        isValidOtp = check.valid;
      }

      if (!isValidOtp) {
        return NextResponse.json(
          { error: 'Invalid or expired OTP. Use demo code 123456 or click Resend.' },
          { status: 400 }
        );
      }

      // Check if student already registered in applicationsState
      const applications = await dataService.getApplications();
      const existingApp = applications.find(
        (a) =>
          a.student_phone?.replace(/\D/g, '') === cleanIdentifier.replace(/\D/g, '') ||
          a.student_id === cleanIdentifier ||
          a.roll_number?.toLowerCase() === cleanIdentifier
      );

      const isEmail = cleanIdentifier.includes('@');
      const studentName = existingApp?.student_name ||
        (cleanIdentifier.startsWith('91122') || cleanIdentifier.startsWith('aarav')
          ? 'Aarav Patil'
          : 'Registered Student');
      const studentClass = existingApp?.student_class || 'Class 10';
      const studentRoll = existingApp?.roll_number || `ETHEX-2026-${cleanIdentifier.slice(-4) || '8842'}`;

      return NextResponse.json({
        success: true,
        role: 'student',
        user: {
          id: existingApp?.student_id || `std-${cleanIdentifier.slice(-4) || '2026'}`,
          phone: isEmail ? '9112223354' : cleanIdentifier,
          email: isEmail ? cleanIdentifier : `${cleanIdentifier}@student.eurocampus.in`,
          full_name: studentName,
          current_class: studentClass,
          target_stream: 'Foundation',
          exam_name: 'ETHEX 2026',
          exam_date: '29 November 2026',
          mode: existingApp?.selected_mode || 'ONLINE',
          centre: 'Online CBT / Home',
          roll_number: studentRoll,
          application_number: existingApp?.application_number,
          payment_status: existingApp?.payment_status || 'successful',
          role: 'student',
          verified: true,
        },
      });
    }

    // 2. PASSWORD-BASED LOGIN (Admin & Legacy)
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Identifier (phone/email) and OTP or password are required' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Administrator Login Check
    if (portal === 'admin' || normalizedEmail.includes('admin')) {
      if (password.length < 4) {
        return NextResponse.json({ error: 'Invalid administrator credentials' }, { status: 401 });
      }

      return NextResponse.json({
        success: true,
        role: 'super_admin',
        user: {
          id: 'admin-super-01',
          email: normalizedEmail,
          full_name: 'Super Administrator (EURO Campus)',
          role: 'super_admin',
        },
      });
    }

    // Student Password Login
    return NextResponse.json({
      success: true,
      role: 'student',
      user: {
        id: `std-${normalizedEmail.slice(0, 4)}`,
        email: normalizedEmail,
        full_name: 'Registered Student',
        current_class: 'Class 10',
        target_stream: 'Foundation',
        exam_name: 'ETHEX 2026',
        exam_date: '29 November 2026',
        mode: 'ONLINE',
        centre: 'Online CBT / Home',
        roll_number: 'ETHEX-2026-9011',
        role: 'student',
        verified: true,
      },
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
