import Component from './core/Component.mjs';
import ProjectLinkFigure from './components/ProjectLinkFigure.mjs';
import { projectsInfo } from './constants/projectsInfo.mjs';

export default class App extends Component {
  setup() {
    this.state = {
      projectsInfo,
    }
  }

  template() {
    const { projectsInfo } = this.state;
    return `
    <header>
      <h1 class="title">1Day 1Projects - All Projects</h1>
    </header>
    <main class="project-container">
    ${Object.keys(projectsInfo).map((id) => `<a class="project-link" href="#" data-component="ProjectLinkFigure" data-key="${id}"></a>`).join('')}
    </main>
    `
  }

  generateChildComponent(target, name, key) {
    const { projectsInfo } = this.state;
    if (name === "ProjectLinkFigure") {
      return new ProjectLinkFigure(target, () => {
        return projectsInfo[key];
      })
    }
  }
}