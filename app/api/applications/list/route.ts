import { NextResponse } from 'next/server';
import { dataService } from '@/lib/services/dataService';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const studentId = searchParams.get('studentId') || undefined;

  try {
    const applications = await dataService.getApplications(studentId);
    return NextResponse.json({ success: true, applications });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
