export default class SnowflakeGeneratorBuilder {
  setTarget(target) {
    this.target = target;
    return this;
  }

  setSnowSizeRange(min, max) {
    this.snowSizeRange = {
      "min": min,
      "max": max
    }
    return this;
  }

  setSnowOpacityRange(min, max) {
    this.snowOpacityRange = {
      "min": min,
      "max": max
    }
    return this;
  }

  setSnowPerMinute(snowPerMinute) {
    this.snowPerMinute = snowPerMinute;
    return this;
  }

  setSnowDurationRange(min, max) {
    this.snowDurationRange = {
      "min": min,
      "max": max
    }
    return this;
  }

  build() {
    return new SnowflakeGenerator(this);
  }
}

class SnowflakeGenerator {
  constructor(builder) {
    this.target = builder.target;
    this.snowSizeRange = builder.snowSizeRange;
    this.snowOpacityRange = builder.snowOpacityRange;
    this.snowPerMinute = builder.snowPerMinute;
    this.snowDurationRange = builder.snowDurationRange;
  }

  active() {

    setInterval(() => {
      const snowflake = this.createSnowflake();
      this.target.appendChild(snowflake);
      setTimeout(() => {snowflake.remove()}, Number(snowflake.style.animationDuration.replace("ms", '')));
    }, 1000 / (this.snowPerMinute / 60));
  }

  createSnowflake() {
    const snowflake = document.createElement("span");
    snowflake.className = "snowflake";
    snowflake.innerHTML = `<i class="fa-solid fa-snowflake"></i>`;
    snowflake.style.fontSize = `${this.snowSizeRange.min + Math.random() * (this.snowSizeRange.max - this.snowSizeRange.min)}px`;
    snowflake.style.opacity = `${this.snowOpacityRange.min + Math.random() * (this.snowOpacityRange.max - this.snowOpacityRange.min)}`;
    snowflake.style.animationDuration = `${this.snowDurationRange.min + Math.random() * (this.snowDurationRange.max - this.snowDurationRange.min)}ms`;
    snowflake.style.left = `${Math.random() * this.target.clientWidth}px`;
    return snowflake;
  }
}