'use strict';

// Double linked list node
function Node(x) {
  this.key = x;
  this.prev;
  this.next;
}

// return string representation of a node
Node.prototype.toString = function() {
  return 'node.key: ' + this.key;
};

// Double Linked List constructor
function List() {
  this.head = { node: null };
}

// insert new node in list
List.prototype.insert = function(x) {
  var aNode = new Node(x);

  aNode.next = this.head.node;

  if (this.head.node !== null) {
    this.head.node.prev = aNode;
  }

  this.head.node = aNode;
  this.head.node.prev = null;
}

// delete a node in the list
List.prototype.delete = function(x) {
  var aNode = this.search(x);

  if (aNode.prev !== null) {
    aNode.prev.next = aNode.next;
  }
  else {
    this.head.node = aNode.next;
  }

  if (aNode.next !== null) {
    aNode.next.prev = aNode.prev;
  }
}

// Find a node with key x in list
List.prototype.search = function(x) {
  var iter = this.head.node;

  while (iter !== null && iter.key !== x) {
    iter = iter.next;
  }

  return iter;
};

// return string representation of list
List.prototype.toString = function() {
  var tmp = 'list: ';
  var iter = this.head.node;
  while (iter !== null) {
    //tmp += 'node: ' + iter.key + ' -> ';
    tmp += iter + ' -> ';
    iter = iter.next;
  }
  return tmp;
};

// runProgram() - Demonstrate the queue data structure
function runProgram() {
  var aList = new List();
  var resultString = [];

  resultString[0] = 'empty list: ' + aList;

  aList.insert(1);
  resultString[1] = 'list with 1 node: ' + aList;

  aList.insert(2);
  resultString[2] = 'list with 2 nodes: ' + aList;

  // Get the number of items to place in the list
  var len = CodeUtils.getListLen();

  // Fill the queue with random integers, save one int to
  // test search and one int to delete
  var searchX;
  var deleteX;
  for (var i = 0; i < len; i++) {
    var x = CodeUtils.getRandomInt(0, 1000);
    aList.insert(x);

    if (i == Math.floor(len/2)) {
      searchX = x;
    }

    if (i == Math.floor(len/3)) {
      deleteX = x;
    }
  }

  var aNode = aList.search(searchX);
  resultString[3] = 'list search ' + searchX + ': ' + aNode;

  resultString[4] = 'list before delete: ' + aList;
  aList.delete(deleteX);
  resultString[5] = 'list after delete ' + deleteX + ': ' + aList;

  return resultString;
}
