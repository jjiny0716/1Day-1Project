import NewYearTimer from "./NewYearTimer.mjs";
import SnowflakeGeneratorBuilder from "./SnowflakeGenerator.mjs";

const newYearTimer = new NewYearTimer(document.querySelector(".new-year-timer"));
const snowflakeGenerator = new SnowflakeGeneratorBuilder()
  .setTarget(document.querySelector(".container"))
  .setSnowSizeRange(5, 20)
  .setSnowOpacityRange(0.5, 1)
  .setSnowPerMinute(5000)
  .setSnowDurationRange(4000, 10000)
  .build();
newYearTimer.active();
snowflakeGenerator.active();
