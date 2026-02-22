'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Link from 'next/link';

export default function ChallengesPage() {
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);

  const challenges = [
    {
      id: 'daily',
      name: 'Daily Challenge',
      description: 'New challenge every day. Beat yesterday\'s score.',
      difficulty: 'Medium',
      reward: '50 XP',
      icon: '📅',
      tests: 5,
      timeLimit: '5 min',
    },
    {
      id: 'speed-demon',
      name: 'Speed Demon',
      description: 'Type as fast as possible. Accuracy matters less.',
      difficulty: 'Hard',
      reward: '75 XP',
      icon: '⚡',
      tests: 10,
      timeLimit: 'Unlimited',
    },
    {
      id: 'accuracy-master',
      name: 'Accuracy Master',
      description: 'Hit 100% accuracy. Speed is secondary.',
      difficulty: 'Hard',
      reward: '100 XP',
      icon: '🎯',
      tests: 15,
      timeLimit: 'No Timer',
    },
    {
      id: 'consistency',
      name: 'Consistency Check',
      description: 'Stay consistent across 10 tests. Low variance wins.',
      difficulty: 'Medium',
      reward: '60 XP',
      icon: '📊',
      tests: 10,
      timeLimit: '30 sec each',
    },
    {
      id: 'marathon',
      name: 'The Marathon',
      description: 'Type for 10 minutes straight. Endurance test.',
      difficulty: 'Hard',
      reward: '150 XP',
      icon: '🏃',
      tests: 1,
      timeLimit: '10 min',
    },
    {
      id: 'polyglot',
      name: 'Polyglot Pro',
      description: 'Type in 3 different languages. Master them all.',
      difficulty: 'Expert',
      reward: '200 XP',
      icon: '🌍',
      tests: 15,
      timeLimit: '5 min',
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12 space-y-12">
        {/* Header */}
        <section className="space-y-4">
          <p className="text-xs font-bold text-accent tracking-widest">
            SPECIAL EVENTS
          </p>
          <h1 className="text-5xl font-black">DAILY CHALLENGES</h1>
          <p className="text-muted-foreground max-w-2xl">
            Test yourself in new ways. Complete challenges, earn XP, and unlock badges. New challenges every day.
          </p>
        </section>

        {/* Challenges Grid */}
        <section className="grid md:grid-cols-2 gap-6">
          {challenges.map((challenge) => (
            <div
              key={challenge.id}
              className="border-2 border-foreground p-6 space-y-4 hover:bg-muted transition cursor-pointer"
              onClick={() => setSelectedChallenge(challenge.id)}
            >
              <div className="flex items-start justify-between">
                <div className="text-5xl">{challenge.icon}</div>
                <span className="bg-accent text-accent-foreground px-3 py-1 text-xs font-bold">
                  {challenge.reward}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black">{challenge.name}</h3>
                <p className="text-sm text-muted-foreground">{challenge.description}</p>
              </div>

              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-muted-foreground">
                  {challenge.tests} tests • {challenge.timeLimit}
                </span>
                <span className={`px-3 py-1 ${
                  challenge.difficulty === 'Easy'
                    ? 'bg-green-100 text-green-900'
                    : challenge.difficulty === 'Medium'
                    ? 'bg-yellow-100 text-yellow-900'
                    : challenge.difficulty === 'Hard'
                    ? 'bg-orange-100 text-orange-900'
                    : 'bg-red-100 text-red-900'
                }`}>
                  {challenge.difficulty}
                </span>
              </div>

              <Link
                href={`/test?challenge=${challenge.id}`}
                className="block w-full bg-foreground text-background font-bold py-3 text-center hover:opacity-90 transition"
                onClick={(e) => e.stopPropagation()}
              >
                START CHALLENGE
              </Link>
            </div>
          ))}
        </section>

        {/* Leaderboard Section */}
        <section className="border-t border-border pt-12 space-y-6">
          <div>
            <p className="text-xs font-bold text-accent tracking-widest mb-2">
              CHALLENGE LEADERBOARD
            </p>
            <h2 className="text-3xl font-black">This Week's Leaders</h2>
          </div>

          <div className="border-2 border-foreground overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-foreground bg-muted">
                  <th className="px-6 py-3 text-left text-xs font-bold text-muted-foreground tracking-widest">
                    RANK
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-muted-foreground tracking-widest">
                    PLAYER
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-muted-foreground tracking-widest">
                    XP EARNED
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-muted-foreground tracking-widest">
                    CHALLENGES
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { rank: 1, name: 'Complete a challenge!', xp: 0, challenges: 0 },
                  { rank: 2, name: 'Start typing now', xp: 0, challenges: 0 },
                  { rank: 3, name: 'You can be here', xp: 0, challenges: 0 },
                ].map((entry, idx) => (
                  <tr key={entry.rank} className={idx % 2 === 0 ? 'bg-white' : 'bg-muted'}>
                    <td className="px-6 py-4 font-black text-lg">
                      {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉'}
                    </td>
                    <td className="px-6 py-4 font-bold">{entry.name}</td>
                    <td className="px-6 py-4 font-black text-accent">{entry.xp}</td>
                    <td className="px-6 py-4 font-bold">{entry.challenges}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Action Button */}
        <section>
          <Link
            href="/test"
            className="block w-full bg-accent text-accent-foreground font-black py-4 text-center hover:opacity-90 transition"
          >
            START TYPING NOW
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
