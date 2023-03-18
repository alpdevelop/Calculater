const display = document.querySelector(".calc-input");
const keys = document.querySelector(".calc-keys");


let displayValue = "0";
let firstValue = null;
let operator = null;
let waitingForSecValue = false;

updateDisplay();

function updateDisplay(){
    display.value = displayValue;
}

keys.addEventListener("click", function(e){
    const element = e.target
    const value = element.value

    if(!element.matches("button"))return;

    switch(element.value){
        case "+":
        case "-":
        case "*":
        case "/":
        case "=":
            handleOperator(value);
            break;
        case ".":
            inputDecimal();
            break;
        case "clear":
            clearAll()
            break;
        default: 
            inputNumber(value);
    }
    updateDisplay();
});

function handleOperator(nextOperator){
    const value = parseFloat(displayValue);

    if(operator && waitingForSecValue) { //? Attention
    operator = nextOperator;
    return;
    }

    if(firstValue == null){
        firstValue = value;
    }else if(operator){
        const result = calc(firstValue,value,operator)
        displayValue = `${parseFloat(result.toFixed(7))}`
        firstValue = result;
    }
    waitingForSecValue = true;
    operator = nextOperator;
}

function calc(first,second,operator){
    if(operator === "+"){
        return first + second;
    }else if(operator === "-"){
        return first - second;
    }else if(operator === "*"){
        return first * second;
    }else if(operator === "/"){
        return first / second;
    }
    return second
}

function inputNumber(number){
    if(waitingForSecValue){
        displayValue = number;
        waitingForSecValue = false;
    }else{
        displayValue = displayValue === '0'? number: displayValue + number; //? Attention
    }
}

function inputDecimal() {
    if (!displayValue.includes(".")) {
        displayValue += '.';
    }
}

function clearAll(){
    displayValue ="0";
}
