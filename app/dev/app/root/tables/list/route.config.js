'use strict';

;(function () {

    angular
        .module('ngGandalf.list')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routeConfig($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('root.tables-list', {
                url: '/tables/list',
                template: '<list></list>'
            });

    };

})();