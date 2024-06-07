const gameContainer = document.getElementById('game-container');
const targetValue = document.getElementById('target-value');
const scoreValue = document.getElementById('score-value');
const player = document.getElementById('player');
const fallingNumbersDisplay = document.getElementById('falling-numbers-display');

let targets = generateTargets(6);
let currentTargetIndex = 0;
let collectedNumbers = [];
let score = 0;

updateTarget();

function generateTargets(count) {
    return Array.from({ length: count }, () => Math.floor(Math.random() * 20) + 1);
}

function updateTarget() {
    if (currentTargetIndex >= targets.length) {
        alert('Game Over! Your final score is: ' + score);
        currentTargetIndex = 0;
        score = 0;
        targets = generateTargets(6);
    }

    targetValue.textContent = targets[currentTargetIndex];
    scoreValue.textContent = score;
    collectedNumbers = [];
    resetFallingNumbers();
    createFallingNumbers();
}

function createFallingNumbers() {
    const targetNumber = targets[currentTargetIndex];
    const fallingNumbers = generateCombination(targetNumber, 6);

    // Display the numbers at the top before they start falling
    displayFallingNumbers(fallingNumbers);

    // Delay the falling process by 2 seconds
    setTimeout(() => {
        fallingNumbers.forEach((number, index) => {
            setTimeout(() => {
                const numberElement = document.createElement('div');
                numberElement.classList.add('falling-number');
                numberElement.textContent = number;
                numberElement.style.left = `${Math.random() * 100}%`;
                gameContainer.appendChild(numberElement);

                numberElement.addEventListener('animationend', () => {
                    if (gameContainer.contains(numberElement)) {
                        gameContainer.removeChild(numberElement);
                    }
                });

                numberElement.style.top = '-50px';
                const fallDuration = 3000;

                const fallInterval = setInterval(() => {
                    const numberRect = numberElement.getBoundingClientRect();
                    const playerRect = player.getBoundingClientRect();

                    if (numberRect.top >= window.innerHeight) {
                        clearInterval(fallInterval);
                        if (gameContainer.contains(numberElement)) {
                            gameContainer.removeChild(numberElement);
                        }
                    }

                    if (detectCollision(numberRect, playerRect)) {
                        collectedNumbers.push(number);
                        gameContainer.removeChild(numberElement);
                        clearInterval(fallInterval);
                    }
                }, 20);
            }, index * 1300); // Delay each falling number by 1.3 second
        });

        setTimeout(() => {
            checkTargetAchieved();
        }, fallingNumbers.length * 1000 + 1000); // Check after all numbers have fallen
    }, 3500); // Delay for displaying numbers for 2 seconds
}

function displayFallingNumbers(numbers) {
    fallingNumbersDisplay.textContent = 'Numbers: ' + numbers.join(', ');
    setTimeout(() => {
        fallingNumbersDisplay.textContent = '';
    }, 3500);
}

function generateCombination(target, count) {
    let numbers = [];
    while (numbers.length < count - 1) {
        const num = Math.floor(Math.random() * (target - 1)) + 1;
        numbers.push(num);
    }
    numbers.push(target - numbers.reduce((a, b) => a + b, 0));
    return numbers.sort(() => Math.random() - 0.5); // Shuffle the numbers
}

function detectCollision(rect1, rect2) {
    return (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
    );
}

function checkTargetAchieved() {
    const sum = collectedNumbers.reduce((acc, num) => acc + num, 0);

    if (sum === targets[currentTargetIndex]) {
        alert('You achieved the target!');
        score++;
    } else {
        alert('You did not achieve the target!');
        score--;
    }

    currentTargetIndex++;
    updateTarget();
    scoreValue.textContent = score;
}

function resetFallingNumbers() {
    const fallingNumbers = document.querySelectorAll('.falling-number');
    fallingNumbers.forEach(number => {
        if (gameContainer.contains(number)) {
            gameContainer.removeChild(number);
        }
    });
}

document.addEventListener('mousemove', (event) => {
    const gameRect = gameContainer.getBoundingClientRect();
    if (event.clientX >= gameRect.left && event.clientX <= gameRect.right) {
        player.style.left = `${event.clientX - gameRect.left - 25}px`;
    }
});
