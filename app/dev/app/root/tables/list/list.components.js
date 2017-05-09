'use strict';

;(function () {

    angular
        .module('ngGandalf.list')
        .component('list', {
            templateUrl: 'app/root/tables/list/views/list.template.html',
            controller:  NavCtrl
        });

    NavCtrl.$inject = ['authService', '$sessionStorage', '$state', 'firebase', '$firebaseObject', '$firebaseArray', '$scope'];

    function NavCtrl(authService, $sessionStorage, $state, firebase, $firebaseObject, $firebaseArray, $scope) {

        var self = this;
        self.project = [
            {
                name: 3333
            },
            {
                name: 111
            }
        ];


        $scope.$on("projectDidSelect", function($state, a) {
            debugger;
            self.project = a;
        });
        debugger;


       //  var ref = firebase.database().ref();
       //  // var obj = $firebaseObject(ref);
       //  // obj.$loaded()
       //  //     .then(function(data) {
       //  //         console.log(data);
       //  //         console.log(data === obj); // true
       //  //     })
       //  //     .catch(function(error) {
       //  //         console.error("Error:", error);
       //  //     });
       //
       //
       //  var refObj = $firebaseObject(ref);
       //  var refArr = $firebaseArray(ref);
       //
       //  // var usersRef = ref.child('Project');
       //  // var usersArr = $firebaseArray(usersRef);
       //
       // // function getUsers(cb){
       // //      return usersArr.$loaded(cb);
       // //  };
       //
       //
       //
       //  // getUsers(function(_d){
       //  //     self.a = _d;
       //  //     // debugger;
       //  // });
       //
       //
       //  var playersRef = ref.child("Profiles") ;
       //  playersRef.push({
       //      name: "John" ,
       //      number: 1,
       //      age: 30
       //  });
       //
       //
       //
       //
       //  debugger;
    };



})();