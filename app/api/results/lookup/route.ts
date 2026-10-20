import { NextResponse } from 'next/server';
import { dataService } from '@/lib/services/dataService';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query') || '';

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    const result = await dataService.lookupResult(query);
    if (!result) {
      return NextResponse.json({ error: 'No published result found for the query' }, { status: 404 });
    }
    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
