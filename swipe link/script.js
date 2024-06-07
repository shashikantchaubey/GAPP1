// script.js
const gameContainer = document.getElementById('gameContainer');
const mainWord = document.getElementById('mainWord');
const swipeWord = document.getElementById('swipeWord');
const scoreDisplay = document.getElementById('score');
const gameOverDisplay = document.getElementById('gameOver');
const finalScoreDisplay = document.getElementById('finalScore');
const leftButton = document.getElementById('leftButton');
const rightButton = document.getElementById('rightButton');

let score = 0;
let wordIndex = 0;

const words = [
  { main: "Diligent", swipe: "Meticulous", isLikely: true },
  { main: "Jubilant", swipe: "Elated", isLikely: true },
  { main: "Prudent", swipe: "Rash", isLikely: false },
  { main: "Benevolent", swipe: "Altruistic", isLikely: true },
  { main: "Desolate", swipe: "Inhabited", isLikely: false },
  { main: "Erudite", swipe: "Ignorant", isLikely: false },
  { main: "Hinder", swipe: "Impede", isLikely: true },
  { main: "Conspicuous", swipe: "Unnoticed", isLikely: false },
  { main: "Conceal", swipe: "Cover", isLikely: true },
  { main: "Happy", swipe: "Joyful", isLikely: true },
 
];

function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}

function endGame() {
  gameOverDisplay.style.display = 'block';
  finalScoreDisplay.textContent = score;
}

function nextWord() {
  if (wordIndex >= words.length) {
    endGame();
    return;
  }

  mainWord.textContent = words[wordIndex].main;
  swipeWord.textContent = words[wordIndex].swipe;
}

function handleSwipe(direction) {
  const currentWord = words[wordIndex];
  const isCorrect = (direction === 'right' && currentWord.isLikely) || (direction === 'left' && !currentWord.isLikely);

  if (isCorrect) {
    score++;
  } else {
    score--;
  }

  updateScore();

  wordIndex++;
  nextWord();
}

leftButton.addEventListener('click', () => handleSwipe('left'));
rightButton.addEventListener('click', () => handleSwipe('right'));

function startGame() {
  score = 0;
  wordIndex = 0;
  updateScore();
  gameOverDisplay.style.display = 'none';
  nextWord();
}

startGame();
