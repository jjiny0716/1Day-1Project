import Component from "../core/Component.js";

export default class FeedbackModal extends Component {
  setup() {
    this.state = {
      selectedEmotion: "happy",
    }
  }

  template() {
    const { selectedEmotion } = this.state;

    return `
    <div class="modal-overlay">
      <div class="modal-content feedback-modal">
        <h3 class="title">How satisfied are you with our customer support performance?</h3>
        <div class="ratings-container">
          <button class="rating-btn unhappy ${selectedEmotion === "unhappy" ? "selected" : ""}">
            <img src="./src/assets/icons/sad.png" alt="sad" />
            <p class="button-description">Unhappy</p>
          </button>
          <button class="rating-btn neutral ${selectedEmotion === "neutral" ? "selected" : ""}">
            <img class="emotion-image" src="./src/assets/icons/neutral.png" alt="neutral" />
            <p class="button-description">Neutral</p>
          </button>
          <button class="rating-btn happy ${selectedEmotion === "happy" ? "selected" : ""}">
            <img class="emotion-image" src="./src/assets/icons/smiling.png" alt="happy" />
            <p class="button-description">Satisfied</p>
          </button>
        </div>
        <button class="send-review-button black">Send review</button>
      </div>
    </div>
    `;
  }

  setEvents() {
    this.addEventListener("click", "button", (e) => {
      const target = e.target.closest("button");
      if (target.classList.contains("rating-btn")) {
        this.setState({
          selectedEmotion: target.classList[1],
        })
      }
      else if (target.classList.contains("send-review-button")) {
        const { closeFeedbackModal, openThankyouModal } = this.props;
        const { selectedEmotion } = this.state;
        closeFeedbackModal(selectedEmotion);
        openThankyouModal();
      }
      
    });
  }
}
