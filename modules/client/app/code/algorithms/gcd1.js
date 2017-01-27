'use strict';

// gcd() - Find GCD using Euclid algorithm and subtraction only
// a, b must be positive
function gcd(a, b) {
  if (a == b) {
    return a;
  }
  else if (a > b) {
    return gcd(a - b, b);
  }
  else {
    return gcd(a, b - a);
  }
}

// runProgram() - Run the GCD routine
function runProgram() {
  var resultString = [];

  var a = CodeUtils.getRandomInt(1, 1000);
  var b = CodeUtils.getRandomInt(1000, 2000);

  var result = gcd(a, b);

  resultString[0] = 'Euclid GCD of ' + a + ', ' + b +
                    ' = ' + result;
  return resultString;
}
