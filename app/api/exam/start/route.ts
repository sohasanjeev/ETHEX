import { NextResponse } from 'next/server';
import { dataService } from '@/lib/services/dataService';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const studentId = body.studentId || 'demo-student-id';
    const examId = body.examId || 'e1111111-1111-1111-1111-111111111111';
    const applicationId = body.applicationId || `sim-${Date.now()}`;

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
