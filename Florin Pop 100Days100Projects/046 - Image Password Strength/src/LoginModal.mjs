export default class LoginModal {
  constructor(target) {
    this.target = target;
    this.setup();
    this.create();
    this.blurBackground(0);
    this.hide();
  }

  setup() {
    this.target.addEventListener("input", (e) => {
      if (e.target.closest(".password-input")) this.blurBackground(e.target.value.length);
    })
  }

  create() {
    this.target.innerHTML = `
    <div class="login-modal-overlay">
      <div class="login-modal">
        <h1 class="modal-title">Image Password Strength</h1>
        <p class="desc">Change the password to see the effect</p>
        <form>
          <div class="input-container">
            <label for="email-input">Email:</label>
            <input type="text" class="email-input" name="email-input" id="email-input" />
          </div>
          <div class="input-container">
            <label for="password-input">Password:</label>
            <input type="password" class="password-input" name="password-input" id="password-input" />
          </div>
        </form>
      </div>
    </div>
    `
  }

  show() {
    this.target.querySelector(".login-modal-overlay").style.display = "flex";
  }

  hide() {
    this.target.querySelector(".login-modal-overlay").style.display = "none";
  }

  blurBackground(degree) {
    const blurSize = Math.max(8 - degree, 0) * 2;
    this.target.querySelector(".login-modal-overlay").style.backdropFilter = `blur(${blurSize}px)`;
  }
}