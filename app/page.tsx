import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { TestModesSection } from '@/components/test-modes-section';
import { Leaderboard } from '@/components/leaderboard';
import { ResultsDashboard } from '@/components/results-dashboard';
import { QuoteSection } from '@/components/quote-section';
import { Footer } from '@/components/footer';

export const metadata = {
  title: 'KeyStrike - Speed Typing Challenge',
  description: 'Test your typing speed with KeyStrike. No signup needed. Free forever.',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <TestModesSection />
      <Leaderboard />
      <ResultsDashboard />
      <QuoteSection />
      <Footer />
    </div>
  );
}
