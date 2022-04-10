import Component from '../core/Component.mjs';

export default class Suggestions extends Component {
  template() {
    const { suggestions } = this.props;
    return `
    <p class="suggestion-count">${suggestions.length} suggestions</p>
    ${suggestions.map(({ title, voteCount, voted }) => `
    <div class="suggestion">
      <div class="vote">
        <button class="vote-btn${voted ? ' active' : ''}">
          <i class="fa-solid fa-angle-up"></i>
        </button>
        <p class="vote-count">${voteCount}</p>
        <p class="vote-text">votes</p>
      </div>
      <div class="content">
        <p class="suggestion-title">${title}</p>
      </div>
    </div>
    `).join('')}
    `
  }

  setEvents() {
    const { toggleSuggestionVoted } = this.props;
    this.addEventListener("click", ".vote-btn", (e) => {
      const target = e.target.closest(".vote-btn");
      const index = [...this.target.querySelectorAll(".vote-btn")].findIndex((btn) => btn === target);
      toggleSuggestionVoted(index);
    })
  }
}