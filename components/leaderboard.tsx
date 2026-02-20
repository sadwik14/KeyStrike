'use client';

import React, { useEffect, useState } from 'react';
import { getTestHistory, getProfileStats } from '@/lib/storage';
import Link from 'next/link';

interface LeaderboardEntry {
  rank: number;
  username: string;
  wpm: number;
  accuracy: number;
}

export function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadLeaderboard = () => {
      const results = getTestHistory(100);
      const profile = getProfileStats();

      if (results.length === 0) {
        setEntries([]);
      } else {
        // Get top results sorted by WPM
        const topResults = results
          .sort((a, b) => b.wpm - a.wpm)
          .slice(0, 4)
          .map((result, idx) => ({
            rank: idx + 1,
            username: profile.username,
            wpm: result.wpm,
            accuracy: result.accuracy,
          }));

        setEntries(topResults);
      }

      setIsLoading(false);
    };

    loadLeaderboard();
    // Listen for storage changes to update in real-time
    window.addEventListener('storage', loadLeaderboard);
    return () => window.removeEventListener('storage', loadLeaderboard);
  }, []);

  if (isLoading) return null;

  return (
    <section className="bg-background py-16 md:py-24 border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Rankings */}
          <div>
            <p className="text-xs font-bold text-accent mb-4 tracking-widest">
              // GLOBAL RANKINGS
            </p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-8">
              THE FASTEST
              <br />
              FINGERS ALIVE.
            </h2>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Updated live. Track your performance across all typing tests. Accuracy and consistency matter as much as speed.
            </p>

            <Link
              href="/leaderboard"
              className="inline-block mt-6 bg-foreground text-background px-6 py-3 font-bold hover:opacity-90 transition"
            >
              VIEW FULL LEADERBOARD →
            </Link>
          </div>

          {/* Leaderboard Table */}
          <div className="space-y-4">
            {/* Header Row */}
            <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b-2 border-foreground text-xs font-bold tracking-widest text-muted-foreground">
              <div className="col-span-1">#</div>
              <div className="col-span-5">TYPIST</div>
              <div className="col-span-3">WPM</div>
              <div className="col-span-3">ACC</div>
            </div>

            {/* Data Rows */}
            {entries.length > 0 ? (
              entries.map((entry, idx) => (
                <div
                  key={entry.rank}
                  className={`grid grid-cols-12 gap-4 px-4 py-4 border-b border-border hover:bg-muted transition ${
                    idx % 2 === 0 ? 'bg-white' : 'bg-muted/50'
                  }`}
                >
                  <div className="col-span-1 text-accent font-black text-lg">
                    {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : entry.rank}
                  </div>
                  <div className="col-span-5 font-semibold text-sm">{entry.username}</div>
                  <div className="col-span-3 font-black text-lg text-accent">{entry.wpm}</div>
                  <div className="col-span-3 text-sm font-bold">{entry.accuracy}%</div>
                </div>
              ))
            ) : (
              <div className="col-span-12 text-center py-8 text-muted-foreground border-b border-border">
                <p className="text-sm font-bold mb-2">No test results yet</p>
                <p className="text-xs">Take your first test to appear on the leaderboard</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
