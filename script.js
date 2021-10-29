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

function numInput() {
  display = document.querySelector('.display');
  numPad = document.querySelectorAll('.num');
  
  numPad.forEach( num => num.addEventListener('click', (num) => {
    numContent = num.target.textContent;
    
    if (display.textContent.includes('.') && numContent === '.') return;
    display.textContent += numContent;
    console.log(display.textContent);
  }));
  
}

numInput();