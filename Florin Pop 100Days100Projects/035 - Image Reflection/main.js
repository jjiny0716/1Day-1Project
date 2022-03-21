const iamgeFolderName = "image";
const imageNames = ["nature1.jpg", "nature2.jpg", "nature3.jpg"];
const imageNum = imageNames.length;
const images = [];
let imageIdx = 0;
const container = document.querySelector(".container");
const prevBtn = document.querySelector(".move-btn.prev");
const nextBtn = document.querySelector(".move-btn.next");
let isTransitioning = false;

function nextImage() {
  imageIdx = (imageIdx + 1) % imageNum;
  moveCurrentImageContainer("-100%");
  setTimeout(removeCurrentImageContainer, 1050);
  const newImageContainer = createImageContainer("100%", imageIdx);
  setTimeout(removeTranslate, 0, newImageContainer);
}

function prevImage() {
  imageIdx = imageIdx === 0 ? imageNum - 1 : imageIdx - 1;
  moveCurrentImageContainer("100%");
  setTimeout(removeCurrentImageContainer, 1050);
  const newImageContainer = createImageContainer("-100%", imageIdx);
  setTimeout(removeTranslate, 0, newImageContainer);
}

function moveCurrentImageContainer(xLength) {
  const currentImageContainer = document.querySelector(".image-container");
  currentImageContainer.style.transform = `translateX(${xLength})`;
}

function removeCurrentImageContainer() {
  const currentImageContainer = document.querySelector(".image-container");
  currentImageContainer.remove();
}

function createImageContainer(startX, index) {
  const imageContainer = document.createElement("div");
  imageContainer.className = "image-container";
  imageContainer.innerHTML = `
    <div class="image"></div>
    <div class="image reflected"></div>`;
  imageContainer.style.transform = `translateX(${startX})`;
  imageContainer.children[0].style.backgroundImage = `url(${images[index].src})`;
  imageContainer.children[1].style.background = `linear-gradient(to top, rgba(255, 255, 255, 0.2), #ffffff 60%, #ffffff),url(${images[index].src}) center`;
  imageContainer.children[1].style.backgroundSize = "cover";
  container.appendChild(imageContainer);
  return imageContainer
}

function removeTranslate(target) {
  target.style.transform = "translate(0, 0)";
}

function btnClickHandler(e) {
  const btn = e.target.closest(".move-btn");
  if (!btn || isTransitioning) return;

  if (btn.classList.contains("prev")) prevImage();
  if (btn.classList.contains("next")) nextImage();
  isTransitioning = true;
  setTimeout(() => {isTransitioning = false}, 1050);
}

function preload(route, names) {
  for(let i = 0; i < names.length; i++) {
    images[i] = new Image();
    images[i].src = `./${route}/${names[i]}`;
  }
}

preload(iamgeFolderName, imageNames);
createImageContainer(0, 0);
container.addEventListener("click", btnClickHandler);