export interface TestResult {
  wpm: number;
  accuracy: number;
  errors: number;
  consistency: number;
  testTime: number;
  wordsTyped: number;
}

export function calculateWPM(characters: number, timeElapsedSeconds: number): number {
  if (timeElapsedSeconds === 0) return 0;
  const minutes = timeElapsedSeconds / 60;
  const words = characters / 5;
  return Math.round(words / minutes);
}

export function calculateAccuracy(
  typed: string,
  target: string
): { accuracy: number; errors: number } {
  let errors = 0;
  const maxLength = Math.max(typed.length, target.length);

  for (let i = 0; i < maxLength; i++) {
    if (typed[i] !== target[i]) {
      errors++;
    }
  }

  const accuracy = Math.max(
    0,
    Math.round(((maxLength - errors) / maxLength) * 100 * 100) / 100
  );

  return { accuracy, errors };
}

export function calculateConsistency(wpmValues: number[]): number {
  if (wpmValues.length === 0) return 100;
  
  const mean = wpmValues.reduce((a, b) => a + b, 0) / wpmValues.length;
  const variance =
    wpmValues.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) /
    wpmValues.length;
  const stdDev = Math.sqrt(variance);
  const coefficientOfVariation = (stdDev / mean) * 100;
  
  return Math.max(0, Math.round((100 - coefficientOfVariation) * 100) / 100);
}

export function getWordCount(text: string): number {
  return text.trim().split(/\s+/).length;
}

export interface TestMode {
  id: string;
  name: string;
  label: string;
  description: string;
  category: string;
}

export const TEST_MODES: TestMode[] = [
  {
    id: "time-sprint",
    name: "Time Sprint",
    label: "MOST POPULAR",
    description: "15, 30, 60, or 120 second bursts. Pure WPM under pressure. The gold standard.",
    category: "time",
  },
  {
    id: "word-count",
    name: "Word Count",
    label: "CLASSIC",
    description: "10 to 200 words. Finish as fast as humanly possible. Simple. Brutal.",
    category: "words",
  },
  {
    id: "code-mode",
    name: "Code Mode",
    label: "NEW",
    description: "Real snippets from open-source repos. Train on TypeScript, Rust, Go, Python & more.",
    category: "code",
  },
  {
    id: "zen-flow",
    name: "Zen Flow",
    label: "FOCUS",
    description: "No timer. No score. Just you, the text, and the meditative rhythm of your keystrokes.",
    category: "zen",
  },
];
