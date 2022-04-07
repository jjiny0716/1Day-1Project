import Component from "../Component.mjs";
import ComponentError from "../ComponentError.mjs";
import WaterGoal from "./WaterGoal.mjs";
import WaterGlasses from "./WaterGlasses.mjs";

export default class DrinkWater extends Component {
  setup() {
    const { goal, numOfGlasses } = this.props;
    if (!Number.isInteger(goal / numOfGlasses)) throw new ComponentError("Goal divided by numOfGlasses should be integer in 'DrinkWater' component.");
    this.state = {
      progress: 0,
      glassSize: goal / numOfGlasses,
    };
  }

  template() {
    let { goal } = this.props;
    goal /= 1000; 
    return `
    <h1 class="title">Drink Water</h1>
    <p class="goal-description">Goal: ${goal} liters</p>
    <div class="water-goal" data-component-name="WaterGoal" data-key="1"></div>
    <p class="description">Select how many water glasses you had</p>
    <div class="water-glasses" data-component-name="WaterGlasses" data-key="2"></div>
    `;
  }

  generateChildComponent(name) {
    if (name === "WaterGoal") {
      return new WaterGoal(document.querySelector(".water-goal"), () => {
        const { goal } = this.props;
        const { progress, glassSize } = this.state;
        return {
          goal,
          water: glassSize * progress,
        };
      });
    } else if (name === "WaterGlasses") {
      return new WaterGlasses(document.querySelector(".water-glasses"), () => {
        const { numOfGlasses } = this.props;
        const { progress, glassSize } = this.state;
        const { toggleCups } = this;
        return {
          numOfGlasses,
          progress,
          glassSize,
          toggleCups: toggleCups.bind(this),
        };
      });
    }
  }

  toggleCups(index) {
    let { progress } = this.state;
    progress - 1 === index ? progress-- : progress = index + 1;
    this.setState({ progress });
  }
}
