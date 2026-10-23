import { NextResponse } from 'next/server';
import { dataService } from '@/lib/services/dataService';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const examId = searchParams.get('examId') || 'e1111111-1111-1111-1111-111111111111';
  const isAdmin = searchParams.get('isAdmin') === 'true';

  try {
    const questions = isAdmin
      ? await dataService.getQuestionsForAdmin(examId)
      : await dataService.getQuestionsForExam(examId);

    return NextResponse.json({ success: true, questions });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { examId, question, bulkQuestions } = body;

    if (!examId) {
      return NextResponse.json({ error: 'examId is required' }, { status: 400 });
    }

    if (bulkQuestions && Array.isArray(bulkQuestions)) {
      const created = await dataService.bulkAddQuestions(examId, bulkQuestions);
      return NextResponse.json({ success: true, questions: created, count: created.length });
    }

    if (question) {
      const created = await dataService.addQuestionToExam(examId, question);
      return NextResponse.json({ success: true, question: created });
    }

    return NextResponse.json({ error: 'Either question or bulkQuestions must be provided' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const examId = searchParams.get('examId');
    const questionId = searchParams.get('questionId');

    if (!examId || !questionId) {
      return NextResponse.json({ error: 'examId and questionId are required' }, { status: 400 });
    }

    const success = await dataService.deleteQuestion(examId, questionId);
    return NextResponse.json({ success });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

