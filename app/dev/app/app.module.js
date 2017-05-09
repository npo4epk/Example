'use strict';

;(function () {

    angular
        .module('ngGandalf', [

            // Third party modules.
            'ngAnimate',
            'ui.router',

            // Custom modules.
            'ngGandalf.auth',
            'ngGandalf.header',
            'ngGandalf.list'
        ]);
})();

