'use strict';

// insertionSort() - basic insertion sort routine
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

// runProgram() - Run the sorting algorithm
function runProgram() {
  var arr = [];

  // Get the array lenght
  var len = CodeUtils.getDataLen();

  // Fill the array with random integers
  for (var i = 0; i < len; i++) {
    arr[i] = CodeUtils.getRandomInt(0, 100);
  }

  // Call the inserion sort routine
  var sortedArr = insertionSort(arr);
  return sortedArr;
}
