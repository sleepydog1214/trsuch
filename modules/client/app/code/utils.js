'use strict';

var CodeUtils = {};

CodeUtils.getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

CodeUtils.getDataLen = function () {
  return 20;
};

CodeUtils.getListLen = function () {
  return 10;
};
