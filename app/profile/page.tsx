'use client';

import { useEffect, useState } from 'react';
import { getProfileStats, updateUsername, getTestHistory } from '@/lib/storage';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Link from 'next/link';

interface UserProfile {
  username: string;
  bestWpm: number;
  averageWpm: number;
  totalTests: number;
  bestAccuracy: number;
  currentStreak: number;
  totalWords: number;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProfile = () => {
      const stats = getProfileStats();
      setProfile(stats as unknown as UserProfile);
      setNewUsername(stats.username);
      setIsLoading(false);
    };

    loadProfile();
    // Refresh when data changes
    window.addEventListener('storage', loadProfile);
    return () => window.removeEventListener('storage', loadProfile);
  }, []);

  const handleSaveUsername = () => {
    if (newUsername.trim()) {
      updateUsername(newUsername.trim());
      if (profile) {
        setProfile({ ...profile, username: newUsername.trim() });
      }
      setIsEditing(false);
    }
  };

  if (isLoading || !profile) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground font-bold">Loading profile...</p>
        </main>
        <Footer />
      </div>
    );
  }

  const stats = [
    { label: 'BEST WPM', value: profile.bestWpm, unit: '' },
    { label: 'AVERAGE WPM', value: profile.averageWpm, unit: '' },
    { label: 'TOTAL TESTS', value: profile.totalTests, unit: '' },
    { label: 'BEST ACCURACY', value: profile.bestAccuracy, unit: '%' },
    { label: 'CURRENT STREAK', value: profile.currentStreak, unit: 'days' },
    { label: 'TOTAL WORDS', value: profile.totalWords, unit: '' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12 space-y-12">
        {/* Back Link */}
        <Link href="/" className="text-accent hover:opacity-70 transition text-sm font-bold">
          ← BACK HOME
        </Link>

        {/* Profile Header */}
        <section className="space-y-6 border-b border-border pb-8">
          <div className="space-y-4">
            <p className="text-xs font-bold text-accent tracking-widest">// YOUR PROFILE</p>
            <div className="flex items-center justify-between">
              <div>
                {isEditing ? (
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      className="text-4xl font-black border-2 border-accent px-4 py-2 bg-white focus:outline-none"
                      placeholder="Enter username"
                      autoFocus
                    />
                    <button
                      onClick={handleSaveUsername}
                      className="bg-accent text-accent-foreground px-6 py-2 font-bold hover:opacity-90 transition"
                    >
                      SAVE
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setNewUsername(profile.username);
                      }}
                      className="border-2 border-foreground px-6 py-2 font-bold hover:bg-muted transition"
                    >
                      CANCEL
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <h1 className="text-5xl md:text-6xl font-black tracking-tighter">{profile.username}</h1>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-foreground text-background px-4 py-2 font-bold hover:opacity-90 transition text-sm"
                    >
                      EDIT
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="space-y-6">
          <p className="text-xs font-bold text-accent tracking-widest">// YOUR STATISTICS</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="border-2 border-foreground p-6 hover:bg-muted transition">
                <p className="text-xs font-bold text-muted-foreground tracking-widest mb-3">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-4xl font-black">{stat.value}</p>
                  {stat.unit && <p className="text-sm font-bold text-muted-foreground">{stat.unit}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="space-y-6 border-t border-border pt-8">
          <p className="text-xs font-bold text-accent tracking-widest">// QUICK ACTIONS</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/test"
              className="border-2 border-accent bg-accent text-accent-foreground px-6 py-4 font-bold hover:opacity-90 transition text-center"
            >
              TAKE A TEST
            </Link>
            <Link
              href="/history"
              className="border-2 border-foreground px-6 py-4 font-bold hover:bg-muted transition text-center"
            >
              VIEW HISTORY
            </Link>
            <Link
              href="/stats"
              className="border-2 border-foreground px-6 py-4 font-bold hover:bg-muted transition text-center"
            >
              DETAILED STATS
            </Link>
          </div>
        </section>

        {/* Achievements Section */}
        {profile.totalTests > 0 && (
          <section className="space-y-6 border-t border-border pt-8">
            <p className="text-xs font-bold text-accent tracking-widest">// ACHIEVEMENTS</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {profile.totalTests >= 1 && (
                <div className="border-2 border-foreground p-4 text-center">
                  <p className="text-3xl mb-2">🏃</p>
                  <p className="text-xs font-bold">First Test</p>
                </div>
              )}
              {profile.bestWpm >= 50 && (
                <div className="border-2 border-accent p-4 text-center bg-yellow-50">
                  <p className="text-3xl mb-2">⚡</p>
                  <p className="text-xs font-bold">50+ WPM</p>
                </div>
              )}
              {profile.totalTests >= 10 && (
                <div className="border-2 border-foreground p-4 text-center">
                  <p className="text-3xl mb-2">📈</p>
                  <p className="text-xs font-bold">10 Tests</p>
                </div>
              )}
              {profile.currentStreak >= 7 && (
                <div className="border-2 border-accent p-4 text-center bg-yellow-50">
                  <p className="text-3xl mb-2">🔥</p>
                  <p className="text-xs font-bold">7 Day Streak</p>
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
