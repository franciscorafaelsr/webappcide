(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService'];

    function LoginController($location, AuthenticationService) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password).then(function (data) {

                if (data.data.idsesion) {
                    AuthenticationService.SetCredentials(vm.username, vm.password, data.data.idUser, data.data.idsesion);
                    $location.path('/convocatoria');
                }


            }).catch(function (err) {
                console.log("no se pudo iniciar session")
                console.log(err);
                $location.path('/login');

            });

            vm.dataLoading = false;


            //   AuthenticationService.SetCredentials("victor", "secreto","2","11");

            // AuthenticationService.Login(vm.username, vm.password, function (response) {
            //       if (response.success) {
            //          AuthenticationService.SetCredentials(vm.username, vm.password,"1");
            //           $location.path('/');
            //        } else {
            //            FlashService.Error(response.message);
            //           vm.dataLoading = false;
            //       }
            //     });

        }


    }

})();
