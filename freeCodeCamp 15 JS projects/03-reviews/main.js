const prevBtn = document.querySelector(".move-prev");
const nextBtn = document.querySelector(".move-next");
const randomBtn = document.querySelector(".random-review-btn");
const reviewConainter = document.querySelector(".review-container");
const reviewArea = document.querySelector(".review-area");

const reviews = [];
let index = 0;

function loadReviewData() {
  return fetch("review-data.json").then(response => response.json());
}

function renderReview() {
  const review = reviews[index];
  reviewArea.innerHTML = `
    <div class="img-container">
      <img src="${review.img}" alt="person" class="avatar" />
    </div>
    <h4 class="name">${review.name}</h4>
    <p class="job">${review.job}</p>
    <p class="review-text">${review.text}</p>`
}

function handleBtnClick(e) {
  classList = e.target.classList;
  const lastIndex = index;
  if (classList.contains("move-prev") && index > 0) index--;
  else if (classList.contains("move-next") && index < reviews.length - 1) index++;
  else if (classList.contains("random-review-btn")) index = Math.floor(Math.random() * reviews.length);
  if (lastIndex !== index) renderReview();
}

loadReviewData().then(datas => {
  datas.forEach(data => reviews.push(data));
  console.log(reviews);
  renderReview();
})

reviewConainter.addEventListener("click", handleBtnClick);


