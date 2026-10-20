import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, fullName, currentClass, targetStream } = body;

    if (!email || !fullName) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const studentId = `std_${Date.now()}`;

    return NextResponse.json({
      success: true,
      studentId,
      user: {
        id: studentId,
        email,
        full_name: fullName,
        current_class: currentClass,
        target_stream: targetStream,
        role: 'student',
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
