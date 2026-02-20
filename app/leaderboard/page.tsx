'use client';

import { useEffect, useState } from 'react';
import { getTestHistory, getProfileStats } from '@/lib/storage';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Link from 'next/link';

interface LeaderboardEntry {
  rank: number;
  username: string;
  wpm: number;
  accuracy: number;
  date: string;
  consistency: number;
}

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState<'all' | 'week' | 'month'>('all');
  const [sortBy, setSortBy] = useState<'wpm' | 'accuracy' | 'consistency'>('wpm');

  useEffect(() => {
    const loadLeaderboard = () => {
      const results = getTestHistory(500);
      const profile = getProfileStats();

      if (results.length === 0) {
        setEntries([]);
        setFilteredEntries([]);
        setIsLoading(false);
        return;
      }

      // Filter by time period
      const now = Date.now();
      const filtered = results.filter((result) => {
        const daysDiff = (now - result.date) / (1000 * 60 * 60 * 24);
        if (timeFilter === 'week') return daysDiff <= 7;
        if (timeFilter === 'month') return daysDiff <= 30;
        return true;
      });

      // Sort by selected metric
      const sorted = [...filtered].sort((a, b) => {
        if (sortBy === 'wpm') return b.wpm - a.wpm;
        if (sortBy === 'accuracy') return b.accuracy - a.accuracy;
        return b.consistency - a.consistency;
      });

      // Create leaderboard entries (group by unique scores)
      const uniqueEntries = new Map<string, LeaderboardEntry>();
      sorted.forEach((result, idx) => {
        const key = `${result.wpm}-${result.accuracy}`;
        if (!uniqueEntries.has(key)) {
          uniqueEntries.set(key, {
            rank: uniqueEntries.size + 1,
            username: profile.username,
            wpm: result.wpm,
            accuracy: result.accuracy,
            consistency: result.consistency,
            date: new Date(result.date).toLocaleDateString(),
          });
        }
      });

      const leaderboard = Array.from(uniqueEntries.values()).slice(0, 100);
      setEntries(leaderboard);
      setFilteredEntries(leaderboard);
      setIsLoading(false);
    };

    loadLeaderboard();
    window.addEventListener('storage', loadLeaderboard);
    return () => window.removeEventListener('storage', loadLeaderboard);
  }, []);

  // Re-filter when filters change
  useEffect(() => {
    const now = Date.now();
    const results = getTestHistory(500);
    const profile = getProfileStats();

    let filtered = results.filter((result) => {
      const daysDiff = (now - result.date) / (1000 * 60 * 60 * 24);
      if (timeFilter === 'week') return daysDiff <= 7;
      if (timeFilter === 'month') return daysDiff <= 30;
      return true;
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'wpm') return b.wpm - a.wpm;
      if (sortBy === 'accuracy') return b.accuracy - a.accuracy;
      return b.consistency - a.consistency;
    });

    const uniqueEntries = new Map<string, LeaderboardEntry>();
    sorted.forEach((result, idx) => {
      const key = `${result.wpm}-${result.accuracy}`;
      if (!uniqueEntries.has(key)) {
        uniqueEntries.set(key, {
          rank: uniqueEntries.size + 1,
          username: profile.username,
          wpm: result.wpm,
          accuracy: result.accuracy,
          consistency: result.consistency,
          date: new Date(result.date).toLocaleDateString(),
        });
      }
    });

    setFilteredEntries(Array.from(uniqueEntries.values()).slice(0, 100));
  }, [timeFilter, sortBy]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12 space-y-12">
        {/* Back Link */}
        <Link href="/" className="text-accent hover:opacity-70 transition text-sm font-bold">
          ← BACK HOME
        </Link>

        {/* Page Title */}
        <section className="space-y-4">
          <p className="text-xs font-bold text-accent tracking-widest">// GLOBAL RANKINGS</p>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter">
            THE FASTEST
            <br />
            <span className="text-accent">FINGERS</span> ALIVE.
          </h1>
          <p className="text-base text-muted-foreground max-w-xl">
            See how you stack up against other typists. Sort by WPM, accuracy, or consistency. Filter by time period to see the best performers.
          </p>
        </section>

        {/* Filters */}
        <section className="space-y-4 border-t border-border pt-8">
          <p className="text-xs font-bold text-muted-foreground tracking-widest">// FILTERS</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Time Filter */}
            <div className="space-y-3">
              <label className="text-xs font-bold tracking-widest">TIME PERIOD</label>
              <div className="flex gap-2">
                {(['all', 'week', 'month'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setTimeFilter(filter)}
                    className={`px-4 py-2 text-xs font-bold transition ${
                      timeFilter === filter
                        ? 'bg-accent text-accent-foreground'
                        : 'border-2 border-foreground hover:bg-muted'
                    }`}
                  >
                    {filter === 'all' ? 'ALL TIME' : filter === 'week' ? 'THIS WEEK' : 'THIS MONTH'}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Filter */}
            <div className="space-y-3">
              <label className="text-xs font-bold tracking-widest">SORT BY</label>
              <div className="flex gap-2">
                {(['wpm', 'accuracy', 'consistency'] as const).map((sort) => (
                  <button
                    key={sort}
                    onClick={() => setSortBy(sort)}
                    className={`px-4 py-2 text-xs font-bold transition ${
                      sortBy === sort
                        ? 'bg-accent text-accent-foreground'
                        : 'border-2 border-foreground hover:bg-muted'
                    }`}
                  >
                    {sort.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Leaderboard Table */}
        <section className="space-y-6 border-t border-border pt-8">
          {isLoading ? (
            <p className="text-center text-muted-foreground font-bold py-12">Loading leaderboard...</p>
          ) : filteredEntries.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-border p-8">
              <p className="text-muted-foreground font-bold mb-4">No results yet in this time period.</p>
              <Link
                href="/test"
                className="inline-block bg-accent text-accent-foreground px-6 py-3 font-bold hover:opacity-90"
              >
                TAKE A TEST →
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-foreground">
                    <th className="text-left px-4 py-4 text-xs font-bold tracking-widest text-muted-foreground">RANK</th>
                    <th className="text-left px-4 py-4 text-xs font-bold tracking-widest text-muted-foreground">TYPIST</th>
                    <th className="text-right px-4 py-4 text-xs font-bold tracking-widest text-muted-foreground">WPM</th>
                    <th className="text-right px-4 py-4 text-xs font-bold tracking-widest text-muted-foreground">ACCURACY</th>
                    <th className="text-right px-4 py-4 text-xs font-bold tracking-widest text-muted-foreground">CONSISTENCY</th>
                    <th className="text-right px-4 py-4 text-xs font-bold tracking-widest text-muted-foreground">DATE</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEntries.map((entry, idx) => (
                    <tr
                      key={idx}
                      className={`border-b border-border hover:bg-muted transition ${idx % 2 === 0 ? 'bg-white' : 'bg-muted/50'}`}
                    >
                      <td className="px-4 py-4 font-black text-lg text-accent">
                        {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : entry.rank}
                      </td>
                      <td className="px-4 py-4 font-semibold">{entry.username}</td>
                      <td className="px-4 py-4 text-right font-black text-lg text-accent">{entry.wpm}</td>
                      <td className="px-4 py-4 text-right font-bold">{entry.accuracy}%</td>
                      <td className="px-4 py-4 text-right font-bold">{entry.consistency}%</td>
                      <td className="px-4 py-4 text-right text-sm text-muted-foreground">{entry.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
