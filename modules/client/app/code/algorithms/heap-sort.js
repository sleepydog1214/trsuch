'use strict';

// swap() - Swap 2 array elements
function swap(arr, i, j) {
  var tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

// heapify() - Let the value at arr[i] float down so the subtree at i
// becomes a heap
function heapify(arr, i, heaplen) {
  var left = (2 * i) + 1;
  var right = (2 * i) + 2;
  var largest;

  if(left < heaplen && arr[left] > arr[i]) {
    largest = left;
  }
  else {
    largest = i;
  }

  if (right < heaplen && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest != i) {
    swap(arr, i, largest);
    heapify(arr, largest, heaplen);
  }
}

// buildHeap() - Run through all non-leaves and call heapify on
// each to build the heap
function buildHeap(arr) {
  var middle = Math.floor(arr.length/2);

  for (var i = middle; i >= 0; i--) {
    heapify(arr, i, arr.length);
  }
}

// heapsort() - Build a heap with the input array and then swap
// each each root node with the node at the heap length until sorted.
function heapsort(arr) {
  var heaplen = arr.length;

  buildHeap(arr);
  for (var i = arr.length - 1; i > 0; i--) {
    swap(arr, 0, i);
    heaplen--;
    heapify(arr, 0, heaplen);
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
  heapsort(arr);

  return arr;
}
