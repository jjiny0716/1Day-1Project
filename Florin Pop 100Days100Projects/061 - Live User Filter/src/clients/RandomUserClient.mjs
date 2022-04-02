export default class RandomUserClient {
  async request(option) {
    const parameters = [];
    for (let key of Object.keys(option)) {
      let value = option[key];
      if (typeof value === "number") value = String(value);
      const valueStr = (typeof value === "string") ? value : value.join(',');
      parameters.push(`${key}=${valueStr}`);
    }
    const result = await fetch(`https://randomuser.me/api/${parameters.length ? `?${parameters.join('&')}` : ""}`).then(res => res.json());
    return result.results;
  }
}