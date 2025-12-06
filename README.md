# Meta Hunter

A Balatro-inspired code-cracking roguelite game. Infiltrate corrupted systems by solving puzzles!

## 🚀 How to Run

**Important:** This game uses ES6 modules and **requires a web server** to run properly. You cannot just double-click `index.html`.

### Option 1: Python (Easiest)

```bash
# Navigate to the project directory
cd meta-hunter

# Start a local server (Python 3)
python3 -m http.server 8080

# Open your browser to:
# http://localhost:8080
```

### Option 2: Node.js

```bash
# Install http-server globally (once)
npm install -g http-server

# Run server
http-server -p 8080

# Open your browser to:
# http://localhost:8080
```

### Option 3: VS Code Live Server

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 🎮 How to Play

### Mastermind Puzzle

**Objective:** Crack the hidden 4-digit code before time runs out!

**Rules:**
- The system has generated a secret 4-digit code (each digit is 0-9)
- You have **10 attempts** and **60 seconds** to crack it
- After each guess, you receive feedback:
  - **⬢ (Black)** = Correct digit in the correct position
  - **⬡ (White)** = Correct digit in the wrong position

**Example:**
```
Secret code: 1234
Your guess:  1526

Feedback: ⬢ 1  ⬡ 1
(The '1' is correct and in position 1, the '2' is correct but in the wrong position)
```

**Scoring:**
- Base reward: 50 data
- Time bonus: +2 data per second remaining
- Accuracy bonus: +10 data per unused attempt

## 🐛 Troubleshooting

### "Nothing happens when I click"
- Make sure you're running via a web server (see above)
- Open browser console (F12) and check for errors
- Look for the message "Game initialized successfully!"

### Module Loading Errors
- **Error:** `Failed to load module script: The server responded with a non-JavaScript MIME type`
- **Solution:** You must use a web server. The `file://` protocol doesn't work with ES6 modules.

### Console Debugging
Open the browser console (F12) to see:
- "DOM loaded, initializing game..."
- "Game initialized successfully!"
- "Cheat code - Solution: XXXX" (the answer for testing)
- Event logs when you click or type

## 📁 Project Structure

```
meta-hunter/
├── index.html              # Entry point
├── css/
│   └── main.css           # Matrix green/black theme
├── js/
│   ├── main.js            # Game controller
│   └── puzzles/
│       └── mastermind.js  # Mastermind logic
└── assets/                # Future: sounds, music, fonts
```

## 🎯 Current Status: Week 1 Complete

- ✅ Project structure set up
- ✅ Mastermind puzzle fully functional
- ✅ Matrix-style UI theme
- ✅ Timer and attempt tracking
- ✅ Win/loss detection
- ✅ Score calculation

## 🔮 Coming Next: Week 2

- Scoring system with persistent data
- Shop system between rounds
- First upgrades (Extra Time, Brute Force, Speed Bonus)
- Multi-round progression

## 🛠️ Development

Built with:
- Vanilla JavaScript (ES6 modules)
- HTML5 Canvas for background effects
- CSS3 for styling
- No frameworks, no build tools

Following the **"Vanilla Plus"** philosophy from the tech stack guide.

## 📝 License

Built as part of the 10-week Meta Hunter development roadmap.
