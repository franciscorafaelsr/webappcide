(function () {
    'use strict';

    angular
        .module('app')
        .controller('DatosSolicitud', DatosSolicitud);

    DatosSolicitud.$inject = ['$http', 'CatService', '$rootScope', '$filter'];

    function DatosSolicitud($http, CatService, $rootScope, $filter) {
        var vm = this;
        vm.saveData = saveData;

        (function initController() {
// comprobar si ya se finalizo la captura
            vm.convocatoria =$rootScope.globals.convocatoria;
            vm.finalizado =($rootScope.globals.sesiondetails.locky === 1) ? true : false;
            // catalogo licenciaturas
            if ($rootScope.globals.catLicCide !== undefined) {
                combo1();
            } else {
                CatService.GetCatalogo("LicCide") // catalogo programa de interes
                    .then(function (data) {
                        $rootScope.globals.catLicCide = data;
                        combo1();
                    }).catch(function (err) {
                    console.log(err);
                });
            }

            // catalogo fechas examen
            if ($rootScope.globals.catFechasExamen !== undefined) {
                combo2();
            } else {
                CatService.GetCatalogo("FechasExamen")
                    .then(function (data) {
                        $rootScope.globals.catFechasExamen = data;
                        combo2();
                    }).catch(function (err) {
                    console.log(err);
                });
            }

            // catalogo binario
            if ($rootScope.globals.catBinario !== undefined) {
                combo3();
            } else {
                CatService.GetCatalogo("Binario")
                    .then(function (data) {
                        $rootScope.globals.catBinario = data;
                        combo3();
                    }).catch(function (err) {
                    console.log(err);
                });
            }
            restoreData();
        })();

//private functions
        function restoreData() {
            if ($rootScope.globals.data.dsp3) {
                vm.motivos = $rootScope.globals.data.dsp3;
            }
            if ($rootScope.globals.data.dsp4) {
                vm.acesorvocacional = $rootScope.globals.data.dsp4;
            }
        }

        function combo1() {
            vm.licenciaturaoptions = $rootScope.globals.catLicCide.data;
            if ($rootScope.globals.data.dsp1) {
                var filter1 = $filter('filter')(vm.licenciaturaoptions, {'id': $rootScope.globals.data.dsp1});
                vm.licenciaturaschosse = filter1[0];
            }
        }

        function combo2() {
            vm.fechasexamenoptions = $rootScope.globals.catFechasExamen.data;
            if ($rootScope.globals.data.dsp2) {
                var filter2 = $filter('filter')(vm.fechasexamenoptions, {'id': $rootScope.globals.data.dsp2});
                vm.fechasexamen = filter2[0];
            }
        }

        function combo3() {
            vm.familiarcideoptions = $rootScope.globals.catBinario.data;
            vm.familiarcidetrabajaoptions = $rootScope.globals.catBinario.data;
            if ($rootScope.globals.data.dsp5) {
                var filter5 = $filter('filter')(vm.familiarcideoptions, {'id': $rootScope.globals.data.dsp5});
                vm.familiarcide = filter5[0];
            }
            if ($rootScope.globals.data.dsp6) {
                var filter6 = $filter('filter')(vm.familiarcidetrabajaoptions, {'id': $rootScope.globals.data.dsp6});
                vm.familiarcidetrabaja = filter6[0];
            }
        }

// public functions
        function saveData() {


            if (vm.convocatoria == 327){
                CatService.datosSolicitudSave(
                    $rootScope.globals.currentUser.idsesion,
                    vm.licenciaturaschosse.id, vm.fechasexamen.id, vm.motivos,
                    vm.acesorvocacional, vm.familiarcide.id, vm.familiarcidetrabaja.id
                ).then(function (data) {
                    console.log(data);
                }).catch(function (err) {
                    console.log(err);
                });
        }else{
                CatService.datosSolicitudSave(
                    $rootScope.globals.currentUser.idsesion,
                    0, vm.fechasexamen.id, vm.motivos,
                    " ", vm.familiarcide.id, vm.familiarcidetrabaja.id
                ).then(function (data) {
                    console.log(data);
                }).catch(function (err) {
                    console.log(err);
                });



            }



        }

    }

})();
