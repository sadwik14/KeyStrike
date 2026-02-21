# KeyStrike - Quick Start Guide

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)

**Built by**: [ZET-Technologies-Private-Limited](mailto:zetfounder@gmail.com)  
**Contact**: zetfounder@gmail.com  
**© 2026 KeyStrike. All rights reserved.**

---

## Table of Contents
- [What is KeyStrike?](#what-is-keystrike)
- [Getting Started](#getting-started-5-minutes)
- [Features](#features)
- [How Results Are Calculated](#how-results-are-calculated)
- [MongoDB Setup](#mongodb-setup-optional)
- [Troubleshooting](#troubleshooting)
- [FAQ](#faq)

---

A **professional typing speed test platform** with real-time WPM tracking, accuracy metrics, and global leaderboards.

**Built by**: ZET-Technologies-Private-Limited  
**Contact**: zetfounder@gmail.com  
**License**: © 2026 KeyStrike. All rights reserved.

## Getting Started (5 minutes)

### 1. Install & Run

```bash
# Clone or download the project
cd keystrike

# Install dependencies
npm install

# Start dev server
npm run dev

# Open http://localhost:3000
```

### 2. Take Your First Test

1. Click **"START TEST"** button
2. You'll see a **VERY VISIBLE orange input box** at the top
3. **Click the input box** and start typing
4. Match the text below to measure your WPM
5. Test automatically ends when timer runs out
6. **Results saved automatically** to your browser

### 3. Check Your Profile

- Go to **Profile** page
- See your **Best WPM, Average WPM, Total Tests, Accuracy**
- View your **current streak** (consecutive days testing)
- Edit your username
- See your achievements

### 4. View Leaderboard

- Check **Leaderboard** page
- Filter by **time period** (All Time, This Week, This Month)
- Sort by **WPM, Accuracy, or Consistency**
- See where you rank

## Features

### Core Features
- ✅ Speed typing tests (15s, 30s, 60s modes)
- ✅ Real-time WPM calculation
- ✅ Character-by-character accuracy tracking
- ✅ Consistency scoring
- ✅ Error counting
- ✅ Day streak calculation
- ✅ Personal statistics dashboard
- ✅ Global leaderboard

### Data Storage
- **Local Storage**: Default (no database needed)
- **MongoDB**: Optional (add `MONGODB_URI` env var)
- **Auto-save**: Results save when test completes
- **Persistent**: Data available across sessions

### Pages

| Page | Purpose |
|------|---------|
| **Home (/)** | Landing page with intro, stats, leaderboard |
| **Test (/test)** | Main typing test interface |
| **Profile (/profile)** | Your stats, best scores, achievements |
| **Leaderboard (/leaderboard)** | Rankings, filters, sorting |
| **History (/history)** | All past test results |
| **Statistics (/stats)** | Detailed analytics and charts |
| **Challenges (/challenges)** | Daily/weekly challenges |
| **Tips (/tips)** | Typing guides and FAQs |
| **Settings (/settings)** | Preferences and configuration |

## How Results Are Calculated

### WPM (Words Per Minute)
```
WPM = (Characters Typed / 5) / Time in Minutes
```
- Standard: divide by 5 since average word = 5 characters
- Calculated in real-time during test

### Accuracy
```
Accuracy = (Correct Characters / Total Characters) × 100%
```
- Green: correct character
- Red background: incorrect character
- Shows character-by-character feedback

### Consistency
```
Consistency = 100 - (WPM Variance over time)
```
- Measures stability of your typing speed
- Higher = more stable typing
- Shows how consistent you are throughout test

### Day Streak
```
Consecutive days with at least 1 test
```
- Resets if you miss a day
- Calculated 00:00 UTC
- View in Profile page

## Understanding the UI

### Input Box (Very Visible!)
- **Orange border, large text field**
- **Location**: Top of typing test page
- **Says**: "CLICK HERE TO TYPE"
- **Pulsing indicator**: Shows it's active

### Text Display
- **Below input box**
- Green text = correct characters
- Red background = mistakes
- Cursor shows current position

### Stats Bar
- **Real-time WPM, Accuracy, Consistency**
- **Time remaining** countdown
- **Live progress** bar

## Color Scheme

| Color | Meaning |
|-------|---------|
| **Orange** | Primary action, highlight, accent |
| **White** | Background, clean spaces |
| **Black** | Text, borders, emphasis |
| **Green** | Correct characters |
| **Red** | Errors, wrong characters |

## Tips for Better Typing

1. **Posture**: Sit upright, feet flat
2. **Hand Position**: Fingers on home row (ASDF + JKL;)
3. **Wrist Straight**: Avoid bending wrists
4. **Relax**: Tension decreases speed
5. **Accuracy First**: Speed comes naturally
6. **Practice Daily**: Build muscle memory
7. **Use All Fingers**: Improve efficiency

## MongoDB Setup (Optional)

To enable database storage:

1. Get MongoDB URI from [mongodb.com](https://www.mongodb.com)
2. Add to `.env.local`:
   ```
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/keystrike
   ```
3. Restart dev server
4. Data now syncs to MongoDB automatically

See `MONGODB_SETUP.md` for details.

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Enter` | Start test (from home) |
| `Esc` | Reset current test |
| `Space` | Submit result comment |

## Troubleshooting

### "Input box not visible"
- Scroll to top of page
- Refresh browser (F5)
- Check browser zoom level (100%)

### "Results not saving"
- Check browser localStorage is enabled
- Try private/incognito mode
- Clear cache if data seems stuck

### "Streak not updating"
- Wait until next day (UTC)
- Must have at least 1 test
- Check profile page loads

### "WPM seems wrong"
- Verify timer is counting correctly
- Check accuracy % is reasonable
- Try another test to confirm

## Contact & Support

**Email**: zetfounder@gmail.com  
**Company**: ZET-Technologies-Private-Limited  
**Website**: keystrike.app

## FAQ

**Q: Is my data private?**  
A: Yes. With localStorage, data stays in your browser. With MongoDB, it goes to your private cluster.

**Q: Can I reset my stats?**  
A: Yes, clear browser data (Settings > Privacy) or contact support.

**Q: Why 5 characters = 1 word?**  
A: Industry standard for typing tests. Allows fair comparison.

**Q: Can I use the same browser on multiple devices?**  
A: Each browser/device has separate localStorage. Use MongoDB to sync across devices.

**Q: How often are leaderboards updated?**  
A: Real-time. Updates as tests are taken.

**Q: What's the fastest possible WPM?**  
A: World record is ~240 WPM. Competitive typists average 80-150 WPM.

---

**Ready to test your speed?** Click **START TEST** and begin typing! 🚀
