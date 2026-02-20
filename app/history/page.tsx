'use client';

import { useEffect, useState } from 'react';
import { getTestHistory } from '@/lib/storage';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

interface TestResult {
  id: string;
  date: number;
  wpm: number;
  accuracy: number;
  duration: number;
  mode: string;
  errors: number;
  consistency: number;
  testType: string;
}

export default function HistoryPage() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [sortBy, setSortBy] = useState<'date' | 'wpm' | 'accuracy'>('date');

  useEffect(() => {
    const history = getTestHistory(100);
    setResults(history);
  }, []);

  const sortedResults = [...results].sort((a, b) => {
    if (sortBy === 'wpm') return b.wpm - a.wpm;
    if (sortBy === 'accuracy') return b.accuracy - a.accuracy;
    return b.date - a.date;
  });

  const stats = {
    totalTests: results.length,
    avgWpm: results.length > 0 ? Math.round(results.reduce((sum, r) => sum + r.wpm, 0) / results.length) : 0,
    avgAccuracy: results.length > 0 ? Math.round(results.reduce((sum, r) => sum + r.accuracy, 0) / results.length) : 0,
    bestWpm: results.length > 0 ? Math.max(...results.map(r => r.wpm)) : 0,
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12 space-y-12">
        {/* Summary Stats */}
        <section className="space-y-4">
          <p className="text-xs font-bold text-muted-foreground tracking-widest">
            YOUR TYPING JOURNEY
          </p>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="border-2 border-foreground p-4">
              <p className="text-xs font-bold text-muted-foreground tracking-widest mb-2">
                TOTAL TESTS
              </p>
              <p className="text-4xl font-black">{stats.totalTests}</p>
            </div>
            <div className="border-2 border-foreground p-4">
              <p className="text-xs font-bold text-muted-foreground tracking-widest mb-2">
                AVERAGE WPM
              </p>
              <p className="text-4xl font-black text-accent">{stats.avgWpm}</p>
            </div>
            <div className="border-2 border-foreground p-4">
              <p className="text-xs font-bold text-muted-foreground tracking-widest mb-2">
                BEST WPM
              </p>
              <p className="text-4xl font-black">{stats.bestWpm}</p>
            </div>
            <div className="border-2 border-foreground p-4">
              <p className="text-xs font-bold text-muted-foreground tracking-widest mb-2">
                AVG ACCURACY
              </p>
              <p className="text-4xl font-black text-accent">{stats.avgAccuracy}%</p>
            </div>
          </div>
        </section>

        {/* Sort Controls */}
        <section className="space-y-4">
          <p className="text-xs font-bold text-muted-foreground tracking-widest">
            SORT BY
          </p>
          <div className="flex gap-2 border-b border-border pb-4">
            {(['date', 'wpm', 'accuracy'] as const).map((method) => (
              <button
                key={method}
                onClick={() => setSortBy(method)}
                className={`px-4 py-2 font-bold text-sm transition ${
                  sortBy === method
                    ? 'bg-accent text-accent-foreground'
                    : 'border border-border hover:bg-muted'
                }`}
              >
                {method.toUpperCase()}
              </button>
            ))}
          </div>
        </section>

        {/* Results Table */}
        <section className="space-y-4">
          {results.length === 0 ? (
            <div className="border-2 border-foreground p-8 text-center">
              <p className="text-lg font-bold text-muted-foreground">
                No tests yet. <a href="/test" className="text-accent hover:underline">Start testing!</a>
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto border-2 border-foreground">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-foreground bg-muted">
                    <th className="px-4 py-3 text-left text-xs font-bold text-muted-foreground tracking-widest">
                      DATE
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-muted-foreground tracking-widest">
                      TYPE
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-muted-foreground tracking-widest">
                      WPM
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-muted-foreground tracking-widest">
                      ACCURACY
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-muted-foreground tracking-widest">
                      ERRORS
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-muted-foreground tracking-widest">
                      CONSISTENCY
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedResults.map((result, idx) => (
                    <tr
                      key={result.id}
                      className={idx % 2 === 0 ? 'bg-white' : 'bg-muted border-t border-border'}
                    >
                      <td className="px-4 py-3 text-sm font-mono">
                        {new Date(result.date).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm font-bold">{result.testType}</td>
                      <td className="px-4 py-3 text-sm font-bold text-accent">{result.wpm}</td>
                      <td className="px-4 py-3 text-sm font-bold">{result.accuracy}%</td>
                      <td className="px-4 py-3 text-sm font-bold">{result.errors}</td>
                      <td className="px-4 py-3 text-sm font-bold">{Math.round(result.consistency)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Action Buttons */}
        <section className="flex gap-4">
          <a
            href="/test"
            className="flex-1 bg-accent text-accent-foreground font-black py-4 text-center hover:opacity-90 transition"
          >
            TAKE ANOTHER TEST
          </a>
          <a
            href="/profile"
            className="flex-1 border-2 border-foreground font-black py-4 text-center hover:bg-muted transition"
          >
            BACK TO PROFILE
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}
