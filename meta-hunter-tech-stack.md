# Meta Hunter Web MVP - Tech Stack Guide
**Optimized for Claude Code Development**

---

## Philosophy: Keep It Simple, Keep It Fast

The best tech stack for an MVP is one that:
- ✅ Gets out of your way
- ✅ Has minimal dependencies
- ✅ Works everywhere (no special build steps)
- ✅ Easy for Claude Code to understand and modify
- ✅ Can scale up later if needed

**We're building a game, not a tech demo.** The stack should be invisible.

---

## Recommended Stack: "Vanilla Plus"

### Core Technologies

**HTML5 + CSS3 + Vanilla JavaScript**
- No frameworks (React/Vue/etc)
- No bundlers (Webpack/Vite/etc)
- No transpilers (just modern JS)
- Just clean, readable code

**Why this works:**
- Zero build process = instant refresh
- Claude Code can read/write all files easily
- No dependency hell
- Runs anywhere (just open index.html)
- Easy to debug in browser DevTools

**What you get:**
- Canvas2D for rendering
- Web Audio API for sound
- localStorage for saves
- Native ES6 modules for organization

---

## Project Structure

```
meta-hunter/
├── index.html              # Entry point
├── css/
│   ├── main.css           # Global styles
│   ├── game.css           # Game UI styles
│   └── shop.css           # Shop UI styles
├── js/
│   ├── main.js            # Game initialization
│   ├── game.js            # Main game loop
│   ├── puzzles/
│   │   ├── mastermind.js  # Mastermind puzzle
│   │   ├── circuit.js     # Circuit puzzle
│   │   └── pattern.js     # Pattern puzzle
│   ├── systems/
│   │   ├── shop.js        # Shop system
│   │   ├── upgrades.js    # Upgrade logic
│   │   ├── scoring.js     # Scoring system
│   │   └── progression.js # Meta-progression
│   ├── ui/
│   │   ├── hud.js         # HUD elements
│   │   ├── menu.js        # Menus
│   │   └── animations.js  # Visual effects
│   └── utils/
│       ├── storage.js     # Save/load
│       ├── audio.js       # Sound manager
│       └── random.js      # RNG utilities
├── assets/
│   ├── sounds/
│   │   ├── correct.wav
│   │   ├── wrong.wav
│   │   └── purchase.wav
│   ├── music/
│   │   └── loop.mp3
│   └── fonts/
│       └── monospace.woff2
├── README.md
└── package.json           # Optional, for tooling only
```

---

## File-by-File Breakdown

### 1. index.html

**Purpose:** Entry point, loads everything

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meta Hunter</title>
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/game.css">
    <link rel="stylesheet" href="css/shop.css">
</head>
<body>
    <div id="game-container">
        <canvas id="game-canvas"></canvas>
        <div id="ui-overlay"></div>
    </div>
    
    <!-- Load modules -->
    <script type="module" src="js/main.js"></script>
</body>
</html>
```

**Key points:**
- Single page application
- Canvas for game rendering
- UI overlay for menus/shops
- ES6 modules (`type="module"`)

### 2. js/main.js

**Purpose:** Initialize game, start main loop

```javascript
import { Game } from './game.js';
import { AudioManager } from './utils/audio.js';
import { StorageManager } from './utils/storage.js';

// Initialize managers
const audio = new AudioManager();
const storage = new StorageManager();

// Create game instance
const game = new Game(audio, storage);

// Start game loop
function gameLoop(timestamp) {
    game.update(timestamp);
    game.render();
    requestAnimationFrame(gameLoop);
}

// Start
document.addEventListener('DOMContentLoaded', () => {
    game.init();
    requestAnimationFrame(gameLoop);
});
```

**Key points:**
- Clean initialization
- Single game loop using requestAnimationFrame
- Dependency injection for managers

### 3. js/game.js

**Purpose:** Main game state machine

```javascript
export class Game {
    constructor(audio, storage) {
        this.audio = audio;
        this.storage = storage;
        this.state = 'MENU'; // MENU, PUZZLE, SHOP, BOSS, GAMEOVER
        this.currentPuzzle = null;
        this.round = 0;
        this.data = 0;
        this.upgrades = [];
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
    }
    
    init() {
        this.loadProgress();
        this.resizeCanvas();
        this.setupEventListeners();
    }
    
    update(timestamp) {
        switch(this.state) {
            case 'MENU':
                this.updateMenu();
                break;
            case 'PUZZLE':
                this.updatePuzzle(timestamp);
                break;
            case 'SHOP':
                this.updateShop();
                break;
            // ... etc
        }
    }
    
    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        switch(this.state) {
            case 'MENU':
                this.renderMenu();
                break;
            case 'PUZZLE':
                this.renderPuzzle();
                break;
            case 'SHOP':
                this.renderShop();
                break;
            // ... etc
        }
    }
}
```

**Key points:**
- State machine pattern (clean, predictable)
- Separate update and render
- Dependency injection keeps it testable

### 4. js/puzzles/mastermind.js

**Purpose:** Mastermind puzzle logic

```javascript
export class MastermindPuzzle {
    constructor(difficulty) {
        this.codeLength = difficulty + 3; // 4, 5, 6 digits
        this.maxGuesses = 10 - difficulty; // 10, 9, 8 guesses
        this.solution = this.generateCode();
        this.guesses = [];
        this.feedback = [];
        this.timer = 60;
        this.startTime = Date.now();
    }
    
    generateCode() {
        const code = [];
        for (let i = 0; i < this.codeLength; i++) {
            code.push(Math.floor(Math.random() * 10));
        }
        return code;
    }
    
    makeGuess(guess) {
        if (guess.length !== this.codeLength) return false;
        
        const feedback = this.getFeedback(guess);
        this.guesses.push(guess);
        this.feedback.push(feedback);
        
        return this.checkWin(feedback);
    }
    
    getFeedback(guess) {
        let black = 0; // Correct position
        let white = 0; // Correct number, wrong position
        
        const solutionCopy = [...this.solution];
        const guessCopy = [...guess];
        
        // First pass: find black pegs
        for (let i = 0; i < this.codeLength; i++) {
            if (guessCopy[i] === solutionCopy[i]) {
                black++;
                solutionCopy[i] = -1;
                guessCopy[i] = -2;
            }
        }
        
        // Second pass: find white pegs
        for (let i = 0; i < this.codeLength; i++) {
            if (guessCopy[i] >= 0) {
                const index = solutionCopy.indexOf(guessCopy[i]);
                if (index !== -1) {
                    white++;
                    solutionCopy[index] = -1;
                }
            }
        }
        
        return { black, white };
    }
    
    checkWin(feedback) {
        return feedback.black === this.codeLength;
    }
    
    getTimeRemaining() {
        const elapsed = (Date.now() - this.startTime) / 1000;
        return Math.max(0, this.timer - elapsed);
    }
    
    calculateScore() {
        const timeBonus = Math.floor(this.getTimeRemaining() * 2);
        const accuracyBonus = (this.maxGuesses - this.guesses.length) * 10;
        const baseReward = 50;
        
        return baseReward + timeBonus + accuracyBonus;
    }
}
```

**Key points:**
- Self-contained puzzle logic
- No dependencies on other systems
- Easy to test independently
- Returns data (doesn't manage state)

### 5. js/systems/shop.js

**Purpose:** Shop system and upgrade management

```javascript
import { UPGRADES } from './upgrades.js';

export class Shop {
    constructor(playerUpgrades, playerData) {
        this.playerUpgrades = playerUpgrades;
        this.playerData = playerData;
        this.offerings = [];
    }
    
    generateOfferings(round) {
        this.offerings = [];
        
        // Generate 4 random upgrades
        const available = UPGRADES.filter(u => 
            !this.playerUpgrades.includes(u.id) || u.stackable
        );
        
        // Weighted random selection
        for (let i = 0; i < 4; i++) {
            const upgrade = this.selectWeighted(available, round);
            if (upgrade) {
                this.offerings.push(upgrade);
            }
        }
    }
    
    selectWeighted(upgrades, round) {
        // Earlier rounds favor cheaper/simpler upgrades
        const weights = upgrades.map(u => {
            let weight = 1;
            if (u.tier === 'common') weight *= (1 + (5 - round) / 5);
            if (u.tier === 'rare') weight *= (round / 5);
            return weight;
        });
        
        const totalWeight = weights.reduce((a, b) => a + b, 0);
        let random = Math.random() * totalWeight;
        
        for (let i = 0; i < upgrades.length; i++) {
            random -= weights[i];
            if (random <= 0) return upgrades[i];
        }
        
        return upgrades[0];
    }
    
    purchase(upgradeId) {
        const upgrade = this.offerings.find(u => u.id === upgradeId);
        if (!upgrade) return false;
        if (this.playerData < upgrade.cost) return false;
        
        this.playerData -= upgrade.cost;
        this.playerUpgrades.push(upgradeId);
        
        return true;
    }
    
    reroll(cost = 25) {
        if (this.playerData < cost) return false;
        this.playerData -= cost;
        this.generateOfferings();
        return true;
    }
}
```

**Key points:**
- Weighted random selection
- Balances upgrade rarity by round
- Handles purchasing and rerolls
- Stateless (returns modified data)

### 6. js/utils/storage.js

**Purpose:** Save/load game progress

```javascript
export class StorageManager {
    constructor() {
        this.prefix = 'metahunter_';
    }
    
    save(key, data) {
        try {
            localStorage.setItem(
                this.prefix + key, 
                JSON.stringify(data)
            );
            return true;
        } catch (e) {
            console.error('Save failed:', e);
            return false;
        }
    }
    
    load(key, defaultValue = null) {
        try {
            const data = localStorage.getItem(this.prefix + key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (e) {
            console.error('Load failed:', e);
            return defaultValue;
        }
    }
    
    saveProgress(progress) {
        return this.save('progress', {
            totalWins: progress.totalWins,
            totalRuns: progress.totalRuns,
            unlockedUpgrades: progress.unlockedUpgrades,
            unlockedPuzzles: progress.unlockedPuzzles,
            archivePoints: progress.archivePoints,
            achievements: progress.achievements,
            timestamp: Date.now()
        });
    }
    
    loadProgress() {
        return this.load('progress', {
            totalWins: 0,
            totalRuns: 0,
            unlockedUpgrades: [],
            unlockedPuzzles: ['mastermind', 'circuit', 'pattern'],
            archivePoints: 0,
            achievements: [],
            timestamp: Date.now()
        });
    }
    
    reset() {
        Object.keys(localStorage)
            .filter(key => key.startsWith(this.prefix))
            .forEach(key => localStorage.removeItem(key));
    }
}
```

**Key points:**
- Wraps localStorage with error handling
- Namespaced keys to avoid conflicts
- Default values for first-time players
- Easy to reset for testing

### 7. js/utils/audio.js

**Purpose:** Sound and music management

```javascript
export class AudioManager {
    constructor() {
        this.sounds = new Map();
        this.music = null;
        this.volume = {
            sfx: 0.7,
            music: 0.5
        };
        this.muted = false;
    }
    
    async loadSound(id, url) {
        try {
            const audio = new Audio(url);
            await audio.load();
            this.sounds.set(id, audio);
        } catch (e) {
            console.error(`Failed to load sound: ${id}`, e);
        }
    }
    
    playSound(id) {
        if (this.muted) return;
        
        const sound = this.sounds.get(id);
        if (sound) {
            const clone = sound.cloneNode();
            clone.volume = this.volume.sfx;
            clone.play().catch(e => console.error('Play failed:', e));
        }
    }
    
    async loadMusic(url) {
        try {
            this.music = new Audio(url);
            this.music.loop = true;
            this.music.volume = this.volume.music;
            await this.music.load();
        } catch (e) {
            console.error('Failed to load music:', e);
        }
    }
    
    playMusic() {
        if (this.music && !this.muted) {
            this.music.play().catch(e => console.error('Music play failed:', e));
        }
    }
    
    stopMusic() {
        if (this.music) {
            this.music.pause();
            this.music.currentTime = 0;
        }
    }
    
    setVolume(type, volume) {
        this.volume[type] = Math.max(0, Math.min(1, volume));
        if (type === 'music' && this.music) {
            this.music.volume = this.volume.music;
        }
    }
    
    toggleMute() {
        this.muted = !this.muted;
        if (this.muted) {
            this.stopMusic();
        } else {
            this.playMusic();
        }
    }
}
```

**Key points:**
- Preloads sounds for instant playback
- Clones audio for overlapping sounds
- Volume controls per type
- Graceful error handling

---

## CSS Strategy

### css/main.css - Global Styles

```css
:root {
    --color-bg: #0a0e0f;
    --color-fg: #00ff41;
    --color-accent: #ff0080;
    --color-text: #c0c0c0;
    --font-mono: 'Courier New', monospace;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background: var(--color-bg);
    color: var(--color-fg);
    font-family: var(--font-mono);
    overflow: hidden;
}

#game-container {
    width: 100vw;
    height: 100vh;
    position: relative;
}

#game-canvas {
    width: 100%;
    height: 100%;
    image-rendering: pixelated;
}

#ui-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

#ui-overlay > * {
    pointer-events: auto;
}

button {
    background: var(--color-fg);
    color: var(--color-bg);
    border: 2px solid var(--color-fg);
    padding: 10px 20px;
    font-family: var(--font-mono);
    cursor: pointer;
    transition: all 0.2s;
}

button:hover {
    background: var(--color-bg);
    color: var(--color-fg);
    box-shadow: 0 0 10px var(--color-fg);
}

button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
```

**Key points:**
- CSS variables for easy theming
- Matrix-style green/black aesthetic
- Responsive design (100vw/vh)
- Clean, minimal styling

---

## Development Tools (Optional but Recommended)

### VS Code Extensions

1. **Live Server** - Auto-refresh on save
2. **ESLint** - Catch errors early
3. **Prettier** - Format code consistently
4. **Path Intellisense** - Autocomplete file paths

### package.json (Optional)

```json
{
  "name": "meta-hunter",
  "version": "1.0.0",
  "description": "A Balatro-inspired code-cracking roguelite",
  "scripts": {
    "dev": "npx serve .",
    "lint": "eslint js/**/*.js",
    "format": "prettier --write js/**/*.js"
  },
  "devDependencies": {
    "eslint": "^8.0.0",
    "prettier": "^3.0.0",
    "serve": "^14.0.0"
  }
}
```

**Usage:**
```bash
npm install
npm run dev  # Starts local server
```

**Note:** This is OPTIONAL. You can also just use VS Code's Live Server extension.

---

## Libraries to Consider (but avoid for MVP)

### DON'T USE (for MVP):

❌ **React/Vue/Svelte** - Overkill for a game, adds complexity
❌ **Webpack/Vite** - Build step slows iteration
❌ **TypeScript** - Type safety is nice but slows prototyping
❌ **Game engines (Phaser, PixiJS)** - Heavy dependencies, less control

### MAYBE USE (if specific need):

⚠️ **Howler.js** - If Web Audio API is too low-level (it's not)
⚠️ **Lodash** - If you need specific utilities (you probably don't)
⚠️ **Day.js** - If you need date handling (localStorage timestamps are fine)

### Golden Rule: 

**If you can write it in 50 lines of vanilla JS, don't import a library.**

---

## Performance Considerations

### Canvas Rendering

**Do:**
- Clear only what changed (dirty rectangles)
- Use requestAnimationFrame
- Batch draw calls
- Use off-screen canvas for static elements

**Don't:**
- Redraw entire canvas every frame (unless needed)
- Create new objects in update loop
- Use heavy filters/effects in real-time

### Memory Management

**Do:**
- Object pooling for particles/effects
- Reuse DOM elements
- Clear event listeners when done
- Use weak references where appropriate

**Don't:**
- Create closures in tight loops
- Hold references to detached DOM nodes
- Allocate in hot paths

### localStorage Best Practices

**Do:**
- Save on state changes (not every frame)
- Compress data if needed (JSON.stringify is compact)
- Handle quota errors gracefully
- Validate loaded data

**Don't:**
- Save huge objects (>1MB gets slow)
- Save every frame
- Trust loaded data blindly

---

## Testing Strategy

### Manual Testing (Primary for MVP)

**Every feature:**
1. Implement feature
2. Play it yourself
3. Break it intentionally
4. Fix bugs
5. Repeat

**Use browser DevTools:**
- Console for errors
- Network tab for asset loading
- Application tab for localStorage
- Performance tab for bottlenecks

### Automated Testing (Optional)

**If you want to add tests:**
```javascript
// Simple test helper
function assert(condition, message) {
    if (!condition) {
        throw new Error('Test failed: ' + message);
    }
}

// Test example
function testMastermind() {
    const puzzle = new MastermindPuzzle(1);
    
    // Test feedback
    puzzle.solution = [1, 2, 3, 4];
    const feedback = puzzle.getFeedback([1, 2, 3, 4]);
    assert(feedback.black === 4, 'Perfect guess should have 4 blacks');
    
    const feedback2 = puzzle.getFeedback([4, 3, 2, 1]);
    assert(feedback2.white === 4, 'Reversed should have 4 whites');
    
    console.log('✅ Mastermind tests passed');
}
```

**But honestly:** For MVP, just play the game. Automated tests slow you down at this stage.

---

## Deployment

### Option 1: itch.io (Recommended)

**Steps:**
1. Zip your entire project folder
2. Upload to itch.io as HTML5 game
3. Set index.html as main file
4. Done!

**Pros:**
- Dead simple
- Works on all devices
- Built-in community
- Free hosting

### Option 2: GitHub Pages

**Steps:**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/meta-hunter.git
git push -u origin main

# Enable GitHub Pages in repo settings
```

**Pros:**
- Free hosting
- Version control built-in
- Custom domain support

### Option 3: Netlify

**Steps:**
1. Drag folder to netlify.com/drop
2. Done!

**Pros:**
- Instant deployment
- Auto HTTPS
- Form handling (for feedback)

---

## Working with Claude Code

### How to structure your prompts:

**Good prompt:**
```
I need to implement the Circuit puzzle. It should:
1. Generate a 6x6 grid
2. Place 2 inputs and 2 outputs randomly
3. Player drags wire pieces to connect them
4. Check if all outputs are connected
5. Return score based on time

Follow the same pattern as mastermind.js - self-contained class that returns data.
```

**Bad prompt:**
```
Make a circuit puzzle
```

### Tips for working with Claude Code:

1. **Be specific about file structure** - Tell it exactly where to put code
2. **Reference existing files** - "Like mastermind.js but for circuits"
3. **Request explanations** - "Explain how the feedback algorithm works"
4. **Ask for iterations** - "Make it harder by reducing grid size"
5. **Test frequently** - After every major feature, test it yourself

### Example workflow:

```
Day 1: "Create the basic Mastermind puzzle class in js/puzzles/mastermind.js"
[Test it]

Day 2: "Add scoring based on time and accuracy to mastermind.js"
[Test it]

Day 3: "Create the shop system in js/systems/shop.js with 5 upgrades"
[Test it]

Day 4: "Add Circuit puzzle following the Mastermind pattern"
[Test it]
```

**Small, testable increments!**

---

## Common Pitfalls to Avoid

### 1. Overengineering

❌ "Let me build a complete entity-component system first"
✅ "Let me make Mastermind work, then refactor if needed"

### 2. Premature Optimization

❌ "I need to optimize canvas rendering before building anything"
✅ "Get it working, measure performance, optimize what's slow"

### 3. Feature Creep

❌ "Let's add multiplayer and daily challenges now!"
✅ "Core loop first, bonus features after MVP"

### 4. Analysis Paralysis

❌ "Should I use Phaser? PixiJS? Three.js?"
✅ "Vanilla JS. Ship it. Iterate."

### 5. No Testing

❌ "I'll test everything at the end"
✅ "Test every feature as I build it"

---

## Quick Start Checklist

To start development TODAY:

- [ ] Create project folder: `meta-hunter/`
- [ ] Create folder structure (js/, css/, assets/)
- [ ] Create index.html with canvas
- [ ] Create main.js with game loop
- [ ] Test: See blank canvas running
- [ ] Create mastermind.js with basic logic
- [ ] Test: Can solve a code in console
- [ ] Add UI for Mastermind
- [ ] Test: Can solve via clicking
- [ ] Add timer and scoring
- [ ] Test: Earn data for solving
- [ ] **CHECKPOINT: Core loop working!**

**If you can check off that list, you're 20% done with MVP.**

---

## Summary: Why This Stack

**Simple:**
- No build process
- No dependencies
- Just files and a browser

**Fast:**
- Instant refresh
- No compile time
- Quick iteration

**Flexible:**
- Easy to change
- No framework lock-in
- Can add libraries later if needed

**Claude Code Friendly:**
- Clear file structure
- Vanilla JS (no framework syntax)
- Self-documenting code
- Easy to understand and modify

**Shippable:**
- Works everywhere
- Easy to deploy (drag/drop to itch.io)
- No special requirements
- Mobile friendly

---

## Final Thoughts

**This stack lets you focus on the GAME, not the TECH.**

You're not building:
- A React component library
- A TypeScript type system
- A build pipeline
- A microservices architecture

You're building:
- A fun puzzle game
- That people want to play
- That you can ship in 10 weeks

**Keep it simple. Ship it. Iterate.**

Now go build! 🚀

