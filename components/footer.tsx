'use client';

import { useEffect, useState } from 'react';
import { getTestHistory, getProfileStats } from '@/lib/storage';

export function Footer() {
  const [liveTests, setLiveTests] = useState(0);
  const [totalWords, setTotalWords] = useState(0);

  useEffect(() => {
    const results = getTestHistory(1000);
    const profile = getProfileStats();

    setLiveTests(results.length);
    setTotalWords(profile.totalWords);
  }, []);

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Brand */}
          <div>
            <div className="text-2xl font-black tracking-tight mb-3">
              KEY<span className="text-accent">STRIKE</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The ultimate typing speed test platform. Challenge yourself and compete globally with real-time WPM tracking and accuracy metrics.
            </p>
          </div>

          {/* Company Info */}
          <div>
            <p className="text-xs font-bold text-accent tracking-widest mb-3">COMPANY</p>
            <div className="space-y-2 text-xs text-muted-foreground">
              <p>ZET-Technologies-Private-Limited</p>
              <p>© 2024 KeyStrike. All rights reserved.</p>
              <a href="mailto:zetfounder@gmail.com" className="hover:text-accent transition block">
                Contact: zetfounder@gmail.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-xs font-bold text-accent tracking-widest mb-3">LINKS</p>
            <div className="space-y-2 text-xs">
              <a href="/" className="block hover:text-accent transition">
                Home
              </a>
              <a href="/test" className="block hover:text-accent transition">
                Take Test
              </a>
              <a href="/leaderboard" className="block hover:text-accent transition">
                Leaderboard
              </a>
              <a href="/tips" className="block hover:text-accent transition">
                Tips & Guides
              </a>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="border-t border-b border-border py-6 my-8">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl md:text-3xl font-black text-accent">{liveTests}</p>
              <p className="text-xs text-muted-foreground tracking-widest">TESTS TAKEN</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-black text-accent">{totalWords}</p>
              <p className="text-xs text-muted-foreground tracking-widest">WORDS TYPED</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-black text-accent">2024</p>
              <p className="text-xs text-muted-foreground tracking-widest">SINCE LAUNCH</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>
            KeyStrike © 2024 · Powered by{' '}
            <span className="font-semibold text-foreground">ZET-Technologies-Private-Limited</span>
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-accent transition">
              Privacy
            </a>
            <a href="#" className="hover:text-accent transition">
              Terms
            </a>
            <a href="mailto:zetfounder@gmail.com" className="hover:text-accent transition">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
