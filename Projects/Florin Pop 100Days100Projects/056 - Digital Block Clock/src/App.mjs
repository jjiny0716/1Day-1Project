import Component from "./core/Component.mjs";
import Clock from './components/Clock.mjs';

export default class App extends Component {
  template() {
    return `
    <div class="clock"></div>
    `
  }

  afterMount() {
    new Clock(document.querySelector(".clock"), { curDate: new Date()});
  }
}


