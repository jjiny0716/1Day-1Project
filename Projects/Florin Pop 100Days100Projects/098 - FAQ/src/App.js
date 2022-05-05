import Component from "./core/Component.js";

import FAQ from './core/components/FAQ.js';

export default class App extends Component {
  setup() {
    this.state = {
      FAQList: [
        {
          title: "Why shouldn't we trust atoms?",
          content: "They make up everything.",
        },
        {
          title: "What's the object-oriented way to become wealthy?",
          content: "Inheritance.",
        },
        {
          title: "What do you call someone with no body and no nose?",
          content: "Nobody knows.",
        },
        {
          title: "How many tickles does it take to tickle an octopus?",
          content: "Ten.",
        },
        {
          title: "What is: 1 + 1?",
          content: "2.",
        },
      ]
    }
  }

  template() {
    const { FAQList } = this.state;
    return `
    <div class="faqs-container">
      <h1 class="faqs-container-title">Frequently Asked Questions</h1>
      ${FAQList.map((_, i) => `<div data-component="FAQ" data-key=${i}></div>`).join('')}
    </div>
    `;
  }

  generateChildComponent(target, name, key) {
    switch(name) {
      case "FAQ":
        return new FAQ(target, () => {
          const { FAQList } = this.state;
          const { title, content } = FAQList[key];
          return {
            title,
            content,
          }
        });
    }
  }
}