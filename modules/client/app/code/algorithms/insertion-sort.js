'use strict';

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

function runProgram() {
  var arr = [];
  var len = CodeUtils.getDataLen();

  for (var i = 0; i < len; i++) {
    arr[i] = CodeUtils.getRandomInt(0, 100);
  }

  var sortedArr = insertionSort(arr);
  return sortedArr;
}
