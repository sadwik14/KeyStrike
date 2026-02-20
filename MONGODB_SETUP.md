# MongoDB Integration Setup Guide

KeyStrike is built with **localStorage as default** (no database needed), but includes full **MongoDB integration** for production use.

## Current State
- **Default**: Uses localStorage (browser storage) - data persists locally
- **Optional**: MongoDB support (for scaling to multiple users)
- **Streak Counting**: Fully implemented and working
- **Real Data**: All stats and leaderboards use real calculated data from test results

## To Enable MongoDB

### 1. Get MongoDB Connection String
- Sign up at [mongodb.com](https://www.mongodb.com)
- Create a cluster
- Get your connection string (looks like: `mongodb+srv://user:pass@cluster.mongodb.net/keystrike`)

### 2. Add Environment Variable
Create a `.env.local` file in the project root:

```env
MONGODB_URI=mongodb+srv://youruser:yourpass@yourcluster.mongodb.net/keystrike
```

### 3. Collections That Will Be Created

The app will automatically use these collections:

```
keystrike (database)
├── users
│   ├── _id (ObjectId)
│   ├── username (String, unique)
│   ├── bestWpm (Number)
│   ├── averageWpm (Number)
│   ├── totalTests (Number)
│   ├── bestAccuracy (Number)
│   ├── currentStreak (Number)
│   ├── totalWords (Number)
│   ├── createdAt (Date)
│   └── updatedAt (Date)
│
└── testResults
    ├── _id (ObjectId)
    ├── userId (String)
    ├── username (String)
    ├── wpm (Number)
    ├── accuracy (Number)
    ├── consistency (Number)
    ├── duration (Number)
    ├── errors (Number)
    ├── mode (String: 'time' | 'words')
    ├── testType (String)
    ├── date (Date)
    └── createdAt (Date)
```

### 4. API Endpoints (Auto-Enabled When MONGODB_URI is Set)

#### POST /api/results
Save a test result to MongoDB
```bash
curl -X POST http://localhost:3000/api/results \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "username": "MyUsername",
    "wpm": 85,
    "accuracy": 96.5,
    "consistency": 88,
    "duration": 60,
    "errors": 3,
    "mode": "time",
    "testType": "60s Sprint"
  }'
```

#### GET /api/results?userId=user123&limit=50
Fetch test results for a user
```bash
curl http://localhost:3000/api/results?userId=user123&limit=50
```

#### PUT /api/profile
Update user profile
```bash
curl -X PUT http://localhost:3000/api/profile \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "username": "NewUsername"
  }'
```

## How It Works

### Without MongoDB (Default)
1. User takes a test
2. Results saved to browser's localStorage
3. Profile page reads from localStorage
4. Leaderboard shows results from localStorage
5. Streak calculated based on test dates in localStorage
6. All data cleared if browser is cleared

### With MongoDB Enabled
1. User takes a test
2. Results saved to localStorage **AND** MongoDB simultaneously
3. Profile page reads from localStorage (fast) and syncs with MongoDB
4. Leaderboard shows results from MongoDB (can include other users' data)
5. Streak calculated server-side for accuracy
6. Data persists across devices and browsers

## Streak Calculation

Streaks are calculated by checking consecutive days with at least one test:

```javascript
// Check if there's a test for each day going back
Today: ✓ (1 test)
Yesterday: ✓ (1 test)
Day before: ✓ (2 tests)
3 days ago: ✗ (no test)
// Streak = 3 days
```

## Environment Variables

```env
# Required for MongoDB
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/keystrike

# Optional
NODE_ENV=development
```

## Testing Locally

1. Start dev server:
```bash
npm run dev
```

2. Take a typing test
3. Check localStorage:
   - Open DevTools (F12)
   - Go to Application > Local Storage
   - Look for keys: `keystrike_results` and `keystrike_profile`

4. If MongoDB is configured:
   - Results are auto-synced to MongoDB
   - Check MongoDB dashboard to see stored data

## Troubleshooting

### "MongoDB not available, using localStorage only"
- MONGODB_URI is not set or invalid
- Check `.env.local` exists and has correct connection string
- Restart dev server after adding env vars

### Results not syncing to MongoDB
- Check network tab in DevTools
- Verify MongoDB connection string is correct
- Check MongoDB firewall allows your IP address

### Streak not calculating correctly
- Clear localStorage and retake tests
- Streaks reset daily at 00:00 UTC
- Need at least 1 test per day to maintain streak

## Production Deployment

When deploying to Vercel/production:

1. Add `MONGODB_URI` to environment variables in your hosting platform
2. No other configuration needed
3. App auto-detects MongoDB and uses it for data persistence

## Architecture

```
App (React Client)
│
├── localStorage (always available)
│   └── Client-side data backup
│
└── API Routes (/api/*)
    └── MongoDB (if MONGODB_URI is set)
        ├── /api/results - Save/fetch test results
        ├── /api/profile - User profile management
        └── Automatic fallback to localStorage
```

## Data Privacy

- **With localStorage**: All data stays in user's browser
- **With MongoDB**: Data sent to your MongoDB cluster
- **No third-party sharing**: Data only goes to your MongoDB instance
- **User control**: Username is user-defined, not tracked

## Support

For issues with MongoDB setup, contact: zetfounder@gmail.com

---

Built with ❤️ by ZET-Technologies-Private-Limited
© 2024 KeyStrike. All rights reserved.
