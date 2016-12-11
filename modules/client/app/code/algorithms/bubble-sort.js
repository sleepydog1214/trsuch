'use strict';

var LEN = 25;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function bubbleSort(arr) {
  var sortedArr = arr.slice(0);
  var len = arr.length;

  for (var i = 0; i < len - 1; i++) {
    for (var j = 0; j < len - i - 1; j++) {
      if (sortedArr[j] > sortedArr[j + 1]) {
        var temp         = sortedArr[j];
        sortedArr[j]     = sortedArr[j + 1];
        sortedArr[j + 1] = temp;
      }
    }
  }

  return sortedArr;
}

function sort() {
  var arr = [];

  for (var i = 0; i < LEN; i++) {
    arr[i] = getRandomInt(0, 100);
  }

  console.log(arr);
  var sortedArr = bubbleSort(arr);
  console.log(sortedArr);
  return sortedArr;
}
