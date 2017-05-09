'use strict';

;(function () {

    angular
        .module('ngGandalf.auth')
        .component('signUp', {
            templateUrl: 'app/auth/views/sign-up.template.html',
            controller:  SingUpCtrl
        })
        .component('signIn', {
            templateUrl: 'app/auth/views/sign-in.template.html',
            controller:  SingInCtrl
        });

    SingInCtrl.$inject = ['$rootScope', '$timeout', '$state', 'toaster', 'authService', '$sessionStorage','profileService'];

    function SingInCtrl($rootScope, $timeout, $state, toaster, authService, $sessionStorage, profileService) {

        if ($sessionStorage.user) {
            $state.go('root');
        }

        var self = this;

        $rootScope.$state = $state;
        self.signIn = _signIn;

        function _signIn(user) {
        // var aaa = user;

            authService.signIn(user)
                .then(function (token) {

                     $sessionStorage.user = token.email;
                    $sessionStorage.uid = token.uid;
                    // toaster.pop('success', "Authorization was successful!", "Please wait...");
                    // $timeout(function () {
                    //     toaster.clear();
                    profileService.addProfile(user, token);
                        $state.go('root.tables-list');
                    // }, 3000);

                })
                .catch(function (error) {
                    // toaster.pop('error', "Error", error.message);
                    // $timeout(function () {
                    //     toaster.clear();
                    // }, 3000);
                });

        };


    };

    SingUpCtrl.$inject = ['$rootScope', '$timeout', '$state', 'toaster', 'authService', '$sessionStorage', 'profileService'];

    function SingUpCtrl($rootScope, $timeout, $state, toaster, authService, $sessionStorage, profileService) {

        if ($sessionStorage.user) {
            $state.go('nav');
        }

        var self = this;
        $rootScope.$state = $state;
        self.signUp = _signUp;

        function _signUp(user) {

            authService.signUp(user)
                .then(function (token) {
                    $sessionStorage.user = token.email;
                    $sessionStorage.uid = token.uid;
                    toaster.pop('success', "Registration was successful!", "Please wait...");
                    // $timeout(function () {
                    //     toaster.clear();
                    //     $state.go('root.tables-list');
                    // }, 3000);
                    debugger;
                    profileService.addProfile(user, token);
                })
                .catch(function (error) {
                    toaster.pop('error', "Error", error.message);
                    $timeout(function () {
                        toaster.clear();
                    }, 3000);
                });
        }

    };


})();