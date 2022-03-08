export default class RegesteredEventListener {
  constructor(target, type, listener) {
    this.target = target;
    this.type = type;
    this.listener = listener;
  }

  remove() {
    this.target.removeEventListener(this.type, this.listener);
  }
} 