const gameState = {
    currentSticks: 0, // Aktuelle Anzahl der Streichhölzer im Spiel
    maxRemove: 3, // Maximale Anzahl an Streichhölzern, die entfernt werden können
    delay: 1000, // Verzögerungszeit für Computerzüge
};

function showPlayerInputPopup() {
    document.getElementById("playerInputPopup").classList.remove("hidden");
}

function submitPlayerTurn() {
    const inputElement = document.getElementById("playerInput");
    const sticksToRemove = parseInt(inputElement.value, 10);
    if (sticksToRemove >= 1 && sticksToRemove <= gameState.maxRemove) {
        document.getElementById("playerInputPopup").classList.add("hidden");
        processPlayerTurn(sticksToRemove);
    } else {
        displayMessage(`Ungültige Eingabe. Bitte wähle zwischen 1 und ${gameState.maxRemove}.`);
    }
}

function processPlayerTurn(sticksToRemove) {
    gameState.currentSticks -= sticksToRemove;
    displayMessage(`Spieler nimmt ${sticksToRemove} Streichhölzer.`);
    updateMatchsticksDisplay();
    setTimeout(continueGameAfterPlayerTurn, gameState.delay);
}

function continueGameAfterPlayerTurn() {
    if (gameState.currentSticks <= 0) {
        displayMessage("Spieler gewinnt!");
        showStartButton();
        return;
    }
    computerTurn();
}

function displayMessage(message) {
    document.getElementById("gameMessage").innerText = message;
}

function updateMatchsticksDisplay() {
    const matchsticksContainer = document.getElementById("matchsticks-inner");
    matchsticksContainer.innerHTML = '';
    for (let i = 0; i < gameState.currentSticks; i++) {
        matchsticksContainer.innerHTML += 
            '<div class="matchstickContainer">' +
                '<div class="matchstickHead"></div>' +
                '<div class="matchstick"></div>' +
            '</div>';
    }
}

function computerTurn() {
    let sticksToRemove = gameState.currentSticks % (gameState.maxRemove + 1);
    if (sticksToRemove === 0) sticksToRemove = 1;
    gameState.currentSticks -= sticksToRemove;
    displayMessage(`Computer nimmt ${sticksToRemove} Streichhölzer.`);
    updateMatchsticksDisplay();

    if (gameState.currentSticks <= 0) {
        displayMessage("Computer gewinnt!");
        showStartButton();
    } else {
        setTimeout(showPlayerInputPopup, gameState.delay);
    }
}

function showStartButton() {
    document.getElementById("startGameButton").style.display = 'block';
}

document.getElementById("startGameButton").addEventListener("click", function() {
    gameState.currentSticks = 21; // Anfangszustand des Spiels
    updateMatchsticksDisplay();
    this.style.display = 'none';
    computerTurn();
});