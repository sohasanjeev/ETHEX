import { NextResponse } from 'next/server';
import { dataService } from '@/lib/services/dataService';

export async function GET() {
  try {
    const results = await dataService.getAllResults();
    return NextResponse.json({ success: true, results });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, id, data } = body;

    if (action === 'create') {
      const created = await dataService.createResult({
        application_id: data.application_id || `APP-${Date.now().toString().slice(-6)}`,
        student_id: data.student_id || `std-${Date.now()}`,
        exam_id: data.exam_id || 'e1111111-1111-1111-1111-111111111111',
        roll_number: data.roll_number || `ETHEX26-${Math.floor(10000 + Math.random() * 90000)}`,
        phone: data.phone || '',
        student_name: data.student_name || 'Candidate',
        class_category: data.class_category || 'Class 10',
        stream: data.stream || 'Foundation',
        marks_obtained: Number(data.marks_obtained) || 200,
        max_marks: Number(data.max_marks) || 240,
        percentage: Number(data.percentage) || 83.3,
        rank_overall: Number(data.rank_overall) || 10,
        rank_category: Number(data.rank_category) || 3,
        is_qualified: data.is_qualified !== undefined ? data.is_qualified : true,
        scholarship_tier: data.scholarship_tier || 'Merit Scholarship Waiver',
        scholarship_percentage: Number(data.scholarship_percentage) || 75,
        cash_prize_eligible: Boolean(data.cash_prize_eligible),
        isro_tour_eligible: Boolean(data.isro_tour_eligible),
        pdf_url: data.pdf_url || '/branding/euro_result_banner.jpg',
        is_published: data.is_published !== undefined ? data.is_published : true,
        published_at: new Date().toISOString(),
      });
      return NextResponse.json({ success: true, message: 'Result added successfully!', result: created });
    }

    if (action === 'update' && id) {
      const updated = await dataService.updateResult(id, data);
      return NextResponse.json({ success: true, message: 'Result updated!', result: updated });
    }

    if (action === 'delete' && id) {
      const deleted = await dataService.deleteResult(id);
      return NextResponse.json({ success: true, message: 'Result deleted!', deleted });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
