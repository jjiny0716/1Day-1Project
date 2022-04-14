const body = document.querySelector("body");
const eyeRolls = [...document.querySelectorAll(".eye-roll")];
const pandaAddBtn = document.querySelector(".panda-add-btn");

function mouseMoveHandler(e) {
  const { clientX, clientY } = e;
  eyeRolls.forEach((eyeRoll) => setEyeAngle(eyeRoll, clientX, clientY));
}

function setEyeAngle(eyeRoll, mouseY, mouseX) {
  const { x: eyeRollX, y: eyeRollY, width: eyeRollWidth, height: eyeRollHeight } = eyeRoll.getBoundingClientRect();
  const degree = getAngle(eyeRollX + eyeRollWidth / 2, eyeRollY + eyeRollHeight / 2, mouseY, mouseX);
  eyeRoll.style.transform = `rotate(${degree}deg)`;
}

function getAngle(x1, y1, x2, y2) {
  return (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
}

function createPanda() {
  const panda = document.createElement("div");
  panda.className = "panda";
  panda.innerHTML = `
    <div class="ear left"></div>
    <div class="ear right"></div>
    <div class="eye left">
      <div class="eye-roll"></div>
    </div>
    <div class="eye right">
      <div class="eye-roll"></div>
    </div>
    <div class="nose">
      <i class="fa fa-heart"></i>
    </div>
    <div class="mouth"></div>
  `;
  return panda;
}

function addPandaToTargetWithRandomCoord(target) {
  const {width: targetWidth, height: targetHeight} = target.getBoundingClientRect();
  const panda = createPanda();
  panda.style.top = `${targetHeight * Math.random()}px`;
  panda.style.left = `${targetWidth * Math.random()}px`;
  eyeRolls.push(...panda.querySelectorAll(".eye-roll"));
  target.appendChild(panda);
}

pandaAddBtn.addEventListener("click", () => {
  addPandaToTargetWithRandomCoord(body);
});
document.addEventListener("mousemove", mouseMoveHandler);
