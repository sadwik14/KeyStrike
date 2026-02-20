'use client';

import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="min-h-screen bg-background grid md:grid-cols-2 border-b border-border">
      {/* Left Side */}
      <div className="flex flex-col justify-center p-8 md:p-16 bg-gradient-to-br from-background to-muted">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight text-pretty">
            READY TO <br />
            <span className="text-accent">BREAK</span>
            <br />
            RECORDS?
          </h1>

          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            No account required to start.
            <br />
            Join 148,000+ typists today.
          </p>

          <div className="w-3 h-3 bg-accent"></div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col justify-center items-center p-8 md:p-16 bg-accent text-accent-foreground relative overflow-hidden">
        <div className="text-center space-y-8 relative z-10">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
            FREE. FOREVER.
            <br />
            NO SIGNUP.
          </h2>

          <p className="text-sm md:text-base max-w-md mx-auto leading-relaxed opacity-95">
            Your first test starts in 3 seconds. No login. No credit card. Just type.
          </p>

          <Link
            href="/test"
            className="inline-block bg-accent-foreground text-accent font-black px-8 py-4 hover:opacity-90 transition text-sm tracking-wide"
          >
            LAUNCH TEST →
          </Link>
        </div>

        {/* Background decorative element */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full border border-current"></div>
        </div>
      </div>
    </section>
  );
}
