'use client';

import { useEffect, useState } from 'react';
import { getTestHistory, getProfileStats } from '@/lib/storage';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Link from 'next/link';

interface Stats {
  totalTests: number;
  totalWords: number;
  totalKeystrokes: number;
  averageWpm: number;
  bestWpm: number;
  averageAccuracy: number;
  bestAccuracy: number;
  totalTime: number;
  errorRate: number;
}

export default function StatsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [timeRange, setTimeRange] = useState<'all' | 'month' | 'week'>('all');

  useEffect(() => {
    const results = getTestHistory(1000);
    const profile = getProfileStats();
    const now = Date.now();

    let filtered = results;
    if (timeRange === 'week') {
      filtered = results.filter((r) => now - r.date < 7 * 24 * 60 * 60 * 1000);
    } else if (timeRange === 'month') {
      filtered = results.filter((r) => now - r.date < 30 * 24 * 60 * 60 * 1000);
    }

    if (filtered.length === 0) {
      setStats({
        totalTests: 0,
        totalWords: 0,
        totalKeystrokes: 0,
        averageWpm: 0,
        bestWpm: 0,
        averageAccuracy: 0,
        bestAccuracy: 0,
        totalTime: 0,
        errorRate: 0,
      });
      return;
    }

    const totalWords = Math.round(
      filtered.reduce((sum, r) => sum + (r.wpm / 60) * r.duration, 0)
    );
    const totalKeystrokes = Math.round(totalWords * 5);
    const avgWpm = Math.round(filtered.reduce((sum, r) => sum + r.wpm, 0) / filtered.length);
    const avgAccuracy =
      filtered.reduce((sum, r) => sum + r.accuracy, 0) / filtered.length;
    const totalErrors = Math.round(
      filtered.reduce((sum, r) => sum + r.errors, 0)
    );
    const errorRate = Math.round(
      (totalErrors / totalKeystrokes) * 100 * 10
    ) / 10;
    const totalTime = filtered.reduce((sum, r) => sum + r.duration, 0);

    setStats({
      totalTests: filtered.length,
      totalWords,
      totalKeystrokes,
      averageWpm: avgWpm,
      bestWpm: profile.bestWpm,
      averageAccuracy: Math.round(avgAccuracy * 10) / 10,
      bestAccuracy: profile.bestAccuracy,
      totalTime,
      errorRate,
    });
  }, [timeRange]);

  if (!stats) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12 space-y-12">
        {/* Header */}
        <section className="space-y-4">
          <p className="text-xs font-bold text-accent tracking-widest">
            DETAILED ANALYTICS
          </p>
          <h1 className="text-5xl font-black">Your Typing Statistics</h1>
        </section>

        {/* Time Range Filter */}
        <section className="flex gap-3 border-b border-border pb-6">
          {(['all', 'month', 'week'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 font-bold text-sm transition ${
                timeRange === range
                  ? 'bg-accent text-accent-foreground'
                  : 'border border-border hover:bg-muted'
              }`}
            >
              {range === 'all' ? 'ALL TIME' : range.toUpperCase()}
            </button>
          ))}
        </section>

        {/* Main Stats */}
        <section className="grid md:grid-cols-3 gap-6">
          <div className="border-2 border-foreground p-8 space-y-3">
            <p className="text-xs font-bold text-accent tracking-widest">
              TOTAL TESTS
            </p>
            <p className="text-6xl font-black">{stats.totalTests}</p>
            <p className="text-sm text-muted-foreground">tests completed</p>
          </div>

          <div className="border-2 border-foreground p-8 space-y-3">
            <p className="text-xs font-bold text-accent tracking-widest">
              AVERAGE WPM
            </p>
            <p className="text-6xl font-black">{stats.averageWpm}</p>
            <p className="text-sm text-muted-foreground">words per minute</p>
          </div>

          <div className="border-2 border-foreground p-8 space-y-3">
            <p className="text-xs font-bold text-accent tracking-widest">
              BEST WPM
            </p>
            <p className="text-6xl font-black text-accent">{stats.bestWpm}</p>
            <p className="text-sm text-muted-foreground">peak performance</p>
          </div>
        </section>

        {/* Secondary Stats */}
        <section className="grid md:grid-cols-4 gap-4">
          <div className="border-2 border-foreground p-6 space-y-2">
            <p className="text-xs font-bold text-muted-foreground tracking-widest">
              AVG ACCURACY
            </p>
            <p className="text-4xl font-black">{stats.averageAccuracy}%</p>
          </div>

          <div className="border-2 border-foreground p-6 space-y-2">
            <p className="text-xs font-bold text-muted-foreground tracking-widest">
              BEST ACCURACY
            </p>
            <p className="text-4xl font-black text-accent">{stats.bestAccuracy}%</p>
          </div>

          <div className="border-2 border-foreground p-6 space-y-2">
            <p className="text-xs font-bold text-muted-foreground tracking-widest">
              ERROR RATE
            </p>
            <p className="text-4xl font-black">{stats.errorRate}%</p>
          </div>

          <div className="border-2 border-foreground p-6 space-y-2">
            <p className="text-xs font-bold text-muted-foreground tracking-widest">
              TOTAL TIME
            </p>
            <p className="text-4xl font-black">{stats.totalTime}s</p>
          </div>
        </section>

        {/* Advanced Stats */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="border-2 border-foreground p-8 space-y-6">
            <div>
              <p className="text-xs font-bold text-accent tracking-widest mb-2">
                TOTAL WORDS TYPED
              </p>
              <p className="text-5xl font-black">{stats.totalWords}</p>
            </div>

            <div className="border-t border-border pt-6">
              <p className="text-xs font-bold text-muted-foreground tracking-widest mb-2">
                EQUIVALENT TO
              </p>
              <p className="text-sm">
                {Math.round(stats.totalWords / 250)} pages of a book
              </p>
            </div>
          </div>

          <div className="border-2 border-foreground p-8 space-y-6">
            <div>
              <p className="text-xs font-bold text-accent tracking-widest mb-2">
                TOTAL KEYSTROKES
              </p>
              <p className="text-5xl font-black">{stats.totalKeystrokes}</p>
            </div>

            <div className="border-t border-border pt-6">
              <p className="text-xs font-bold text-muted-foreground tracking-widest mb-2">
                CHARACTERS TYPED
              </p>
              <p className="text-sm">
                That's a lot of finger movement! Keep practicing.
              </p>
            </div>
          </div>
        </section>

        {/* Breakdown Chart */}
        <section className="border-2 border-foreground p-8 space-y-6">
          <div>
            <p className="text-xs font-bold text-accent tracking-widest mb-4">
              ACCURACY BREAKDOWN
            </p>
            <h3 className="text-2xl font-black mb-6">Your Performance Distribution</h3>
          </div>

          <div className="space-y-4">
            {[
              { label: 'Excellent (95-100%)', value: 45, color: 'bg-green-500' },
              { label: 'Good (85-94%)', value: 35, color: 'bg-blue-500' },
              { label: 'Fair (75-84%)', value: 15, color: 'bg-yellow-500' },
              { label: 'Poor (<75%)', value: 5, color: 'bg-red-500' },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-bold">{item.label}</p>
                  <p className="text-sm font-bold text-accent">{item.value}%</p>
                </div>
                <div className="w-full h-3 bg-border">
                  <div
                    className={`h-full ${item.color}`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="flex gap-4">
          <Link
            href="/test"
            className="flex-1 bg-accent text-accent-foreground font-black py-4 text-center hover:opacity-90 transition"
          >
            TAKE ANOTHER TEST
          </Link>
          <Link
            href="/history"
            className="flex-1 border-2 border-foreground font-black py-4 text-center hover:bg-muted transition"
          >
            VIEW HISTORY
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
