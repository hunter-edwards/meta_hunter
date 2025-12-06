# Meta Hunter - Game Design Document
**A Balatro-inspired Code-Cracking Roguelite**

Version 1.0 | December 2024

---

## High Concept

**Elevator Pitch:**
Meta Hunter is a roguelite puzzle game where you infiltrate corrupted digital systems by solving code-cracking challenges. Like Balatro, each run presents increasingly difficult puzzles, rewarding clever play with powerful upgrades that fundamentally change how you solve future challenges.

**Core Promise:**
Every run feels different because your unlocked abilities literally break the rules of puzzle-solving. "One more run" addiction comes from discovering new synergies between your meta-progression unlocks.

**Target Experience:**
- 15-30 minute runs
- High replayability through unlocks and build variety
- Satisfying "aha!" moments when you crack a tough puzzle
- Strategic decision-making between rounds (which upgrades to buy)
- Incremental mastery as you learn puzzle patterns

---

## Core Gameplay Loop

### The Run Structure

```
START RUN
  ↓
PUZZLE ROUND (solve under pressure)
  ↓
EARN DATA (based on performance)
  ↓
SHOP PHASE (buy upgrades/abilities)
  ↓
PUZZLE ROUND (harder)
  ↓
...repeat 8-12 rounds...
  ↓
BOSS PUZZLE (multi-stage challenge)
  ↓
VICTORY or DEFEAT
  ↓
META PROGRESSION (unlock new abilities/puzzle types)
  ↓
START NEW RUN
```

### Single Round Flow

1. **Puzzle Presented** - You see the challenge (e.g., "Crack this 4-digit code")
2. **Solve Phase** - You attempt to solve it (limited time or attempts)
3. **Scoring** - Earn data fragments based on:
   - Speed bonus (faster = more data)
   - Accuracy bonus (fewer wrong guesses = more data)
   - Perfect bonus (no mistakes = big bonus)
4. **Interruptions** (optional) - Some rounds have "viruses" that add pressure
5. **Results** - See your earnings and any streak bonuses

### Shop Phase

Between every round (or every 2-3 rounds):
- Spend data fragments on upgrades
- Choose between 3-4 random options
- Permanent upgrades for current run
- Strategic tension: save for expensive items vs. buy now to survive

---

## Puzzle Types

### Tier 1: Core Puzzles (Available from start)

#### 1. **MASTERMIND** - Classic Code Breaking
**How it works:**
- System has a hidden code (4 digits, 0-9)
- You guess the code
- Feedback: ⚫ = correct digit, correct position | ⚪ = correct digit, wrong position
- Limited attempts (8-10 guesses)

**Difficulty scaling:**
- More digits (4 → 5 → 6)
- Fewer guesses allowed
- Time pressure added
- Duplicate digits allowed

**Why it's good:**
- Universally understood
- Pure deduction
- Satisfying when you crack it
- Easy to implement

#### 2. **CIRCUIT CONNECTION** - Node Routing
**How it works:**
- Grid of nodes, some are "input" and some are "output"
- Connect inputs to outputs using limited wire pieces
- Can't cross wires
- Must use all outputs

**Difficulty scaling:**
- Larger grids
- More complex wire shapes needed
- Obstacles/blocked cells
- Multiple colors that can't mix

**Why it's good:**
- Visual and spatial
- Different mental muscle than Mastermind
- Clear pass/fail
- Can be generated procedurally

#### 3. **PATTERN SEQUENCE** - Memory Challenge
**How it works:**
- System shows you a sequence of symbols (5-8 symbols)
- Sequence disappears
- You recreate it from memory
- Mistakes cost you

**Difficulty scaling:**
- Longer sequences
- More symbols in the "alphabet"
- Shorter display time
- Similar-looking symbols

**Why it's good:**
- Quick to play
- Tests different skill (memory vs. logic)
- Can be very fast-paced
- Good variety from other puzzles

### Tier 2: Advanced Puzzles (Unlocked via meta-progression)

#### 4. **LOGIC GATES** - Boolean Routing
**How it works:**
- Route binary signals (0s and 1s) through logic gates (AND, OR, NOT)
- Must produce specific output
- Limited gates available

**Difficulty scaling:**
- More complex target outputs
- Fewer gates to work with
- Multiple simultaneous signals

**Why it's good:**
- Appeals to programmers/logic fans
- Educational value
- Deeply strategic

#### 5. **FREQUENCY TUNING** - Dial Puzzle
**How it works:**
- Adjust 3-4 frequency dials to match a hidden "signature"
- Feedback shows how close you are (warmer/colder)
- Like cracking a safe

**Difficulty scaling:**
- More dials
- Less feedback
- Narrower acceptable ranges
- Moving targets

**Why it's good:**
- Feels "hackery"
- Different from other puzzles
- Can be tense and exciting

#### 6. **PACKET ROUTING** - Optimization
**How it works:**
- Data packets need to reach destinations
- You have limited "bandwidth"
- Must route efficiently to maximize throughput

**Difficulty scaling:**
- More packets
- Complex network topologies
- Bandwidth constraints
- Time limits

**Why it's good:**
- More strategic than reactive
- Optimization appeals to certain players
- Feels very "network hacking"

### Puzzle Selection Philosophy

**Early runs:** Mostly Mastermind + Circuit + Pattern
**Mid-game:** Mix in 1-2 advanced puzzles per run
**Late-game:** Boss puzzles combine multiple types

---

## Upgrade System (The Heart of the Game)

### Categories of Upgrades

#### A) **Puzzle Breakers** - Literally change the rules
These are the most exciting and Balatro-like.

**Examples:**
- **"Brute Force"** - Reveal 1 random correct digit in Mastermind
- **"Pattern Recognition"** - Mastermind feedback shows exact positions for ⚫ markers
- **"Overclock"** - Freeze the timer for 5 seconds (1 use per round)
- **"Memory Dump"** - See your last 3 guesses simultaneously
- **"Backdoor"** - Skip current puzzle but earn 50% less data
- **"Quantum State"** - Can undo your last action in any puzzle
- **"Neural Link"** - Pattern puzzles show for 2x longer
- **"Parallel Processing"** - Can work on 2 puzzles simultaneously (earn 2x data)

**Cost:** 100-200 data (expensive but game-changing)

#### B) **Multipliers** - Boost your earnings
**Examples:**
- **"Speed Daemon"** - +25% data for solving in under 30 seconds
- **"Perfectionist"** - +50% data for no mistakes
- **"Combo Chain"** - +10% data per consecutive round cleared (stacks)
- **"Efficient Code"** - Earn +5 data per unused guess in Mastermind
- **"Data Compression"** - All data earnings +15%

**Cost:** 50-100 data (cheaper, consistent value)

#### C) **Defensive** - Help you survive longer
**Examples:**
- **"Firewall"** - No virus interruptions next round
- **"Extra Attempt"** - +2 guesses in Mastermind puzzles
- **"Time Dilation"** - +10 seconds on all timers
- **"Error Correction"** - Can make 1 mistake without penalty
- **"Rollback"** - If you fail, retry the same puzzle once

**Cost:** 75-150 data (insurance against failure)

#### D) **Synergy Builders** - Work together
**Examples:**
- **"Adaptive Algorithm"** - Each puzzle type you clear gives +1 hint on the next
- **"Cascade Protocol"** - Clearing a puzzle in under 20 sec gives +1 attempt on next puzzle
- **"Exploit Chain"** - Using "Brute Force" twice in a row makes the third one free
- **"Resource Loop"** - Skipping a puzzle with "Backdoor" refunds 25 data

**Cost:** 100-175 data (require planning to maximize)

### Shop Mechanics

**Shop appears:** Every 2 rounds (or after every round in easy mode)

**Number of options:** 4 upgrades offered per shop
- 1 common (multiplier/defensive)
- 2 uncommon (mix of categories)
- 1 rare (powerful puzzle breaker or synergy)

**Reroll option:** Spend 25 data to refresh the shop (once per shop visit)

**Strategic tension:**
- Save for expensive game-changers?
- Buy cheap upgrades to survive now?
- Synergize with what you already have?

---

## Progression & Difficulty Curve

### Run Structure (Example 12-round run)

| Round | Puzzle Type | Modifiers | Data Reward |
|-------|-------------|-----------|-------------|
| 1 | Mastermind (3-digit) | None | 50 |
| 2 | Circuit (small) | None | 50 |
| **SHOP** | | | |
| 3 | Pattern (5 symbols) | None | 75 |
| 4 | Mastermind (4-digit) | Virus spawn | 75 |
| **SHOP** | | | |
| 5 | Circuit (medium) | Reduced time | 100 |
| 6 | Logic Gates | None | 100 |
| **SHOP** | | | |
| 7 | Mastermind (5-digit) | Virus spawn | 125 |
| 8 | Pattern (7 symbols) | Reduced time | 125 |
| **SHOP** | | | |
| 9 | Circuit (large) | Virus spawn + time | 150 |
| 10 | Frequency Tuning | None | 150 |
| **SHOP** | | | |
| 11 | Mastermind (6-digit) | All modifiers | 200 |
| 12 | **BOSS PUZZLE** | Multi-stage | 300 |

**Total possible data:** ~1,500 per run (before bonuses)
**Total needed for good build:** ~800-1,000 in upgrades

### Boss Puzzles (Every 12 rounds)

**Concept:** Multi-stage challenges that combine puzzle types

**Example Boss 1: "The Firewall"**
- Stage 1: Mastermind (4-digit) but with virus interference
- Stage 2: Circuit connection under 45 seconds
- Stage 3: Final Mastermind (5-digit) with halved attempts
- Clear all 3 stages to win

**Example Boss 2: "The Encryption Core"**
- Stage 1: Pattern sequence (8 symbols)
- Stage 2: Logic gates with limited pieces
- Stage 3: Choose 1 of 3 final puzzles (risk/reward)

**Boss rewards:** Unlock new abilities, puzzle types, or meta-progression

### Difficulty Modes (Unlocked progressively)

1. **Training Mode** - Easier puzzles, more time, shop every round
2. **Standard Mode** - Balanced (default)
3. **Expert Mode** - Harder puzzles, less time, shop every 3 rounds
4. **Glitch Mode** - Random modifiers, chaotic, high risk/reward

---

## Meta-Progression System

**What carries between runs:**

### Unlockables (Permanent)

**New Puzzle Types:**
- Start with: Mastermind, Circuit, Pattern
- Unlock: Logic Gates (at 5 wins), Frequency (at 10 wins), Packet Routing (at 15 wins)

**New Abilities in Shop Pool:**
- Start with 12 basic abilities
- Each win unlocks 1-2 new abilities to appear in shops
- 30+ total abilities to discover

**Difficulty Modes:**
- Unlock Expert after 3 wins
- Unlock Glitch after 10 wins

**Starting Bonuses:**
- "First Data Cache" - Start runs with +50 data (unlock at 5 total runs)
- "Quick Start" - Skip round 1 (unlock at 20 wins)
- "Lucky Break" - First shop always has a rare item (unlock at 15 wins)

### Currency: "Archive Points"

**How you earn them:**
- Complete a run: 10 AP
- Win a run: 50 AP
- Complete achievements: 25-100 AP each
- Reach round milestones: 5-15 AP

**What you spend them on:**
- Unlock new puzzle types (100 AP)
- Unlock new abilities (50-75 AP each)
- Unlock difficulty modes (150 AP)
- Unlock starting bonuses (200 AP)
- Cosmetics: UI themes, sound packs (25-50 AP)

### Achievements (Examples)

- **"Speed Demon"** - Clear 3 rounds in a row in under 20 seconds each
- **"No Mistakes"** - Complete a full run without any errors
- **"Synergy Master"** - Have 5+ synergy upgrades active simultaneously
- **"Hoarder"** - End a run with 500+ unspent data
- **"Underdog"** - Win a run using only common upgrades
- **"Puzzle Purist"** - Win without using any "Puzzle Breaker" abilities
- **"Archive Diver"** - Reach round 15
- **"Perfect Run"** - Score 2,000+ data in a single run

**Achievement rewards:** Archive Points + bragging rights

---

## Game Feel & Juice

### Visual Feedback

**When solving puzzles:**
- Smooth animations for placing guesses
- Satisfying "ping" sound for correct feedback
- Screen shake on puzzle completion
- Data fragments "fly" into your counter with particle effects

**In the shop:**
- Upgrades glow when you can afford them
- Hover effects show synergy connections
- Purchase animation feels chunky and satisfying
- Reroll has a slot-machine-style spin

**UI/UX:**
- Clean, minimal, readable
- Matrix-style green/black aesthetic (or customizable)
- Scanlines and CRT effects (optional)
- Glitch effects when viruses appear

### Audio Design

**Music:**
- Chill electronic beats during puzzles (not distracting)
- Tension builds with timer running low
- Triumphant sting on puzzle clear
- Darker, more intense music for boss rounds

**SFX:**
- Satisfying "click" for inputs
- "Incorrect" buzz (not annoying)
- "Correct" chime (rewarding)
- Data collection sounds like coins/pickups
- Shop purchase has a meaty "ker-chunk"

### Pacing

**Fast rounds:** 30-60 seconds per puzzle (when doing well)
**Shop time:** No rush, let players think
**Full run:** 15-30 minutes
**Between runs:** Quick reset, straight into next run

---

## Lore & Theming

### Setting: The Digital Depths

**Premise:**
You are a **Meta Hunter** - a digital infiltrator who dives into corrupted network systems to purge malicious code. The "puzzles" are security protocols you must crack to gain deeper access. Each run takes you further into a compromised system.

**The World:**
- **Surface Net** (Rounds 1-4): Corporate firewalls, basic encryption
- **Deep Net** (Rounds 5-8): Government databases, advanced security
- **Dark Net** (Rounds 9-12): Criminal networks, chaotic and dangerous
- **The Core** (Boss): The source of corruption - pure, hostile AI

**Why it matters:**
- Gives context to puzzle variety (different orgs use different security)
- Explains why it gets harder (you're going deeper)
- Viruses are actual malware trying to stop you
- Abilities are "exploits" you've developed

### Narrative Framing (Minimal but present)

**Between runs:**
- Brief text snippets from your "handler" (mysterious contact)
- Hints about what's corrupting the systems
- Unlocking lore entries as you progress

**Boss encounters:**
- Each boss has a name and brief personality
- "The Firewall" - Aggressive, militaristic
- "The Encryption Core" - Cold, calculating
- "The Virus Hive" - Chaotic, swarming

**Endgame reveal (after 10+ wins):**
- The corruption is actually YOU from the future
- Paradox twist that explains the roguelite loop
- Philosophical question about digital consciousness

*This is optional flavor - game works fine without it, but adds depth for those who care.*

---

## Accessibility & Difficulty Balance

### Difficulty Considerations

**For casual players:**
- Training mode exists
- Can win with any build if they learn patterns
- Multipliers and defensive upgrades help consistency

**For hardcore players:**
- Expert and Glitch modes provide challenge
- Achievements reward mastery
- Speedrun potential
- Optimal build theory crafting

**For puzzle lovers:**
- Pure skill expression - no RNG in puzzle solutions
- Can get better through practice
- Different puzzle types appeal to different minds

### Accessibility Features

- **Colorblind modes** (for color-based puzzles)
- **Font size options** (for readability)
- **Audio cues** (for visual puzzles)
- **Timer toggle** (for accessibility, disables leaderboards)
- **Practice mode** (try puzzle types without pressure)

---

## Technical Considerations

### MVP Feature Set (Version 1.0)

**Must Have:**
- 3 puzzle types (Mastermind, Circuit, Pattern)
- 15-20 upgrades
- 8-round runs
- Basic shop system
- Meta-progression (unlocks)
- 1 difficulty mode
- Sound effects

**Should Have:**
- 4 puzzle types (add Logic Gates)
- 25 upgrades
- 12-round runs with boss
- Achievement system
- 2 difficulty modes
- Music tracks

**Nice to Have:**
- 6 puzzle types (all of them)
- 30+ upgrades
- Multiple boss types
- Daily challenge mode
- Leaderboards
- UI themes

### Platform Considerations

**Web Version (Recommended MVP):**
- Easiest to iterate
- Instant playtesting
- Can share with friends easily
- HTML5 canvas or React-based

**GBA Version (Post-MVP):**
- Retro aesthetic fits theme
- Limited colors = stylistic choice
- Tactile feel of hardware
- Requires more technical work

**Mobile Version (If successful):**
- Touch controls work well for these puzzles
- Can add IAP for cosmetics (ethical monetization)
- Larger audience reach

---

## Success Metrics

### What makes this game good?

**Player retention:**
- Average of 5+ runs per session
- 50%+ of players unlock second difficulty
- 25%+ of players reach 10+ wins

**Engagement:**
- Average run time: 20 minutes
- Players discover synergies naturally
- "One more run" factor is high

**Fun factors:**
- Clear moments of mastery (getting better at puzzles)
- Build variety (no two runs feel identical)
- Fair difficulty (losses feel like learning, not BS)

### What could go wrong?

**Too easy:** Players win every run → No tension
- Fix: Tune difficulty curve, add harder modes

**Too hard:** Players can't reach round 6 → Frustration
- Fix: Add more defensive upgrades, easier early rounds

**Too samey:** Runs feel identical → Boring
- Fix: More upgrade variety, more puzzle types

**Too grindy:** Takes forever to unlock stuff → Tedious
- Fix: Faster Archive Point gains, more unlocks per win

---

## Monetization (If applicable)

### Free-to-play (Ethical)

**Free forever:**
- Full game, all puzzle types, all difficulty modes
- No ads, no paywalls, no energy systems

**Optional cosmetics ($1-3 each):**
- UI themes (cyberpunk, retro terminal, vaporwave)
- Sound packs (chiptune, synthwave, lo-fi)
- Puzzle skins (different visual styles)

**Support the dev:**
- "Buy me a coffee" button
- Name in credits for supporters

### Premium ($5-10)

**Pay once, own forever:**
- No microtransactions
- All content included
- Free updates

**This is the recommended model for GBA or Steam release.**

---

## Development Priorities

### Phase 1: Prototype (Week 1-2)

**Goal:** Prove the core loop is fun

**Build:**
- Mastermind puzzle (functional, not pretty)
- Simple shop with 5 upgrades
- 5-round run structure
- Basic scoring

**Test:**
- Is solving Mastermind fun?
- Do upgrades feel impactful?
- Do you want to play again?

### Phase 2: Expand (Week 3-4)

**Goal:** Add variety

**Build:**
- Add Circuit and Pattern puzzles
- 10+ upgrades
- Shop appears every 2 rounds
- 8-round runs
- Basic meta-progression (unlocks)

**Test:**
- Do different puzzles feel distinct?
- Are there interesting build choices?
- Does progression feel rewarding?

### Phase 3: Polish (Week 5-6)

**Goal:** Make it feel good

**Build:**
- Add sound effects and music
- Juice up animations
- Balance difficulty curve
- Add achievements
- Boss puzzle

**Test:**
- Does it feel satisfying?
- Is the difficulty fair?
- Do people want to show it to friends?

### Phase 4: Content (Week 7-8)

**Goal:** Depth and replayability

**Build:**
- Add Logic Gates and Frequency puzzles
- 25+ upgrades
- Multiple difficulty modes
- More achievements
- UI polish

**Test:**
- Can players find new strategies?
- Is there enough content for 10+ hours?
- Are there "build archetypes"?

### Phase 5: Release Prep (Week 9-10)

**Goal:** Ship it!

**Build:**
- Tutorial/onboarding
- Settings menu
- Credits
- Trailer/screenshots
- itch.io page or Steam page

**Test:**
- Can a new player figure it out?
- Are there any major bugs?
- Is it ready to show the world?

---

## Why This Will Work

### Market Fit

**Proven formula:** Balatro showed there's huge appetite for roguelite deck/puzzle builders
**Unique twist:** Code-cracking is different enough to stand out
**Broad appeal:** Puzzle fans + roguelite fans + hacking aesthetic fans

### Scope is Achievable

**You don't need:**
- Complex art (minimal UI can be beautiful)
- Story/dialogue (light lore is enough)
- Multiplayer (single-player is perfect)
- Massive content (20 hours of gameplay is plenty)

**You DO need:**
- Solid core loop (design this well)
- Interesting upgrades (where the magic happens)
- Good balance (playtest and iterate)
- Nice game feel (juice makes it satisfying)

### Your Strengths Align

**Project management:** Breaking this into phases, hitting milestones
**Automation background:** Understanding systems and logic
**Creative tech interest:** Making cool interactions and synergies
**Trading card knowledge:** Understanding build variety and meta

---

## Next Steps

1. **Review this doc** - Make sure this is the game you want to make
2. **Build the roadmap** (see separate document)
3. **Prototype in web** - Fastest path to testing the core loop
4. **Playtest early** - Get feedback from friends
5. **Iterate based on fun** - If it's not fun in week 2, pivot
6. **Polish relentlessly** - Game feel makes or breaks this
7. **Ship it** - Done is better than perfect

---

**Remember:** Balatro was made by one person. This is totally doable. The key is focus, iteration, and making sure the core loop is genuinely fun. Everything else is just content and polish.

Let's build something great! 🎮🔓

