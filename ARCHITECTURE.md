# Architecture

## Tech Stack
- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4, OKLCH colors
- **Database**: MongoDB (optional), localStorage
- **Hosting**: Vercel
- **Analytics**: Vercel Analytics

## Data Flow

### Test Flow
1. User types in input box
2. Real-time WPM calculation
3. Character-by-character comparison
4. Results saved to localStorage
5. Optional sync to MongoDB
6. Profile stats updated
7. Leaderboard refreshed

### Storage
- **localStorage**: Client-side persistence
- **MongoDB**: Cloud sync (optional)
- **Keys**: keystrike_results, keystrike_profile

## Components

### Pages
- `/` - Landing page
- `/test` - Typing test
- `/profile` - User stats
- `/leaderboard` - Rankings
- `/history` - Past tests
- `/stats` - Analytics
- `/challenges` - Daily challenges
- `/tips` - Guides
- `/settings` - Preferences

### Core Components
- `TypingTest` - Main test engine
- `Header` - Navigation
- `Footer` - Branding
- `Leaderboard` - Rankings display

### Utilities
- `typing-utils.ts` - Calculations
- `storage.ts` - Data management
- `mongodb.ts` - Database ops

## Calculations

### WPM
```typescript
WPM = (characters / 5) / (time / 60)
```

### Accuracy
```typescript
Accuracy = (correct / total) * 100
```

### Consistency
```typescript
Consistency = 100 - (stdDev / mean) * 100
```

---

**Contact**: zetfounder@gmail.com
