import { NextRequest, NextResponse } from 'next/server';
import { extractTextFromPdfBuffer, parseQuestionsFromText } from '@/lib/parser/pdfQuestionParser';

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';

    let rawText = '';
    let subject = 'PHY';
    let marks = 4;
    let negativeMarks = 1;

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File | null;
      const textParam = formData.get('text') as string | null;
      const subjParam = formData.get('subject') as string | null;
      const marksParam = formData.get('marks') as string | null;
      const negParam = formData.get('negativeMarks') as string | null;

      if (subjParam) subject = subjParam;
      if (marksParam) marks = parseFloat(marksParam) || 4;
      if (negParam) negativeMarks = parseFloat(negParam) || 1;

      if (file) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        // Extract text from PDF buffer
        rawText = extractTextFromPdfBuffer(buffer);
      } else if (textParam) {
        rawText = textParam;
      }
    } else {
      const body = await req.json();
      rawText = body.text || '';
      if (body.subject) subject = body.subject;
      if (body.marks !== undefined) marks = parseFloat(body.marks) || 4;
      if (body.negativeMarks !== undefined) negativeMarks = parseFloat(body.negativeMarks) || 1;
    }

    if (!rawText || !rawText.trim()) {
      return NextResponse.json(
        { error: 'No text or PDF file provided for parsing' },
        { status: 400 }
      );
    }

    const questions = parseQuestionsFromText(rawText, subject, marks, negativeMarks);

    return NextResponse.json({
      success: true,
      extractedCount: questions.length,
      questions,
      rawTextPreview: rawText.substring(0, 500),
    });
  } catch (error: any) {
    console.error('Error parsing questions from PDF/text:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to parse questions' },
      { status: 500 }
    );
  }
}
