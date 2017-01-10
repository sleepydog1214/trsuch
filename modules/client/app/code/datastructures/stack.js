'use strict';

// Stack constructor
function Stack () {
  this.stack = [];
  this.top = -1;
}

// Instance methods

// return true if stack is empty
Stack.prototype.empty = function() {
  if (this.top == -1) {
    return true;
  }
  return false;
}

// push on top of stack
Stack.prototype.push = function(x) {
  this.top++;
  this.stack[this.top] = x;
}

// pop from top of stack
Stack.prototype.pop = function() {
  if (this.empty()) {
    console.log('stack underflow');
  }
  else {
    this.top--;
    return this.stack[this.top + 1];
  }
}

// return string representation of stack
Stack.prototype.toString = function() {
  var tmp = 'top: ' + this.stack[this.top] + ', rest of stack: ';
  for (var i = this.top - 1; i >= 0; i--) {
    tmp += ' ' + this.stack[i] + ', ';
  }

  return tmp;
}

// runProgram() - Demonstrate the stack data structure
function runProgram() {
  var aStack = new Stack();
  var resultString = [];

  resultString.push('is stack empty: ' + aStack.empty());

  // Get the number of items to push on the stack
  var len = CodeUtils.getDataLen();

  // Fill the stack with random integers
  for (var i = 0; i < len; i++) {
    aStack.push(CodeUtils.getRandomInt(0, 100));
  }

  resultString.push(aStack.toString());
  resultString.push('is stack empty: ' + aStack.empty());

  var a = aStack.pop();
  var b = aStack.pop();
  var c = aStack.pop();

  resultString.push('pop 3 elements from stack: ' + a + ', ' + b + ', ' + c);

  return resultString;
}
