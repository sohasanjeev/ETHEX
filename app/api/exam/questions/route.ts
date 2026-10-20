import { NextResponse } from 'next/server';
import { dataService } from '@/lib/services/dataService';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const examId = searchParams.get('examId') || 'e1111111-1111-1111-1111-111111111111';

  try {
    const questions = await dataService.getQuestionsForExam(examId);
    return NextResponse.json({ success: true, questions });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
