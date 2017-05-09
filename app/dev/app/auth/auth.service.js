'use strict';

;(function () {

    angular
        .module('ngGandalf.auth')
        .factory('authService', authService)
        .factory('profileService', profileService);


    authService.$inject = ['$rootScope', '$sessionStorage', '$firebaseAuth', '$state'];

    function authService($rootScope, $sessionStorage, $firebaseAuth, $state) {

        var firebaseAuthObject = $firebaseAuth();

        var _service = {
            firebaseAuthObject: firebaseAuthObject,
            signIn: _signIn,
            signUp: _signUp,
            signOut: _signOut,
            sessionService: _sessionService
        };

        return _service;

        function _signIn(user) {
            return firebaseAuthObject.$signInWithEmailAndPassword(user.email, user.password);
        };

        function _signUp(user) {
            return firebaseAuthObject.$createUserWithEmailAndPassword(user.email, user.password);
        };

        function _sessionService(event, toState, toParams, fromState, fromParams) {

            if (toState.data !== undefined) {
                if (toState.data.noLogin !== undefined && toState.data.noLogin) {
                    // если нужно, выполняйте здесь какие-то действия
                    // перед входом без авторизации
                }
            } else {
                // вход с авторизацией
                if ($sessionStorage.user) {
                    // $scope.$root.user = $sessionStorage.user;
                } else {
                    // если пользователь не авторизован - отправляем на страницу авторизации
                    event.preventDefault();
                    $state.go('sign-in');
                }
            }
            ;

        };
        
        function _signOut() {
            return firebaseAuthObject.$signOut();
        }
    };



    profileService.$inject = ['firebase', '$firebaseArray'];

    function profileService(firebase,$firebaseArray) {

        var ref = firebase.database().ref();
        var refArr = $firebaseArray(ref);

        var usersRef = ref.child('Profiles');
        var usersArr = $firebaseArray(usersRef);

        // this.getUsers = function(cb){
        //     return usersArr.$loaded(cb);
        // };

        function addProfile(user, token){
            // debugger
            //  usersRef.set({
            //              username: user.username,
            //              email: user.email,
            //              firstname: '',
            //              lastname: '',
            //              uid: token.uid
            //          });
            var aaaa = $firebaseArray(ref);
            debugger;
            //
            // usersArr.$add({
            //                  username: user.username,
            //                  email: user.email,
            //                  firstname: '',
            //                  lastname: '',
            //                  uid: token.uid
            //              }).then(function(ref) {
            //     // var id = ref.key;
            //     debugger;
            //     console.log("added record with id " + ref);
            // });

            usersArr[usersArr.length - 1].username = "НОВЫЙ-20222";
            usersArr.$save(usersArr[usersArr.length - 1]);

        };

        // this.updateUser = function(_user){
        //     return usersArr.$save(_user);
        // }


        // var ref = firebase.database().ref();
        //
        var _service = {
            usersRef: usersRef,
            addProfile: addProfile
            // updateUser: updateUser
        };

        return _service;
        //
        //
        // function addProfile(token, user) {
        //     debugger;
        //     ref.child('Profiles').push({
        //         username: user.username,
        //         email: user.email,
        //         firstname: '',
        //         lastname: '',
        //         uid: token.uid
        //     });
        // };
        //
        //
        //
        // function updateUser() {
        //
        //     var postData = {
        //         username: '',
        //         email: '',
        //         firstname: 'LF',
        //         lastname: 'LS',
        //         uid: '111'
        //     };
        //
        //
        //     // Get a key for a new Post.
        //
        //     // Write the new post's data simultaneously in the posts list and the user's post list.
        //     var updates = {};
        //     updates['Profiles/' + KjNR04UZ618A1XQDFrx] = postData;
        //
        //     ref.update(updates);
        //
        //
        //
        //     // ref.child('Profiles/KjNR04UZ618A1XQDFrx').update({
        //     //     username: '',
        //     //     email: '',
        //     //     firstname: 'LF',
        //     //     lastname: 'LS',
        //     //     uid: '111'
        //     // });
        // };


    }

})();



