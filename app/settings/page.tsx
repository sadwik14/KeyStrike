'use client';

import { useEffect, useState } from 'react';
import { getProfileStats } from '@/lib/storage';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function SettingsPage() {
  const [language, setLanguage] = useState('english');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [difficulty, setDifficulty] = useState('medium');
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const profile = getProfileStats();
    setTheme(profile.theme);
    setLanguage(profile.language);
  }, []);

  const handleSaveSettings = () => {
    localStorage.setItem(
      'keystrike_settings',
      JSON.stringify({
        language,
        theme,
        difficulty,
        soundEnabled,
      })
    );
    alert('Settings saved!');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12 space-y-12">
        {/* Settings Header */}
        <section className="space-y-4">
          <p className="text-xs font-bold text-muted-foreground tracking-widest">
            CUSTOMIZE YOUR EXPERIENCE
          </p>
          <h1 className="text-5xl font-black">SETTINGS</h1>
        </section>

        {/* Language Settings */}
        <section className="space-y-4 border-b border-border pb-8">
          <p className="text-xl font-bold">Language</p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { id: 'english', name: 'English' },
              { id: 'spanish', name: 'Spanish' },
              { id: 'french', name: 'French' },
              { id: 'german', name: 'German' },
              { id: 'portuguese', name: 'Portuguese' },
              { id: 'russian', name: 'Russian' },
            ].map((lang) => (
              <button
                key={lang.id}
                onClick={() => setLanguage(lang.id)}
                className={`border-2 p-4 font-bold transition ${
                  language === lang.id
                    ? 'border-accent bg-yellow-50'
                    : 'border-border hover:bg-muted'
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </section>

        {/* Theme Settings */}
        <section className="space-y-4 border-b border-border pb-8">
          <p className="text-xl font-bold">Theme</p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { id: 'light', name: 'Light' },
              { id: 'dark', name: 'Dark' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id as 'light' | 'dark')}
                className={`border-2 p-4 font-bold transition ${
                  theme === t.id
                    ? 'border-accent bg-yellow-50'
                    : 'border-border hover:bg-muted'
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </section>

        {/* Difficulty Settings */}
        <section className="space-y-4 border-b border-border pb-8">
          <p className="text-xl font-bold">Difficulty Level</p>
          <div className="space-y-3">
            {[
              {
                id: 'easy',
                name: 'Easy',
                desc: 'Common words, simple sentences. Best for beginners.',
              },
              {
                id: 'medium',
                name: 'Medium',
                desc: 'Mixed vocabulary, normal sentences. Standard difficulty.',
              },
              {
                id: 'hard',
                name: 'Hard',
                desc: 'Advanced words, complex sentences. For experts.',
              },
            ].map((diff) => (
              <label
                key={diff.id}
                className={`border-2 p-4 cursor-pointer transition ${
                  difficulty === diff.id
                    ? 'border-accent bg-yellow-50'
                    : 'border-border hover:bg-muted'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="difficulty"
                    value={diff.id}
                    checked={difficulty === diff.id}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-5 h-5"
                  />
                  <div>
                    <p className="font-bold">{diff.name}</p>
                    <p className="text-sm text-muted-foreground">{diff.desc}</p>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </section>

        {/* Sound Settings */}
        <section className="space-y-4 border-b border-border pb-8">
          <p className="text-xl font-bold">Audio Feedback</p>
          <label className="flex items-center gap-4 border-2 border-border p-4 hover:bg-muted cursor-pointer">
            <input
              type="checkbox"
              checked={soundEnabled}
              onChange={(e) => setSoundEnabled(e.target.checked)}
              className="w-5 h-5"
            />
            <div>
              <p className="font-bold">Enable Sound Effects</p>
              <p className="text-sm text-muted-foreground">
                Play sounds on key press and test completion
              </p>
            </div>
          </label>
        </section>

        {/* Data Management */}
        <section className="space-y-4 border-b border-border pb-8">
          <p className="text-xl font-bold">Data Management</p>
          <div className="space-y-3">
            <button className="w-full border-2 border-border p-4 font-bold hover:bg-muted transition">
              DOWNLOAD YOUR DATA
            </button>
            <button
              onClick={() => {
                if (confirm('Are you sure? This cannot be undone.')) {
                  localStorage.clear();
                  alert('All data cleared');
                  window.location.reload();
                }
              }}
              className="w-full border-2 border-foreground bg-transparent p-4 font-bold hover:bg-muted transition"
            >
              CLEAR ALL DATA
            </button>
          </div>
        </section>

        {/* Save Button */}
        <section className="flex gap-4">
          <button
            onClick={handleSaveSettings}
            className="flex-1 bg-accent text-accent-foreground font-black py-4 hover:opacity-90 transition"
          >
            SAVE SETTINGS
          </button>
          <a
            href="/"
            className="flex-1 border-2 border-foreground font-black py-4 text-center hover:bg-muted transition"
          >
            BACK HOME
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}
