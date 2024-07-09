const ballGrid = document.getElementById('number-grid');

for (let i = 1; i <= 52; i++) {
  const ball = document.createElement('li');
  const button = document.createElement('button');
  button.className = 'ball';
  button.dataset.number = i;
  button.textContent = i;
  ball.appendChild(button);
  ballGrid.appendChild(ball);
}