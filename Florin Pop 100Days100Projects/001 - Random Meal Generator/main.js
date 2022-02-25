let meal;
const ingredientsAndMeasure = [];

function getRandomMeal() {
  return fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((res) => {
      meal = res.meals[0];
    });
}

function getIngredientsAndMeasure() {
  let i = 1;

  while (i <= 20) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (!ingredient || !measure) break;
    ingredientsAndMeasure.push([ingredient, measure]);
    i++;
  }
}

const main = document.querySelector(".main");

function render() {
  main.innerHTML = `
  <div class="text-info-container">
  <section class="sub-info">
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
    ${meal.strCategory ? `<p><strong>Category</strong>: ${meal.strCategory}</p>` : ""}
    ${meal.strArea ? `<p><strong>Area</strong>: ${meal.strArea}</p>` : ""}
    ${meal.strTags ? `<p><strong>Tags</strong>: ${meal.strTags}</p>` : ""}
    <h3>ingredients</h3>
    <ul class="ingredients">
      ${ingredientsAndMeasure.map((iAndM) => `<li>${iAndM[0]} - ${iAndM[1]}</li>`).join("\n")}
    </ul>
  </section>
    <section class="main-info">
      <h2>${meal.strMeal}</h2>
      <p>${meal.strInstructions}</p>
    </section>
  </div>
  <div class="recipe">
    <h3>Video Recipe</h3>
    <div class="video-container">
      <iframe
      width="1000"
      height="550"
        src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </div>
  `;
}

const randomMealGeneratorBtn = document.querySelector("#randomMealGeneraterBtn");

randomMealGeneratorBtn.addEventListener("click", () => {
  getRandomMeal().then(() => {
    getIngredientsAndMeasure();
    render();
  });
});

