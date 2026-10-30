import { NextResponse } from 'next/server';
import { dataService } from '@/lib/services/dataService';

export async function GET() {
  try {
    const champions = await dataService.getChampions();
    const settings = await dataService.getSiteSettings();
    return NextResponse.json({
      success: true,
      champions,
      results_pamphlet_url: settings.results_pamphlet_url || '/posters/ethex_isro_tour_nov29.png',
      results_headline: settings.results_headline || 'ETHEX Champions — Previous Year Results & Hall of Fame',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch champions' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, id, data, results_pamphlet_url, results_headline } = body;

    // 1. Update Result Celebration Banner / Pamphlet settings
    if (results_pamphlet_url !== undefined || results_headline !== undefined) {
      await dataService.updateSiteSettings({
        results_pamphlet_url,
        results_headline,
      });
    }

    // 2. Champion CRUD Actions
    if (action === 'create') {
      const created = await dataService.createChampion({
        student_name: data.student_name || 'Champion Student',
        rank: data.rank || 'AIR 1',
        exam_name: data.exam_name || 'JEE / NEET / Foundation',
        target_class: data.target_class || 'Class 10',
        school: data.school || 'EURO Campus Scholar',
        score: data.score || '230/240 Marks',
        award: data.award || 'ISRO Educational Tour & Scholarship',
        quote: data.quote || 'EURO Campus mentors gave me the winning competitive edge.',
        photo_url: data.photo_url || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&crop=face',
        year: data.year || '2025–2026',
        is_featured: data.is_featured !== undefined ? data.is_featured : true,
      });
      return NextResponse.json({ success: true, message: 'Champion added successfully!', champion: created });
    }

    if (action === 'update' && id) {
      const updated = await dataService.updateChampion(id, data);
      return NextResponse.json({ success: true, message: 'Champion updated successfully!', champion: updated });
    }

    if (action === 'delete' && id) {
      const deleted = await dataService.deleteChampion(id);
      return NextResponse.json({ success: true, message: 'Champion deleted successfully!', deleted });
    }

    const currentChampions = await dataService.getChampions();
    return NextResponse.json({ success: true, champions: currentChampions });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Operation failed' }, { status: 500 });
  }
}
