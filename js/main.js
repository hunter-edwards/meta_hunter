/**
 * Meta Hunter - Main Game Controller
 *
 * Initializes the game and manages the Mastermind puzzle UI
 */

import { MastermindPuzzle } from './puzzles/mastermind.js';

class MetaHunterGame {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.puzzle = null;
        this.timerInterval = null;

        // UI Elements
        this.ui = {
            mastermindUI: document.getElementById('mastermind-ui'),
            guessInput: document.getElementById('guess-input'),
            submitButton: document.getElementById('submit-guess'),
            guessHistory: document.getElementById('guess-history'),
            timer: document.getElementById('timer'),
            attemptsRemaining: document.getElementById('attempts-remaining'),
            message: document.getElementById('game-message')
        };

        this.init();
    }

    /**
     * Initialize the game
     */
    init() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        this.setupEventListeners();
        this.startNewPuzzle();
        this.startGameLoop();

        console.log('Meta Hunter initialized!');
        console.log('Cheat code - Solution:', this.puzzle.revealSolution().join(''));
    }

    /**
     * Resize canvas to fill screen
     */
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    /**
     * Set up event listeners for UI interactions
     */
    setupEventListeners() {
        console.log('Setting up event listeners...');
        console.log('Submit button:', this.ui.submitButton);
        console.log('Input field:', this.ui.guessInput);

        // Submit guess on button click
        this.ui.submitButton.addEventListener('click', (e) => {
            console.log('Button clicked!');
            e.preventDefault();
            this.handleGuessSubmit();
        });

        // Submit guess on Enter key
        this.ui.guessInput.addEventListener('keypress', (e) => {
            console.log('Key pressed:', e.key);
            if (e.key === 'Enter') {
                e.preventDefault();
                this.handleGuessSubmit();
            }
        });

        // Only allow numbers
        this.ui.guessInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });

        console.log('Event listeners set up successfully!');
    }

    /**
     * Start a new Mastermind puzzle
     */
    startNewPuzzle(difficulty = 0) {
        // Clear any existing timer
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }

        // Create new puzzle (difficulty 0 = 3 digits, easier!)
        this.puzzle = new MastermindPuzzle(difficulty);

        // Reset UI
        this.ui.guessHistory.innerHTML = '';
        this.ui.guessInput.value = '';
        this.ui.guessInput.disabled = false;
        this.ui.submitButton.disabled = false;
        this.ui.message.textContent = '';
        this.ui.message.className = 'message';
        this.ui.guessInput.placeholder = `Enter ${this.puzzle.codeLength}-digit code (0-9)`;
        this.ui.guessInput.maxLength = this.puzzle.codeLength;

        // Update stats
        this.updateUI();

        // Start timer
        this.startTimer();

        // Focus input
        this.ui.guessInput.focus();
    }

    /**
     * Handle guess submission
     */
    handleGuessSubmit() {
        try {
            console.log('Guess submitted!');
            const input = this.ui.guessInput.value.trim();
            console.log('Input:', input);

            // Validate input length
            if (input.length !== this.puzzle.codeLength) {
                this.showMessage(
                    `Enter exactly ${this.puzzle.codeLength} digits`,
                    'error'
                );
                return;
            }

            // Make the guess
            const result = this.puzzle.makeGuess(input);
            console.log('Result:', result);

            if (!result.success) {
                this.showMessage(result.error, 'error');
                return;
            }

            // Add guess to history
            this.addGuessToHistory(
                input,
                result.feedback,
                this.puzzle.guesses.length
            );

            // Clear input
            this.ui.guessInput.value = '';

            // Update UI
            this.updateUI();

            // Check if game is over
            if (result.won) {
                this.handleWin(result);
            } else if (this.puzzle.isComplete) {
                this.handleLoss(result);
            }
        } catch (error) {
            console.error('Error in handleGuessSubmit:', error);
            this.showMessage('An error occurred: ' + error.message, 'error');
        }
    }

    /**
     * Add a guess to the history display
     */
    addGuessToHistory(guess, feedback, guessNumber) {
        const entry = document.createElement('div');
        entry.className = 'guess-entry';

        entry.innerHTML = `
            <span class="guess-number">#${guessNumber}</span>
            <span class="guess-code">${guess}</span>
            <div class="guess-feedback">
                <div class="feedback-item feedback-black">
                    <span>⬢</span>
                    <span>${feedback.black}</span>
                </div>
                <div class="feedback-item feedback-white">
                    <span>⬡</span>
                    <span>${feedback.white}</span>
                </div>
            </div>
        `;

        this.ui.guessHistory.appendChild(entry);

        // Scroll to bottom
        this.ui.guessHistory.scrollTop = this.ui.guessHistory.scrollHeight;
    }

    /**
     * Update UI elements with current game state
     */
    updateUI() {
        const state = this.puzzle.getState();
        this.ui.attemptsRemaining.textContent = state.attemptsRemaining;
        this.ui.timer.textContent = Math.ceil(state.timeRemaining);
    }

    /**
     * Start the countdown timer
     */
    startTimer() {
        this.timerInterval = setInterval(() => {
            const timeRemaining = this.puzzle.getTimeRemaining();
            this.ui.timer.textContent = Math.ceil(timeRemaining);

            // Check if time's up
            if (timeRemaining <= 0) {
                this.handleTimeout();
            }
        }, 100); // Update 10 times per second for smooth countdown
    }

    /**
     * Handle timeout
     */
    handleTimeout() {
        clearInterval(this.timerInterval);
        this.puzzle.isComplete = true;
        this.ui.guessInput.disabled = true;
        this.ui.submitButton.disabled = true;

        this.showMessage(
            `Time's up! The code was: ${this.puzzle.solution.join('')}`,
            'error'
        );
    }

    /**
     * Handle puzzle win
     */
    handleWin(result) {
        clearInterval(this.timerInterval);
        this.ui.guessInput.disabled = true;
        this.ui.submitButton.disabled = true;

        this.showMessage(
            `${result.message} Score: ${result.score} data`,
            'success'
        );

        // Show restart option after a delay
        setTimeout(() => {
            if (confirm('Code cracked! Start a new puzzle?')) {
                this.startNewPuzzle();
            }
        }, 1500);
    }

    /**
     * Handle puzzle loss
     */
    handleLoss(result) {
        clearInterval(this.timerInterval);
        this.ui.guessInput.disabled = true;
        this.ui.submitButton.disabled = true;

        this.showMessage(result.message, 'error');

        // Show restart option after a delay
        setTimeout(() => {
            if (confirm('System locked! Try again?')) {
                this.startNewPuzzle();
            }
        }, 1500);
    }

    /**
     * Show a message to the player
     */
    showMessage(text, type = 'info') {
        this.ui.message.textContent = text;
        this.ui.message.className = `message ${type}`;
    }

    /**
     * Main game loop
     */
    update(timestamp) {
        // For now, just clear the canvas
        // Later this will render background effects
        this.render();
    }

    /**
     * Render the game
     */
    render() {
        // Clear canvas
        this.ctx.fillStyle = '#0a0e0f';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw matrix-style background effect (optional)
        this.drawMatrixBackground();
    }

    /**
     * Draw subtle matrix-style background
     */
    drawMatrixBackground() {
        const now = Date.now();
        const speed = 0.02;

        // Draw faint grid lines
        this.ctx.strokeStyle = 'rgba(0, 255, 65, 0.03)';
        this.ctx.lineWidth = 1;

        const gridSize = 40;
        const offsetY = (now * speed) % gridSize;

        // Vertical lines
        for (let x = 0; x < this.canvas.width; x += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }

        // Horizontal lines
        for (let y = -gridSize; y < this.canvas.height; y += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y + offsetY);
            this.ctx.lineTo(this.canvas.width, y + offsetY);
            this.ctx.stroke();
        }
    }

    /**
     * Start the game loop
     */
    startGameLoop() {
        const loop = (timestamp) => {
            this.update(timestamp);
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    }
}

// Global error handler
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    console.error('Message:', e.message);
    console.error('Filename:', e.filename);
    console.error('Line:', e.lineno);
});

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing game...');
    try {
        window.game = new MetaHunterGame();
        console.log('Game initialized successfully!');
    } catch (error) {
        console.error('Failed to initialize game:', error);
        document.body.innerHTML = `
            <div style="color: #ff0080; padding: 20px; font-family: monospace;">
                <h1>Error Loading Game</h1>
                <p>Check the console for details.</p>
                <pre>${error.message}\n${error.stack}</pre>
            </div>
        `;
    }
});

// Also try to initialize if already loaded
if (document.readyState === 'loading') {
    console.log('Document is still loading...');
} else {
    console.log('Document already loaded, initializing immediately...');
    try {
        window.game = new MetaHunterGame();
    } catch (error) {
        console.error('Failed to initialize game:', error);
    }
}
