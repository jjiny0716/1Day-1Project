import DarkModeToggleButton from './DarkModeToggleButton.mjs';
import Clock from './Clock.mjs';

const darkModeToggleButton = new DarkModeToggleButton(document.querySelector(".dark-mode-toggle-btn"));
const clock = new Clock(document.querySelector(".clock-container"));
