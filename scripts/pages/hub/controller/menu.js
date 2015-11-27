define([
    'packages/angular.package',
    'config'
], function (angular) {
    'use strict';

    angular.module('comMarksandspencerApp.pages.hub.controller.MenuCtrl', [
        'comMarksandspencerApp.pages.hub.service.MenuService'
    ])

        .controller('MenuCtrl', ['$scope', 'MenuService', function ($scope, MenuService) {

            $scope.showing = false;
            $scope.menu = MenuService.get();

            $scope.toggleVisibility = toggleVisibility;

            function toggleVisibility() {
                $scope.showing = !$scope.showing;
            }
        }]);
});
