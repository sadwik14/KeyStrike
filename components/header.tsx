'use client';

import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-2xl font-black tracking-tight">
            KEY<span className="text-accent">STRIKE</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-5 text-xs font-bold">
          <Link href="/test" className="hover:text-accent transition">
            TEST
          </Link>
          <Link href="/leaderboard" className="hover:text-accent transition">
            LEADERBOARD
          </Link>
          <Link href="/challenges" className="hover:text-accent transition">
            CHALLENGES
          </Link>
          <Link href="/stats" className="hover:text-accent transition">
            STATS
          </Link>
          <Link href="/tips" className="hover:text-accent transition">
            TIPS
          </Link>
          <Link href="/profile" className="hover:text-accent transition">
            PROFILE
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/test"
            className="bg-accent text-accent-foreground px-6 py-2 font-bold hover:opacity-90 transition"
          >
            START TEST
          </Link>
        </div>
      </div>
    </header>
  );
}
