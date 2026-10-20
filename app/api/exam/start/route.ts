import { NextResponse } from 'next/server';
import { dataService } from '@/lib/services/dataService';

export async function POST(req: Request) {
  try {
    const { applicationId, studentId, examId } = await req.json();

    if (!applicationId || !studentId || !examId) {
      return NextResponse.json({ error: 'Missing required exam session parameters' }, { status: 400 });
    }

    const attempt = await dataService.startExamAttempt(applicationId, studentId, examId);
    const existingAnswers = await dataService.getAttemptAnswers(attempt.id);

    return NextResponse.json({
      success: true,
      attempt,
      answers: existingAnswers,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
