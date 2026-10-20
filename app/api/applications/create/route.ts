import { NextResponse } from 'next/server';
import { dataService } from '@/lib/services/dataService';

export async function POST(req: Request) {
  try {
    const { student_id, exam_id, selected_mode, centre_id } = await req.json();

    if (!student_id || !exam_id || !selected_mode) {
      return NextResponse.json({ error: 'Missing required application fields' }, { status: 400 });
    }

    const application = await dataService.createApplication({
      student_id,
      exam_id,
      selected_mode,
      centre_id,
    });

    return NextResponse.json({
      success: true,
      message: 'Application created successfully!',
      application,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
