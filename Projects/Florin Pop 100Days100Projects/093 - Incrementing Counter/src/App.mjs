import Component from './core/Component.mjs';
import IncrementingCounter from './components/IncrementingCounter.mjs';

export default class App extends Component {
  setup() {
    this.state = {
      twitterFollowers: 12000,
      youtubeSubscribers: 3000,
    }
  }

  template() {  
    return `
    <div class="incrementing-counter" data-component="IncrementingCounter" data-key="1"></div>
    <p class="describe">Twitter Followers</p>
    <div class="incrementing-counter" data-component="IncrementingCounter" data-key="2"></div>
    <p class="describe">YouTube Subscribers</p>
    `
  }

  generateChildComponent(target, name, key) {
    const { twitterFollowers, youtubeSubscribers } = this.state;
    if (key === "1") {
      return new IncrementingCounter(target, () => {
        return {
          maxCount: twitterFollowers,
          duration: 5000,
        }
      })
    }
    else if (key === "2") {
      return new IncrementingCounter(target, () => {
        return {
          maxCount: youtubeSubscribers,
          duration: 5000,
        }
      })
    }
  }
}