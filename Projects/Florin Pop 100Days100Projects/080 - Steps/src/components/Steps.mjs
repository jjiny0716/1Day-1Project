import Component from '../core/Component.mjs';
import ComponentError from '../core/ComponentError.mjs';

export default class Steps extends Component {
  setup() {
    const { maxStep } = this.props;
    if (maxStep > 15) throw new ComponentError("Max step of 'Steps' is too large!");

    this.state = {
      curStep: 1,
    }
  }

  template() {
    const { maxStep } = this.props;
    const { curStep } = this.state;
    const stepNums = Array.from({length: maxStep}, (v, i) => i + 1);
    const progressValue = (curStep - 1) * (100 / (maxStep - 1));

    return `
    <div class="steps-progress">
      ${stepNums.map(n => `<div class="step${n <= curStep ? " active" : ""}">${n}</div>`).join('')}
      <div class="progress background"></div>
      <div class="progress" style="transform: scaleX(${progressValue}%)"></div>
    </div>
    <div class="controls">
      <button class="prev-btn" ${curStep === 1 ? "disabled" : ""}>Prev</button>
      <button class="next-btn" ${curStep === maxStep ? "disabled" : ""}>Next</button>
    </div>
    `
  }

  setEvents() {
    this.addEventListener("click", ".controls", (e) => {
      if (e.target.tagName !== "BUTTON") return;
      if (e.target.classList[0] === "prev-btn") this.prevStep();
      if (e.target.classList[0] === "next-btn") this.nextStep();
    });
  }

  nextStep() {
    const { maxStep } = this.props;
    const { curStep } = this.state;
    if (curStep === maxStep) return;
    this.setState({ curStep: curStep + 1 }); 
  }

  prevStep() {
    const { curStep } = this.state;
    if (curStep === 1) return;
    this.setState({ curStep: curStep - 1 }); 
  }
}