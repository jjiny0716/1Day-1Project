import Component from '../core/Component.js';

export default class ThankyouModal extends Component {
  template() {
    return `
    <div class="modal-overlay">
      <div class="modal-content thankyou-modal">
        <h3 class="title">Thank you, jjiny!</h3>
        <p class="description">We'll use your feedback to improve our customer support performance.</p>
        <button class="close-btn black">Done</button>
      </div>
    </div>
    `;
  }

  setEvents() {
    this.addEventListener("click", "button", (e) => {
      const target = e.target.closest("button");
      if (target.classList.contains("close-btn")) {
        const { closeThankyouModal } = this.props;
        closeThankyouModal();
      }
    });
  }
}