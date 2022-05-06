import Component from "./core/Component.js";

import FeedbackModal from './Components/FeedbackModal.js';
import ThankyouModal from './Components/ThankyouModal.js';

export default class App extends Component {
  setup() {
    this.state = {
      feedbackModal: false,
      thankyouModal: false,
    };
  }

  template() {
    const { feedbackModal, thankyouModal } = this.state; 

    return `
    <button class="open-feedback-modal-btn black">Give us feedback!</button>
    ${feedbackModal ? `<div data-component="FeedbackModal"></div>` : ""}
    ${thankyouModal ? `<div data-component="ThankyouModal"></div>` : ""}
    `;
  }

  generateChildComponent(target, name) {
    switch(name) {
      case "FeedbackModal":
        return new FeedbackModal(target, () => {
          const { closeFeedbackModal, openThankyouModal } = this;
          return {
            closeFeedbackModal: closeFeedbackModal.bind(this),
            openThankyouModal: openThankyouModal.bind(this),
          }
        });
      case "ThankyouModal":
        return new ThankyouModal(target, () => {
          const { closeThankyouModal } = this;
          return {
            closeThankyouModal: closeThankyouModal.bind(this),
          }
        });
    }
  }

  setEvents() {
    this.addEventListener("click", "button", (e) => {
      const target = e.target.closest("button");
      if (target.classList.contains("open-feedback-modal-btn")) {
        this.openFeedbackModal();
      }
    });
  }

  openFeedbackModal() {
    this.setState({ feedbackModal: true });
  }

  closeFeedbackModal(result) {
    this.setState({ feedbackModal: false });
    console.log("result:", result);
  }

  openThankyouModal() {
    this.setState({ thankyouModal: true });
  }

  closeThankyouModal() {
    this.setState({ thankyouModal: false });
  }
  
}
