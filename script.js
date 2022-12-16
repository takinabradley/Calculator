const calculator = (function () {
  let firstInput = null;
  let secondInput = null;
  let operator = null;

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
    } else if (operator === "*") {
      return multiply(...nums);
    } else if (operator === "/") {
      return divide(...nums);
    }
  }

  // Logic for when to actually call operate, not mixed into DOM code
  function input(userInput) {
    console.log('userInput:', userInput)

    
    if (typeof userInput === "number" && firstInput === null) {
      //if a number is entered and the first number is not set
      //set first number
      firstInput = `${userInput}`;
      console.log("firstInput:", firstInput);
      return firstInput;
    } else if (
      (typeof userInput === "number" || userInput === '.') &&
      firstInput !== null &&
      operator === null
    ) { 
      //if a number is entered and the first number has been set, and an operator hasn't been chosen
      //add to first number
      firstInput += `${userInput}`
      console.log("firstInput:", firstInput);
      return firstInput;
    } else if (
      firstInput !== null &&
      operator === null &&
      userInput === 'DEL'
    ) {
      //if first number has been set, and an operator is not chosen, and 'DEL' key is pressed
      //delete from first input
      firstInput = firstInput.slice(0, -1) 
      return firstInput
    } else if (
      firstInput !== null &&
      operator === null &&
      typeof userInput === 'string' &&
      userInput !== "="
    ) {
      //if first number is set, and an operator other than '=' is chosen        
      //add operator
      operator = userInput;
      console.log("operator:", operator);
      return operator
    } else if (
      firstInput !== null &&
      operator !== null &&
      secondInput === null &&
      typeof userInput === 'string' &&
      userInput !== '='
    ) {
      //if first number and operator is set, but the second number is not set, and an operator other than '=' is pressed again
      //change operator
      operator = userInput
      console.log('operator changed to:', operator)
      return operator
    } else if (
      firstInput !== null &&
      operator !== null &&
      secondInput === null &&
      typeof userInput === "number"
    ) {
      //if a number is chosen, and the first number and operator have been set  
      //set second number
      secondInput = `${userInput}`
      console.log("secondInput:", secondInput);
      return secondInput
    } else if (
      (typeof userInput === "number" || userInput === '.') &&
      firstInput !== null &&
      operator !== null &&
      secondInput !== null
    ) { 
      //if a number is chosen after the second number has been set              
      //add to second number
      secondInput += `${userInput}`
      console.log("secibdInput:", secondInput);
      return secondInput;
    } else if (
      firstInput !== null &&
      operator !== null &&
      secondInput !== null &&
      userInput === 'DEL'
    ) { 
      //if the 'DEL' key is pressed after the second number has been set
      //remove from second number
      secondInput = secondInput.slice(0, -1) 
      return secondInput
    } else if (
      userInput === "=" &&
      firstInput !== null &&
      operator !== null &&
      secondInput !== null
    ) {
      //if the '=' button is pressed and other values have been set             
      //operate on first and second number, set result to first number
      const lastExpression = operate(operator, Number.parseFloat(firstInput), Number.parseFloat(secondInput));
      console.log('equals', lastExpression)
      operator = null;
      firstInput = lastExpression;
      secondInput = null;
      return lastExpression;
    } else if (
      firstInput !== null &&
      operator !== null &&
      secondInput !== null &&
      ( userInput === "+" ||
        userInput === "-" ||
        userInput === "*" ||
        userInput === "/"
      )
    ) {
      //if an operator other than '=' is choen, and other values have been set
      //operate on first and second number, set result to first number, add operator as next operator to use
      const lastExpression = operate(operator, Number.parseFloat(firstInput), Number.parseFloat(secondInput));
      console.log('equals', lastExpression)
      operator = userInput;
      firstInput = lastExpression;
      secondInput = null;
      return lastExpression;
    } else {
      console.log("OH GOD WHY")
    }

    
  }

  function clear() {
    firstInput = null
    operator = null
    secondInput = null
  }

  return { input, clear };
})();

const screen = document.querySelector('.screen')
const numbers = document.querySelector('.numbers')
const operators = document.querySelector('.operators')
const clearBtn = document.querySelector('.clear')
const deleteBtn = document.querySelector('.delete')

numbers.addEventListener('click', (e) => {
  const number = e.target.textContent;
  if (number === '.') {
    screen.textContent = calculator.input(number)
  } else {
    screen.textContent = calculator.input(Number.parseInt(number))
  }
  
})

operators.addEventListener('click', (e) => {
  screen.textContent = calculator.input(e.target.textContent)
})

clearBtn.addEventListener('click', () => {
  screen.textContent = ''
  calculator.clear()
})

deleteBtn.addEventListener('click', (e) => {
  screen.textContent = calculator.input(e.target.textContent)
})