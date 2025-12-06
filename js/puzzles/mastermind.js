/**
 * MastermindPuzzle - Classic code-breaking puzzle
 *
 * Player must guess a hidden code within limited attempts and time.
 * Feedback indicates correct digits in correct positions (black) and
 * correct digits in wrong positions (white).
 */

export class MastermindPuzzle {
    constructor(difficulty = 1) {
        this.difficulty = difficulty;
        this.codeLength = Math.min(difficulty + 3, 6); // 4, 5, or 6 digits
        this.maxGuesses = Math.max(10 - difficulty, 6); // 10, 9, or 8 guesses
        this.solution = this.generateCode();
        this.guesses = [];
        this.feedback = [];
        this.timer = 60; // 60 seconds
        this.startTime = Date.now();
        this.isComplete = false;
        this.isWon = false;
    }

    /**
     * Generate a random code of specified length
     * @returns {number[]} Array of digits 0-9
     */
    generateCode() {
        const code = [];
        for (let i = 0; i < this.codeLength; i++) {
            code.push(Math.floor(Math.random() * 10));
        }
        return code;
    }

    /**
     * Make a guess and receive feedback
     * @param {number[]|string} guess - The guessed code
     * @returns {Object} Result object with success status and feedback
     */
    makeGuess(guess) {
        // Convert string to array if needed
        if (typeof guess === 'string') {
            guess = guess.split('').map(Number);
        }

        // Validate guess
        if (!this.validateGuess(guess)) {
            return {
                success: false,
                error: `Invalid guess. Must be ${this.codeLength} digits (0-9)`
            };
        }

        // Check if game is already over
        if (this.isComplete) {
            return {
                success: false,
                error: 'Game is already complete'
            };
        }

        // Calculate feedback
        const feedback = this.getFeedback(guess);
        this.guesses.push([...guess]);
        this.feedback.push(feedback);

        // Check win condition
        if (this.checkWin(feedback)) {
            this.isComplete = true;
            this.isWon = true;
            return {
                success: true,
                won: true,
                feedback,
                message: 'Code cracked! System breached!',
                score: this.calculateScore()
            };
        }

        // Check lose condition (out of attempts)
        if (this.guesses.length >= this.maxGuesses) {
            this.isComplete = true;
            this.isWon = false;
            return {
                success: true,
                won: false,
                feedback,
                message: `System locked! The code was: ${this.solution.join('')}`,
                solution: this.solution
            };
        }

        // Continue playing
        return {
            success: true,
            won: false,
            feedback,
            attemptsRemaining: this.maxGuesses - this.guesses.length
        };
    }

    /**
     * Validate a guess
     * @param {number[]} guess
     * @returns {boolean}
     */
    validateGuess(guess) {
        if (!Array.isArray(guess)) return false;
        if (guess.length !== this.codeLength) return false;
        return guess.every(digit =>
            Number.isInteger(digit) && digit >= 0 && digit <= 9
        );
    }

    /**
     * Calculate feedback for a guess using Mastermind rules
     * @param {number[]} guess
     * @returns {Object} Feedback with black and white pegs
     */
    getFeedback(guess) {
        let black = 0; // Correct position
        let white = 0; // Correct number, wrong position

        // Create copies to track what's been matched
        const solutionCopy = [...this.solution];
        const guessCopy = [...guess];

        // First pass: find black pegs (exact matches)
        for (let i = 0; i < this.codeLength; i++) {
            if (guessCopy[i] === solutionCopy[i]) {
                black++;
                solutionCopy[i] = -1; // Mark as used
                guessCopy[i] = -2;    // Mark as used
            }
        }

        // Second pass: find white pegs (correct digit, wrong position)
        for (let i = 0; i < this.codeLength; i++) {
            if (guessCopy[i] >= 0) { // Not already matched
                const index = solutionCopy.indexOf(guessCopy[i]);
                if (index !== -1) {
                    white++;
                    solutionCopy[index] = -1; // Mark as used
                }
            }
        }

        return { black, white };
    }

    /**
     * Check if the puzzle is won
     * @param {Object} feedback
     * @returns {boolean}
     */
    checkWin(feedback) {
        return feedback.black === this.codeLength;
    }

    /**
     * Get remaining time in seconds
     * @returns {number}
     */
    getTimeRemaining() {
        const elapsed = (Date.now() - this.startTime) / 1000;
        return Math.max(0, this.timer - elapsed);
    }

    /**
     * Check if time has run out
     * @returns {boolean}
     */
    isTimedOut() {
        return this.getTimeRemaining() <= 0;
    }

    /**
     * Calculate score based on performance
     * @returns {number} Data fragments earned
     */
    calculateScore() {
        const timeBonus = Math.floor(this.getTimeRemaining() * 2);
        const accuracyBonus = (this.maxGuesses - this.guesses.length) * 10;
        const baseReward = 50;

        return baseReward + timeBonus + accuracyBonus;
    }

    /**
     * Get current game state
     * @returns {Object}
     */
    getState() {
        return {
            difficulty: this.difficulty,
            codeLength: this.codeLength,
            maxGuesses: this.maxGuesses,
            guesses: [...this.guesses],
            feedback: [...this.feedback],
            attemptsRemaining: this.maxGuesses - this.guesses.length,
            timeRemaining: this.getTimeRemaining(),
            isComplete: this.isComplete,
            isWon: this.isWon,
            isTimedOut: this.isTimedOut()
        };
    }

    /**
     * Cheat code: reveal the solution (for testing)
     * @returns {number[]}
     */
    revealSolution() {
        return [...this.solution];
    }
}
