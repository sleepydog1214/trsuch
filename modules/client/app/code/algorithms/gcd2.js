'use strict';

// gcd() - Find GCD using Euclid algorithm and mod operator
function gcd(a, b) {
  if (b == 0) {
    return a;
  }
  else {
    // % operator is a remainder operator, so find mod
    var r = a % b;
    r = Math.floor(r >= 0 ? r : r + b);
    return gcd(b, r);
  }
}

// runProgram() - Run the GCD routine
function runProgram() {
  var resultString = [];

  var a = CodeUtils.getRandomInt(-2000, 3000);
  var b = CodeUtils.getRandomInt(-1000, 5000);

  var result = gcd(a, b);

  resultString[1] = 'Euclid GCD of ' + a + ', ' + b +
                    ' = ' + result;
  return resultString;
}
