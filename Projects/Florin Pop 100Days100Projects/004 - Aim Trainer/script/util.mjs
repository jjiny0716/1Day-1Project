export function msToReadableTime(ms) {
  const minute = Math.floor(ms / 60000).toString();
  const second = Math.floor((ms % 60000) / 1000).toString();
  const final = Math.floor(ms % 60000 % 1000 / 100).toString();
  return `${minute.padStart(2, "0")}:${second.padStart(2, "0")}:${final}`;
}