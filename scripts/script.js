const preDisplay = document.querySelector(".pre-display");
const currDisplay = document.querySelector(".curr-display");
const clearBtn = document.querySelector(".clear");
const deleteBtn = document.querySelector(".delete");
const equalsBtn = document.querySelector(".equals");
const numbers = document.querySelectorAll(".number");
const operands = document.querySelectorAll(".operation");

let result = 0;
//Display Numbers in main display
const appendNumbers = (number) => {
    // To prevent user from typing more than one decimal point
    if (number === "." && currDisplay.innerText.includes(".")) return;

    // Add character into display
    currDisplay.innerText += number;
}

// Working with Operations
let firstNumber = "";
let operator = ""; // =, -, *, /
function handleOperator(btnOperator) {
    if (currDisplay.innerText === "") return; // Stops the function if there is no input
    
    firstNumber = currDisplay.innerText;
    operator = btnOperator;
    preDisplay.innerText = firstNumber + " " + btnOperator;
    currDisplay.innerText = "";
}

// When the user clicks '='
let secondNumber = "";

function calculate() {
    secondNumber = currDisplay.innerText;
    preDisplay.innerText = firstNumber + " " + operator + " " + secondNumber;

    // Performing Operations
    if (operator === "+") {
        result = Number(firstNumber) + Number(secondNumber)
    } else if (operator === "-") {
        result = Number(firstNumber) - Number(secondNumber)
    } else if (operator === "×") {
        result = Number(firstNumber) * Number(secondNumber)
    } else if (operator === "/") {
        result = Number(firstNumber) / Number(secondNumber)
    }

    // Display result
    currDisplay.innerText = result;
}

// Clear Display
const clearDisplay = () => {
    currDisplay.innerText = "";
    preDisplay.innerText = "";
}

// Click number to display
numbers.forEach((number) => {
    number.addEventListener("click", () => {
        appendNumbers(number.innerText);
    })
})

// Click operands to display
operands.forEach((operand) => {
    operand.addEventListener("click", ()=>{
        handleOperator(operand.innerText);
    })
})

//Click button to clear display
clearBtn.addEventListener("click", () => {
    clearDisplay();
})

// Click button to perform operation
equalsBtn.addEventListener("click", () => {
    calculate();
})

// Click button to delete numbers
deleteBtn.addEventListener("click", () => {
    currDisplay.innerText = currDisplay.innerText.slice(0, -1);
})

// Keyboard Support
const key = document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "Enter":
            event.preventDefault();
            calculate();
            break;
        case "Backspace":
            currDisplay.innerText = currDisplay.innerText.slice(0, -1);
            break;
        case "Delete":
            clearDisplay();
            break;
        case "+":
        case "-":
        case "/":
            handleOperator(event.key);
            break;
        case "*":
            handleOperator("×");
            break;
    }
    if (!isNaN(event.key) || event.key === ".") {
        appendNumbers(event.key);  
    }
})