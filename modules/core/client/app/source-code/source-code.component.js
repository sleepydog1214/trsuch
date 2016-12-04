'use strict';

angular.
  module('sourceCode').
  component('sourceCode', {
    templateUrl: '../source-code/source-code.template.html',
    controller: ['$http', '$routeParams',
      function SourceCodeController($http, $routeParams) {
        var self = this;

        $http.get('source/' + $routeParams.sourceId).
          then(function(response) {
            self.data = response.data;
          });
      }
    ]
  });
