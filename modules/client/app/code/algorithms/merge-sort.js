'use strict';

// merge() - merge two sorted arrays
function merge(arr1, arr2) {
  var idx1 = 0;
  var idx2 = 0;
  var B = [];

  while (idx1 < arr1.length && idx2 < arr2.length) {
    if (arr1[idx1] <= arr2[idx2]) {
      B.push(arr1[idx1]);
      idx1++;
    }
    else {
      B.push(arr2[idx2]);
      idx2++;
    }
  }

  while(idx1 < arr1.length) {
    B.push(arr1[idx1]);
    idx1++;
  }

  while(idx2 < arr2.length) {
    B.push(arr2[idx2]);
    idx2++;
  }

  return B;
}

// mergeSort() - Recursively sort each array slice and then merge the
// sorted slices.
function mergeSort(arr) {
  if (arr.length < 2) {
    return arr;
  }

  var left = [];
  var right = [];
  var q = Math.floor(arr.length / 2);
  left = mergeSort(arr.slice(0, q));
  right = mergeSort(arr.slice(q, arr.length));
  return merge(left, right);
}

// runProgram() - Run the sorting algorithm
function runProgram() {
  var arr = [];
  var resultString = [];

  // Get the array lenght
  var len = CodeUtils.getDataLen();

  // Fill the array with random integers
  for (var i = 0; i < len; i++) {
    arr[i] = CodeUtils.getRandomInt(0, 100);
  }

  resultString[0] = 'unsorted array: ' + arr;

  // Call the merge sort routine
  var sortedArr = mergeSort(arr);

  resultString[1] = 'sorted array: ' + sortedArr;
  return resultString;
}
