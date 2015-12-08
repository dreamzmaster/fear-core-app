/*jshint unused: vars, white:false */

define([
    'packages/angular.package',
    'bandc/scripts/config',
    'fastclick',
    'lib/utils',
    'common/scripts/modules/common'
], function (angular, config, Fastclick, utils) {
    'use strict';

    //attach fastclick 300ms delay mitigation.
    if ('addEventListener' in document) {
        Fastclick.attach(document.body);
    }

    return angular.module('comMarksandspencerApp', [
        'angularLoad',
        'ngResource',
        'ngSanitize',
        'ngAnimate',
        'ipCookie',
        'comMarksandspencerApp.modules.common'
    ])
        .config(['$locationProvider', '$httpProvider', '$interpolateProvider',
            function ($locationProvider, $httpProvider, $interpolateProvider) {


                // By default we form encode our POST requests.
                // This will prevent us from sending any JSON, ever.
                // As such, we should make it go away in a future iteration, and
                // use the BaseXhr.form method instead.
                $httpProvider.interceptors.push(function () {
                    return {
                        'request': function (config) {
                            if (config.method === 'POST') {
                                if ('string' !== typeof config.data) {

                                    var serialiseArrays = config.serialiseArrays || false;

                                    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                                    config.data                    = utils.serializeData(config.data, serialiseArrays);
                                }
                            }

                            return config;
                        }
                    };
                });
                // override angular double curly braces syntax
                $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
            }
        ])
        .run(['$rootScope', 'richRelevanceApiService', '$timeout', 'globalFunctionsQueue', function ($rootScope, richRelevanceApiService, $timeout, globalFunctionsQueue) {

            $rootScope.loading = true;

            if (window.richRelevanceConfig) {
                richRelevanceApiService.initialise();
            }

            var removeWatcher = $rootScope.$watch(function () {

                removeWatcher();

                $timeout(function () {
                    globalFunctionsQueue.execute();
                }, 100, false);
            });
        }
        ]);
});
