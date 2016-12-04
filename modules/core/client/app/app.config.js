'use strict';

angular.
  module('sourceApp').
    config(['$locationProvider', '$routeProvider',
      function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.
          when('/source', {
            template: '<source-list></source-list>'
          }).
          when('/source/:sourceId', {
            template: '<source-code></source-code>'
          }).
          otherwise('/source');
      }
  ]);
