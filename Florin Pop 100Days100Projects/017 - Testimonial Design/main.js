let testimonialData = null;
const testimonialContainer = document.querySelector(".testimonial-container");
const testimonialAuthorList = testimonialContainer.querySelector(".author-list");
const testimonialAuthors = testimonialContainer.querySelectorAll(".author");
const testimonialName = testimonialContainer.querySelector(".name");
const testimonialText = testimonialContainer.querySelector(".text");

function loadTestimonialData() {
  return fetch("testimonials.JSON")
    .then((response) => response.json())
    .then(json => testimonialData = json);
}

function changeTestimonial(idx) {
  const selectedTestimonial = testimonialData[idx];
  const {color: {r, g, b}, text, name} = selectedTestimonial;
  testimonialContainer.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  testimonialContainer.style.boxShadow = `0px 35px 10px -20px rgba(${r}, ${g}, ${b}, 0.9)`;
  testimonialText.textContent = text;
  testimonialName.textContent = name;
}

function changeSelectedButton(idx) {
  testimonialAuthors.forEach((author) => author.classList.remove("active"));
  testimonialAuthors[idx].classList.add("active");
}

loadTestimonialData().then(() => {
  changeTestimonial(0);
  changeSelectedButton(0);
});

testimonialAuthorList.addEventListener("click", (e) => {
  if (e.target.tagName === "UL") return;
  const selectedAuthor = e.target.closest(".author");
  changeTestimonial(selectedAuthor.dataset.seq);
  changeSelectedButton(selectedAuthor.dataset.seq);
});

