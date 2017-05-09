'use strict';

;(function () {

    angular
        .module('ngGandalf.header')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routeConfig($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('root', {
                abstract: true,
                url: '/root',
                template: '<root></root>'
            });

    };

})();