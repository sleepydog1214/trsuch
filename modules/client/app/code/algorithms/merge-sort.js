'use strict';

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

function runProgram() {
  var arr = [];
  var len = CodeUtils.getDataLen();

  for (var i = 0; i < len; i++) {
    arr[i] = CodeUtils.getRandomInt(0, 100);
  }

  var sortedArr = [];
  sortedArr = mergeSort(arr);
  return sortedArr;
}
