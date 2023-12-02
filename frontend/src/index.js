// check if light mode is enabled
// retrieves the value associated with the key lightMode from localStorage
// assigns that retrieved value to the variable lightMode
let lightMode = localStorage.getItem('lightMode');

const toggleButton = document.getElementById('toggle-button');
const body = document.getElementById('body');
const dateContainer = document.getElementById('date-container');
const hourBox = document.getElementById('hour');
const minutesBox = document.getElementById('minutes');
const secondsBox = document.getElementById('seconds');
const meridianBox = document.getElementById('meridian-time');
const country = document.getElementById('country');
const headerGreeting = document.getElementById('header-greeting');

function enableLightMode() {
  body.classList.toggle('light-mode');
  localStorage.setItem('lightMode', 'enabled');
}

const disableLightMode = () => {
  // if its enabled turn it off
  document.body.classList.remove('light-mode');
  localStorage.setItem('lightMode', 'null');
};

// Enables for the theme to stay on screen no matter if you refresh
if (lightMode === 'enabled') {
  enableLightMode();
}

toggleButton.addEventListener('click', () => {
  lightMode = localStorage.getItem('lightMode');
  if (lightMode !== 'enabled') {
    enableLightMode();
    console.log('lightmode', localStorage.getItem('lightMode'));
  } else {
    disableLightMode();
    console.log('disable lightmode', localStorage.getItem('lightMode'));
  }
});

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednsday', 'Thursday', 'Friday', 'Saturday'];

function timeClock() {
  // creating a new date instance
  const now = new Date();
  const date = now.getDate();
  const year = now.getFullYear();

  dateContainer.innerHTML = `${daysOfTheWeek[now.getDay()]} </br> ${months[now.getMonth()]} ${date} ${year}`;

  const hour = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  hourBox.innerHTML = hour.toString().padStart(2, '0');
  minutesBox.innerHTML = minutes.toString().padStart(2, '0');
  secondsBox.innerHTML = seconds.toString().padStart(2, '0');

  if (hour >= 12) {
    meridianBox.innerHTML = 'P.M.';
  } else {
    meridianBox.innerHTML = 'A.M.';
  }
  return hour;
}

timeClock();
setInterval(timeClock, 1000);

function greetingByTimeOfDay() {
  const hourFromTimeClock = timeClock();
  if (hourFromTimeClock >= 12) {
    headerGreeting.textContent = 'Good Afternoon 👋';
  } else if (hourFromTimeClock >= 18) {
    headerGreeting.textContent = 'Good Evening';
  } else {
    headerGreeting.textContent = 'Good Morning';
  }
}

function getCountry() {
  fetch('http://localhost:3000/')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not OK');
      }
      return response.json();
    })
    .then((data) => {
      country ? (country.innerHTML = ` ${data.geo.city}, ${data.geo.country_name}`) : (country.innerHTML = 'Loading...');
    })
    .catch((error) => {
      console.error('Error', error.message);
    });
}

getCountry();
greetingByTimeOfDay();
