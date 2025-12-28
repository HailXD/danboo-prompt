const source = document.getElementById("source");
const result = document.getElementById("result");
const blacklist = ["censor", "eyes", "hair"];

function normalizeCommas(text) {
  let output = text.replace(/\s+,/g, ",");
  output = output.replace(/,\s*/g, ", ");
  output = output.trim();
  output = output.replace(/,\s*$/g, ",");
  return output;
}

function stripTrailingNumber(text) {
  if (!/(?:^|\s)\d+$/.test(text)) {
    return text;
  }

  return text.replace(/\s*\d+$/, "").trim();
}

function removePreviousWord(tokens) {
  for (let i = tokens.length - 1; i >= 0; i -= 1) {
    if (tokens[i] !== ",") {
      tokens.splice(i, 1);
      return;
    }
  }
}

function transformInput(text) {
  const tokens = text.split(/\s+/).filter(Boolean);
  const replaced = [];

  tokens.forEach((token) => {
    const lowerToken = token.toLowerCase();
    if (blacklist.some((word) => lowerToken.includes(word))) {
      removePreviousWord(replaced);
      return;
    }
    if (token === "?") {
      return;
    }
    if (token.includes("?")) {
      replaced.push(",");
      return;
    }
    replaced.push(token);
  });

  let output = replaced.join(" ");
  output = normalizeCommas(output);
  output = stripTrailingNumber(output);
  output = normalizeCommas(output);
  return output;
}

function updateOutput() {
  result.textContent = transformInput(source.value);
}

source.addEventListener("input", updateOutput);
updateOutput();
