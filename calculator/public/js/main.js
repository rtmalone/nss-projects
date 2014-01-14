/*JavaScript*/

console.log('Pinkman says,\"Welcome to the calculator app, bitch\"!');

while(true){
  var operator = prompt('Add (+), Subtract (-), Multiply (*), Divide (/), Exponential (e), Factorial (!), or Quit Calculator (q)?');
  console.log(operator);

if (operator === 'q')
  break;

if (operator === '!') {
  var z = prompt('Enter your factorial');

  if (operator === '!')
    result = fac(z);

  z = parseFloat(z);

  function fac(z) {
    if (z === 0 || z === 1)
      return 1;
    else
      return z * fac(z - 1);
  }
  var result;
  console.log(result);
  continue;
  }

var x = prompt('Enter first number:');
var y = prompt('Enter second number:');
//console.log(x);
//console.log(y);
x = parseFloat(x);
y = parseFloat(y);
z = parseFloat(z);

if(operator === '+')
 result = add(x, y);
else if(operator === '-')
 result = sub(x, y);
else if(operator === '*')
 result = mult(x, y);
else if(operator === '/')
 result = div(x,y);
else
  result = exp(x,y);

  function exp(base,pow){
    result = 1
    for (var i = 0; i < pow; i++)
      result = result * base
        // result *= base is same as above line
      return result;
  }
    function add(a,b) {
    return a + b;
  }

  function sub(a,b) {
    return a - b;
  }

  function mult(a,b) {
    return a * b;
  }

  function div(a,b) {
    return a / b;
  }

var result;
 console.log(result);
}
/* This code is called a switch statement.
 * Performs the same as the above if/else statements
 *
switch(operator){
  case '+':
    result = add(x,y);
    break;
  case '-':
    result = sub(x,y);
    break;
  case '*':
    result = sub(x,y);
    break;
  case '/':
    result = div(x,y);
}
*/

