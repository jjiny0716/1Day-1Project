const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Octomber", "November", "December"];
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const moods = ["happy", "pretty-good", "soso", "not-good", "sad"];
const currentYear = new Date().getFullYear();
const moodBtnsContainer = document.querySelector(".mood-btns");
const moodBtns = document.querySelectorAll(".mood");
let selectedMood = "";
const day = new Date(`${currentYear}-01-01`);
const nextYear = new Date(`${currentYear + 1}-01-01`);
const daysInMonths = [];
const startWeekDayInMonths = [];
const calendar = document.querySelector(".calendar");
const randomizeBtn = document.querySelector(".randomize-btn");
const clearBtn = document.querySelector(".clear-btn");
let allDays;

// header title
const title = document.querySelector(".title");
title.textContent = `${currentYear} Mood Calendar`;

// mood button
function handleMoodBtnClick(e) {
  if (e.target.classList.contains("mood-btns")) return;
  let target = e.target;
  if (target.tagName === "I") target = target.closest(".mood");
  selectMoodBtn(target);
}

function selectMoodBtn(target) {
  if (target.classList.contains("selected")) {
    selectedMood = "";
    target.classList.remove("selected");
  } else {
    moodBtns.forEach((moodBtn) => moodBtn.classList.remove("selected"));
    selectedMood = target.dataset.mood;
    target.classList.add("selected");
  }
}
moodBtnsContainer.addEventListener("click", handleMoodBtnClick);

// calendar
function getCalendarData() {
  for (let i = 0; i < 366; i++) {
    if (!daysInMonths[day.getUTCMonth()]) {
      daysInMonths[day.getUTCMonth()] = [];
      startWeekDayInMonths.push(day.getDay());
    }

    daysInMonths[day.getUTCMonth()].push(day.getDate());

    day.setDate(day.getDate() + 1);
    if (day.getTime() === nextYear.getTime()) break;
  }
}

function renderCalendar() {
  calendar.innerHTML = daysInMonths
    .map((daysInMonth, index) => {
      return `
    <div class="month">
      <h3 class="month-name">${months[index]}</h3>
      <div class="week-days-container">
        ${weekDays.map((weekday) => `<div class="week-day"><span>${weekday}</span></div>`).join("\n")}
      </div>
      <div class="days-container">
        ${`<div class="day"></div>`.repeat(startWeekDayInMonths[index])}
        ${daysInMonth.map((day) => `<div class="day"><span class="circle-background">${day}</span></div>`).join("\n")}
      </div>
    </div>
    `;
    })
    .join("\n");
}

function handleCalendarClick(e) {
  if (e.target.tagName !== "SPAN") return;
  changeDayMood(e.target);
}

function changeDayMood(target) {
  target.classList = "circle-background";
  if (selectedMood) target.classList.add(selectedMood);
}
calendar.addEventListener("click", handleCalendarClick);

// funtionality
function loadAllDays() {
  if (allDays) return;
  allDays = document.querySelectorAll(".circle-background");
}

function randomize() {
  loadAllDays()
  allDays.forEach(day => {
    day.classList = "circle-background";
    day.classList.add(moods[Math.floor(Math.random() * 5)])
  });
}

function clearCalendar() {
  loadAllDays()
  allDays.forEach(day => day.classList = "circle-background");
}

randomizeBtn.addEventListener("click", randomize);
clearBtn.addEventListener("click", clearCalendar);

// localStorage
function storeRenderedCalendarData() {
  localStorage.setItem("mood-calendar-year", currentYear);
  localStorage.setItem("mood-calendar-data", calendar.innerHTML);
}

function renderCalendarWithRestoredData() {
  calendar.innerHTML = localStorage.getItem("mood-calendar-data");
}
window.addEventListener("beforeunload", storeRenderedCalendarData);

// load, render
getCalendarData();
renderCalendar();
if ((localStorage.getItem("mood-calendar-year") == currentYear) && localStorage.getItem("mood-calendar-data") ) {
  renderCalendarWithRestoredData();
} 

