import { NextRequest, NextResponse } from 'next/server';
import { dataService } from '@/lib/services/dataService';

export async function GET() {
  try {
    const exams = await dataService.getExams();
    return NextResponse.json({ success: true, exams });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, examId, examData, creatorName, reason, updates } = body;

    if (!action) {
      // Direct create fallback
      const newExam = await dataService.createExam(body);
      return NextResponse.json({ success: true, exam: newExam });
    }

    if (action === 'create') {
      const newExam = await dataService.createExam(examData);
      return NextResponse.json({ success: true, exam: newExam });
    }

    if (action === 'update') {
      const updated = await dataService.updateExam(examId, updates);
      return NextResponse.json({ success: true, exam: updated });
    }

    if (action === 'delete') {
      const deleted = await dataService.deleteExam(examId);
      return NextResponse.json({ success: deleted });
    }

    if (action === 'submit_approval') {
      const submitted = await dataService.submitExamForApproval(examId, creatorName || 'Authorized Teacher');
      return NextResponse.json({ success: true, exam: submitted });
    }

    if (action === 'approve') {
      const approved = await dataService.approveExam(examId);
      return NextResponse.json({ success: true, exam: approved });
    }

    if (action === 'reject') {
      const rejected = await dataService.rejectExam(examId, reason);
      return NextResponse.json({ success: true, exam: rejected });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
