/**
 * Handles keyboard and touch events to control character movements in the game.
 */
class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;

    /**
     * Initializes the Keyboard object by setting up touch event listeners.
     * This constructor is called when the DOM content is loaded.
     */
    constructor() {
        document.addEventListener('DOMContentLoaded', () => {
            this.btnPressEvents();
        });
    }

    /**
     * Sets up touch event listeners for the control buttons.
     * Binds touch start and end events to the appropriate properties.
     */
    btnPressEvents() {
        this.addTouchEvent('btn-left', 'LEFT');
        this.addTouchEvent('btn-right', 'RIGHT');
        this.addTouchEvent('btn-jump', 'SPACE');
        this.addTouchEvent('btn-throw', 'D');
    }

    /**
     * Adds touch event listeners to a specific button element.
     * Updates the corresponding property based on touch events.
     * @param {string} buttonId - The ID of the button element.
     * @param {string} action - The property to set when the button is pressed or released.
     */
    addTouchEvent(buttonId, action) {
        const btn = document.getElementById(buttonId);
        if (btn) {
            btn.addEventListener('touchstart', () => {
                this[action] = true;
            }, { passive: true });

            btn.addEventListener('touchend', () => {
                this[action] = false;
            }, { passive: true });
        }
    }
}
