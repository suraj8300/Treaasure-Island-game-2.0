// Game logic for Treasure Island

let maxAttempts = 20;
let attemptsLeft = maxAttempts;
let score = 0;

// Generate random treasure position on the map
const treasure = {
    x: Math.floor(Math.random() * 100),
    y: Math.floor(Math.random() * 100)
};

// Function to calculate distance between two points
function getDistance(event, treasure) {
    const map = event.target;
    const rect = map.getBoundingClientRect();
    const clickX = ((event.clientX - rect.left) / rect.width) * 100;
    const clickY = ((event.clientY - rect.top) / rect.height) * 100;
    
    const distance = Math.sqrt((clickX - treasure.x) ** 2 + (clickY - treasure.y) ** 2);
    return distance;
}

// Function to provide hint based on distance
function getHint(distance) {
    if (distance < 5) {
        return "You're on fire!";
    } else if (distance < 15) {
        return "You're very warm!";
    } else if (distance < 30) {
        return "You're warm!";
    } else if (distance < 50) {
        return "You're cold!";
    } else {
        return "You're freezing!";
    }
}

// Function to handle click on the map
function handleClick(event) {
    if (attemptsLeft > 0) {
        attemptsLeft--;

        const distance = getDistance(event, treasure);
        const hint = getHint(distance);

        document.getElementById("status").textContent = hint;
        document.getElementById("attempts").textContent = attemptsLeft;

        // Check if the player found the treasure
        if (distance < 5) {
            score += attemptsLeft * 10; // Higher score for fewer attempts
            document.getElementById("status").textContent = "You found the treasure!";
            document.getElementById("score").textContent = score;
            document.getElementById("map").removeEventListener('click', handleClick);
        }
    } else {
        document.getElementById("status").textContent = "Game over! No more attempts left.";
    }
}

// Add event listener to the map for clicks
document.getElementById("map").addEventListener('click', handleClick);

// Reset game function
function resetGame() {
    attemptsLeft = maxAttempts;
    score = 0;
    document.getElementById("status").textContent = "Click anywhere on the map to start the game!";
    document.getElementById("attempts").textContent = attemptsLeft;
    document.getElementById("score").textContent = score;
    treasure.x = Math.floor(Math.random() * 100);
    treasure.y = Math.floor(Math.random() * 100);
    document.getElementById("map").addEventListener('click', handleClick);
}
