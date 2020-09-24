(function () {
    'use strict';
    angular
        .module('app')
        .controller('DatosAcademicos', DatosAcademicos);

    DatosAcademicos.$inject = ['$http', 'CatService', '$filter', '$rootScope'];

    function DatosAcademicos($http, CatService, $filter, $rootScope) {
        var vm = this;
        vm.getdetails = getdetails;
        vm.getdata = getdata;
        vm.fillData = fillData;
        vm.saveData = saveData;

        (function initController() { //init dataacademicos
// comprobar si ya se finalizo la captura
            vm.finalizado =($rootScope.globals.sesiondetails.locky === 1) ? true : false;
            //
            //catalogo entidad federativa
            if ($rootScope.globals.catEntidadFederativa !== undefined) {
                vm.eoptions = $rootScope.globals.catEntidadFederativa.data;
                locateSchool();
            } else {
                CatService.GetCatalogo("EntidadFederativa")
                    .then(function (data) {
                        $rootScope.globals.catEntidadFederativa = data;
                        vm.eoptions = data.data;
                        locateSchool();
                    }).catch(function (err) {
                    console.log(err);
                });
            }
            // catalogo Binario
            if ($rootScope.globals.catbecado !== undefined) {
                vm.becadooptions = $rootScope.globals.catBinario.data;
                if ($rootScope.globals.data.daBecado) {
                    var filtradobecado = $filter('filter')(vm.becadooptions, {'id': $rootScope.globals.data.daBecado});
                    vm.becadohoose = filtradobecado[0];
                }
            } else {
                CatService.GetCatalogo("becado")
                    .then(function (data) {
                        $rootScope.globals.catbecado = data;
                        vm.becadooptions = data.data;
                        if ($rootScope.globals.data.daBecado) {
                            var filtradobecado = $filter('filter')(vm.becadooptions, {'id': $rootScope.globals.data.daBecado});
                            vm.becadohoose = filtradobecado[0];
                        }

                    }).catch(function (err) {
                    console.log(err);
                });
            }
            restoreData();
        })();

        // private functions
        function getdetails() {
            $http.post('API/ESCMS/lista/', {Entidad: vm.entidadchoose.valor})
                .then(function (response) {
                    vm.chooseSchool = angular.fromJson(response.data);
                });
        }

        function getdata() {//optimizar get data only id
            $http.post('API/ESCMS/escuela/', {
                id: vm.selectedSchool.id,
                Entidad: vm.entidadchoose.valor,
                Escuela: vm.selectedSchool.nombreescuela
            })
                .then(function (response) {
                    vm.escueladata = angular.fromJson(response.data);
                });
        }


        function saveData() {
            CatService.datosAcademicosSave(
                $rootScope.globals.currentUser.idsesion,
                vm.entidadchoose.id, vm.selectedSchool.id,
                vm.sitioweb, vm.boleta, vm.semestre, vm.promedio,
                vm.becadohoose.id
            ).then(function (data) {
                console.log(data);
            }).catch(function (err) {
                console.log(err);
            });

        }

        function locateSchool() {
            if ($rootScope.globals.data.daEntidadFederativa !== undefined) {
                var filtrated = $filter('filter')(vm.eoptions, {'id': $rootScope.globals.data.daEntidadFederativa});
                vm.entidadchoose = filtrated[0];
                CatService.getlistEscuelas(vm.entidadchoose.valor).then(function (response) {
                    vm.chooseSchool = response.data;
                    if ($rootScope.globals.data.daEscuela) {
                        var filtrates = $filter('filter')(vm.chooseSchool, {'id': $rootScope.globals.data.daEscuela});
                        vm.selectedSchool = filtrates[0];
                        getdata();
                    }
                }).catch(function (err) {
                    console.log(err);
                });

            }


        }


        function restoreData() {
            vm.sitioweb = $rootScope.globals.data.daSitioWeb;
            vm.boleta = $rootScope.globals.data.daBoleta;
            vm.semestre = $rootScope.globals.data.daSemestre;
            vm.promedio = $rootScope.globals.data.daPromedio;

        }


// deprecate
        function fillData() {
            CatService.datosGeneralesfill($rootScope.globals.currentUser.idsesion)
                .then(function (data) {
                    if (data.daEntidadFederativa) {
                        var filtrated = $filter('filter')(vm.eoptions, {'id': data.daEntidadFederativa});
                        vm.entidadchoose = filtrated[0];
                        if (data.daEscuela) {
                            CatService.getlistEscuelas(vm.entidadchoose.valor).then(function (response) {
                                vm.chooseSchool = response.data;
                                var filtrates = $filter('filter')(vm.chooseSchool, {'id': data.daEscuela});
                                vm.selectedSchool = filtrates[0];
                                getdata();
                            }).catch(function (err) {
                                console.log(err);
                            });
                        }
                        vm.sitioweb = data.daSitioWeb;
                        vm.boleta = data.daBoleta;
                        vm.semestre = data.daSemestre;
                        vm.promedio = data.daPromedio;
                        if (data.daBecado) {
                            console.log("en fill data")
                            var filtradobecado = $filter('filter')(vm.becadooptions, {'id': data.daBecado});
                            vm.becadohoose = filtradobecado[0];
                        }
                    }
                }).catch(function (err) {
                console.log(err);
            });
        }


    }

})();
