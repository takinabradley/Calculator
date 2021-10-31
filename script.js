function add (array) {
  return array.reduce( (sum, num) => sum + num, 0);
}

function subtract (array) {
  return array.reduce( (difference, num) => {
    if (difference === null) return difference = num;
    return difference - num;
  }, null);
}


function multiply (array) {
  return array.reduce( (product, num) => {
    if (product === null) return product = num;
    return product * num;
  }, null);
}


function divide (array) {
  return array.reduce( (quotient, num) => {
    if (quotient === null) return quotient = num;
    return quotient / num;
  }, null);
}


function operate (operator, numArray) {
  if (operator === '+') return add(numArray);
  if (operator === '-') return subtract(numArray);
  if (operator === 'x') return multiply(numArray);
  if (operator === '/') return divide(numArray);
}


function getDisplayContent () {
  return parseFloat(document.querySelector('.display').textContent);
}


function clearDisplayContent () {
  document.querySelector('.display').textContent = '';
  document.querySelector('.decimal').classList.remove('used');
  /*must remove used class to ensure the decimal can be used as first input 
    after being cleared */
}


function allowNumInput() {
  const numPad = document.querySelectorAll('.num');
  
  numPad.forEach( num => num.addEventListener('click', (num) => {
    const display = document.querySelector('.display');
    const decimal = document.querySelector('.decimal');
    const negative = document.querySelector('.negative');
    const numContent = num.target.textContent;
    const deleteBtn = document.querySelector('.delete');
    //deleteBtn is part of numpad, as it's functionality makes most sense here.
    
    if (display.classList.contains('output')) {
      display.classList.remove('output');
      clearDisplayContent();
    }
    
    if (numContent === 'DEL') {
      display.textContent = display.textContent.slice(0, -1);
      display.textContent.includes('.') ? decimal.classList.add('used') : 
                                          decimal.classList.remove('used');
      return;
    }
    /*deletes last character. Must include decimal check to ensure decimal isn't
      deactivated prematurely*/
    
    if (decimal.classList.contains('used') && numContent === '.') return;
    //doesn't allow 2nd use of decimal button.
    
    if (!negative.classList.contains('active') && numContent === '+/-') {
      display.textContent = display.textContent.padStart(display.textContent.length + 1, '-');
      negative.classList.add('active');
      return;
    } else if (negative.classList.contains('active') && numContent === '+/-') {
      display.textContent = display.textContent.slice(1);
      negative.classList.remove('active');
      return;
    }
    /*appends/removes '-' from the front of the display. Overrides default behavior
      of adding the button's textContent.*/
    
    
    display.textContent += numContent;
    display.textContent.includes('.') ? decimal.classList.add('used') : 
                            decimal.classList.remove('used');
  }));
}
//having trouble with assigning display to equal display.textContent.
//Theory: if textContent === '', display = null. This might prohibit += operations.

function allowFunctionInput () {
  const functionBtns = document.querySelectorAll('.function');
  const display = document.querySelector('.display');
  let numArray= []
  let operator = '';
  let nextOperator = '';
  let lastSolution = '';
  
  functionBtns.forEach( btn => btn.addEventListener('click', (btn) => {
    
    operator = btn.target.textContent;  
    
    if ( operator === '/' || operator === 'x' || operator === '-' || operator === '+') {
      if (numArray.length === 0) {
        
        numArray[0] = getDisplayContent();
        
        if (numArray.includes(NaN)) return numArray = [];
        
        clearDisplayContent();
        nextOperator = operator;
        //lastSolution = operate(operator, numArray);
        //asigns first number of array
      } else if (numArray.length === 1) {
        numArray[1] = getDisplayContent();
        
        if (numArray.includes(NaN)) return numArray.length = 1;
        clearDisplayContent();
        
        display.textContent = operate(nextOperator, numArray);
        display.classList.add('output');
        
        lastSolution = operate(nextOperator, numArray);
        nextOperator = operator;
        //assigns second number of array, outputs solution, then saves it as last solution
      } else if (numArray.length === 2) {
        numArray[0] = lastSolution;
        
        if (!display.classList.contains('output')) {
          numArray[1] = getDisplayContent();
          if (numArray.includes(NaN)) return;
        } 

        display.textContent = operate(nextOperator, numArray);
        display.classList.add('output');
        
        lastSolution = operate(nextOperator, numArray);
        nextOperator = operator;
        //assigns 1st number to last solution, 2nd number to last number used or 
        //user input, outputs solution, then saves it as last solution.
      }
    } else if (operator === '=') {
      if (numArray.length === 1) {
        numArray[1] = getDisplayContent();
        if (numArray.includes(NaN)) return numArray.length = 1;
        
        display.textContent = operate(nextOperator, numArray);
        display.classList.add('output');
        lastSolution = operate(nextOperator, numArray);
        numArray.length = 0;
      } else if (numArray.length === 2) {
        numArray[0] = lastSolution;
        numArray[1] = getDisplayContent();
        console.log(numArray);
        display.textContent = operate(nextOperator, numArray);
        display.classList.add('output');
        
        lastSolution = operate(nextOperator, numArray);
        nextOperator = nextOperator;
        numArray.length = 0;
      }
      return;
    } else if (operator === 'CLEAR') {
      numArray.length = 0;
      operator = '';
      nextOperator = '';
      lastSolution = '';
      clearDisplayContent();
      return;
    }
  }));
}

function keyboardInput() {
  window.addEventListener('keydown', (num) => {
   key = document.querySelector(`button[data-key="${num.keyCode}"]`);
   key.click();
  });
}

allowNumInput();
allowFunctionInput();
keyboardInput();

//input1 -> operator -> input2 -> operator/equals => input1 -> output input1 ...repeat
//can use leftover input2 to continue doing the operation on every equal operator press.
//reassign input two only after additional outputs? Clear button should allow user to choose input1 again. (clear the array)
//add a -/+ button?
