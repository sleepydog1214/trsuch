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
 * modules/client/app/app.config.js
 *
 * Main 'sourceApp' module configuration
 *
 * angular.module.config() - Configure the templates for the source
 *                           program routes
*********************************************************************/
'use strict';

/*********************************************************************
 * angular.module.config() - Configure the $locationProvider,
 *                           $routeProvider, and $resourceProvider
 *                           for the 'sourceApp' module.
*********************************************************************/
angular.
  module('sourceApp').
    config(['$locationProvider', '$routeProvider', '$resourceProvider',
      function config($locationProvider, $routeProvider, $resourceProvider) {
        $locationProvider.hashPrefix('!');
        $resourceProvider.defaults.stripTrailingSlashes = false;

        $routeProvider.
          //Template for the list of programs
          when('/source', {
            template: '<source-list></source-list>'
          }).
          //Template for an individual program
          when('/sources/:sourceId', {
            template: '<source-code></source-code>'
          }).
          otherwise('/source');
      }
  ]);
