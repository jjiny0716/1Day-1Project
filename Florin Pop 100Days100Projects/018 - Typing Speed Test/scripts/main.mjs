import WelcomeModal from './WelcomeModal.mjs';
import Game from './Game.mjs';

let game = new Game();

fetch("./texts.JSON")
  .then(response => response.json())
  .then(textData => {
    console.log(textData);
    game.setTextData(textData);
  })

const welcomeModal = new WelcomeModal();
welcomeModal.show();
welcomeModal.addStartGameBtnClickEventListener(() => {
  if (game.isReady()) {
    welcomeModal.hide();
    game.setLanguage(welcomeModal.getLanguage());
    game.start();
  }
});
