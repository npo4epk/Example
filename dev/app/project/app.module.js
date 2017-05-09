'use strict';

;(function () {

    angular
        .module('appGandalf.project', [

            // Third party modules.
            'ui.router',
            'firebase'
            // Custom modules.

        ])
        .config(routeConfig)
        .config(initializeUserConfig)
        .factory('fact', fact)
        .component('ind', {
            template: '<h3>ind<a href="" ng-click="$ctrl.fin()">sssss</a></h3>',
            controller:  indCtrl
        })
        .component('pro', {
            template: '<h3>hello world!</h3><ui-view></ui-view>',
            controller:  proCtrl
        })
        .component('list', {
            templateUrl: 'app/project/list.temp.html',
            controller:  listCtrl
        })
        .component('table1', {
            templateUrl: 'app/project/table.temp.html',
            controller:  tableCtrl
        });

    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routeConfig($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('ind', {
                url: '/ind',
                template: '<ind></ind>'
            })
            .state('project', {
                url: '/project',
                template: '<pro></pro>',
                abstract: true
            })
            .state('project.list', {
                url: '/:page',
                template: '<list></list>'
            })
            .state('project.tables', {
                url: '/:page/tables/:tabId',
                template: '<table1></table1>'
            });

    };

    function initializeUserConfig() {

        firebase.initializeApp({
            apiKey:        'AIzaSyA-DdKJVnwgPPH5ubcnGGAkt0aiII9AWmk',
            authDomain:    'gandalf-93fbc.firebaseapp.com',
            databaseURL:   'https://gandalf-93fbc.firebaseio.com',
            projectId: "gandalf-93fbc",
            storageBucket: "gandalf-93fbc.appspot.com",
            messagingSenderId: "203904867278"
        });

    };

    fact.$inject = ['firebase', '$firebaseArray'];

    function fact(firebase, $firebaseArray) {

        var ref = firebase.database().ref();
        var refArr = $firebaseArray(ref);

        var usersRef = ref.child('Projects');
        var usersArr = $firebaseArray(usersRef);

        var _service = {
            usersRef: usersRef,
            getProject: getPro,
            getTable: getTable,
            addPro: addPro,
            removePro: removePro,
            editPro: editPro
        };
        
        return _service;


        function getPro() {
            return usersArr.$loaded();
        }

        function getTable(namePro) {
            var Ref = usersRef.child(namePro).child('Tables');
            var arr = $firebaseArray(Ref);
            return arr.$loaded();
        }

        function addPro() {
            return usersArr.$add({
                Info: {
                    active: true,
                    description: 'description-2',
                    name: 'name-2',
                    user: 'user-2'
                },
                Tables: {
                    1: {
                        title: 'title-2',
                        description: 'description-2',
                        'default-title': 'default-title-2',
                        'default-description': 'default-description-2',
                        'default-comment': 'default-comment-2',
                        Row: {
                            1: 1
                        }

                    }
                }
            });
        }

        function removePro() {
            var key = usersArr.$keyAt(usersArr[1]);
            var item = usersArr.$getRecord(key);
            debugger;
            return usersArr.$remove(item);
        }

        function editPro() {
            var key = usersArr.$keyAt(usersArr[1]);
            var item = usersArr.$getRecord(key);
            item.Info.name = 'ТУТ ВСЕ ПЕРЕПИСАНО!!';
            console.log(item.$id);
            debugger;
            return usersArr.$save(item);
        }


    };

    indCtrl.$inject = ['$state', 'fact'];

    function indCtrl($state, fact) {
        var vm = this;

        vm.fin = function () {
            // fact.getProject(function(_d){
            //     debugger;
            //     // vm.users = _d;
            //     if ( _d.length ) {
            //         $state.go('project.list', {page: _d[1].$id});
            //     }
            // });

            fact.getProject().then(function (data) {
                    if ( data.length ) {
                        $state.go('project.list', {page: data[0].$id});
                    }
            });

        }
    }

    function proCtrl() {
        // alert("pro");
        // debugger;
    }

    listCtrl.$inject = ['$stateParams', 'fact'];

    function listCtrl($stateParams, fact) {

        var self = this;
        self.namePr = $stateParams.page;

        self.list = null;
        self.tables = null;

        fact.getProject().then(function (data) {
            if ( data.length ) {
                self.list = data;

                fact.getTable(self.namePr).then(function (data) {
                    if ( data.length ) {
                        debugger;
                        self.tables = data;
                    }
                });

            }
        });

    }

    tableCtrl.$inject = ['fact'];

    function tableCtrl(fact) {
        var self = this;

        self.removePro = function () {
            fact.removePro().then(function (ref) {
                var a = ref.key;
                debugger;
            });
            
        };

        self.add = function () {
            fact.addPro().then(function (data) {
                debugger;
                console.log(data.key);
            });
        };
        

        self.editPro = function () {
            fact.editPro().then(function (ref) {
                console.log(ref.key);
                debugger;
            });
        };
    }

})();

