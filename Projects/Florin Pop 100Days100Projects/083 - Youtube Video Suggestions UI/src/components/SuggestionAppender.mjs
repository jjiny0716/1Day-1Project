import Component from '../core/Component.mjs';

export default class SuggestionAppender extends Component {
  template() {
    return `
    <h1 class="title">YouTube Video Suggestions</h1>
    <textarea class="suggestion-input" cols="30" rows="10" placeholder="Enter your suggestion here..."></textarea>
    `
  }

  setEvents() {
    const { appendSuggestion } = this.props;
    this.addEventListener("keydown", ".suggestion-input", (e) => {
      if (e.key !== "Enter") return;
      appendSuggestion(e.target.value);
      setTimeout(() => e.target.value = "", 0);
    })
  }
}