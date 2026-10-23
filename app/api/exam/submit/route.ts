import { NextResponse } from 'next/server';
import { dataService } from '@/lib/services/dataService';

export async function POST(req: Request) {
  try {
    const { attemptId, isDisqualified, reason } = await req.json();

    if (!attemptId) {
      return NextResponse.json({ error: 'attemptId is required' }, { status: 400 });
    }

    if (isDisqualified) {
      const disqualified = await dataService.disqualifyAttempt(attemptId, reason);
      return NextResponse.json({
        success: true,
        message: 'Exam attempt disqualified due to proctoring policy violation.',
        attempt: disqualified,
      });
    }

    const evaluatedAttempt = await dataService.submitExamAttempt(attemptId);

    if (!evaluatedAttempt) {
      return NextResponse.json({ error: 'Attempt not found or already submitted' }, { status: 404 });
    }

    const reviewQuestions = await dataService.getQuestionsForAdmin(evaluatedAttempt.exam_id);
    const answers = await dataService.getAttemptAnswers(attemptId);

    return NextResponse.json({
      success: true,
      message: 'Examination submitted successfully!',
      attempt: evaluatedAttempt,
      reviewQuestions,
      answers,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
