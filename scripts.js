function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }
}

let firstNumber = null;
let secondNumber = null;
let operator = null;
let newDigitClearsDisplay = false;

let calculator = document.querySelector(".calculator");
let display = document.querySelector(".display");

calculator.addEventListener("click", (event) => {
    if (event.target.classList.contains("digit")) {
        if (newDigitClearsDisplay) {
            display.textContent = "";
            newDigitClearsDisplay = false;
        }
        display.textContent += event.target.textContent;
    } else if (event.target.classList.contains("operator")) {
        switch (event.target.textContent) {
            case "Clear":
                display.textContent = "";
                firstNumber = null;
                secondNumber = null;
                operator = null;
                break;
            default:
                if (!firstNumber) {
                    firstNumber = Number(display.textContent);
                } else if (!secondNumber && newDigitClearsDisplay === false) {
                    secondNumber = Number(display.textContent);
                }

                newDigitClearsDisplay = true;

                if (operator && secondNumber && firstNumber) {
                    console.log(operator, firstNumber, secondNumber);
                    firstNumber = operate(operator, firstNumber, secondNumber);
                    display.textContent = firstNumber;
                    secondNumber = null;
                }

                if (event.target.textContent !== "=") {
                    operator = event.target.textContent;
                } else {
                    operator = null;
                }
        }
    }
});
