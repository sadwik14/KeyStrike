export interface TestResult {
  id: string;
  date: number;
  wpm: number;
  accuracy: number;
  duration: number;
  mode: 'time' | 'words';
  errors: number;
  consistency: number;
  testType: string;
}

export interface UserProfile {
  username: string;
  bestWpm: number;
  averageWpm: number;
  totalTests: number;
  bestAccuracy: number;
  currentStreak: number;
  totalWords: number;
  theme: 'light' | 'dark';
  language: string;
}

const RESULTS_KEY = 'keystrike_results';
const PROFILE_KEY = 'keystrike_profile';

export async function saveTestResult(result: TestResult) {
  try {
    const results = getTestResults();
    results.push(result);
    localStorage.setItem(RESULTS_KEY, JSON.stringify(results));
    updateProfileStats(result);

    // Try to save to MongoDB if available
    try {
      const profile = getProfileStats();
      await fetch('/api/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: profile.username,
          result,
          timestamp: new Date(),
        }),
      });
    } catch (mongoError) {
      console.log('MongoDB not available, using localStorage only');
    }
  } catch (error) {
    console.error('Error saving test result:', error);
  }
}

export function getTestResults(): TestResult[] {
  try {
    const data = localStorage.getItem(RESULTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading test results:', error);
    return [];
  }
}

export function getTestHistory(limit: number = 50): TestResult[] {
  const results = getTestResults();
  return results.slice(-limit).reverse();
}

export function getProfileStats(): UserProfile {
  try {
    const data = localStorage.getItem(PROFILE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading profile:', error);
  }

  return getDefaultProfile();
}

function getDefaultProfile(): UserProfile {
  return {
    username: 'Guest',
    bestWpm: 0,
    averageWpm: 0,
    totalTests: 0,
    bestAccuracy: 0,
    currentStreak: 0,
    totalWords: 0,
    theme: 'light',
    language: 'english',
  };
}

function updateProfileStats(result: TestResult) {
  const profile = getProfileStats();

  profile.totalTests += 1;
  profile.totalWords += Math.round((result.wpm / 60) * result.duration);
  profile.bestWpm = Math.max(profile.bestWpm, result.wpm);
  profile.bestAccuracy = Math.max(profile.bestAccuracy, result.accuracy);

  const results = getTestResults();
  const avgWpm = results.reduce((sum, r) => sum + r.wpm, 0) / results.length;
  profile.averageWpm = Math.round(avgWpm);

  // Calculate streak
  profile.currentStreak = calculateStreak(results);

  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

function calculateStreak(results: TestResult[]): number {
  if (results.length === 0) return 0;

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sortedResults = [...results].sort((a, b) => b.date - a.date);

  for (const result of sortedResults) {
    const resultDate = new Date(result.date);
    resultDate.setHours(0, 0, 0, 0);

    const daysDifference = Math.floor(
      (today.getTime() - resultDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysDifference === streak) {
      streak++;
    } else if (daysDifference > streak) {
      break;
    }
  }

  return streak;
}

export function updateUsername(username: string) {
  const profile = getProfileStats();
  profile.username = username;
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function getGlobalLeaderboard(): Array<{ rank: number; name: string; wpm: number; accuracy: number; date: string }> {
  const results = getTestResults();
  const grouped = new Map<string, TestResult[]>();

  results.forEach((result) => {
    const key = `${result.wpm}-${result.accuracy}`;
    if (!grouped.has(key)) {
      grouped.set(key, []);
    }
    grouped.get(key)!.push(result);
  });

  const topResults = Array.from(grouped.values())
    .map((group) => group[0])
    .sort((a, b) => b.wpm - a.wpm)
    .slice(0, 100)
    .map((result, index) => ({
      rank: index + 1,
      name: getProfileStats().username,
      wpm: result.wpm,
      accuracy: result.accuracy,
      date: new Date(result.date).toLocaleDateString(),
    }));

  return topResults;
}
