import { NextResponse } from 'next/server';
import { dataService } from '@/lib/services/dataService';
import { createRazorpayOrder, getRazorpayConfig } from '@/lib/razorpay/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { applicationId } = body;

    if (!applicationId) {
      return NextResponse.json({ error: 'applicationId is required' }, { status: 400 });
    }

    const application = await dataService.getApplicationById(applicationId);
    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    if (application.application_status === 'confirmed' && application.payment_status === 'successful') {
      return NextResponse.json({ error: 'Application has already been paid and confirmed' }, { status: 400 });
    }

    // Always fetch trusted fee from exam record
    const exam = application.exam || (await dataService.getExamById(application.exam_id));
    if (!exam) {
      return NextResponse.json({ error: 'Associated exam not found' }, { status: 404 });
    }

    const feeAmount = exam.fee_amount || 0;
    if (feeAmount <= 0) {
      return NextResponse.json({ error: 'This examination does not require payment' }, { status: 400 });
    }

    const receipt = `RCP-${application.application_number}-${Date.now().toString().slice(-4)}`;

    const order = await createRazorpayOrder({
      amountInINR: feeAmount,
      receipt,
      notes: {
        application_id: application.id,
        application_number: application.application_number,
        exam_id: exam.id,
        exam_code: exam.code,
      },
    });

    const { keyId } = getRazorpayConfig();

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
      receipt,
      applicationNumber: application.application_number,
      examTitle: exam.title,
    });
  } catch (error: any) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to create payment order' },
      { status: 500 }
    );
  }
}
