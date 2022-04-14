export default class Card {
  constructor(target, props) {
    this.target = target;
    this.props = props;
    this.setup();
    this.render();
  }

  setup() {
    this.state = {
      headerImgURL: null,
      title: null,
      text: null,
      avatar: null,
      writer: null,
      dat: null,
    };
    setTimeout(this.loadContent.bind(this), Math.random() * 1000);
    this.loadImage();
  }

  render() {
    const { headerImgURL, title, text, avatar, writer, date } = this.state;
    this.target.innerHTML = `
    <div class="header-image">${headerImgURL ? `<img src="${headerImgURL}" alt="Nature">` : `<div class="loading-animation-background"></div>`}</div>
    <div class="contents">
      <h2 class="title">${title ?? `<span class="loading-animation-background text"></span>`}</h2>
      <p class="text-area">
        ${text ?? `<span class="loading-animation-background text"></span>`.repeat(3)}
      </p>
      <div class="info">
        <div class="avatar">${avatar ? `<img src="${avatar}" alt="Cute cat">` : `<div class="loading-animation-background"></div>`}</div>
        <div class="info-text-container">
          <h3 class="writer">${writer ?? `<span class="loading-animation-background text"></span>`}</h3>
          <small class="date">${date ?? `<span class="loading-animation-background text"></span>`}</small>
        </div>
      </div>
    </div>
    `;
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  // 로딩 시뮬레이션용 함수
  loadContent() {
    this.setState({
      title: "Content card",
      text: "This is content card with loading animation.~!#~!@~!@",
      avatar: "./cat1.jpg",
      writer: "jjiny",
      date: "2022-03-26",
    });
  }

  loadImage() {
    fetch("https://source.unsplash.com/collection/1319040?1").then(res => res.blob()).then(blob => this.setState({ headerImgURL: URL.createObjectURL(blob) }));
  }
}
