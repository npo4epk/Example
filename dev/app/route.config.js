'use strict';

;(function () {

    angular
        .module('appGandalf')
        .config(routeConfig);

    routeConfig.$inject = ['$locationProvider', '$urlRouterProvider'];

    function routeConfig($locationProvider, $urlRouterProvider) {
        $locationProvider.hashPrefix('!');
        $urlRouterProvider.otherwise('/ind');
    };


})();