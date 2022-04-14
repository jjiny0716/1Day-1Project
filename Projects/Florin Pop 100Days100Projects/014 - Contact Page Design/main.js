const form = document.querySelector(".form");

function setText(e) {
  e.preventDefault();
  form.innerHTML = `Thanks for your message.<br>I'll get back to you soon. 😃`;
}

form.addEventListener("submit", setText);
