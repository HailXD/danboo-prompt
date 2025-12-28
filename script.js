const source = document.getElementById("source");
const result = document.getElementById("result");

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

function transformInput(text) {
  const tokens = text.split(/\s+/).filter(Boolean);
  const replaced = tokens
    .map((token) => {
      if (token === "?") {
        return null;
      }
      if (token.includes("?")) {
        return ",";
      }
      return token;
    })
    .filter((token) => token !== null);

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
