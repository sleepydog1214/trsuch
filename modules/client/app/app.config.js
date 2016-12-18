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
 * angulat.module.component() - Add a component with a controller to
 *                              query the site navigation data
*********************************************************************/
'use strict';

/*********************************************************************
 * angular.module.config() - Config the $locationProvider and
 *                           $routeProvider for the 'indexApp' module.
*********************************************************************/
angular.
  module('trsuchApp').
    config(['$locationProvider', '$routeProvider', '$mdIconProvider',
      function config($locationProvider, $routeProvider, $mdIconProvider) {
        $locationProvider.hashPrefix('!');

        // Preload the svg icons
        $mdIconProvider.defaultIconSet('../svg/app.svg', 128);
        $mdIconProvider.icon('title', '../svg/title.svg');

        $routeProvider.
        //Template for home page
        when('/', {
          template: '<index></index>'
        }).
        when('/index', {
          template: '<index></index>'
        }).
        when('/cv', {
          template: '<cv></cv>'
        }).
        when('/source', {
          template: '<source-list></source-list>'
        }).
        //Template for an individual program
        when('/sources/:sourceId', {
          template: '<source-code></source-code>'
        }).
        otherwise('/');
      }
  ]);


/*********************************************************************
 * angular.module.component() - Add a component to control the
 * site-wide data.
*********************************************************************/
angular.
  module('trsuchApp').
    component('site', {
      templateUrl: 'app.template.html',
      controller: ['Site',
        function SiteController(Site) {
          var self = this;

          self.data = Site.query();
        }
      ]
    });
