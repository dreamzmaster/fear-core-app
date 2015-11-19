define([
    'pages/hub/controller/menu',
    'modules/lightbox',
    'pages/home/service/lightbox',
    'pages/hub/service/menu'
], function () {
    'use strict';

    return angular.module('comMarksandspencerApp.pages.hub', [
        'comMarksandspencerApp.pages.hub.controller.MenuCtrl',
        'comMarksandspencerApp.modules.lightbox',
        'comMarksandspencerApp.content.service.lightbox',
        'comMarksandspencerApp.pages.hub.service.MenuService'
    ]);
});
