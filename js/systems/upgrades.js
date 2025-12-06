/**
 * Upgrades Database
 *
 * Defines all available upgrades for the shop system
 */

export const UPGRADES = [
    // Tier 1: Basic upgrades (affordable, helpful)
    {
        id: 'extra-time',
        name: 'Time Dilation',
        description: 'Slows down the system clock, giving you more time to work.',
        effect: '+15 seconds on the timer',
        cost: 50,
        tier: 'common',
        apply: (puzzle) => {
            puzzle.timer += 15;
        }
    },
    {
        id: 'extra-attempts',
        name: 'Retry Protocol',
        description: 'Gain additional attempts before lockout.',
        effect: '+2 attempts per puzzle',
        cost: 60,
        tier: 'common',
        apply: (puzzle) => {
            puzzle.maxGuesses += 2;
        }
    },
    {
        id: 'speed-bonus',
        name: 'Speed Daemon',
        description: 'Earn bonus bits for solving puzzles quickly.',
        effect: '+25% bits for solving under 30 seconds',
        cost: 75,
        tier: 'common',
        stackable: true,
        modifyScore: (score, puzzle) => {
            const timeRemaining = puzzle.getTimeRemaining();
            const timeUsed = puzzle.timer - timeRemaining;
            if (timeUsed < 30) {
                return Math.floor(score * 1.25);
            }
            return score;
        }
    },
    {
        id: 'brute-force',
        name: 'Brute Force Algorithm',
        description: 'Reveals one random correct digit at the start of each puzzle.',
        effect: 'Reveals 1 digit position',
        cost: 100,
        tier: 'rare',
        onPuzzleStart: (puzzle) => {
            // Pick a random position and reveal it
            const randomPos = Math.floor(Math.random() * puzzle.codeLength);
            return {
                hint: `Position ${randomPos + 1} is: ${puzzle.solution[randomPos]}`,
                revealedPosition: randomPos,
                revealedDigit: puzzle.solution[randomPos]
            };
        }
    },
    {
        id: 'data-multiplier',
        name: 'Data Compression',
        description: 'Optimizes your data extraction efficiency.',
        effect: '+15% bits from all sources',
        cost: 80,
        tier: 'uncommon',
        stackable: true,
        modifyScore: (score) => {
            return Math.floor(score * 1.15);
        }
    },
    {
        id: 'perfect-bonus',
        name: 'Perfectionist Protocol',
        description: 'Massive bonus for flawless execution.',
        effect: '+50% bits for no mistakes',
        cost: 90,
        tier: 'uncommon',
        modifyScore: (score, puzzle) => {
            // Check if they got it right on the first try or used optimal guesses
            if (puzzle.guesses.length <= Math.ceil(puzzle.codeLength / 2)) {
                return Math.floor(score * 1.5);
            }
            return score;
        }
    }
];

/**
 * Get a random selection of upgrades for the shop
 * @param {number} count - Number of upgrades to return
 * @param {Array} ownedUpgrades - List of upgrade IDs already owned
 * @returns {Array} Random upgrades
 */
export function getRandomUpgrades(count = 3, ownedUpgrades = []) {
    // Filter out owned non-stackable upgrades
    const available = UPGRADES.filter(upgrade => {
        if (ownedUpgrades.includes(upgrade.id)) {
            return upgrade.stackable === true;
        }
        return true;
    });

    // Shuffle and take count
    const shuffled = [...available].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

/**
 * Apply all relevant upgrades to a puzzle
 * @param {MastermindPuzzle} puzzle - The puzzle instance
 * @param {Array} upgradeIds - List of owned upgrade IDs
 */
export function applyUpgrades(puzzle, upgradeIds) {
    upgradeIds.forEach(id => {
        const upgrade = UPGRADES.find(u => u.id === id);
        if (upgrade && upgrade.apply) {
            upgrade.apply(puzzle);
        }
    });
}

/**
 * Modify score based on owned upgrades
 * @param {number} baseScore - The base score from the puzzle
 * @param {MastermindPuzzle} puzzle - The puzzle instance
 * @param {Array} upgradeIds - List of owned upgrade IDs
 * @returns {number} Modified score
 */
export function modifyScore(baseScore, puzzle, upgradeIds) {
    let score = baseScore;

    upgradeIds.forEach(id => {
        const upgrade = UPGRADES.find(u => u.id === id);
        if (upgrade && upgrade.modifyScore) {
            score = upgrade.modifyScore(score, puzzle);
        }
    });

    return Math.floor(score);
}

/**
 * Get hints/effects that trigger at puzzle start
 * @param {MastermindPuzzle} puzzle - The puzzle instance
 * @param {Array} upgradeIds - List of owned upgrade IDs
 * @returns {Array} Array of hints/effects
 */
export function getPuzzleStartEffects(puzzle, upgradeIds) {
    const effects = [];

    upgradeIds.forEach(id => {
        const upgrade = UPGRADES.find(u => u.id === id);
        if (upgrade && upgrade.onPuzzleStart) {
            const effect = upgrade.onPuzzleStart(puzzle);
            if (effect) {
                effects.push({ ...effect, upgradeName: upgrade.name });
            }
        }
    });

    return effects;
}
