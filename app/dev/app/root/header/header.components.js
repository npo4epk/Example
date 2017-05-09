'use strict';

;(function () {

    angular
        .module('ngGandalf.header')
        .component('root', {
            templateUrl: 'app/root/header/views/header.template.html',
            controller:  NavCtrl
        });

    NavCtrl.$inject = ['authService', '$sessionStorage', '$state', '$rootScope'];

    function NavCtrl(authService, $sessionStorage, $state, $rootScope) {

        var self = this;

        self.signOut = function () {
            debugger;
            authService.signOut()
                .then(function (token) {
                    debugger;
                    delete $sessionStorage.user;

                    $state.go('sign-in');
                    // Restangular.all('users').remove();
                })
                .catch(function (error) {

                });

        };

        self.aaa = function () {
            debugger;
            var a = [{
                name: 2222
            }];
            $rootScope.$broadcast("projectDidSelect", a);
        };


    };



})();