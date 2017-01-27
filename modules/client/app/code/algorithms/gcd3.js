'use strict';

// gcd() - Find GCD using binary algorithm
function gcd(a, b) {
  if (a == 0) { return b; }
  if (b == 0) { return a; }

  // Set shift as the greatest power of 2 dividing both a and b
  var shift;
  for (shift = 0; ((a | b) & 1) == 0; shift++) {
    a >>= 1;
    b >>= 1;
  }

  // divide a by 2 until odd
  while ((a & 1) == 0) { a >>= 1; }

  while (b != 0) {
    // divide b by 2 unti odd
    while ((b & 1) == 0) { b >>= 1; }

    // both a and b are odd, swap to get a <= b, then
    // set b = b - a, which is even
    if (a > b) {
      var t = b;
      b = a;
      a = t;
    }
    b = b - a;
  }

  // restore the common factors of 2
  return a << shift;
}

// runProgram() - Run the GCD routine
function runProgram() {
  var resultString = [];

  var a = CodeUtils.getRandomInt(4000, 7000);
  var b = CodeUtils.getRandomInt(1000, 4000);

  var result = gcd(a, b);

  resultString[1] = 'Binary GCD of ' + a + ', ' + b +
                    ' = ' + result;
  return resultString;
}
