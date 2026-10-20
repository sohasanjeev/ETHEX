import { NextResponse } from 'next/server';
import { dataService } from '@/lib/services/dataService';

export async function GET() {
  try {
    const centres = await dataService.getCentres();
    return NextResponse.json({ success: true, centres });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const centreData = await req.json();
    const newCentre = await dataService.createCentre(centreData);
    return NextResponse.json({ success: true, centre: newCentre });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
