import Component from "./core/Component.mjs";

export default class App extends Component {
  setup() {
    this.state = {
      posts: [
        {
          title: "Lorem, ipsum dolor.",
          date: "3/28/2022",
          content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis reiciendis, autem excepturi laborum aspernatur quisquam, fuga minima qui impedit illo eveniet? Possimus vitae quae repellat reiciendis laboriosam blanditiis autem libero.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis reiciendis, autem excepturi laborum aspernatur quisquam, fuga minima qui impedit illo eveniet? Possimus vitae quae repellat reiciendis laboriosam blanditiis autem libero.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis reiciendis, autem excepturi laborum aspernatur quisquam, fuga minima qui impedit illo eveniet? Possimus vitae quae repellat reiciendis laboriosam blanditiis autem libero." 
        },
        {
          title: "Lorem, ipsum dolor.",
          date: "3/28/2022",
          content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis reiciendis, autem excepturi laborum aspernatur quisquam, fuga minima qui impedit illo eveniet? Possimus vitae quae repellat reiciendis laboriosam blanditiis autem libero.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis reiciendis, autem excepturi laborum aspernatur quisquam, fuga minima qui impedit illo eveniet? Possimus vitae quae repellat reiciendis laboriosam blanditiis autem libero.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis reiciendis, autem excepturi laborum aspernatur quisquam, fuga minima qui impedit illo eveniet? Possimus vitae quae repellat reiciendis laboriosam blanditiis autem libero." 
        },
      ],
      loading: false,
    };
  }

  template() {
    const { posts, loading } = this.state;
    return `
    <div class="container"> 
      <header class="header">
        <h1 class="title">Infinite scroll</h1>
      </header>
      <main class="posts">
        ${posts.map(({ title, date, content }) => { return `
        <article class="post">
          <h2 class="title">${title}</h2>
          <small class="date">${date}</small>
          <p class="content">
            ${content}
          </p>
        </article>`;}).join("")}
      </main>
    </div>
    ${loading ? `
    <div class="loading-animation-dots">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>` : ""}
    `;
  }

  setEvents() {
    window.addEventListener("scroll", (e) => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        console.log(e);
        this.loadPosts();
      }
    })
  }

  async loadPosts() {
    if (this.state.loading) return;
    const { posts } = this.state
    this.setState({ loading: true });

    // loading simulation (1000ms ~ 2500ms)
    await new Promise((r) => setTimeout(r, 1000 + 1500 * Math.random()));
    const loadedPosts = await fetch("data/posts.JSON").then(res => res.json())
    this.setState({ posts: [...posts, ...loadedPosts], loading: false });
  }
}
