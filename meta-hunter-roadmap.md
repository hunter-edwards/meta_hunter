# Meta Hunter - Development Roadmap
**10-Week Plan to a Shippable Game**

---

## Overview

This roadmap takes you from "zero to shipped" in 10 weeks. It's aggressive but achievable if you dedicate 10-15 hours per week. The key is **ruthless focus** - we're building the minimum viable game that's genuinely fun, then iterating.

**Core Philosophy:**
- ✅ Build → Test → Iterate (fast loops)
- ✅ Playable at every milestone
- ✅ Cut features ruthlessly if not fun
- ✅ Ship something real, not something perfect

---

## Platform Decision Tree

Before starting, choose your path:

### Option A: Web Prototype → GBA Port (RECOMMENDED)
**Timeline:** 8 weeks web + 2 weeks GBA port
**Pros:** 
- Fastest iteration
- Easy playtesting (just send a link)
- Can pivot quickly
- If GBA is too hard, you still have a shippable game

**Cons:**
- Need to learn basic HTML/CSS/JavaScript
- GBA port might lose some features

**Best for:** Testing if the game is fun before committing to hardware

### Option B: Pure GBA Development
**Timeline:** 10 weeks GBA-only
**Pros:**
- Retro aesthetic from day one
- Forces creative constraints
- Feels more "real" on hardware

**Cons:**
- Slower iteration (compile → test → debug)
- Harder to share with playtesters
- Steeper learning curve

**Best for:** If you're committed to GBA and enjoy the technical challenge

### Option C: GB Studio
**Timeline:** 6-8 weeks
**Pros:**
- No coding required
- Fast iteration
- Built-in testing tools

**Cons:**
- Limited for complex puzzle UIs
- May not support all puzzle types well
- Harder to do Balatro-style shop mechanics

**Best for:** If you want to avoid coding entirely

**MY RECOMMENDATION: Start with Option A.** Build a web prototype in weeks 1-8, decide if it's fun, THEN port to GBA if you want. You can always hire someone to do the GBA port if needed.

---

## 10-Week Breakdown

### WEEK 1-2: FOUNDATION + CORE LOOP
**Goal:** Prove the Mastermind puzzle is fun

#### Week 1: Setup & First Puzzle
**Time commitment:** 10-12 hours

**Tasks:**
- [ ] Set up development environment
  - HTML/CSS/JavaScript files
  - Basic project structure
  - Version control (git)
- [ ] Create Mastermind puzzle logic
  - Generate random 4-digit code
  - Accept player guesses
  - Provide feedback (⚫⚪)
  - Detect win/loss
- [ ] Basic UI
  - Input field for guesses
  - Display past guesses and feedback
  - Simple styling (doesn't need to be pretty)

**Deliverable:** Playable Mastermind puzzle (no time limit, no scoring)

**Success Metric:** You can solve it and it feels satisfying

#### Week 2: Scoring & Shop Skeleton
**Time commitment:** 10-12 hours

**Tasks:**
- [ ] Add scoring system
  - Timer (60 seconds)
  - Speed bonus calculation
  - Accuracy bonus calculation
  - Data fragments earned
- [ ] Create basic shop
  - Display 3 upgrade options
  - Can "purchase" with data (just text, no functionality yet)
  - Shop appears after round 1
- [ ] Implement 3 simple upgrades:
  - "Extra Time" (+15 seconds)
  - "Brute Force" (reveal 1 digit)
  - "Speed Bonus" (+25% data for fast solves)

**Deliverable:** Can play 1 round → shop → round 2 with upgrades working

**Success Metric:** Upgrades feel impactful, you want to try different builds

**CHECKPOINT:** If this isn't fun by end of week 2, STOP and rethink the concept. The core loop must be compelling before adding more.

---

### WEEK 3-4: VARIETY + PROGRESSION
**Goal:** Add replayability through puzzle variety and runs

#### Week 3: Add Circuit Puzzle
**Time commitment:** 12-15 hours

**Tasks:**
- [ ] Design Circuit puzzle generation
  - Create node grid (6x6)
  - Place inputs and outputs
  - Generate valid solution
- [ ] Implement Circuit UI
  - Drag-and-drop wire placement
  - Visual feedback for connections
  - Win detection
- [ ] Add Circuit to run rotation
  - 50/50 mix of Mastermind and Circuit
- [ ] Balance difficulty curve
  - Round 1-2: Easy (small grids)
  - Round 3-4: Medium
  - Round 5+: Hard

**Deliverable:** 5-round runs with mixed puzzle types

**Success Metric:** Circuit feels different from Mastermind, both are fun

#### Week 4: Pattern Puzzle + Meta-Progression
**Time commitment:** 12-15 hours

**Tasks:**
- [ ] Implement Pattern Memory puzzle
  - Display sequence of symbols (5-7)
  - Hide sequence after 3 seconds
  - Player recreates from memory
- [ ] Add meta-progression
  - Track total wins in localStorage
  - Unlock new upgrades after wins
  - Display "unlocked!" message
- [ ] Expand upgrade pool to 10 total
  - Mix of puzzle breakers and multipliers
  - Some locked at start, unlock with wins
- [ ] Add basic achievement tracking
  - "First Win"
  - "5 Wins"
  - "Perfect Round" (no mistakes)

**Deliverable:** 3 puzzle types, 10 upgrades, basic unlocks

**Success Metric:** You want to play "one more run" to unlock new stuff

---

### WEEK 5-6: JUICE + BOSS
**Goal:** Make it feel GOOD and add climax

#### Week 5: Game Feel & Polish
**Time commitment:** 10-12 hours

**Tasks:**
- [ ] Add sound effects
  - Correct guess: satisfying "ding"
  - Wrong guess: soft "buzz"
  - Data earned: "coin pickup" sound
  - Purchase: chunky "ker-chunk"
- [ ] Add visual feedback
  - Screen shake on puzzle complete
  - Data particles fly to counter
  - Smooth transitions between rounds
  - Hover effects in shop
- [ ] Polish UI
  - Consistent color scheme (green/black matrix theme)
  - Better fonts (monospace for hacker feel)
  - Animations for buttons
  - Progress bar showing run progress
- [ ] Add background music (simple loop)
  - Chill electronic for puzzles
  - Can be royalty-free from itch.io or OpenGameArt

**Deliverable:** Game feels satisfying to play

**Success Metric:** Friends say "wow this feels good" not just "this is fun"

#### Week 6: Boss Puzzle System
**Time commitment:** 12-15 hours

**Tasks:**
- [ ] Create multi-stage boss structure
  - Boss appears at round 8
  - 3 stages with increasing difficulty
  - Special rewards for beating boss
- [ ] Implement "The Firewall" boss
  - Stage 1: Mastermind (4-digit, 30sec timer)
  - Stage 2: Circuit (medium, with obstacles)
  - Stage 3: Mastermind (5-digit, 6 attempts)
- [ ] Add boss-specific UI
  - Health bar showing stages
  - Dramatic music switch
  - Victory screen with big data reward
- [ ] Boss victory unlocks
  - New difficulty mode
  - New upgrades
  - Achievement

**Deliverable:** 8-round runs ending in boss fight

**Success Metric:** Boss feels climactic and rewarding to beat

---

### WEEK 7-8: DEPTH + BALANCE
**Goal:** Add enough content for 10+ hours of gameplay

#### Week 7: Advanced Puzzles + Difficulty Modes
**Time commitment:** 12-15 hours

**Tasks:**
- [ ] Implement Logic Gates puzzle
  - AND, OR, NOT gates
  - Route signals to outputs
  - Limited gate pieces
- [ ] Implement Frequency Tuning puzzle
  - 3 dials to adjust
  - Feedback shows proximity
  - Tighter tolerances = harder
- [ ] Add difficulty modes
  - Training Mode: More time, easier puzzles
  - Expert Mode: Less time, harder puzzles
  - Unlock Expert after 3 wins
- [ ] Expand upgrade pool to 25
  - Add synergy upgrades
  - Add "build archetype" enabling upgrades
- [ ] Balance economy
  - Data earnings per round
  - Upgrade costs
  - Make sure average run earns 1000-1200 data

**Deliverable:** 5 puzzle types, 25 upgrades, 2 difficulty modes

**Success Metric:** Different builds feel viable, no dominant strategy

#### Week 8: Achievement System + Second Boss
**Time commitment:** 12-15 hours

**Tasks:**
- [ ] Implement achievement tracking
  - 10-15 achievements
  - Track stats (total wins, perfect rounds, etc.)
  - Display in menu
  - Achievements award Archive Points
- [ ] Add Archive Point system
  - Earn AP from runs and achievements
  - Spend AP to unlock content
  - Persistent across runs
- [ ] Create second boss: "The Encryption Core"
  - Different structure than first boss
  - Requires different strategies
  - Unlock new upgrades/modes
- [ ] Playtest and balance
  - Invite 5-10 friends to play
  - Watch them play (don't help!)
  - Gather feedback on difficulty
  - Adjust based on data

**Deliverable:** Full progression system, 2 bosses, balanced difficulty

**Success Metric:** Playtesters want to keep playing after 30 minutes

---

### WEEK 9-10: POLISH + SHIP
**Goal:** Make it presentable and release it

#### Week 9: Tutorial + Settings + QoL
**Time commitment:** 10-12 hours

**Tasks:**
- [ ] Create tutorial
  - First run explains mechanics
  - Tooltips for each puzzle type
  - Shop tutorial on first purchase
  - Skippable after first run
- [ ] Add settings menu
  - Volume controls
  - Fullscreen toggle
  - Colorblind mode
  - Reset progress option
- [ ] Quality of life features
  - Pause menu
  - Keyboard shortcuts
  - Better data visualization
  - Stats screen (wins, losses, best run)
- [ ] Accessibility
  - Larger text option
  - Audio cues for visual feedback
  - Adjustable timer (disables leaderboards)

**Deliverable:** Polished, accessible game

**Success Metric:** New players can figure it out without help

#### Week 10: Marketing + Release
**Time commitment:** 10-12 hours

**Tasks:**
- [ ] Create itch.io page
  - Screenshots (5-7 good ones)
  - GIF showing gameplay
  - Compelling description
  - Tags: puzzle, roguelite, hacking
- [ ] Make trailer (optional but helpful)
  - 30-60 seconds
  - Show core loop
  - Show variety of puzzles
  - Show cool upgrades in action
- [ ] Release!
  - Upload to itch.io
  - Set price (free or $3-5)
  - Post on r/gamedev, r/incremental_games
  - Share on Twitter with #indiedev #gamedev
- [ ] Gather feedback
  - Check reviews
  - Monitor bug reports
  - Plan patch 1.1

**Deliverable:** Live game on itch.io

**Success Metric:** 100+ downloads in first week

---

## Weekly Time Commitment

**Minimum:** 10 hours/week
- 2 hours x 5 days
- OR 5 hours on weekend + 1 hour x 5 weekdays

**Recommended:** 12-15 hours/week
- More time for playtesting
- Buffer for unexpected challenges

**Maximum sustainable:** 20 hours/week
- Don't burn out
- This isn't a sprint, it's a marathon

---

## Risk Mitigation

### What if you fall behind?

**Week 3:** Cut Pattern puzzle, ship with just Mastermind + Circuit
**Week 5:** Skip music, focus on SFX
**Week 7:** Cut Logic Gates and Frequency, ship with 3 puzzle types
**Week 9:** Minimal tutorial, rely on intuitive design

**Golden rule:** A simple, polished game is better than a complex, buggy one.

### What if it's not fun?

**After Week 2:** If core loop isn't compelling, PIVOT
- Maybe simpler puzzles?
- Maybe different theme?
- Maybe turn-based combat instead?

**After Week 4:** If variety doesn't help, REDESIGN
- Could be the puzzle types
- Could be the upgrade system
- Could be the pacing

**After Week 6:** If it's still not clicking, SHELVE IT
- Don't throw good time after bad
- Document what you learned
- Start a new project with those lessons

### What if you want to add more?

**Post-launch content:**
- New puzzle types (1-2 weeks each)
- New bosses (1 week each)
- Daily challenge mode (1 week)
- Endless mode (3-4 days)
- UI themes (2-3 days each)

**Don't feature creep before launch!** Ship first, expand later.

---

## Tools & Resources

### Development (Web Version)

**Code editor:**
- VS Code (free, excellent)
- Sublime Text
- Atom

**Version control:**
- Git + GitHub (free)
- Commit frequently!
- Push to backup daily

**Testing:**
- Chrome DevTools (built-in)
- Firefox Developer Tools
- Test on mobile browsers too

**Frameworks (optional):**
- Vanilla JS is fine for this
- React if you know it
- Phaser.js for more game features

### Assets (All Free)

**Sounds:**
- freesound.org
- OpenGameArt.org
- BFXR (sound generator)
- Chiptone (retro sound generator)

**Music:**
- OpenGameArt.org
- incompetech.com (Kevin MacLeod)
- itch.io (search "music asset pack")

**Fonts:**
- Google Fonts (free, web-safe)
- "VT323" or "Courier Prime" for monospace
- "Orbitron" for futuristic feel

### Learning Resources

**JavaScript refresher:**
- javascript.info (comprehensive)
- MDN Web Docs (reference)
- freeCodeCamp (interactive)

**Game dev concepts:**
- gamedev.net
- YouTube: Brackeys, Game Maker's Toolkit
- itch.io devlogs (see what others do)

**Balatro breakdown:**
- Watch GDC talks on roguelite design
- Play Balatro and take notes
- Read Steam reviews for what people love

### Community

**Get feedback:**
- r/gamedev (weekly feedback thread)
- itch.io community
- GameDev Discord servers
- Show friends every 2 weeks

**Find playtesters:**
- r/playmygame
- itch.io devlog followers
- Twitter #gamedev community
- Friends/family (be ready for brutal honesty)

---

## Success Criteria

### MVP (Minimum Viable Product)

By Week 8, you should have:
- ✅ 3 puzzle types playable
- ✅ 15+ upgrades
- ✅ 8-round runs with boss
- ✅ Meta-progression (unlocks)
- ✅ Sound effects
- ✅ Balanced difficulty

If you have this, **ship it**. Everything else is bonus.

### Nice-to-Have (Weeks 9-10)

- ✅ Tutorial
- ✅ 5 puzzle types
- ✅ 25+ upgrades
- ✅ Achievements
- ✅ Multiple difficulty modes
- ✅ Music
- ✅ Polish and juice

### Post-Launch (After Week 10)

- New content patches
- Bug fixes
- Community feature requests
- GBA port (if web version succeeds)
- Mobile port
- Steam release (if it gets traction)

---

## Milestone Checklist

Print this out and check off as you go:

### Week 1
- [ ] Dev environment set up
- [ ] Mastermind puzzle playable
- [ ] Can solve 4-digit codes

### Week 2
- [ ] Scoring system working
- [ ] Shop appears between rounds
- [ ] 3 upgrades functional
- [ ] **CHECKPOINT: Is it fun?**

### Week 3
- [ ] Circuit puzzle playable
- [ ] Mixed puzzle runs work
- [ ] 5-round runs complete

### Week 4
- [ ] Pattern puzzle playable
- [ ] 10 upgrades in pool
- [ ] Basic unlocks working
- [ ] **CHECKPOINT: Want to play more?**

### Week 5
- [ ] Sound effects added
- [ ] Visual feedback polished
- [ ] UI looks coherent
- [ ] Music loop playing

### Week 6
- [ ] Boss fight implemented
- [ ] 8-round runs with climax
- [ ] Boss unlocks working
- [ ] **CHECKPOINT: Does boss feel epic?**

### Week 7
- [ ] 5 puzzle types total
- [ ] 25 upgrades in pool
- [ ] Difficulty modes working
- [ ] Economy balanced

### Week 8
- [ ] Achievements tracking
- [ ] Archive Points working
- [ ] Second boss added
- [ ] **CHECKPOINT: Ready for playtesters?**

### Week 9
- [ ] Tutorial completed
- [ ] Settings menu functional
- [ ] QoL features added
- [ ] Accessibility options

### Week 10
- [ ] itch.io page created
- [ ] Trailer/GIFs made
- [ ] Game uploaded
- [ ] **SHIPPED!**

---

## Post-Launch Plan

### Week 11: Gather Data
- Monitor analytics (plays, completion rate)
- Read reviews and comments
- Track bug reports
- Survey friends who played

### Week 12-13: Patch 1.1
- Fix critical bugs
- Balance based on data
- Add 1-2 most-requested features
- Respond to community

### Week 14+: Expand or Move On
**If successful (500+ downloads, positive reviews):**
- Add new content
- Consider GBA port
- Explore Steam release
- Build community

**If not successful:**
- Document lessons learned
- Start next project
- Don't take it personally
- Indie dev is a marathon, not a sprint

---

## Daily Development Routine

### Recommended workflow (2 hours/day):

**30 minutes:** Code/implement
- Focus on ONE feature
- No multitasking
- Use timer

**15 minutes:** Test
- Play what you just built
- Break it intentionally
- Fix obvious bugs

**30 minutes:** Polish
- Make it feel better
- Add juice
- Improve visuals

**15 minutes:** Reflect
- What worked?
- What's next?
- Update roadmap

**30 minutes:** Buffer
- Unexpected issues
- Research/learning
- Community engagement

### Weekly rhythm:

**Monday:** Plan the week's tasks
**Tuesday-Thursday:** Build features
**Friday:** Playtest and gather feedback
**Saturday:** Polish and juice
**Sunday:** Rest or catch up

---

## Motivation & Mindset

### When you feel stuck:
- Take a break (walk, coffee, sleep)
- Work on a different part of the game
- Ask for help online
- Remember: Every game developer faces this

### When you feel overwhelmed:
- Cut scope (ship smaller game)
- Focus on ONE thing at a time
- Break tasks into 30-minute chunks
- Celebrate small wins

### When you doubt yourself:
- Look at your progress from Week 1
- Remember: Balatro was one person
- You have skills others don't
- Shipping ANYTHING is an achievement

### When you're excited:
- Channel it into focused work
- Don't add scope (yet)
- Share progress with friends
- Keep momentum going

---

## Final Thoughts

**This is doable.** 10 weeks is tight but achievable. The key is:
1. Start simple
2. Test constantly
3. Cut ruthlessly
4. Ship something

**You don't need:**
- Perfect graphics
- Deep story
- Massive content
- Multiplayer
- Fancy tech

**You DO need:**
- Fun core loop
- Interesting decisions
- Good game feel
- Enough variety for replayability

**Remember:** Balatro sold millions of copies with simple graphics and tight gameplay. Meta Hunter can do the same if the core loop is solid.

Now stop reading and start building! 🚀

---

## Quick Reference

**Week 1-2:** Mastermind + Shop (prove it's fun)
**Week 3-4:** Add variety (3 puzzles, unlocks)
**Week 5-6:** Add juice (polish + boss)
**Week 7-8:** Add depth (5 puzzles, balance)
**Week 9-10:** Ship it! (tutorial, release)

**Daily:** 2 hours focused work
**Weekly:** 10-15 hours total
**Monthly:** Shippable milestone

**Ship by:** Week 10 (March 2025 if starting now)
**Post-launch:** Iterate based on feedback

Good luck! You've got this. 💪🎮

