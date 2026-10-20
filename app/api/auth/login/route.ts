import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, password, portal } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
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

    // Student Login
    return NextResponse.json({
      success: true,
      role: 'student',
      user: {
        id: 'demo-student-id',
        email: normalizedEmail,
        full_name: normalizedEmail.startsWith('aarav') ? 'Aarav Patil' : 'Registered Student',
        current_class: 'Class 10',
        target_stream: 'Foundation',
        role: 'student',
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
