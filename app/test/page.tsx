"use client";

import Link from 'next/link';
import { Header } from '@/components/header';
import { TypingTest } from '@/components/typing-test';
import { Footer } from '@/components/footer';
import { useSearchParams } from 'next/navigation';

export const metadata = {
  title: 'KeyStrike Test - Speed Typing Challenge',
  description: 'Take the KeyStrike typing speed test. Measure your WPM, accuracy, and consistency.',
};

export default function TestPage() {
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const challenge = searchParams ? searchParams.get('challenge') : null;
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        <div className="mb-8">
          <Link href="/" className="text-accent hover:opacity-70 transition text-sm font-bold">
            ← BACK HOME
          </Link>
        </div>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
            SPEED TYPING
            <br />
            <span className="text-accent">CHALLENGE</span> TEST.
          </h1>
          <p className="text-base text-muted-foreground max-w-lg">
            Test your raw typing speed with random words and sentences. No login. No credit card. Just type. Your results are saved automatically.
          </p>
        </div>

        <div className="border-t border-border pt-8">
          <TypingTest challenge={challenge} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
