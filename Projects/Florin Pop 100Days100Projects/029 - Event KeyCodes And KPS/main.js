const container = document.querySelector(".container");
let elapsedTime = 0;
let timerId = null;
let pressedKeyCount = 0;
const state = {
  elapsedTime: 0,
  keyPressedCount: 0,
  key: 0,
  keyCode: 0,
  code: 0
}

function renderKeys({elapsedTime:time, keyPressedCount:count, key, keyCode, code}) {
  container.innerHTML = `
    <div class="key">
      <span class="type">event.key</span>
      <div class="box">${key}</div>
    </div>
    <div class="key">
      <span class="type">event.keyCode</span>
      <div class="box">${keyCode}</div>
    </div>
    <div class="key">
      <span class="type">event.code</span>
      <div class="box">${code}</div>
    </div>
    <div class="key">
      <span class="type">Time</span>
      <div class="box">${time}</div>
    </div>
    <div class="key">
      <span class="type">KPS</span>
      <div class="box">${time !== 0 ? (count / time).toFixed(1) : 0}</div>
    </div>
    <div class="key">
      <span class="type">Key pressed count</span>
      <div class="box">${count}</div>
    </div>
  `;
}

function updateTime() {
  state.elapsedTime++;
}

function handleKeyDown(e) {
  [state.key, state.keyCode, state.code] = [e.key, e.keyCode, e.code];
  state.keyPressedCount++;
  if (!timerId) timerId = setInterval(() => {
    updateTime();
    renderKeys(state);
  }, 1000);
  renderKeys(state);
}

document.addEventListener("keydown", handleKeyDown);
