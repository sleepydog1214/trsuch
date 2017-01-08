'use strict';

// swap() - Swap 2 array elements
function swap(arr, i, j) {
  var tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

// partition() - partition array around pivot arr[p]
function partition(arr, p, r) {
  var x = arr[p];
  var j = r;
  var i = p;

  while(true) {
    while (arr[j] > x) {
      j--;
    }
    while (arr[i] < x) {
      i++;
    }

    if (i >= j) {
      return j;
    }

    // handle duplicate array values
    if (arr[i] === arr[j]) {
      i++;
      j--;
    }
    else {
      swap(arr, i, j);
    }
  }
}

// quicksort() - recursively sort array by partitoning
function quicksort(arr, p, r) {
  if (p < r) {
    var q = partition(arr, p, r);
    quicksort(arr, p, q);
    quicksort(arr, q + 1, r);
  }
}

// runProgram() - Run the sorting algorithm
function runProgram() {
  var arr = [];

  // Get the length of the array
  var len = CodeUtils.getDataLen();

  // Fill the array with random integers
  for (var i = 0; i < len; i++) {
    arr[i] = CodeUtils.getRandomInt(0, 100);
  }

  // Call the sorting routine
  quicksort(arr, 0, arr.length - 1);

  return arr;
}
