let food = { x: 0, y: 1};

export function update() {

}

export function draw(gameBoard) {
  const foodElment = document.createElement("div");
  foodElment.style.gridRowStart = food.y;
  foodElment.style.gridColumnStart = food.x;
  foodElment.classList.add("food");
  gameBoard.appendChild(foodElment);
}