const screen = document.querySelector('.display')
const numbers = document.querySelectorAll('.num')
const operators = document.querySelectorAll('.function')
const clearBtn = document.querySelector('.clear')
const deleteBtn = document.querySelector('.delete')
const negativeBtn = document.querySelector('.negative')
let num1 = null
let num2 = null
let operator = null
let displayValue = ''

function add(...nums) {
  return nums.reduce((total, num) => {
    return total + num;
  }, 0);
}

function subtract(...nums) {
  return nums.reduce((total, num, index) => {
    if (index === 0) return total;
    return total - num;
  }, nums[0]);
}

function divide(...nums) {
  return nums.reduce((total, num, index) => {
    if (index === 0) return total;
    return total / num;
  }, nums[0]);
}

function multiply(...nums) {
  return nums.reduce((total, num) => {
    return total * num;
  }, 1);
}

function operate(operator, ...nums) {
  if (operator === "+") {
    return add(...nums);
  } else if (operator === "-") {
    return subtract(...nums);
  } else if (operator === "x") {
    return multiply(...nums);
  } else if (operator === "/") {
    return divide(...nums);
  }
}

function allowDecimal(screenText) {
  if(screenText.includes('.')) return false
  return true
}

function toggleNegative() {
  if(screen.textContent.includes('-')) {
    displayValue = displayValue.slice(1)
    screen.textContent = displayValue
  } else {
    displayValue = '-' + displayValue
    screen.textContent = displayValue
  }
}

function displayNumbers(e) {
  //don't allow decimal if one is already used
  if(e.target.textContent === '.' && !allowDecimal(displayValue)) return
  //toggle the negative symbol when toggleNegative is pressed.
  if(e.target.textContent === '+/-') {
    toggleNegative()
    return;
  }
  //else just display the numbers
  displayValue += e.target.textContent
  screen.textContent = displayValue
}

function removeNumbers() {
  displayValue = displayValue.slice(0, displayValue.length - 1)
  screen.textContent = displayValue
}

function clear() {
  displayValue = ''
  screen.textContent = ''
  num1 = null
  num2 = null
  operator = null
}

function handleInput(e) {
  const currentOperator = e.target.textContent
  
  console.log(displayValue)
  if(displayValue === '-') return
  if(num1 === null && operator === null && currentOperator !== '=') {
    //if num1 is not set and operator is not set, set both
    num1 = displayValue
    operator = currentOperator
    displayValue = ''
    console.log('first operator press:', 'num1:', num1, 'operator:', operator, 'num2:', num2)
    return
  } else if(num1 !== null && operator === null && currentOperator !== '=') {
    //if num1 is set, but operator isn't, set operator
    operator = currentOperator;
  } else if (num1 !== null && operator !== null && currentOperator !== '=') {
    //if num1 and operator are set, and currentOperator isn't '=', calculate and set operator to current operator for next calculation
    num2 = displayValue
    console.log('second operator press', 'num1:', num1, 'operator:', operator, 'num2:', num2)
    const lastExpression = operate(operator, +num1, +num2)
    screen.textContent = lastExpression

    num1 = lastExpression
    num2 = null
    operator = currentOperator
    displayValue = ''
    console.log('second operator press after calculation', 'num1:', num1, 'operator:', operator, 'num2:', num2)
    return
  } else if (num1 !== null && num2 === null && operator !== null && currentOperator === '=') {
    //if num1 and operator are set, and currentOperator is '=', calculate, set num1, and clear everything else.
    num2 = displayValue
    console.log('equal press', 'num1:', num1, 'operator:', operator, 'num2:', num2)
    const lastExpression = operate(operator, +num1, +num2)
    screen.textContent = lastExpression
   
    num1 = lastExpression
    num2 = null
    operator = null
    displayValue = ''
    console.log('equal press after calculation', 'num1:', num1, 'operator:', operator, 'num2:', num2)
    return
  }
  console.log('unhandled')
}

numbers.forEach(num => num.addEventListener('click', displayNumbers))

operators.forEach(operatorBtn => {
  operatorBtn.addEventListener('click', handleInput)
})

deleteBtn.addEventListener('click', removeNumbers)

clearBtn.addEventListener('click', clear)