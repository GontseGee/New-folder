function generateTickets() {
  const container = document.getElementById('tickets-container');
  container.innerHTML = '';
  const boardCount = parseInt(document.getElementById('boards').value, 10);
  let ticketCount = Math.ceil(boardCount / 10);

  for (let i = 0; i < ticketCount; i++) {
      const ticket = document.createElement('div');
      ticket.classList.add('ticket');
      ticket.innerHTML = `<div class="ticket-header">
                              <h3>Ticket ${i + 1}</h3>
                              <span>Ticket ID: ${generateTicketID()}</span>
                          </div>`;
      const boardsForTicket = Math.min(10, boardCount - (i * 10));
      for (let j = 0; j < boardsForTicket; j++) {
          const board = document.createElement('div');
          board.classList.add('board');
          board.innerHTML = `
              <div class="board-header">
                  <h4>Board ${String.fromCharCode(65 + j)}</h4>
                  <button onclick="clearBoard(${i}, ${j})">Clear</button>
              </div>
              <div class="selected-numbers" id="selected-numbers-${i}-${j}"></div>
              <div class="board-numbers">${generateNumbersHtml(i, j)}</div>`;
          ticket.appendChild(board);
      }
      container.appendChild(ticket);
  }
}

function generateNumbersHtml(ticketIndex, boardIndex) {
  let numbersHtml = '';
  for (let i = 1; i <= 52; i++) {
      let colorClass = '';
      if (i <= 13) colorClass = 'red';
      else if (i <= 25) colorClass = 'yellow';
      else if (i <= 37) colorClass = 'green';
      else colorClass = 'blue';
      numbersHtml += `<div class="number ${colorClass}" onclick="selectNumber(this, 6, ${ticketIndex}, ${boardIndex})">${i}</div>`;
  }
  return numbersHtml;
}

function selectNumber(element, numBalls, ticketIndex, boardIndex) {
  const selectedNumbers = document.querySelectorAll(`#selected-numbers-${ticketIndex}-${boardIndex} .number`);
  if (element.classList.contains('selected')) {
      element.classList.remove('selected');
      removeSelectedNumber(element.innerText, ticketIndex, boardIndex);
  } else if (selectedNumbers.length < numBalls) {
      element.classList.add('selected');
      addSelectedNumber(element.innerText, ticketIndex, boardIndex);
  } else {
      alert(`You can only select ${numBalls} numbers per board`);
  }
}

function addSelectedNumber(number, ticketIndex, boardIndex) {
  const container = document.getElementById(`selected-numbers-${ticketIndex}-${boardIndex}`);
  const numberElement = document.createElement('div');
  numberElement.classList.add('number');
  numberElement.innerText = number;
  container.appendChild(numberElement);
}

function removeSelectedNumber(number, ticketIndex, boardIndex) {
  const container = document.getElementById(`selected-numbers-${ticketIndex}-${boardIndex}`);
  const numberElements = container.querySelectorAll('.number');
  numberElements.forEach(el => {
      if (el.innerText === number) {
          container.removeChild(el);
      }
  });
}

function clearBoard(ticketIndex, boardIndex) {
  const boardNumbers = document.querySelectorAll(`#selected-numbers-${ticketIndex}-${boardIndex} .number`);
  boardNumbers.forEach(el => el.remove());
  const board = document.querySelectorAll(`#tickets-container .ticket`)[ticketIndex].querySelectorAll('.board')[boardIndex];
  const numbers = board.querySelectorAll('.board-numbers .number');
  numbers.forEach(el => el.classList.remove('selected'));
}

function calculateTotalCost() {
  const boardCount = parseInt(document.getElementById('boards').value, 10);
  const lottoPlus1 = document.getElementById('lottoPlus1').checked;
  const lottoPlus2 = document.getElementById('lottoPlus2').checked;

  let totalCost = boardCount * 5;
  if (lottoPlus1) totalCost += boardCount * 2.5;
  if (lottoPlus2) totalCost += boardCount * 2.5;

  document.getElementById('total-cost').innerText = totalCost.toFixed(2);
}

function saveEntries() {
  const boards = document.querySelectorAll('.board');
  let entries = [];
  boards.forEach((board, index) => {
      const selectedNumbers = board.querySelectorAll('.selected-numbers .number');
      let numbers = [];
      selectedNumbers.forEach(num => {
          numbers.push(num.innerText);
      });
      entries.push({board: index + 1, numbers: numbers});
  });
  const date = new Date().toISOString();
  const entry = {
      ticketId: generateTicketID(),
      date: date,
      boards: entries,
      lottoPlus1: document.getElementById('lottoPlus1').checked,
      lottoPlus2: document.getElementById('lottoPlus2').checked
  };
  saveToLocalStorage(entry);
  alert('Entries saved!');
}

function generateTicketID() {
  return 'T' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

function saveToLocalStorage(entry) {
  let tickets = JSON.parse(localStorage.getItem('tickets')) || [];
  tickets.push(entry);
  localStorage.setItem('tickets', JSON.stringify(tickets));
}

function loadNotifications() {
  let tickets = JSON.parse(localStorage.getItem('tickets')) || [];
  const notificationsContainer = document.getElementById('notifications');
  notificationsContainer.innerHTML = '';
  tickets.forEach(ticket => {
      const notification = document.createElement('div');
      notification.classList.add('notification');
      notification.innerHTML = `<p>Ticket ID: ${ticket.ticketId}</p>
                                <p>Date: ${ticket.date}</p>
                                <p>Boards: ${ticket.boards.length}</p>
                                <p>Lotto Plus 1: ${ticket.lottoPlus1}</p>
                                <p>Lotto Plus 2: ${ticket.lottoPlus2}</p>`;
      notificationsContainer.appendChild(notification);
  });
}

document.addEventListener('DOMContentLoaded', loadNotifications);


document.getElementById('admin-btn').addEventListener('click', function() {
  // Redirect to admin page or perform admin-specific action
  window.location.href = 'admin.html'; // Replace with your admin page URL
});

document.getElementById('user-btn').addEventListener('click', function() {
  // Redirect to user page or perform user-specific action
  window.location.href = 'user.html'; // Replace with your user page URL
});

document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission for this example
  // Add login validation logic here if needed
});
