(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$location', 'AuthenticationService'];

    function RegisterController($location, AuthenticationService) {
        var vm = this;

        vm.register = register;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function register() {
            AuthenticationService.Register(vm.user.username).then(function (data) {
                $location.path('/login');
            }).catch(function (err) {
                console.log("no se pudo iniciar session")
                console.log(err);
                $location.path('/login');

            });

            vm.dataLoading = false;
        }
    }

})();
