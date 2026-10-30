import { NextResponse } from 'next/server';
import { dataService } from '@/lib/services/dataService';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      student_id,
      exam_id,
      selected_mode,
      centre_id,
      student_name,
      student_phone,
      student_class,
      payment_status,
      payment_mode,
      utr_number,
      fee_amount,
      fee_paid,
    } = body;

    // Default to first exam if not provided
    const resolvedExamId = exam_id || 'e1111111-1111-1111-1111-111111111111';
    const resolvedStudentId = student_id || `std-${(student_phone || '2026').slice(-4)}`;

    const application = await dataService.createApplication({
      student_id: resolvedStudentId,
      exam_id: resolvedExamId,
      selected_mode: (selected_mode || 'online').toLowerCase(),
      centre_id,
      student_name,
      student_phone,
      student_class,
      payment_status: payment_status || 'successful',
      payment_mode: payment_mode || 'UPI_QR',
      utr_number,
      fee_amount: fee_amount || 100,
      fee_paid: fee_paid !== undefined ? fee_paid : 100,
    });

    return NextResponse.json({
      success: true,
      message: 'Application registered successfully!',
      application,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create application' }, { status: 500 });
  }
}
