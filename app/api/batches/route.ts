import { NextRequest, NextResponse } from 'next/server';
import { dataService } from '@/lib/services/dataService';

export async function GET() {
  try {
    const batches = await dataService.getBatches();
    return NextResponse.json({ success: true, batches });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const batch = await dataService.saveBatch(body);
    return NextResponse.json({ success: true, batch });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    const deleted = await dataService.deleteBatch(id);
    return NextResponse.json({ success: deleted });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
