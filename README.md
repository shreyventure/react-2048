# 2048 Game - Professional React Implementation

A modern, professional implementation of the classic 2048 puzzle game built with React, TypeScript, and Tailwind CSS. Features smooth animations, responsive design, and clean modular architecture.

## ✨ Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Multiple Grid Sizes**: 2×2 to 6×6 grids
- **Multi-Input Support**: Keyboard, touch gestures, and mouse controls
- **Score Persistence**: Best scores saved automatically
- **Professional Codebase**: TypeScript, modular architecture, reusable components

## 🏗️ Architecture

### High-Level Structure

```
src/
├── components/          # React UI components
│   ├── ui/             # Reusable components (Button, Select)
│   └── game/           # Game-specific components
├── hooks/              # Custom React hooks
├── services/           # Business logic (Storage, TileRegistry)
├── utils/              # Pure functions (gameLogic, tileUtils)
├── constants/          # Configuration and theme
└── types/              # TypeScript definitions
```

### Key Design Patterns

- **Service Layer**: `StorageService`, `TileRegistryService` for data management
- **Custom Hooks**: `useGameBoard` for state, `useSwipeGestures` for input
- **Component Composition**: Reusable UI components with clear separation
- **Type Safety**: Comprehensive TypeScript coverage

## 🔧 Technical Highlights

### Animation System
- **Stable Tile IDs**: TileRegistryService maintains component identity for smooth CSS transitions
- **Position Calculations**: Dynamic sizing for responsive gameplay across devices
- **Performance**: Memoized components prevent unnecessary re-renders

### State Management
- **Centralized State**: Single `useGameBoard` hook manages all game logic
- **Immutable Updates**: Pure functions ensure predictable state changes
- **Type Safety**: Comprehensive TypeScript interfaces and strict typing

### Input Handling
- **Multi-Platform**: Keyboard (Arrow/WASD), touch gestures, mouse clicks
- **Gesture Detection**: Sophisticated swipe detection with configurable thresholds
- **Accessibility**: Full keyboard navigation and screen reader support

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ ([Download](https://nodejs.org/))
- Modern browser (Chrome, Firefox, Safari, Edge)

### Installation
```bash
# Clone and install
git clone <repository-url>
cd 2048-game
npm install

# Start development server
npm start
# Game opens at http://localhost:3000

# Build for production
npm run build
```

## 🎮 How to Play

### Objective
Combine tiles with the same number to reach **2048**. Continue playing for higher scores!

### Controls
- **Desktop**: Arrow keys, WASD, or click direction buttons
- **Mobile**: Swipe gestures or tap direction buttons

### Rules
1. **Move**: All tiles slide until they hit the edge or another tile
2. **Merge**: Identical tiles combine into one with double the value
3. **Score**: Each merge adds the new tile's value to your score
4. **New Tiles**: A new tile (2 or 4) appears after each move
5. **Win**: Create a 2048 tile (can continue for higher scores)
6. **Game Over**: No more moves possible

### Grid Sizes
- **2×2**: Quick games for beginners
- **3×3**: Moderate challenge
- **4×4**: Classic experience (default)
- **5×5**: Strategic gameplay
- **6×6**: Maximum challenge

### Strategy Tips
- Keep highest tile in a corner
- Build tiles in one direction
- Plan moves ahead
- Focus on larger combinations

## ⚙️ Configuration

Customize game settings in `src/constants/game.ts`:

```typescript
export const GAME_CONFIG = {
  DEFAULT_SIZE: 4,        // Starting grid size
  WINNING_TILE: 2048,     // Target tile value
  ANIMATION_DURATION: 300, // Animation speed (ms)
} as const;

export const THEME_COLORS = {
  background: "#faf8ef",
  boardBackground: "#bbada0",
  // ... more colors
} as const;
```

## 🛠️ Development

### Adding Features
The modular architecture makes extending the game straightforward:

- **Services**: Add new services for features like audio or analytics
- **Hooks**: Create custom hooks for new input methods or game modes
- **Components**: Build reusable UI components following existing patterns
- **Utils**: Add pure functions for game logic extensions

### Testing
- **Unit Tests**: Test utilities and services in isolation
- **Component Tests**: Test React components with proper mocking
- **Integration Tests**: Test complete user workflows

### Performance
- Components use `React.memo` for optimization
- State updates are immutable and efficient
- Bundle analysis available with `webpack-bundle-analyzer`

## 🔄 Future Enhancements

- **Undo/Redo System**: Move history with undo functionality
- **Game Statistics**: Detailed analytics (moves, time, efficiency)
- **Multiple Themes**: Dark mode, high contrast, custom color schemes
- **Sound Effects**: Audio feedback for moves, merges, and achievements
- **Multiplayer Support**: Real-time competitive gameplay
- **Progressive Web App**: Offline support and native app experience

## 🐛 Troubleshooting

### Common Issues

**Game Won't Start**
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install && npm start
```

**TypeScript Errors**
```bash
npm install typescript@latest
# Restart TypeScript service in VS Code: Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

**Animation Issues**
- Check if `prefers-reduced-motion` is enabled in browser settings
- Try reducing grid size for better performance

**Mobile Touch Issues**
- Ensure you're swiping on the game board area, not UI elements
- Adjust `threshold` value in `useSwipeGestures.ts` if needed

### Browser Compatibility
- **Chrome**: 88+ ✅
- **Firefox**: 85+ ✅  
- **Safari**: 14+ ✅
- **Edge**: 88+ ✅
- **Mobile**: iOS 14+, Android 8+ ✅

## 🤝 Contributing

1. **Fork & Clone**
   ```bash
   git clone https://github.com/yourusername/2048-game.git
   cd 2048-game
   ```

2. **Install & Develop**
   ```bash
   npm install
   git checkout -b feature/your-feature-name
   # Make changes, add tests
   ```

3. **Submit**
   ```bash
   npm run type-check && npm run lint
   git commit -m "Add amazing feature"
   git push origin feature/your-feature-name
   # Create Pull Request
   ```

### Code Guidelines
- Use TypeScript for all new code
- Follow existing patterns and naming conventions
- Add tests for new features
- Keep components small and focused

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

**What this means:**
- ✅ Commercial use, modification, distribution allowed
- ❌ No warranty or liability provided

## 🙏 Acknowledgments

- **Original 2048**: [Gabriele Cirulli](https://github.com/gabrielecirulli/2048)
- **Technologies**: React, TypeScript, Tailwind CSS, Framer Motion
- **Community**: React, TypeScript, and open source communities

---

**Made with ❤️ for developers and gamers**

*If you found this helpful, please ⭐ the repository!*