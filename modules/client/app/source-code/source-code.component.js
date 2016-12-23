/*********************************************************************
 The MIT License (MIT)

 Copyright (c) 2016 Thomas Suchyta

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
*********************************************************************/

/*********************************************************************
 * modules/client/app/source-code/source-code.component.js
 *
 * angular.module.component() - Define the 'sourceCode' module
 *                              component and its controller
*********************************************************************/
'use strict';

angular.
  module('sourceCode').
  component('sourceCode', {
    templateUrl: '../source-code/source-code.template.html',
    controller: ['$routeParams', 'Sources', '$scope',
      //SourceCodeController() - Controller routine to do two things:
      //                         1. Use Sources servive to GET data for a
      //                            specific program.
      //                         2. Define runCode() function to execute
      //                            that specific program's JavaScript code.
      function SourceCodeController($routeParams, Sources, $scope) {
        var self = this;

        //runCode() - Use require.js to load program's file. Then call that
        //            file's sort() routine to execute that code.
        self.runCode = function runCode (location) {
          requirejs([location], function() {
            var arr = sort();
            self.codeResults = arr;
            $scope.$apply();
          });
        };

        //GET - Call the Sources service with a specific program id. Set a
        //      default for that program's execution results.
        self.data = Sources.get({sourceId: $routeParams.sourceId}, function() {
          self.codeResults = 'Not executed yet';
        });
      }
    ]
  });
