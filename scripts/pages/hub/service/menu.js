define([
    'packages/angular.package',
    'config'
], function (angular, config) {
    'use strict';

    angular.module('comMarksandspencerApp.pages.hub.service.MenuService', [])
        .service('MenuService', function () {
            this.get = function (section) {
                return section ? config.pages[section] : config.pages;
            };
        });
});


