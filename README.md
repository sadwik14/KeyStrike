# KeyStrike - Speed Typing Challenge

A modern, competitive typing speed test application built with Next.js, React, and Tailwind CSS. Features a bold orange and white design with advanced UI/UX patterns.

## Features Implemented

### ✅ Landing Page
- **Hero Section**: Split-screen design with bold typography and CTA
- **Test Modes Showcase**: 4 different typing challenge modes displayed in a grid
- **Leaderboard**: Live rankings showing the fastest typists globally
- **Results Dashboard**: Personal stats tracking WPM, accuracy, and consistency
- **Quote Section**: Inspirational messaging from top typists
- **Header & Footer**: Navigation and company info

### ✅ Typing Test Page
- **Real-time Test Engine**:
  - WPM calculation (words per minute)
  - Accuracy tracking with character-by-character highlighting
  - Error counting and visual feedback
  - Live consistency measurement
  
- **Test Modes**:
  - Time Sprint: 15, 30, 60 second timed tests
  - Dynamic mode switching without losing progress
  - Real-time statistics display

- **Advanced UI Features**:
  - Live progress bar
  - Character highlighting (correct in orange, errors in red background)
  - Smooth transitions and feedback
  - Results page with comprehensive stats

### ✅ Design System
- **Color Scheme**: Orange (#FF4500) and White with black text
- **No Card-Based UI**: Advanced geometric layouts using borders and sections
- **Typography**: Bold, impactful fonts with strong hierarchy
- **Responsive**: Fully responsive on mobile, tablet, and desktop
- **Accessibility**: Semantic HTML, proper ARIA labels, keyboard navigation

## Project Structure

```
/components
  ├── header.tsx              # Navigation header
  ├── hero-section.tsx        # Landing page hero with CTA
  ├── test-modes-section.tsx  # 4 practice modes showcase
  ├── leaderboard.tsx         # Global rankings display
  ├── results-dashboard.tsx   # Personal stats dashboard
  ├── quote-section.tsx       # Inspirational quote section
  ├── footer.tsx              # Footer with links
  └── typing-test.tsx         # Main typing test interface

/app
  ├── page.tsx                # Landing page
  ├── test/page.tsx          # Typing test page
  ├── layout.tsx             # Root layout
  └── globals.css            # Global styles with theme

/lib
  └── typing-utils.ts        # Typing logic and calculations
    ├── calculateWPM()        # Words per minute algorithm
    ├── calculateAccuracy()   # Accuracy with error count
    ├── calculateConsistency()# Consistency measurement
    └── TEST_MODES[]          # Mode definitions
```

## Key Features

### Typing Engine
- **WPM Calculation**: (total characters / 5) / minutes elapsed
- **Accuracy**: Percentage of correct characters typed
- **Error Tracking**: Counts and highlights mistakes in real-time
- **Consistency**: Measures variance in performance over time

### UI/UX Features
- **No Cards Design**: Uses borders, spacing, and geometric sections
- **Live Feedback**: Real-time WPM, accuracy, and error count
- **Progress Tracking**: Visual progress bar and percentage
- **Character Highlighting**: Green/orange for correct, red background for errors
- **Test Results**: Comprehensive final stats with breakdown

### Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Flexible grid layouts
- Touch-friendly buttons and inputs

## Technology Stack

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **React Hooks** - State management (useState, useEffect, useRef)
- **OKLCH Color Space** - Modern color system

## Color Scheme

- **Primary Orange**: `oklch(0.6 0.22 30)` (#FF4500)
- **White Background**: `oklch(1 0 0)` (#FFFFFF)
- **Black Text**: `oklch(0.1 0 0)` (#000000)
- **Muted Gray**: `oklch(0.9 0 0)` for subtle backgrounds

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# Visit http://localhost:3000
```

## Pages

- **Home** (`/`): Landing page with hero, modes, leaderboard, and stats
- **Test** (`/test`): Interactive typing speed test interface

## Customization

### Adding New Test Modes
Edit `/lib/typing-utils.ts` and add to `TEST_MODES` array:
```typescript
{
  id: "new-mode",
  name: "Mode Name",
  label: "LABEL",
  description: "Description text",
  category: "category",
}
```

### Changing Colors
Update CSS variables in `/app/globals.css`:
```css
--accent: oklch(0.6 0.22 30); /* Primary orange */
--background: oklch(1 0 0);   /* White background */
```

### Modifying Test Text
Edit sample texts in `/components/typing-test.tsx` `SAMPLE_TEXTS` array.

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers

## Performance

- **No external dependencies** for UI components
- **Lightweight**: ~50KB gzipped
- **Fast rendering**: React 19 with optimized components
- **Smooth animations**: CSS transitions, no animation libraries

## Future Enhancements

- Database integration for persistent leaderboards
- User accounts and progress tracking
- More test modes (code typing, custom texts)
- Sound effects for keystrokes
- Dark mode toggle
- Multi-language support
- API for custom tests

## License

MIT - Created with v0
