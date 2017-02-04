'use strict';

// HashTable constructor
function HashTable(size) {
  var primeMap = {};

  // getLargestPrimes() - get largest 2 primes less than n
  var getLargestPrimes = function(n) {
    primeMap['largest'] = 0;
    primeMap['next-largest'] = 0;

    var arr = []
    for (var i = 0; i < n; i++) {
      arr[i] = true;
    }

    for (var i = 2; i * i < n; i++) {
      if (arr[i]) {
        for (var j = i * i; j < n; j += i) {
          arr[j] = false;
        }
      }
    }

    for (var i = n - 1; i > 0; i--) {
      if (arr[i] && primeMap['largest'] == 0) {
        primeMap['largest'] = i;
      }
      else if (arr[i] && primeMap['next-largest'] == 0) {
        primeMap['next-largest'] = i;
        break;
      }
    }
  };

  this.rehash = function() {
    // copy table to temp array
    var tmp = [];
    for (var i = 0; i < this.table.length; i++) {
      if (this.table[i] !== undefined) {
        tmp.push(this.table[i]);
      }
    }

    // empty the hash table
    this.table.length = 0;

    // now double the size of the table
    getLargestPrimes(this.tableSize * 2);

    // reset the table values
    this.tableSize = primeMap['largest'];
    tableSizePrime = primeMap['next-largest']
    this.tableRehashSize = Math.floor(this.tableSize * 0.7);
    this.tableCount = 0;
    this.table.length = this.tableSize;

    // now rebuild the table
    for (var i = 0; i < tmp.length; i++) {
      this.insert(tmp[i], function(k) {}, function(err) {
        console.log('Insert err: ', err);
      });
    }
  };

  // clear an entry in the table
  this.removeKey = function(key) {
    this.table[key] = undefined;
    this.tableCount--;
  };

  // The 2 hash functions
  this.h1 = function(k) { return mod(k, this.tableSize); };
  this.h2 = function(k) { return 1 + mod(k, tableSizePrime); }

  getLargestPrimes(size);

  this.tableSize = primeMap['largest'];
  var tableSizePrime = primeMap['next-largest']
  this.tableRehashSize = Math.floor(this.tableSize * 0.7);
  this.tableCount = 0;
  this.table = [];
  this.table.length = this.tableSize;
}

// Insert value into the hash table
HashTable.prototype.insert = function(value, onSuccess, onError) {
  // rehash if table is more than 70% full
  if (this.tableCount > this.tableRehashSize) {
    this.rehash();
  }

  var k = getIntVal(value);
  var try1 = this.h1(k);

  // try first hash location
  if (this.table[try1] === undefined) {
    this.table[try1] = value;
    this.tableCount++;
    onSuccess(try1);
  }

  // otherwise, try h2 offsets
  else {
    var try2 = this.h2(k);
    var offset = try1 + try2;
    if (offset >= this.tableSize) {
      offset = mod(offset, this.tableSize);
    }

    var count = 0;
    while(this.table[offset] !== undefined && count < this.tableSize) {
      offset += try2;
      if (offset >= this.tableSize) {
        offset = mod(offset, this.tableSize);
      }
      count++;
    }

    if (count < this.tableSize) {
      this.table[offset] = value;
      this.tableCount++;
      onSuccess(offset);
    }
    else {
      onError('Table error, cannot insert ' + value);
    }
  }
};

// Find the key or value in the table
HashTable.prototype.find = function(value, onError, onSuccess) {
  // if given key, return value
  if (typeof(value) === 'number') {
    if (value < 0 || value >= this.tableSize) {
      onError('Error invalid key')
      return;
    }
    onSuccess(this.table[value]);
    return;
  }

  // else find the key for a given value
  else {
    var k = getIntVal(value);
    var try1 = this.h1(k);

    if (this.table[try1] !== undefined && this.table[try1] === value) {
      onSuccess(try1);
      return;
    }

    var try2 = this.h2(k);
    var offset = try1 + try2;

    if (offset >= this.tableSize) {
      offset = mod(offset, this.tableSize);
    }

    for (var count = 0; count < this.tableSize; count++) {
      if (this.table[offset] !== undefined && this.table[offset] === value) {
        onSuccess(offset);
        return;
      }

      offset += try2;
      if (offset >= this.tableSize) {
        offset = mod(offset, this.tableSize);
      }
    }

    onError('Error value not found');
  }
};

// Remove entry from hash table
HashTable.prototype.remove = function(value, onError, onSuccess) {
  var self = this;

  if (typeof(value) === 'number') {
    if (value < 0 || value >= this.tableSize) {
      onError('Error remove: invalid key')
      return;
    }
    this.find(value, function(err) {
      onError('Error remove');
    }, function(v) {
      self.removeKey(value);
      onSuccess(v);
    });
  }
  else {
    this.find(value, function(err) {
      onError('Error remove');
    }, function(k) {
      self.removeKey(k);
      onSuccess(k);
    });
  }
};

// dump entire hash table into a string
HashTable.prototype.dumpTable = function () {
  var s = 'table size: ' + this.tableSize + '<br>';
  s = s.concat('entry count: ' + this.tableCount + '<br>');
  for (var i = 0; i < this.table.length; i++) {
    var value = "empty";
    if (this.table[i] !== undefined) {
      value = this.table[i];
    }
    s = s.concat('key: ' + i + ' value: ' + value + '<br>');
  }
  return s;
};

// convert an object to a unique int value
var getIntVal = function(s) {
  //convert string to a sum of its ascii values
  if (typeof(s) === 'string') {
    return s.split('').map(function(c) {
      return c.charCodeAt(0);
    }).reduce(function(curr, prev) {
      return curr + prev;
    });
  }

  return 0;
};

// Create a C style mod routine, not remainder
var mod = function(a, b) {
  var r = a % b;
  return Math.floor(r >= 0 ? r : r + b);
};

// runProgram() - Demonstrate the hash table data structure
function runProgram() {
  var resultString = [];

  var size = CodeUtils.getRandomInt(15, 30);
  var aTable = new HashTable(size);

  // create random strings to insert into the table
  var values = [];
  for (var i = 0; i < size; i++) {
    var s = "";
    for (var j = 0; j < 5; j++) {
      var c = String.fromCharCode(CodeUtils.getRandomInt(65,90));
      s = s + c;
      c = String.fromCharCode(CodeUtils.getRandomInt(97,122));
      s = s + c;
    }
    values.push(s);
  }

  // test table insert
  for (var val in values) {
    aTable.insert(values[val], function(k) {}, function(err) {
      console.log('Insert err: ', err);
    });
  }
  resultString.push('Test table insert<br>' + aTable.dumpTable());

  // test table find
  var s = '';
  var keys = [];
  for (var val in values) {
    aTable.find(values[val], function(err) {
      s = s.concat(err +  ' ' + values[val]);
    }, function(k) {
      s = s.concat('found: ' + values[val] + ' at key: ' + k + '<br>');
      keys.push(k);
    });
  }
  resultString.push(s);

  s = '';
  for (var i in keys) {
    aTable.find(keys[i], function(err) {
      s = s.concat(err + ' ' + keys[i]);
    }, function(v) {
      s = s.concat('at key: ' + keys[i] + ' value: ' + v + '<br>');
    });
  }
  resultString.push(s);

  // test table remove entries
  var l = values.length;
  var r = [l - 2, l - 3, l - 4];
  s = '';
  for (var i = 0; i < 3; i++) {
    aTable.remove(values[r[i]], function(err) {
      s = s.concat(err + values[r[i]]);
    }, function(k) {
      s = s.concat('removed ' + values[r[i]] + ' at key ' + k + '<br>');
    });
  }
  resultString.push(s);

  l = keys.length;
  r = [l - 5, l - 6, l - 7];
  s = '';
  for (var i = 0; i < 3; i++) {
    aTable.remove(keys[r[i]], function(err) {
      s = s.concat(err + 'keys[r[i]]');
    }, function(v) {
      s = s.concat('removed ' + keys[r[i]] + ' with value ' + v + '<br>');
    });
  }
  resultString.push(s);
  resultString.push('Test table insert<br>' + aTable.dumpTable());

  return resultString;
}
