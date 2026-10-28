import { NextRequest, NextResponse } from 'next/server';
import { dataService } from '@/lib/services/dataService';

export async function GET() {
  try {
    const centres = await dataService.getCentres();
    return NextResponse.json({ success: true, centres });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, centreData, roomData, id } = body;

    if (!action) {
      const newCentre = await dataService.createCentre(body);
      return NextResponse.json({ success: true, centre: newCentre });
    }

    if (action === 'save_centre') {
      const centre = await dataService.createCentre(centreData);
      return NextResponse.json({ success: true, centre });
    }

    if (action === 'delete_centre') {
      const deleted = await dataService.deleteCentre(id);
      return NextResponse.json({ success: deleted });
    }

    if (action === 'save_room') {
      const room = await dataService.saveRoom(roomData);
      return NextResponse.json({ success: true, room });
    }

    if (action === 'delete_room') {
      const deleted = await dataService.deleteRoom(id);
      return NextResponse.json({ success: deleted });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
