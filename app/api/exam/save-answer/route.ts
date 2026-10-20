import { NextResponse } from 'next/server';
import { dataService } from '@/lib/services/dataService';

export async function POST(req: Request) {
  try {
    const { attemptId, questionId, selectedOptionId, isMarkedForReview } = await req.json();

    if (!attemptId || !questionId) {
      return NextResponse.json({ error: 'Missing attemptId or questionId' }, { status: 400 });
    }

    await dataService.saveAnswer(attemptId, questionId, selectedOptionId, Boolean(isMarkedForReview));

    return NextResponse.json({ success: true, savedAt: new Date().toISOString() });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
