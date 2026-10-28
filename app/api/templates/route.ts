import { NextRequest, NextResponse } from 'next/server';
import { dataService } from '@/lib/services/dataService';

export async function GET() {
  try {
    const templates = await dataService.getTemplates();
    return NextResponse.json({ success: true, templates });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const template = await dataService.saveTemplate(body);
    return NextResponse.json({ success: true, template });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
