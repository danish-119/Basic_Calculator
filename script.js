console.log("Welcome Back!");

document.addEventListener("DOMContentLoaded", function () {
    const screen = document.getElementById("screen");
    const buttons = document.querySelectorAll(".buttons button");

    let currentInput = "";
    let displayValue = "";

    // Function to update the screen value
    function updateScreen(value) {
      screen.value = value;
    }

    // Function to handle button clicks
    function handleButtonClick(value) {
      if (value >= "0" && value <= "9") {
        currentInput += value;
        displayValue += value;
        updateScreen(displayValue);
      } else if (value === "." && !currentInput.includes(".")) {
        currentInput += value;
        displayValue += value;
        updateScreen(displayValue);
      } else if (value === "AC") {
        clearAll();
      } else if (value === "DEL") {
        currentInput = currentInput.slice(0, -1);
        displayValue = displayValue.slice(0, -1);
        updateScreen(displayValue);
      } else if (
        value === "+" ||
        value === "-" ||
        value === "x" ||
        value === "/" ||
        value === "%"
      ) {
        if (currentInput !== "") {
          displayValue += value;
          updateScreen(displayValue);
          currentInput = "";
        }
      } else if (value === "=") {
        try {
          displayValue = eval(displayValue.replace(/x/g, "*")).toString();
          updateScreen(displayValue);
          currentInput = displayValue;
        } catch (e) {
          displayValue = "Error";
          updateScreen(displayValue);
        }
      }
    }

    // Function to clear all
    function clearAll() {
      currentInput = "";
      displayValue = "";
      updateScreen("0");
    }

    // Event listener for button clicks
    buttons.forEach((button) => {
      button.addEventListener("click", function () {
        handleButtonClick(button.textContent);
      });
    });

    // Event listener for keyboard input
    document.addEventListener("keydown", function (event) {
      const key = event.key;
      if (
        (key >= "0" && key <= "9") ||
        key === "." ||
        key === "+" ||
        key === "-" ||
        key === "x" ||
        key === "/" ||
        key === "%" ||
        key === "=" ||
        key === "Enter" ||
        key === "Backspace" ||
        key === "Escape"
      ) {
        if (key === "Enter") {
          handleButtonClick("=");
        } else if (key === "Backspace") {
          handleButtonClick("DEL");
        } else if (key === "Escape") {
          handleButtonClick("AC");
        } else {
          handleButtonClick(key);
        }
      }
    });
  });