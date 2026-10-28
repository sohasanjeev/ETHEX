import { NextRequest, NextResponse } from 'next/server';
import { dataService } from '@/lib/services/dataService';

export async function GET() {
  try {
    const teachers = await dataService.getTeachers();
    return NextResponse.json({ success: true, teachers });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const teacher = await dataService.saveTeacher(body);
    return NextResponse.json({ success: true, teacher });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
