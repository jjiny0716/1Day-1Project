const loveBtn = document.querySelector(".love-btn");
const btnText = document.querySelector(".text");
const heartContainer = document.querySelector(".heart-container");
const textChanged = false;
const resultBtnText = `Thank you! <i class="fa-solid fa-rotate-right"></i>`; // html

function changeBtnText(text) {
  btnText.innerHTML = text;
}

function addFlyingHeartToHeartContainer() {
  // create and setting flying heart
  const flyingHeart = document.createElement("i");
  flyingHeart.className = "fa-solid fa-heart flying-heart";
  flyingHeart.style.left = `${Math.random() * 90}%`;
  flyingHeart.style.top = `${Math.random() * 100}%`;
  flyingHeart.style.fontSize = `${8 + Math.random() * 15}px`;
  flyingHeart.style.transitionDuration = `${4000 + Math.random() * 4001}ms`;

  heartContainer.appendChild(flyingHeart);
  // for animtation
  setTimeout(() => {
    flyingHeart.classList.add("active");
  }, 10);
  setTimeout(() => {
    flyingHeart.remove();
  }, 4000);
}

async function handleLoveBtnClick() {
  if (!textChanged) changeBtnText(resultBtnText);
  addFlyingHeartToHeartContainer();
  for (let i = 0 ; i < 15 ; i++) {
    await sleep(100);
    addFlyingHeartToHeartContainer();
  }
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

loveBtn.addEventListener("click", handleLoveBtnClick);
