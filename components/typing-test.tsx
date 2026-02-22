'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  calculateWPM,
  calculateAccuracy,
  calculateConsistency,
} from '@/lib/typing-utils';
import { saveTestResult, getProfileStats } from '@/lib/storage';


const CHALLENGE_TEXTS: Record<string, string[]> = {
  daily: [
    'The quick brown fox jumps over the lazy dog. This pangram contains every letter of the English alphabet at least once, making it an ideal sentence for typing tests and font displays.',
    'Every day is a new opportunity to improve your typing speed and accuracy. Consistency is the key to mastery.',
    'Practice makes perfect. Set a daily goal and watch your words per minute soar.'
  ],
  'speed-demon': [
    'Speed is not about moving fast — it is about eliminating hesitation. Every keystroke is a decision. Make it reflexive.',
    'Type as quickly as you can, but remember: accuracy still counts in the end.',
    'Push your limits. The faster you type, the more you learn about your own reflexes.'
  ],
  'accuracy-master': [
    'In the realm of competitive typing, accuracy reigns supreme. A single mistake can cascade into a cascade of failures, testing not just your fingers but your mental fortitude.',
    'Focus on each letter. Precision is more important than speed in this challenge.',
    'Zero errors is the goal. Can you type this entire sentence without a single mistake?'
  ],
  consistency: [
    'Stay consistent across every test. Your average is what matters most.',
    'Keep your WPM steady and your accuracy high for the best results.',
    'Consistency is the secret to long-term improvement in typing.'
  ],
  marathon: [
    'Endurance is tested here. Can you keep up your speed for the full duration?',
    'Ten minutes of typing will push your focus and stamina to the limit.',
    'Marathon challenge: Don’t stop, don’t slow down, just type!'
  ],
  polyglot: [
    'Typing in multiple languages is a true test of skill. Switch your brain and fingers quickly.',
    'Bonjour! Hola! Hello! Can you type this sentence in three languages without error?',
    'Polyglot challenge: Adapt to new words and characters as you type.'
  ],
};



export function TypingTest({ challenge }: { challenge?: string }) {
  // Challenge presets for mode
  const challengeModes: Record<string, '60' | '30' | '15'> = {
    daily: '60',
    'speed-demon': '15',
    'accuracy-master': '30',
    consistency: '30',
    marathon: '60',
    polyglot: '60',
  };
  const modePreset = challenge && challengeModes[challenge] ? challengeModes[challenge] : '60';
  const texts = challenge && CHALLENGE_TEXTS[challenge] ? CHALLENGE_TEXTS[challenge] : CHALLENGE_TEXTS['daily'];
  const [mode, setMode] = useState<'60' | '30' | '15'>(modePreset);
  const [targetText, setTargetText] = useState(texts[Math.floor(Math.random() * texts.length)]);
  const [typedText, setTypedText] = useState('');
  const [timeLeft, setTimeLeft] = useState(parseInt(modePreset));
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [wpmHistory, setWpmHistory] = useState<number[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            setIsActive(false);
            setIsFinished(true);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // Reset when mode or challenge changes
  useEffect(() => {
    let newMode = mode;
    let newTexts = texts;
    if (challenge && challengeModes[challenge]) {
      newMode = challengeModes[challenge];
      newTexts = CHALLENGE_TEXTS[challenge] || CHALLENGE_TEXTS['daily'];
    }
    const newTime = parseInt(newMode);
    setTimeLeft(newTime);
    setTypedText('');
    setIsActive(false);
    setIsFinished(false);
    setWpmHistory([]);
    setTargetText(newTexts[Math.floor(Math.random() * newTexts.length)]);
  }, [mode, challenge]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTypedText(value);

    if (!isActive && !isFinished && value.length > 0) {
      setIsActive(true);
    }

    // Update WPM history every few seconds
    if (isActive && value.length > 0 && value.length % 20 === 0) {
      const currentWpm = calculateWPM(value.length, parseInt(mode) - timeLeft);
      setWpmHistory((prev) => [...prev, currentWpm]);
    }
  };

  const { accuracy, errors } = calculateAccuracy(typedText, targetText);
  const wpm = calculateWPM(typedText.length, parseInt(mode) - timeLeft);
  const consistency =
    wpmHistory.length > 1 ? calculateConsistency(wpmHistory) : 100;

  const progress = (typedText.length / targetText.length) * 100;

  // Save result when test finishes
  useEffect(() => {
    if (isFinished && typedText.length > 0) {
      saveTestResult({
        id: Date.now().toString(),
        date: Date.now(),
        wpm: Math.max(0, wpm),
        accuracy: accuracy,
        duration: parseInt(mode),
        mode: 'time',
        errors: errors,
        consistency: Math.max(0, consistency),
        testType: `${mode}s Sprint`,
      });
    }
  }, [isFinished, typedText, wpm, accuracy, errors, consistency, mode]);

  if (isFinished) {
    return (
      <div className="space-y-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border border-border p-6">
            <p className="text-xs font-bold text-muted-foreground tracking-widest mb-2">
              FINAL WPM
            </p>
            <p className="text-5xl font-black">{Math.max(0, wpm)}</p>
          </div>

          <div className="border border-border p-6">
            <p className="text-xs font-bold text-muted-foreground tracking-widest mb-2">
              ACCURACY
            </p>
            <p className="text-5xl font-black">{accuracy}%</p>
          </div>

          <div className="border border-border p-6">
            <p className="text-xs font-bold text-muted-foreground tracking-widest mb-2">
              CONSISTENCY
            </p>
            <p className="text-5xl font-black">{Math.max(0, consistency)}%</p>
          </div>
        </div>

        <div className="border border-border p-6">
          <p className="text-xs font-bold text-muted-foreground tracking-widest mb-4">
            TEST SUMMARY
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Errors</span>
              <span className="font-bold">{errors}</span>
            </div>
            <div className="flex justify-between">
              <span>Characters Typed</span>
              <span className="font-bold">{typedText.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Time Elapsed</span>
              <span className="font-bold">{parseInt(mode)}s</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            setTypedText('');
            setIsActive(false);
            setIsFinished(false);
            setWpmHistory([]);
            setTimeLeft(parseInt(mode));
            setTargetText(texts[Math.floor(Math.random() * texts.length)]);
            inputRef.current?.focus();
          }}
          className="w-full bg-accent text-accent-foreground font-black py-4 hover:opacity-90 transition"
        >
          TRY AGAIN
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Mode Selector */}
      <div className="flex gap-4 border-b border-border pb-6">
        {(['60', '30', '15'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            disabled={isActive}
            className={`px-6 py-2 font-bold text-sm transition ${
              mode === m
                ? 'bg-foreground text-background'
                : 'border border-border hover:bg-muted'
            }`}
          >
            {m}S
          </button>
        ))}
      </div>

      {/* Timer */}
      <div className="text-center space-y-2">
        <p className="text-xs font-bold text-muted-foreground tracking-widest">
          TIME REMAINING
        </p>
        <p className="text-6xl font-black text-accent">{timeLeft}s</p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="w-full h-1 bg-border">
          <div
            className="h-full bg-accent transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground">{Math.round(progress)}%</p>
      </div>

      {/* INPUT BOX - VERY VISIBLE AND PROMINENT */}
      <div className="space-y-4 order-first border-2 border-accent bg-yellow-50 p-6 rounded-sm">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
          <p className="text-sm font-bold text-accent">CLICK HERE TO TYPE</p>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={typedText}
          onChange={handleInput}
          placeholder="START TYPING HERE..."
          className="w-full bg-white border-2 border-accent px-4 py-4 text-lg font-semibold focus:outline-none text-foreground placeholder:text-accent placeholder:font-bold"
          disabled={isFinished}
          autoFocus
          spellCheck="false"
        />
        <p className="text-xs text-muted-foreground">
          {typedText.length} characters typed
        </p>
      </div>

      {/* Text Display */}
      <div className="space-y-4">
        <p className="text-xs font-bold text-muted-foreground tracking-widest">
          MATCH THE TEXT BELOW
        </p>

        <div className="space-y-4 border-2 border-foreground p-6 bg-muted min-h-40">
          <p className="text-sm leading-relaxed">
            {targetText.split('').map((char, idx) => {
              let className = 'text-foreground';

              if (idx < typedText.length) {
                className =
                  typedText[idx] === char
                    ? 'text-accent font-semibold'
                    : 'bg-accent text-accent-foreground font-semibold';
              } else if (idx === typedText.length) {
                className = 'border-l-2 border-accent text-foreground bg-accent/20';
              }

              return (
                <span key={idx} className={className}>
                  {char}
                </span>
              );
            })}
          </p>
        </div>
      </div>

      {/* Live Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="border border-border p-4">
          <p className="text-xs font-bold text-muted-foreground tracking-widest">WPM</p>
          <p className="text-3xl font-black text-accent">{wpm}</p>
        </div>

        <div className="border border-border p-4">
          <p className="text-xs font-bold text-muted-foreground tracking-widest">ACCURACY</p>
          <p className="text-3xl font-black">{accuracy}%</p>
        </div>

        <div className="border border-border p-4">
          <p className="text-xs font-bold text-muted-foreground tracking-widest">ERRORS</p>
          <p className="text-3xl font-black">{errors}</p>
        </div>
      </div>
    </div>
  );
}
