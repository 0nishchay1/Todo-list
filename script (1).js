document.addEventListener("DOMContentLoaded", function () {
  var display = document.getElementById("screen");
  var buttons = document.getElementsByClassName("button");
  

  Array.from(buttons).forEach(function (button) {
      button.addEventListener("click", function () {
          handleButtonClick(button.textContent);
      });
  });

  function handleButtonClick(buttonText) {
      var validButtonValues = ["=", "AC", "x", "÷", "√", "x²", "%", "CE", "±", "sin", "cos", "tan", "log", "ln", "x^", "x!", "π", "e", "Rad", "Deg"];

      if (validButtonValues.includes(buttonText)) {
          handleSpecialButtons(buttonText);
      } else {
          display.value += buttonText;
      }
  }

  function handleSpecialButtons(buttonText) {
      switch (buttonText) {
          case "=":
              evaluateExpression();
              break;
          case "AC":
              clearDisplay();
              break;
          case "x":
              appendOperator("*");
              break;
          case "÷":
              appendOperator("/");
              break;
          case "±":
              togglePlusMinus();
              break;
          case "CE":
              backspace();
              break;
          case "%":
              calculatePercentage();
              break;
          case "π":
              insertPi();
              break;
          case "x²":
              square();
              break;
          case "√":
              squareRoot();
              break;
          case "sin":
              performTrigonometricOperation("sin");
              break;
          case "cos":
              performTrigonometricOperation("cos");
              break;
          case "tan":
              performTrigonometricOperation("tan");
              break;
          case "log":
              performLogarithmicOperation("log");
              break;
          case "ln":
              performLogarithmicOperation("ln");
              break;
          case "x^":
              appendOperator("^");
              break;
          case "x!":
              factorial();
              break;
          case "e":
              insertE();
              break;
          case "Rad":
              toRadians();
              break;
          case "Deg":
              toDegrees();
              break;
          default:
              break;
      }
  }

  function evaluateExpression() {
      try {
          if (display.value.includes("^")) {
              handleExponentiation();
          } else {
              display.value = eval(display.value);
          }
          checkLength();
          syntaxError();
      } catch (error) {
          display.value = "Error";
      }
  }

  function handleExponentiation() {
      var [base, exponent] = display.value.split("^");
      display.value = Math.pow(parseFloat(base), parseFloat(exponent));
  }

  function clearDisplay() {
      display.value = "";
  }

  function appendOperator(operator) {
      display.value += operator;
  }

  function togglePlusMinus() {
      if (display.value.charAt(0) === "-") {
          display.value = display.value.slice(1);
      } else {
          display.value = "-" + display.value;
      }
  }

  function backspace() {
      display.value = display.value.substring(0, display.value.length - 1);
  }

  function calculatePercentage() {
      display.value = eval(display.value) / 100;
  }

  function insertPi() {
      display.value += Math.PI;
  }

  function square() {
      display.value = eval(display.value) * eval(display.value);
  }

  function squareRoot() {
      display.value = Math.sqrt(eval(display.value));
  }

  function performTrigonometricOperation(operation) {
      display.value = Math[operation](eval(display.value));
  }

  function performLogarithmicOperation(operation) {
      display.value = Math[operation](eval(display.value));
  }

  function factorial() {
      var number = parseInt(display.value);
      if (number === 0) {
          display.value = "1";
      } else if (number < 0) {
          display.value = "undefined";
      } else {
          var result = 1;
          for (var i = 2; i <= number; i++) {
              result *= i;
          }
          display.value = result;
      }
  }

  function insertE() {
      display.value += Math.E;
  }

  function toRadians() {
      display.value = eval(display.value) * (Math.PI / 180);
  }

  function toDegrees() {
      display.value = eval(display.value) * (180 / Math.PI);
  }

  function syntaxError() {
      if (eval(display.value) == SyntaxError || eval(display.value) == ReferenceError || eval(display.value) == TypeError) {
          display.value = "Syntax Error";
      }
  }

  function checkLength() {  }
});
