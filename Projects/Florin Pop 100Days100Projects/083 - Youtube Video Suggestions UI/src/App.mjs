import Component from './core/Component.mjs'
import SuggestionAppender from './components/SuggestionAppender.mjs'
import Suggestions from './components/Suggestions.mjs'

export default class App extends Component {
  setup() {
    this.state = {
      suggestions: [
        {
          title: "Create a ReactJS Voting App",
          voteCount: 0,
          voted: false,
        },
        {
          title: "CSS Loading Animations",
          voteCount: 0,
          voted: false,
        },
      ],
    }
  }

  template() {  
    return `
    <header class="suggestion-appender" data-component="SuggestionAppender"></header>
    <main class="suggestions" data-component="Suggestions"></main>
    `
  }

  generateChildComponent(target, name) {
    if (name === "SuggestionAppender") {
      const { appendSuggestion } = this;
      return new SuggestionAppender(target, () => {
        return {
          appendSuggestion: appendSuggestion.bind(this),
        }
      });
    }
    else if (name === "Suggestions") {
      return new Suggestions(target, () => {
        const { toggleSuggestionVoted } = this;
        const { suggestions } = this.state;
        return {
          suggestions,
          toggleSuggestionVoted: toggleSuggestionVoted.bind(this),
        }
      });
    }
  }

  appendSuggestion(title) {
    const { suggestions } = this.state;
    suggestions.push({
      title,
      voteCount: 0,
      voted: false,
    })
    this.setState({ suggestions });
  }

  toggleSuggestionVoted(index) {
    const { suggestions } = this.state;
    suggestions[index].voted = !suggestions[index].voted;
    if (suggestions[index].voted) suggestions[index].voteCount++;
    else suggestions[index].voteCount--;
    this.setState({ suggestions });
  }
}