let canvas;
let world;
let keyboard = new Keyboard();

/**
 * Initializes the game by setting up the level, canvas, and world.
 */
function init() {
    initLevel();
    document.getElementById('game-container').classList.add('d-block');
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

/**
 * Toggles the game's mute state and updates the mute button icon.
 */
function muteGame() {
    world.isMuted = !world.isMuted;
    const muteIcon = document.getElementById('btn-mute');
    if (world.isMuted) {
        setVolume(0);
        muteIcon.innerHTML = mutedSVG();
    } else {
        setVolume(1);
        muteIcon.innerHTML = unmutedSVG();
    }
}

/**
 * Sets the volume of game sounds based on the provided level.
 * @param {number} level - The volume level (0 for mute, 1 for full volume).
 */
function setVolume(level) {
    world.soundtrack.volume = level ? 0.2 : 0;
    world.bottle_sound.volume = level;
    world.collect_sound.volume = level;
    world.chicken.volume = level ? 0.8 : 0;
    world.character.running.volume = level;
    world.character.jumping.volume = level;
}

/**
 * Returns the SVG markup for the muted icon.
 * @returns {string} SVG markup for the muted icon.
 */
function mutedSVG() {
    return '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#802000cc"><path d="M792-56 671-177q-25 16-53 27.5T560-131v-82q14-5 27.5-10t25.5-12L480-368v208L280-360H120v-240h128L56-792l56-56 736 736-56 56Zm-8-232-58-58q17-31 25.5-65t8.5-70q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 53-14.5 102T784-288ZM650-422l-90-90v-130q47 22 73.5 66t26.5 96q0 15-2.5 29.5T650-422ZM480-592 376-696l104-104v208Zm-80 238v-94l-72-72H200v80h114l86 86Zm-36-130Z"/></svg>';
}

/**
 * Returns the SVG markup for the unmuted icon.
 * @returns {string} SVG markup for the unmuted icon.
 */
function unmutedSVG() {
    return '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#802000cc"><path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z"/></svg>';
}

/**
 * Displays the game menu by hiding the game container and showing the start screen.
 */
function gameMenu() {
    document.getElementById('game-container').classList.remove('d-block');
    document.getElementById('start-screen').classList.remove('d-none');
    document.getElementById('play-again-button').classList.add('d-none');
    location.reload();
}

function replay() {

    if (world) {
        world.clearAllIntervals();
    }


    world.isGameOver = false;
    world.isGameWon = false;


    initLevel();
    world = new World(canvas, keyboard);
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('play-again-button').classList.add('d-none');
});

document.addEventListener('DOMContentLoaded', () => {
    const playAgainButton = document.getElementById('play-again-button');

    if (playAgainButton) {
        playAgainButton.onclick = function () {
            replay();
            playAgainButton.classList.add('d-none');
        };
    } else {
        console.error('Play Again button not found');
    }
});

/**
 * Event listener for keydown events to handle user input.
 */
window.addEventListener("keydown", (e) => {
    handleKeyPress(e, true);
});

/**
 * Event listener for keyup events to handle user input.
 */
window.addEventListener("keyup", (e) => {
    handleKeyPress(e, false);
});

/**
 * Handles key press events to update the keyboard object.
 * @param {KeyboardEvent} e - The keyboard event object.
 * @param {boolean} isPressed - Whether the key is pressed (true) or released (false).
 */
function handleKeyPress(e, isPressed) {
    switch (e.keyCode) {
        case 39: keyboard.RIGHT = isPressed; break;
        case 37: keyboard.LEFT = isPressed; break;
        case 38: keyboard.UP = isPressed; break;
        case 40: keyboard.DOWN = isPressed; break;
        case 32: keyboard.SPACE = isPressed; break;
        case 68: keyboard.D = isPressed; break;
    }
}
