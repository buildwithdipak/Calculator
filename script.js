let display = document.getElementById('display');
let currentNumber = '';
let previousNumber = '';
let currentOperator = '';
let justCalculated = false;
let inputString = '';

function updateDisplay() {
    display.value = inputString;
}

function appendNumber(number) {
    if (justCalculated) {
        currentNumber = '';
        inputString = '';
        justCalculated = false;
    }
    if (currentNumber === '0' && number !== '.') {
        currentNumber = number;
    } else {
        currentNumber += number;
    }
    inputString += number;
    updateDisplay();
}

function appendOperator(operator) {
    if (currentNumber === '' && previousNumber === '') return;
    if (currentNumber === '' && previousNumber !== '') {
        currentOperator = operator;
        // Replace last operator in inputString
        inputString = inputString.slice(0, -1) + operator;
        updateDisplay();
        return;
    }
    if (previousNumber !== '' && currentOperator !== '') {
        calculate();
        previousNumber = currentNumber;
        currentNumber = '';
        currentOperator = operator;
        inputString += operator;
        updateDisplay();
        return;
    }
    previousNumber = currentNumber;
    currentOperator = operator;
    currentNumber = '';
    inputString += operator;
    updateDisplay();
}

function appendDecimal() {
    if (justCalculated) {
        currentNumber = '0.';
        inputString = '0.';
        justCalculated = false;
        updateDisplay();
        return;
    }
    if (!currentNumber.includes('.')) {
        if (currentNumber === '') {
            currentNumber = '0.';
            inputString += '0.';
        } else {
            currentNumber += '.';
            inputString += '.';
        }
        updateDisplay();
    }
}

function calculate() {
    if (currentNumber !== '' && previousNumber !== '' && currentOperator !== '') {
        let result;
        switch (currentOperator) {
            case '+':
                result = parseFloat(previousNumber) + parseFloat(currentNumber);
                break;
            case '-':
                result = parseFloat(previousNumber) - parseFloat(currentNumber);
                break;
            case '*':
                result = parseFloat(previousNumber) * parseFloat(currentNumber);
                break;
            case '/':
                if (parseFloat(currentNumber) === 0) {
                    display.value = 'Error';
                    currentNumber = '';
                    previousNumber = '';
                    currentOperator = '';
                    inputString = '';
                    justCalculated = false;
                    return;
                }
                result = parseFloat(previousNumber) / parseFloat(currentNumber);
                break;
            default:
                result = parseFloat(currentNumber);
        }
        display.value = result;
        currentNumber = result.toString();
        previousNumber = '';
        currentOperator = '';
        inputString = '';
        justCalculated = true;
    }
}

function clearDisplay() {
    currentNumber = '';
    previousNumber = '';
    currentOperator = '';
    justCalculated = false;
    inputString = '';
    display.value = '';
}

display.addEventListener('keydown', function(e) {
    if ((e.key >= '0' && e.key <= '9')) {
        appendNumber(e.key);
    } else if (e.key === '.') {
        appendDecimal();
    } else if (['+', '-', '*', '/'].includes(e.key)) {
        // For multiply, allow both '*' and 'x' (common on some keyboards)
        if (e.key === '*' || e.key === 'x' || e.key === 'X') {
            appendOperator('*');
        } else {
            appendOperator(e.key);
        }
    } else if (e.key === 'Enter' || e.key === '=') {
        calculate();
    } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
        clearDisplay();
    }
});