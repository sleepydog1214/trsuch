'use strict';

angular.
  module('sourceCode').
  component('sourceCode', {
    templateUrl: '../source-code/source-code.template.html',
    controller: ['$http', '$routeParams', '$scope',
      function SourceCodeController($http, $routeParams, $scope) {
        var self = this;

        self.runCode = function runCode (location) {
          console.log(location);
          requirejs([location], function() {
            var arr = sort();
            self.codeResults = arr;
            $scope.$apply();
          });
        };

        $http.get('source/' + $routeParams.sourceId).
          then(function(response) {
            self.data = response.data;
            self.codeResults = 'TBD';
          });
      }
    ]
  });
