import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from './snake.js';
import { update as updateFood, draw as drawFood } from './food.js';
import { outsideGrid } from './grid.js';
import { score } from "./snake.js";

const gameBoard = document.getElementById('game-board');
const gameRestart = document.getElementById('game-restart');
const gameScore = document.getElementById('game-score');
let lastRenderTime = 0;
let gameOver = false;

gameRestart.addEventListener("click", () => window.location = '/');

function main(currentTime) {
  if (gameOver) {
    gameBoard.classList.add("gameover");
    return;
  }

  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;

  if (secondsSinceLastRender < 1 / SNAKE_SPEED) {
    return
  } else {
    lastRenderTime = currentTime;
    update();
    draw();
  }
}

window.requestAnimationFrame(main);

function update() {
  updateSnake()
  updateFood()
  checkDeath()
}

function draw() {
  gameBoard.innerHTML = '';
  drawSnake(gameBoard);
  drawFood(gameBoard);
  let rank = "F";
  let color = "black";

  if (score >= 50) {
    rank = "S";
    color = "#ffef00";
  } else if (score >= 30) {
    rank = "A";
    color = "#43ff64d9";
  } else if (score >= 20) {
    rank = "B";
    color = "#C19578";
  } else if (score >= 10) {
    rank = "C";
    color = "#880ED4";
  } else if (score >= 5) {
    rank = "D";
    color = "#ADD8E6";
  } else {
    rank = "F";
  }

  gameScore.innerHTML = `${score}<br />${rank}`;
  gameScore.style.color = color;
  gameScore.style.border = `1px solid ${color}`;
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}
