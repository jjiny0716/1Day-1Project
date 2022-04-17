import Component from "../core/Component.mjs";

export default class ProjectLinkFigure extends Component {
  setup() {
    const { projectLink } = this.props;
    this.target.href = projectLink;
  }

  template() {
    const { title, imageLink } = this.props;
    return `
    <figure class="project">
      <img class="project-thumbnail" src="${imageLink}" alt="Project thumbnail" loading="lazy" />
      <figcaption class="project-title">${title}</figcaption>
    </figure>
    `;
  }
}
