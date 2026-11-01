import { NextResponse } from 'next/server';
import { dataService } from '@/lib/services/dataService';

export async function GET() {
  try {
    const logins = await dataService.getUserLogins();
    return NextResponse.json({
      success: true,
      logins,
      count: logins.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch logins' },
      { status: 500 }
    );
  }
}
