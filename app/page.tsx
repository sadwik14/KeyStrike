
import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { TestModesSection } from '@/components/test-modes-section';
import { Leaderboard } from '@/components/leaderboard';
import { ResultsDashboard } from '@/components/results-dashboard';
import { QuoteSection } from '@/components/quote-section';
import { Footer } from '@/components/footer';
import React from 'react';

export const metadata = {
  title: 'KeyStrike - Speed Typing Challenge',
  description: 'Test your typing speed with KeyStrike. No signup needed. Free forever.',
};

export default function Home() {
  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'KeyStrike',
    'url': 'https://keystrike.vercel.app/',
    'description': 'Test your typing speed with KeyStrike. No signup needed. Free forever.',
    'publisher': {
      '@type': 'Organization',
      'name': 'ZET-Technologies-Private-Limited',
      'url': 'https://keystrike.vercel.app/'
    },
    'potentialAction': {
      '@type': 'SearchAction',
      'target': 'https://keystrike.vercel.app/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="min-h-screen bg-background">
        <Header />
        <HeroSection />
        <TestModesSection />
        <Leaderboard />
        <ResultsDashboard />
        <QuoteSection />
        <Footer />
      </div>
    </>
  );
}
