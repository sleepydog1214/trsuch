'use strict';

// Queue constructor
function Queue() {
  this.queue = [];
  this.head = 0;
  this.tail = 0;
}

// Instance methods

// Return true if queue is empty
Queue.prototype.empty = function() {
  if (this.head == this.tail) {
    return true;
  }
  return false;
}

// Add item to back of queue
Queue.prototype.enqueue = function(x) {
  this.queue[this.tail] = x;
  this.tail++;
}

// Return item first in queue
Queue.prototype.dequeue = function() {
  var x = this.queue[this.head];
  this.head++;

  // Reset if queue is now empty
  if (this.head == this.tail) {
    this.head = this.tail = 0;
  }

  // Rearrange queue array if X number of items have been dequeued
  // Setting to 0 just for demonstration
  if (this.head > 0) {
    this.queue = this.queue.slice(this.head, this.tail);
    this.head = 0;
    this.tail = this.queue.length;
  }

  return x;
}

// return string representation of queue
Queue.prototype.toString = function() {
  var tmp = 'head: ' + this.queue[this.head] + ', rest of queue: ';
  for (var i = this.head + 1; i < this.tail - 1; i++) {
    tmp += ' ' + this.queue[i] + ', ';
  }
  tmp += 'tail: ' + this.queue[this.tail - 1]

  return tmp;
}

// runProgram() - Demonstrate the queue data structure
function runProgram() {
  var aQueue = new Queue();
  var resultString = [];

  resultString.push('is queue empty: ' + aQueue.empty());

  // Get the number of items to place in the queue
  var len = CodeUtils.getDataLen();

  // Fill the queue with random integers
  for (var i = 0; i < len; i++) {
    aQueue.enqueue(CodeUtils.getRandomInt(0, 100));
  }

  resultString.push(aQueue.toString());
  resultString.push('is queue empty: ' + aQueue.empty());

  var a = aQueue.dequeue();
  var b = aQueue.dequeue();
  var c = aQueue.dequeue();

  resultString.push('dequeue 3 elemets from queue: ' + a + ', ' + b + ', ' + c);

  return resultString;
}
