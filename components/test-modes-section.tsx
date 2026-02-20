'use client';

import { TEST_MODES } from '@/lib/typing-utils';
import Link from 'next/link';

export function TestModesSection() {
  return (
    <section className="bg-background py-16 md:py-24 border-b border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <p className="text-xs font-bold text-accent mb-2 tracking-widest">
              // TEST MODES
            </p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter">
              CHOOSE YOUR
              <br />
              ARENA.
            </h2>
          </div>

          <Link
            href="/test"
            className="mt-8 md:mt-0 bg-foreground text-background px-6 py-2 font-bold hover:opacity-90 transition text-sm"
          >
            ALL MODES →
          </Link>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {TEST_MODES.map((mode, idx) => (
            <div
              key={mode.id}
              className="bg-background p-8 md:p-10 space-y-4 hover:bg-muted transition"
            >
              {/* Counter */}
              <div className="text-5xl md:text-6xl font-black text-muted opacity-40">
                {String(idx + 1).padStart(2, '0')}
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-black tracking-tight">
                {mode.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {mode.description}
              </p>

              {/* Badge */}
              <div className="inline-block border border-border px-3 py-1 text-xs font-bold tracking-widest text-muted-foreground">
                {mode.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
