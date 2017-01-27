'use strict';

// fibonacci() - Find the fibonacci sequence to n
function fibonacci(n) {
  var sequence = [];

  if (n < 0) { return sequence; }

  sequence.push(1);
  sequence.push(1);

  if (n == 1) { return sequence; }

  for (var i = 2; i <= n; i++) {
    var j = sequence[i - 2];
    var k = sequence[i - 1];
    sequence.push(j + k);
  }

  return sequence;
}

// runProgram() - Run the fibonacci routine
function runProgram() {
  var resultString = [];
  var arr = [];

  var a = CodeUtils.getRandomInt(20, 40);

  arr = fibonacci(a);

  resultString[0] = 'fibonacci sequence of ' + a + ':';
  resultString[1] = arr;

  return resultString;
}
