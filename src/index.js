import './style.css';

// Event Bus implementation
const EventBus = (() => {
  const events = {};

  return {
    subscribe: (event, callback) => {
      if (!events[event]) events[event] = [];
      events[event].push(callback);
    },

    publish: (event, data) => {
      if (events[event]) {
        events[event].forEach(callback => callback(data));
      }
    },
  };
})();

// Function to generate a calendar for a specific month and year
function generateCalendar(month, year) {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Create a container div for the calendar
  const calendarContainer = document.createElement('div');
  calendarContainer.classList.add('calendar-container');

  // Create the header row
  const headerRow = document.createElement('div');
  headerRow.classList.add('header-row');
  for (let day of daysOfWeek) {
    const th = document.createElement('div');
    th.classList.add('header-cell');
    th.textContent = day;
    headerRow.appendChild(th);
  }
  calendarContainer.appendChild(headerRow);

  // Set the date to the first day of the month
  const date = new Date(year, month, 1);

  // Get the index of the first day of the month (0-6)
  const firstDayIndex = date.getDay();

  // Get the number of days in the month
  const lastDay = new Date(year, month + 1, 0).getDate();

  // Create the calendar cells
  let day = 1;
  for (let i = 0; i < 6; i++) {
    const row = document.createElement('div');
    row.classList.add('calendar-row');

    // Create cells for each day of the week
    for (let j = 0; j < 7; j++) {
      const cell = document.createElement('div');
      cell.classList.add('calendar-cell');

      // Highlight the current day
      if (day === currentDate.getDate() && month === currentMonth && year === currentYear) {
        cell.classList.add('current-day');
      }

      // Add the day number to the cell
      if (i === 0 && j < firstDayIndex) {
        cell.textContent = '';
      } else if (day > lastDay) {
        break;
      } else {
        cell.textContent = day;
        day++;
      }

      row.appendChild(cell);
    }

    calendarContainer.appendChild(row);
  }

  // Add click event listener to each calendar cell
  calendarContainer.addEventListener('click', function (event) {
    const clickedCell = event.target;
    const clickedDay = clickedCell.textContent;
    if (clickedDay) {
      EventBus.publish('showModal', {day: clickedDay, month: month + 1, year});
    }
  });

  return calendarContainer;
}

// Show the modal window with the clicked day, month, and year
function showModal(data) {
  const modal = document.getElementById('calendarModal');
  const modalDate = document.getElementById('modalDate');
  modalDate.textContent = `${data.day}/${data.month}/${data.year}`;
  modal.style.display = 'block';
}

// Close the modal window
function closeModal() {
  const modal = document.getElementById('calendarModal');
  modal.style.display = 'none';
}

// Subscribe to the showModal event
EventBus.subscribe('showModal', showModal);

// Programmatically attach event listener to the close button
document.getElementById('modalClose').addEventListener('click', closeModal);


// Get the current year
const currentYear = new Date().getFullYear();

// Get the content div
const contentDiv = document.getElementById('content');

// Create a container div for the calendars
const calendarsContainer = document.createElement('div');
calendarsContainer.classList.add('calendars-container');

// Generate calendars for each month of the current year and group them in sets of four
let counter = 0;
let calendarRow;
for (let month = 0; month < 12; month++) {
  if (counter % 4 === 0) {
    calendarRow = document.createElement('div');
    calendarRow.classList.add('calendar-row');
    calendarsContainer.appendChild(calendarRow);
  }

  const calendar = generateCalendar(month, currentYear);
  calendarRow.appendChild(calendar);
  counter++;
}

// Append the calendars container to the content div
contentDiv.appendChild(calendarsContainer);
