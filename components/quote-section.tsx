'use client';

export function QuoteSection() {
  return (
    <section className="bg-foreground text-accent-foreground py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4">
        <blockquote className="space-y-6">
          <p className="text-3xl md:text-5xl font-serif leading-tight">
            "Speed is not about moving fast — it's about{' '}
            <span className="text-accent italic">eliminating hesitation</span>. Every keystroke
            is a decision. Make it reflexive."
          </p>

          <footer className="text-sm font-bold tracking-widest">
            – KZERO_X · WORLD RANK #1 · 247 WPM
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
