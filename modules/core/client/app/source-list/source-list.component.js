'use strict';

angular.
  module('sourceList').
    component('sourceList', {
      templateUrl: '../source-list/source-list.template.html',
      controller: ['$http',
        function SourceListController($http) {
          var self = this;
          self.orderProp = 'name';

          $http.get('sources').then(function(response) {
            self.sources = response.data;
          })
        }
      ]
    });
