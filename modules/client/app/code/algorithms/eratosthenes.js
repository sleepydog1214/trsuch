'use strict';

// eratosthenes() - Find all primes to n using the sieve of eratosthenes
function eratosthenes(n) {
  var arr = new Array(n + 1);
  arr.fill(true);
  var results = [];

  for (var i =  2; i * i <= n; i++) {
    if (arr[i]) {
      for (var j = i * i; j <= n; j += i) {
        arr[j] = false;
      }
    }
  }

  for (var i = 2; i <= n; i++) {
    if (arr[i]) {
      results.push(i);
    }
  }

  return results;
}

// runProgram() - Run the eratosthenes routine
function runProgram() {
  var resultString = [];
  var arr = [];

  var n = CodeUtils.getRandomInt(100, 500);

  arr = eratosthenes(n);

  resultString[0] = 'All primes up to ' + n + ':';
  resultString[1] = arr;

  return resultString;
}
