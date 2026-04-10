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
            return (b === 0) ? undefined : divide(a, b);
    }
}

let firstNumber = null;
let secondNumber = null;
let operator = null;
let newDigitClearsDisplay = false;

let calculator = document.querySelector(".calculator");
let display = document.querySelector(".display");

function showErrorMessage(message) {
    const errors = document.querySelector(".errors");
    errors.textContent = message;
    errors.style.display = "block";

    setTimeout(() => {
        errors.style.display = "none";
    }, 2000); // clear error message after 2000 ms
}

function resetCalculator() {
    display.textContent = "";
    firstNumber = null;
    secondNumber = null;
    operator = null;
}

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
                resetCalculator();
                break;
            case ".":
                if (display.textContent !== "" && !display.textContent.includes(".")) {
                    display.textContent += ".";
                }
                break;
            case "Delete":
                display.textContent = display.textContent.slice(0, -1);
                break;
            default:
                if (!firstNumber) {
                    firstNumber = Number(display.textContent);
                } else if (!secondNumber && newDigitClearsDisplay === false) {
                    secondNumber = Number(display.textContent);
                }

                newDigitClearsDisplay = true;

                if (operator !== null && secondNumber !== null && firstNumber !== null) {
                    let result = operate(operator, firstNumber, secondNumber);
                    if (result === undefined) {
                        showErrorMessage(`Error: ${firstNumber} ${operator} ${secondNumber} is undefined.`);
                        resetCalculator();
                        break;
                    }
                    firstNumber = result;
                    display.textContent = result;
                    secondNumber = null;
                }

                if (event.target.textContent !== "=") {
                    operator = event.target.textContent;
                } else {
                    operator = null;
                    firstNumber = null;
                    secondNumber = null;
                }
        }
    }
});

document.addEventListener("keydown", (event) => {
    if (/[0-9]/.test(event.key)) { // is digit
        if (newDigitClearsDisplay) {
            display.textContent = "";
            newDigitClearsDisplay = false;
        }
        display.textContent += event.key;
    } else if (["+", "-", "*", "/", ".", "=", "Enter", "Backspace", "Escape"].includes(event.key)) {
        switch (event.key) {
            case "Escape":
                resetCalculator();
                break;
            case ".":
                if (display.textContent !== "" && !display.textContent.includes(".")) {
                    display.textContent += ".";
                }
                break;
            case "Backspace":
                display.textContent = display.textContent.slice(0, -1);
                break;
            default:
                if (!firstNumber) {
                    firstNumber = Number(display.textContent);
                } else if (!secondNumber && newDigitClearsDisplay === false) {
                    secondNumber = Number(display.textContent);
                }

                newDigitClearsDisplay = true;

                if (operator !== null && secondNumber !== null && firstNumber !== null) {
                    let result = operate(operator, firstNumber, secondNumber);
                    if (result === undefined) {
                        showErrorMessage(`Error: ${firstNumber} ${operator} ${secondNumber} is undefined.`);
                        resetCalculator();
                        break;
                    }
                    firstNumber = result;
                    display.textContent = result;
                    secondNumber = null;
                }

                if (!["=", "Enter"].includes(event.key)) {
                    operator = event.key;
                } else {
                    operator = null;
                    firstNumber = null;
                    secondNumber = null;
                }
        }
    }
});