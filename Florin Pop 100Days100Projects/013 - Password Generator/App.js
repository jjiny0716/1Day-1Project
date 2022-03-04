const generatorOptions = {
  length: 20,
  uppercase: true,
  lowercase: true,
  number: true,
  symbol: true
}
const uppercases = "QAZSWXCDERFVTGBYHNUJMKILOP";
const lowercases = "zqawsxedcrvftgbynhujmikolp";
const numbers = "0123456789";
const symbols = "`~!@#$%^&*()_-+=";
const resultPassword = document.querySelector(".result-password");
const copyBtn = document.querySelector(".copy-result-btn");
const options = document.querySelector(".options");
const generateBtn = document.querySelector(".generate-btn");

function handleInput(e) {
  const target = e.target;
  const type = e.target.type;

  if (type === "number") {
    generatorOptions[target.name] = target.value;
  }
  else if (type === "checkbox") {
    generatorOptions[target.name] = target.checked;
  }
}

function copyResultToClipboard() {
  navigator.clipboard.writeText(resultPassword.textContent);
  alert("Password copied to clipboard!");
}

function generatePassword() {
  const charDomain = (generatorOptions.uppercase ? uppercases : "") + (generatorOptions.lowercase ? lowercases : "") + (generatorOptions.number ? numbers : "") + (generatorOptions.symbol ? symbols : "");
  let passwordChars = [];

  for (let i = 0 ; i < generatorOptions.length ; i++) {
    const char = charDomain[Math.floor(Math.random() * charDomain.length)];
    passwordChars.push(char);
  }

  return passwordChars.join('');
}

function renderPassword(password) {
  resultPassword.textContent = password;
}

copyBtn.addEventListener("click", copyResultToClipboard);
options.addEventListener("input", handleInput);
generateBtn.addEventListener("click", () => {
  renderPassword(generatePassword());
})