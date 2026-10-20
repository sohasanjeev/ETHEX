import { NextResponse } from 'next/server';
import { dataService } from '@/lib/services/dataService';

export async function POST(req: Request) {
  try {
    const { attemptId } = await req.json();

    if (!attemptId) {
      return NextResponse.json({ error: 'attemptId is required' }, { status: 400 });
    }

    const evaluatedAttempt = await dataService.submitExamAttempt(attemptId);

    if (!evaluatedAttempt) {
      return NextResponse.json({ error: 'Attempt not found or already submitted' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Examination submitted successfully!',
      attempt: evaluatedAttempt,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
