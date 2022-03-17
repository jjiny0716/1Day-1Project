import SettingChangerOpener from './SettingChangerOpener.mjs';
import SettingChanger from './SettingChanger.mjs';
import {isValidURL} from './utils.mjs';

const text = document.querySelector(".text");
const settingChangerOpener = new SettingChangerOpener(document.querySelector(".setting-btn"));
const settingChanger = new SettingChanger(document.querySelector(".setting-form"));
const setting = {
  fontSize: 4,
  backgroundImageUrl: "https://media.giphy.com/media/69r66kjeVKhlowe2L7/giphy.gif",
}
// more examples
// https://media.giphy.com/media/J5SqHZ4CHrkp46rSn0/giphy.gif
// https://media.giphy.com/media/2SfaMS0dGixkYqF8Wu/giphy.gif
// https://media.giphy.com/media/TAqm4iEVR7hPHPPY16/giphy.gif

function setScreen({fontSize, backgroundImageUrl}) {
  text.style.backgroundImage = `url(${backgroundImageUrl})`;
  text.style.fontSize = `${fontSize}px`;
  text.style.lineHeight = `${fontSize}px`;
}

settingChangerOpener.addClickEventListener(settingChanger.show.bind(settingChanger));
settingChanger.addSubmitEventListener((e) => {
  // valid URL check
  if (!isValidURL(e.target.elements.namedItem("url-input").value)) return;
  
  setting.fontSize = e.target.elements.namedItem("size-input").value;
  setting.backgroundImageUrl = e.target.elements.namedItem("url-input").value;
  setScreen(setting);
});

setScreen(setting);
window.addEventListener("load", () => {
  setTimeout(() => {window.scrollTo(0, 0)}, 0);
});