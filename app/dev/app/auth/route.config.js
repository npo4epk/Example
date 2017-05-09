'use strict';

;(function () {

    angular
        .module('ngGandalf.auth')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routeConfig($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('sign-in', {
                url: '/sign-in',
                template: '<sign-in></sign-in>',
                data: {
                    'noLogin': true
                }
            })
            .state('sign-up', {
                url: '/sign-up',
                template: '<sign-up></sign-up>',
                data: {
                    'noLogin': true
                }
            });

    };

})();