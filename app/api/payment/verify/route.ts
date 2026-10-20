import { NextResponse } from 'next/server';
import { dataService } from '@/lib/services/dataService';
import { verifyRazorpaySignature } from '@/lib/razorpay/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      applicationId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = body;

    if (!applicationId || !razorpay_order_id || !razorpay_payment_id) {
      return NextResponse.json(
        { error: 'Missing payment verification credentials' },
        { status: 400 }
      );
    }

    // Verify cryptographic signature
    const isValid = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature || ''
    );

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid Razorpay payment signature. Payment cannot be verified.' },
        { status: 400 }
      );
    }

    const application = await dataService.getApplicationById(applicationId);
    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    // Idempotent confirmation
    const updatedApp = await dataService.confirmPayment(applicationId, {
      razorpay_order_id,
      razorpay_payment_id,
      amount: application.fee_amount,
    });

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully. Application confirmed!',
      application: updatedApp,
      receiptNumber: `RCP-${application.application_number}`,
      transactionId: razorpay_payment_id,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: error?.message || 'Payment verification failed' },
      { status: 500 }
    );
  }
}
