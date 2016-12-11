'use strict';

var LEN = 25;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function insertionSort(arr) {
  var sortedArr = arr.slice(0);
  var len = arr.length;

  for (var j = 1; j < len; j++) {
    var key = sortedArr[j];
    var i = j - 1;

    while (i >= 0 && sortedArr[i] > key) {
      sortedArr[i + 1] = sortedArr[i];
      i = i - 1;
    }

    sortedArr[i + 1] = key;
  }

  return sortedArr;
}

function sort() {
  var arr = [];

  for (var i = 0; i < LEN; i++) {
    arr[i] = getRandomInt(0, 100);
  }

  console.log(arr);
  var sortedArr = insertionSort(arr);
  console.log(sortedArr);
  return sortedArr;
}
