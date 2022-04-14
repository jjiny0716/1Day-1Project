const ratingsContainer = document.querySelector(".ratings-container");

async function loadReviewData() {
  const response = await fetch("./reviews-data.JSON");
  const data = await response.json();
  return data;
}

function renderRatings(reviewData) {
  const totalReviewNum = getTotalReviewNum(reviewData);
  reviewData.forEach((data) => {
    const percentage = (data.number / totalReviewNum * 100).toFixed(1);
    ratingsContainer.appendChild(createRatingContainer(data.rating, percentage));
  });
}

function getTotalReviewNum(reviewData) {
  return reviewData.reduce((sum, data) => sum += data.number, 0);
}

function createRatingContainer(rating, percentage) {
  const ratingContainer = document.createElement("div");
    ratingContainer.className = "rating-container";
    ratingContainer.innerHTML = `
      <span class="rating"><span class="score">${rating}</span><i class="fa-solid fa-star"></i></span>
      <div class="progress-background">
        <div class="progress"></div>
      </div>
      <span class="percentage">${percentage}%</span>
    `;
    // setting progress width
    ratingContainer.children[1].children[0].style.width = `${percentage}%`;

    return ratingContainer;
}

loadReviewData().then((data) => renderRatings(data));
