import zlib from 'zlib';

export interface ExtractedParsedQuestion {
  id: string;
  question_number?: number;
  subject_id: string;
  subject_name?: string;
  class_category?: string;
  target_stream?: string;
  question_text: string;
  options: Array<{
    id: string;
    option_label: 'A' | 'B' | 'C' | 'D';
    option_text: string;
    is_correct: boolean;
  }>;
  marks: number;
  negative_marks: number;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation?: string;
  needs_review: boolean;
  missing_answer_key: boolean;
  missing_options: boolean;
}

/**
 * Extracts plain text from raw PDF buffer without native dependencies
 */
export function extractTextFromPdfBuffer(buffer: Buffer): string {
  try {
    const textChunks: string[] = [];
    const content = buffer.toString('binary');

    // 1. Check for uncompressed text streams: BT ... ET
    const btRegex = /BT[\s\S]*?ET/g;
    let match;
    while ((match = btRegex.exec(content)) !== null) {
      const block = match[0];
      // match (text) Tj
      const tjRegex = /\((.*?)\)\s*Tj/g;
      let tjMatch;
      while ((tjMatch = tjRegex.exec(block)) !== null) {
        textChunks.push(tjMatch[1]);
      }
      // match [(t1) 12 (t2)] TJ
      const tjArrayRegex = /\[(.*?)\]\s*TJ/g;
      let tjArrMatch;
      while ((tjArrMatch = tjArrayRegex.exec(block)) !== null) {
        const inner = tjArrMatch[1];
        const innerRegex = /\((.*?)\)/g;
        let innerMatch;
        while ((innerMatch = innerRegex.exec(inner)) !== null) {
          textChunks.push(innerMatch[1]);
        }
      }
    }

    // 2. Also search for compressed streams (FlateDecode)
    const streamRegex = /stream\r?\n([\s\S]*?)\r?\nendstream/g;
    let streamMatch;
    while ((streamMatch = streamRegex.exec(content)) !== null) {
      const rawStream = Buffer.from(streamMatch[1], 'binary');
      try {
        const decompressed = zlib.inflateSync(rawStream);
        const decompStr = decompressed.toString('utf-8');
        let dMatch;
        const dbtRegex = /BT[\s\S]*?ET/g;
        while ((dMatch = dbtRegex.exec(decompStr)) !== null) {
          const block = dMatch[0];
          const tjRegex = /\((.*?)\)\s*Tj/g;
          let tjMatch;
          while ((tjMatch = tjRegex.exec(block)) !== null) {
            textChunks.push(tjMatch[1]);
          }
          const tjArrayRegex = /\[(.*?)\]\s*TJ/g;
          let tjArrMatch;
          while ((tjArrMatch = tjArrayRegex.exec(block)) !== null) {
            const inner = tjArrMatch[1];
            const innerRegex = /\((.*?)\)/g;
            let innerMatch;
            while ((innerMatch = innerRegex.exec(inner)) !== null) {
              textChunks.push(innerMatch[1]);
            }
          }
        }
      } catch {
        // Not a valid zlib stream or raw data; ignore
      }
    }

    if (textChunks.length > 0) {
      return textChunks.join(' ');
    }

    // Fallback: strip basic control characters and extract readable ascii sequences
    const asciiText = content.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, ' ');
    return asciiText;
  } catch (err) {
    console.warn('PDF text extraction fallback triggered:', err);
    return buffer.toString('utf-8');
  }
}

/**
 * AI-assisted Regex & Rule-Based Question Parser
 * Converts raw text into verified, structured MCQ questions
 */
export function parseQuestionsFromText(
  rawText: string,
  defaultSubject: string = 'PHY',
  defaultMarks: number = 4,
  defaultNegativeMarks: number = 1
): ExtractedParsedQuestion[] {
  if (!rawText || !rawText.trim()) return [];

  const cleanText = rawText
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\\n/g, '\n');

  // Split lines
  const lines = cleanText.split('\n');
  const questions: ExtractedParsedQuestion[] = [];

  // Patterns for Question beginnings:
  // Q.1, Q. 1, Q1., Question 1, 1., 1)
  const qStartPattern = /^\s*(?:Q(?:uestion)?\.?\s*(\d+)[:.]?|(\d+)[\.\)]\s+)([\s\S]*)$/i;

  // Patterns for Options:
  // (A), (a), A., A), [A], Option A:
  const optionPattern = /^\s*(?:\(?([A-Da-d1-4])\)?[.:\s]+|\b([A-Da-d])\s*[-.)]\s*)([\s\S]*)$/;

  // Answer key pattern:
  // Ans: B, Answer: (C), Key: A, Correct Option: D
  const answerPattern = /(?:Ans(?:wer)?|Key|Correct\s*Option)[\s:=-]+(?:\(?([A-Da-d1-4])\)?)/i;

  let currentSubject = defaultSubject;
  let currentQ: {
    number?: number;
    textLines: string[];
    options: Array<{ label: 'A' | 'B' | 'C' | 'D'; text: string; isCorrect: boolean }>;
    answerKey?: 'A' | 'B' | 'C' | 'D';
    explanationLines: string[];
    inExplanation: boolean;
  } | null = null;

  const subjectKeywords: Record<string, string> = {
    physics: 'PHY',
    chemistry: 'CHE',
    biology: 'BIO',
    botany: 'BIO',
    zoology: 'BIO',
    mathematics: 'MAT',
    maths: 'MAT',
    aptitude: 'MAT_APT',
    'mental ability': 'MAT_APT',
    science: 'GEN',
  };

  const flushQuestion = () => {
    if (!currentQ || currentQ.textLines.length === 0) return;

    const qText = currentQ.textLines.join('\n').trim();
    if (!qText) return;

    // Normalize option labels to A, B, C, D
    const labelMap: Record<string, 'A' | 'B' | 'C' | 'D'> = {
      '1': 'A', '2': 'B', '3': 'C', '4': 'D',
      'a': 'A', 'b': 'B', 'c': 'C', 'd': 'D',
      'A': 'A', 'B': 'B', 'C': 'C', 'D': 'D',
    };

    // Ensure we have A, B, C, D options
    const finalOptions: Array<{ id: string; option_label: 'A' | 'B' | 'C' | 'D'; option_text: string; is_correct: boolean }> = [];
    const labels: Array<'A' | 'B' | 'C' | 'D'> = ['A', 'B', 'C', 'D'];

    labels.forEach((lbl) => {
      const found = currentQ!.options.find((o) => o.label === lbl);
      const isCorrect = currentQ!.answerKey === lbl || (found?.isCorrect ?? false);
      finalOptions.push({
        id: `opt_${Date.now()}_${lbl.toLowerCase()}_${Math.random().toString(36).substring(2, 5)}`,
        option_label: lbl,
        option_text: found ? found.text.trim() : `Option ${lbl}`,
        is_correct: isCorrect,
      });
    });

    const hasCorrectOption = finalOptions.some((o) => o.is_correct);
    const missingOptions = currentQ.options.length < 4;

    questions.push({
      id: `ext_q_${Date.now()}_${questions.length + 1}`,
      question_number: currentQ.number || questions.length + 1,
      subject_id: currentSubject,
      question_text: qText,
      options: finalOptions,
      marks: defaultMarks,
      negative_marks: defaultNegativeMarks,
      difficulty: 'medium',
      explanation: currentQ.explanationLines.join('\n').trim(),
      needs_review: !hasCorrectOption || missingOptions,
      missing_answer_key: !hasCorrectOption,
      missing_options: missingOptions,
    });

    currentQ = null;
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (!line) continue;

    // Check for Section / Subject headers
    const lowerLine = line.toLowerCase();
    for (const [kw, subjCode] of Object.entries(subjectKeywords)) {
      if (
        (lowerLine.includes('section') || lowerLine.includes('part') || lowerLine.length < 25) &&
        lowerLine.includes(kw)
      ) {
        currentSubject = subjCode;
        break;
      }
    }

    // Check for new Question start
    const qMatch = line.match(qStartPattern);
    if (qMatch && !line.match(/^(?:ans|hint|solution|page)/i)) {
      flushQuestion();

      const qNumStr = qMatch[1] || qMatch[2];
      const rest = qMatch[3] || '';

      currentQ = {
        number: qNumStr ? parseInt(qNumStr, 10) : undefined,
        textLines: [rest],
        options: [],
        explanationLines: [],
        inExplanation: false,
      };
      continue;
    }

    if (!currentQ) {
      // If we see content before question 1, start Question 1
      currentQ = {
        number: 1,
        textLines: [line],
        options: [],
        explanationLines: [],
        inExplanation: false,
      };
      continue;
    }

    // Check for Explanation / Solution block
    if (/^(?:hint|explanation|solution|sol[:.]?)\s*[:.-]?/i.test(line)) {
      currentQ.inExplanation = true;
      const stripped = line.replace(/^(?:hint|explanation|solution|sol[:.]?)\s*[:.-]?/i, '');
      if (stripped) currentQ.explanationLines.push(stripped);
      continue;
    }

    if (currentQ.inExplanation) {
      currentQ.explanationLines.push(line);
      continue;
    }

    // Check for Answer key inline: Ans: (B)
    const ansMatch = line.match(answerPattern);
    if (ansMatch) {
      const rawAns = ansMatch[1].toUpperCase();
      const mappedAns = (['A', 'B', 'C', 'D'].includes(rawAns)
        ? rawAns
        : { '1': 'A', '2': 'B', '3': 'C', '4': 'D' }[rawAns]) as 'A' | 'B' | 'C' | 'D';
      if (mappedAns) {
        currentQ.answerKey = mappedAns;
      }
      // Line might also have explanation after answer
      const afterAns = line.replace(answerPattern, '').trim();
      if (afterAns) currentQ.explanationLines.push(afterAns);
      continue;
    }

    // Check for Options (A, B, C, D)
    // Could also have multiple options on one line: "(A) 10m  (B) 20m  (C) 30m  (D) 40m"
    const multiOptionSplit = line.split(/(?=\([A-Da-d1-4]\)|[A-Da-d][.)]\s+)/);
    if (multiOptionSplit.length > 1 && multiOptionSplit.some((part) => optionPattern.test(part.trim()))) {
      for (const part of multiOptionSplit) {
        const trimmedPart = part.trim();
        const partMatch = trimmedPart.match(optionPattern);
        if (partMatch) {
          const rawOpt = (partMatch[1] || partMatch[2]).toUpperCase();
          const mappedOpt = (['A', 'B', 'C', 'D'].includes(rawOpt)
            ? rawOpt
            : { '1': 'A', '2': 'B', '3': 'C', '4': 'D' }[rawOpt]) as 'A' | 'B' | 'C' | 'D';
          const optText = (partMatch[3] || '').trim();
          if (mappedOpt) {
            currentQ.options.push({ label: mappedOpt, text: optText, isCorrect: false });
          }
        }
      }
      continue;
    }

    // Single option match
    const optMatch = line.match(optionPattern);
    if (optMatch && (optMatch[1] || optMatch[2])) {
      const rawOpt = (optMatch[1] || optMatch[2]).toUpperCase();
      const mappedOpt = (['A', 'B', 'C', 'D'].includes(rawOpt)
        ? rawOpt
        : { '1': 'A', '2': 'B', '3': 'C', '4': 'D' }[rawOpt]) as 'A' | 'B' | 'C' | 'D';
      const optText = (optMatch[3] || '').trim();
      if (mappedOpt) {
        currentQ.options.push({ label: mappedOpt, text: optText, isCorrect: false });
        continue;
      }
    }

    // Otherwise it belongs to current question text or last option
    if (currentQ.options.length > 0) {
      const lastOpt = currentQ.options[currentQ.options.length - 1];
      lastOpt.text += ' ' + line;
    } else {
      currentQ.textLines.push(line);
    }
  }

  flushQuestion();

  // Also check if there's a separate Answer Key block at the end (e.g., 1. B, 2. C, 3. A ...)
  const endKeyPattern = /(?:ANSWER\s*KEYS?|ANSWERS|KEY\s*SHEET)([\s\S]*)$/i;
  const keyBlockMatch = cleanText.match(endKeyPattern);
  if (keyBlockMatch) {
    const keyBlock = keyBlockMatch[1];
    const keyRegex = /(?:(\d+)[\s.:-]+)?(?:\(?([A-Da-d1-4])\)?)/g;
    let km;
    let idx = 0;
    while ((km = keyRegex.exec(keyBlock)) !== null) {
      const qNum = km[1] ? parseInt(km[1], 10) : idx + 1;
      const rawKey = km[2]?.toUpperCase();
      const mappedKey = (['A', 'B', 'C', 'D'].includes(rawKey)
        ? rawKey
        : { '1': 'A', '2': 'B', '3': 'C', '4': 'D' }[rawKey]) as 'A' | 'B' | 'C' | 'D';

      if (mappedKey) {
        const targetQ = questions.find((q) => q.question_number === qNum) || questions[idx];
        if (targetQ) {
          targetQ.options.forEach((opt) => {
            opt.is_correct = opt.option_label === mappedKey;
          });
          targetQ.missing_answer_key = false;
          targetQ.needs_review = targetQ.missing_options;
        }
      }
      idx++;
    }
  }

  return questions;
}
