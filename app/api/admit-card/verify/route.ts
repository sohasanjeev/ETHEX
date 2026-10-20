import { NextResponse } from 'next/server';
import { dataService } from '@/lib/services/dataService';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code') || '';

  if (!code) {
    return NextResponse.json({ error: 'Verification code is required' }, { status: 400 });
  }

  try {
    const app = await dataService.verifyAdmitCard(code);
    if (!app) {
      return NextResponse.json({ error: 'Invalid or unverified Admit Card code' }, { status: 404 });
    }

    // Return safe verification payload
    return NextResponse.json({
      success: true,
      verified: true,
      applicationNumber: app.application_number,
      rollNumber: app.roll_number,
      admitCardNumber: app.admit_card_number,
      examTitle: app.exam?.title,
      classCategory: app.exam?.class_category,
      selectedMode: app.selected_mode,
      centreName: app.centre?.name || 'Online Examination Portal',
      centreAddress: app.centre?.address,
      examDate: app.exam?.exam_date,
      status: app.application_status,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
