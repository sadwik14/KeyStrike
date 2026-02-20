'use client';

import React, { useEffect, useState } from 'react';
import { getProfileStats, getTestHistory } from '@/lib/storage';
import Link from 'next/link';

export function ResultsDashboard() {
  const [stats, setStats] = useState({
    wpm: 0,
    accuracy: 0,
    consistency: 0,
    dayStreak: 0,
    totalTests: 0,
  });

  useEffect(() => {
    const loadStats = () => {
      const profile = getProfileStats();
      const results = getTestHistory(50);

      let avgAccuracy = 0;
      let avgConsistency = 0;

      if (results.length > 0) {
        avgAccuracy =
          results.reduce((sum, r) => sum + r.accuracy, 0) / results.length;
        avgConsistency =
          results.reduce((sum, r) => sum + r.consistency, 0) / results.length;
      }

      setStats({
        wpm: profile.bestWpm,
        accuracy: Math.round(avgAccuracy * 10) / 10,
        consistency: Math.round(avgConsistency),
        dayStreak: profile.currentStreak,
        totalTests: profile.totalTests,
      });
    };

    loadStats();
    // Listen for storage changes
    window.addEventListener('storage', loadStats);
    return () => window.removeEventListener('storage', loadStats);
  }, []);

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          {/* Left Side - Main Stats */}
          <div className="space-y-8">
            <div>
              <p className="text-xs font-bold text-accent mb-4 tracking-widest">
                // YOUR PROGRESS
              </p>
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter">
                TRACK EVERY
                <br />
                KEYSTROKE.
              </h2>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Monitor your improvement across all metrics. See patterns, identify weaknesses, and
              watch your skills evolve in real-time.
            </p>
          </div>

          {/* Right Side - Stats Grid */}
          <div className="space-y-4">
            {/* Main WPM Card */}
            <div className="border border-border p-8 space-y-3">
              <div className="text-6xl md:text-7xl font-black">{stats.wpm} WPM</div>
              <p className="text-xs text-muted-foreground tracking-widest font-bold">
                YOUR PERSONAL BEST · THIS MONTH
              </p>

              {/* Progress Bars */}
              <div className="space-y-4 mt-6 pt-6 border-t border-border">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs font-bold text-muted-foreground tracking-widest">
                      SPEED (WPM)
                    </p>
                    <span className="text-sm font-bold">{stats.wpm} / 200</span>
                  </div>
                  <div className="w-full h-1 bg-border">
                    <div
                      className="h-full bg-accent"
                      style={{ width: `${(stats.wpm / 200) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs font-bold text-muted-foreground tracking-widest">
                      ACCURACY
                    </p>
                    <span className="text-sm font-bold">{stats.accuracy}%</span>
                  </div>
                  <div className="w-full h-1 bg-border">
                    <div
                      className="h-full bg-accent"
                      style={{ width: `${stats.accuracy}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs font-bold text-muted-foreground tracking-widest">
                      CONSISTENCY
                    </p>
                    <span className="text-sm font-bold">{stats.consistency}%</span>
                  </div>
                  <div className="w-full h-1 bg-border">
                    <div
                      className="h-full bg-accent"
                      style={{ width: `${stats.consistency}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-border p-4">
                <p className="text-xs font-bold text-muted-foreground tracking-widest mb-2">
                  TOTAL TESTS
                </p>
                <p className="text-3xl font-black">{stats.totalTests}</p>
              </div>

              <div className="border border-border p-4">
                <p className="text-xs font-bold text-muted-foreground tracking-widest mb-2">
                  DAY STREAK
                </p>
                <p className="text-3xl font-black">{stats.dayStreak}</p>
              </div>
            </div>

            <Link
              href="/profile"
              className="block bg-accent text-accent-foreground px-6 py-4 font-black hover:opacity-90 transition text-center"
            >
              VIEW YOUR PROFILE
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
