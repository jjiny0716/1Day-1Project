export default class Verify {
  constructor(target) {
    this.target = target;
    this.curInputIdx = 0;
    this.render();
    this.setEventListener();
  }

  render() {
    this.target.innerHTML = `
    <div class="verify">
      <h2 class="title">Verify you account</h2>
      <p class="description">
        We emailed you the six digit code to cool_guy@email.com<br />
        Enter the code below to confirm your email address.
      </p>
      <div class="input-container">
        <input type="text" maxlength="2" placeholder="0" class="single-number-input" />
        <input type="text" maxlength="2" placeholder="0" class="single-number-input" />
        <input type="text" maxlength="2" placeholder="0" class="single-number-input" />
        <input type="text" maxlength="2" placeholder="0" class="single-number-input" />
        <input type="text" maxlength="2" placeholder="0" class="single-number-input" />
        <input type="text" maxlength="2" placeholder="0" class="single-number-input" />
      </div>
      <p class="fake-description">This is design only. We didn't actually send you an email as we don't have your email, right? xD</p>
    </div>
    `;
  }

  setEventListener() {
    const inputContainer = this.target.querySelector(".input-container");
    inputContainer.addEventListener("input", this.handleInput.bind(this));
    inputContainer.addEventListener("keydown", this.handleBackspace.bind(this));
  }

  handleInput(e) {
    if (e.data === null) return;
    if (!e.data.match(/[0-9]/)) {
      // 이미 숫자가 있으면 그대로, 아니면 비우기
      e.target.value = e.target.value === 2 ? e.target.value.slice(0, 1) : "";
      return;
    }
    e.target.value = e.data;
    const inputs = [...this.target.querySelectorAll(".single-number-input")];
    this.goToNextInput(inputs, e.target);
  }

  goToNextInput(inputList, curInput) {
    const nextInput = inputList[inputList.indexOf(curInput) + 1];
    curInput.classList.add("active");
    nextInput ? nextInput.focus() : curInput.blur();
  }

  handleBackspace(e) {
    if (e.key !== "Backspace") return;
    this.goToPrevInput([...this.target.querySelectorAll(".single-number-input")], e.target);
  }

  goToPrevInput(inputList, curInput) {
    // 현재 인풋이 채워져있는 경우는 현재 위치만 지움.
    if (curInput.value) {
      curInput.classList.remove("active");
      return; 
    }

    // 첫번째 인풋인 경우 처리
    const prevInput = inputList[inputList.indexOf(curInput) - 1];
    if (!prevInput) return;

    // 이전 인풋으로 이동
    prevInput.classList.remove("active");
    prevInput ? prevInput.focus() : curInput.focus();
  }
}
