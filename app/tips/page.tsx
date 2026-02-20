'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Link from 'next/link';

export default function TipsPage() {
  const tips = [
    {
      title: 'Proper Hand Positioning',
      description: 'Keep your fingers on the home row (ASDF for left hand, JKL; for right hand). This is the foundation of touch typing.',
      tips: [
        'Left fingers: A, S, D, F (pinky, ring, middle, index)',
        'Right fingers: J, K, L, ; (index, middle, ring, pinky)',
        'Thumb: Spacebar',
        'Your fingertips should touch the keyboard to avoid looking down',
      ],
    },
    {
      title: 'Finger Technique',
      description: 'Use your fingers, not your arms. Each finger should be responsible for specific keys.',
      tips: [
        'Keep your wrists straight and elevated',
        'Move only your fingers, not your whole hand',
        'Develop muscle memory for each key',
        'Avoid looking at the keyboard - trust your fingers',
      ],
    },
    {
      title: 'Speed Development',
      description: 'Speed comes naturally when accuracy is perfected. Focus on accuracy first.',
      tips: [
        'Never sacrifice accuracy for speed',
        'Speed will increase gradually as muscle memory builds',
        'Start with 30-60 second tests to build confidence',
        'Practice regularly - even 15 minutes daily helps',
      ],
    },
    {
      title: 'Accuracy First',
      description: 'A faster typer with errors is less productive than a slower accurate typer.',
      tips: [
        'Aim for 95%+ accuracy before increasing speed',
        'Slow down when you\'re making mistakes',
        'Learn from your errors - what keys trip you up?',
        'Accuracy builds confidence and speed naturally',
      ],
    },
    {
      title: 'Consistency Tips',
      description: 'Maintaining consistent performance across tests shows real improvement.',
      tips: [
        'Warm up with 1-2 easy tests before intense typing',
        'Take breaks to avoid fatigue',
        'Stay hydrated and maintain good posture',
        'Track your consistency metrics to identify patterns',
      ],
    },
    {
      title: 'Advanced Techniques',
      description: 'Once you\'ve mastered the basics, these techniques can boost your performance.',
      tips: [
        'Use keyboard shortcuts to keep hands on the keyboard',
        'Practice with different keyboard layouts (DVORAK, Colemak)',
        'Try typing with different hand positions to find what\'s comfortable',
        'Record yourself to identify bad habits',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12 space-y-12">
        {/* Header */}
        <section className="space-y-4">
          <p className="text-xs font-bold text-accent tracking-widest">
            IMPROVE YOUR SKILLS
          </p>
          <h1 className="text-5xl font-black">Typing Tips & Guides</h1>
          <p className="text-muted-foreground max-w-2xl">
            Master the art of speed typing with expert tips and techniques. From beginner to advanced, here's everything you need to know.
          </p>
        </section>

        {/* Tips Grid */}
        <section className="space-y-6">
          {tips.map((tip, idx) => (
            <div key={idx} className="border-2 border-foreground p-8 space-y-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-black">{tip.title}</h2>
                <p className="text-muted-foreground">{tip.description}</p>
              </div>

              <ul className="space-y-3 border-t border-border pt-4">
                {tip.tips.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex gap-4">
                    <span className="text-accent font-black flex-shrink-0">✓</span>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* FAQ Section */}
        <section className="border-t border-border pt-12 space-y-6">
          <div>
            <p className="text-xs font-bold text-accent tracking-widest mb-2">
              FREQUENTLY ASKED
            </p>
            <h2 className="text-3xl font-black">Common Questions</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'How long does it take to become a fast typist?',
                a: 'With consistent practice (20-30 minutes daily), most people can reach 60+ WPM within 3-6 months. Advanced speeds (100+ WPM) take 1-2 years.',
              },
              {
                q: 'Should I look at the keyboard while typing?',
                a: 'No. Looking at the keyboard defeats the purpose of touch typing. Keep your eyes on the screen and trust your muscle memory.',
              },
              {
                q: 'What\'s a good typing speed?',
                a: 'Average typing speed is 40 WPM. Good is 60-80 WPM. Excellent is 100+ WPM. Professional typists often exceed 120 WPM.',
              },
              {
                q: 'How important is accuracy?',
                a: 'Very important. A typo requires 2-3 extra keystrokes to fix. Aim for 95%+ accuracy before focusing on speed.',
              },
              {
                q: 'Which keyboard layout is best?',
                a: 'QWERTY is the most common, but DVORAK and Colemak can be faster for some. Stick with QWERTY unless you have specific reasons to switch.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="border-2 border-border p-6 space-y-3">
                <p className="font-bold text-lg">{faq.q}</p>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="space-y-4">
          <div className="border-2 border-accent bg-yellow-50 p-8 space-y-4">
            <h3 className="text-2xl font-black">Ready to Practice?</h3>
            <p className="text-muted-foreground">
              Apply these tips in real tests. Track your improvement and watch your speed soar.
            </p>
            <Link
              href="/test"
              className="block w-full bg-accent text-accent-foreground font-black py-4 text-center hover:opacity-90 transition"
            >
              START A TEST NOW
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
