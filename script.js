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


function operate (operator, num1, num2) {
  numArray = [num1, num2];
  
  if (operator === '+') return add(numArray);
  if (operator === '-') return subtract(numArray);
  if (operator === 'x') return multiply(numArray);
  if (operator === '/') return divide(numArray);
}


function getDisplayContent () {
  return document.querySelector('.display').textContent;
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
    
    if (decimal.classList.contains('used') && numContent === '.') return;
    
    if (!negative.classList.contains('active') && numContent === '+/-') {
      display.textContent = display.textContent.padStart(display.textContent.length + 1, '-');
      negative.classList.add('active');
      return;
    } else if (negative.classList.contains('active') && numContent === '+/-') {
      display.textContent = display.textContent.slice(1);
      negative.classList.remove('active');
      return;
    }
    
    display.textContent += numContent;
    display.textContent.includes('.') ? decimal.classList.add('used') : 
                            decimal.classList.remove('used');
  }));
}



allowNumInput();

//input1 -> operator -> input2 -> operator/equals => input1 -> output input1 ...repeat
//can use leftover input2 to continue doing the operation on every equal operator press.
//reassign input two only after additional outputs? Clear button should allow user to choose input1 again. (clear the array)
//add a -/+ button?
