'use strict';

// bubbleSort() - Basic bubble sort function
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

// runProgram() - Run the sorting algorithm
function runProgram() {
  var arr = [];
  var resultString = [];

  // Get the array length
  var len = CodeUtils.getDataLen();

  // Fill the array with random integers
  for (var i = 0; i < len; i++) {
    arr[i] = CodeUtils.getRandomInt(0, 100);
  }

  resultString[0] = 'unsorted array: ' + arr;

  // Call the bubble sort routine
  var sortedArr = bubbleSort(arr);

  resultString[1] = 'sorted array: ' + sortedArr;
  return resultString;
}
