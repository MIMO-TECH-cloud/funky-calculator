
let display = document.getElementById("display");

function appendValue(value) {
  // Prevent multiple decimals in one number
  if (value === '.' && display.textContent.includes('.') && isLastNumberDecimal()) {
    return;
  }

  // Replace starting 0
  if (display.textContent === "0" && value !== "." && !isNaN(value)) {
    display.textContent = value;
  } else {
    display.textContent += value;
  }
}

function clearDisplay() {
  display.textContent = "0";
}

function deleteLast() {
  if (display.textContent.length === 1) {
    display.textContent = "0";
  } else {
    display.textContent = display.textContent.slice(0, -1);
  }
}

function calculate() {
  try {
    let expression = display.textContent
      .replace(/÷/g, "/")
      .replace(/×/g, "*")
      .replace(/%/g, "/100");

    let result = eval(expression);

    // Handle invalid results
    if (isNaN(result) || !isFinite(result)) {
      display.textContent = "Error";
    } else {
      display.textContent = result;
    }
  } catch (error) {
    display.textContent = "Error";
  }
}

// Helper function to check for decimal repetition
function isLastNumberDecimal() {
  const parts = display.textContent.split(/[\+\-\*\/]/);
  const lastPart = parts[parts.length - 1];
  return lastPart.includes('.');
}
