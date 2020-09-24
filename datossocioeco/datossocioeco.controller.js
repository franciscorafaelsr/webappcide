(function () {
    'use strict';

    angular
        .module('app')
        .controller('DatosSocioeco', DatosSocioeco);

    DatosSocioeco.$inject = ['$http', 'CatService', '$rootScope', '$filter'];


    function DatosSocioeco($http, CatService, $rootScope, $filter) {

        var vm = this;
        vm.saveData = saveData;
        vm.fillData = fillData;

//cuando se inicia el controlador
        (function initController() {
            // comprobar si ya se finalizo la captura
            vm.finalizado =($rootScope.globals.sesiondetails.locky === 1) ? true : false;
            // computadora en casa
            // catalogo Binario
            if ($rootScope.globals.catBinario !== undefined) {
                vm.computadoracasaoptions = $rootScope.globals.catBinario.data;
                vm.internetoptions = $rootScope.globals.catBinario.data;
                var filter1 = $filter('filter')(vm.computadoracasaoptions, {'id': $rootScope.globals.data.dsep1});
                vm.dsep1 = filter1[0];
                var filter2 = $filter('filter')(vm.internetoptions, {'id': $rootScope.globals.data.dsep2});
                vm.dsep2 = filter2[0];
            } else {
                CatService.GetCatalogo("Binario")
                    .then(function (data) {
                        $rootScope.globals.catBinario = data;
                        vm.computadoracasaoptions = data.data;
                        vm.internetoptions = data.data;
                        var filter1 = $filter('filter')(vm.computadoracasaoptions, {'id': $rootScope.globals.data.dsep1});
                        vm.dsep1 = filter1[0];
                        var filter2 = $filter('filter')(vm.internetoptions, {'id': $rootScope.globals.data.dsep2});
                        vm.dsep2 = filter2[0];
                    }).catch(function (err) {
                    console.log(err);
                });
            }

            // dependes economicamente
            if ($rootScope.globals.catDependientes !== undefined) {
                vm.dependesecoptions = $rootScope.globals.catDependientes.data;
                var filter3 = $filter('filter')(vm.dependesecoptions, {'id': $rootScope.globals.data.dsep3});
                vm.dsep3 = filter3[0];
            } else {
                CatService.GetCatalogo("Dependientes")
                    .then(function (data) {
                        $rootScope.globals.catDependientes = data;
                        vm.dependesecoptions = data.data;
                        var filter3 = $filter('filter')(vm.dependesecoptions, {'id': $rootScope.globals.data.dsep3});
                        vm.dsep3 = filter3[0];
                    }).catch(function (err) {
                    console.log(err);
                });
            }

            // numero de dependientes
            if ($rootScope.globals.catNum5omas !== undefined) {
                vm.numdepenoptions = $rootScope.globals.catNum5omas.data;
                vm.numhermanosoptions = $rootScope.globals.catNum5omas.data;
                if ($rootScope.globals.data.dsep4) {
                    var filter4 = $filter('filter')(vm.numdepenoptions, {'id': $rootScope.globals.data.dsep4});
                    vm.dsep4 = filter4[0];
                }
                if ($rootScope.globals.data.dsep6) {
                    var filter6 = $filter('filter')(vm.numhermanosoptions, {'id': $rootScope.globals.data.dsep6});
                    vm.dsep6 = filter6[0];
                }
            } else {
                CatService.GetCatalogo("Num5omas")
                    .then(function (data) {
                        $rootScope.globals.catNum5omas = data;
                        vm.numdepenoptions = data.data;
                        vm.numhermanosoptions = data.data;
                        if ($rootScope.globals.data.dsep4) {
                            var filter4 = $filter('filter')(vm.numdepenoptions, {'id': $rootScope.globals.data.dsep4});
                            vm.dsep4 = filter4[0];
                        }
                        if ($rootScope.globals.data.dsep6) {
                            var filter6 = $filter('filter')(vm.numhermanosoptions, {'id': $rootScope.globals.data.dsep6});
                            vm.dsep6 = filter6[0];
                        }
                    }).catch(function (err) {
                    console.log(err);
                });
            }
            // monto mensual total
            if ($rootScope.globals.catrangoingreso !== undefined) {
                vm.montomensualoptions = $rootScope.globals.catrangoingreso.data;
                vm.padreingresoestatusoptions = $rootScope.globals.catrangoingreso.data;
                vm.madreingresoestatusoptions = $rootScope.globals.catrangoingreso.data;
                if ($rootScope.globals.data.dsep5) {
                    var filter5 = $filter('filter')(vm.montomensualoptions, {'id': $rootScope.globals.data.dsep5});
                    vm.dsep5 = filter5[0];
                }
                if ($rootScope.globals.data.dsep12) {
                    var filter12 = $filter('filter')(vm.padreingresoestatusoptions, {'id': $rootScope.globals.data.dsep12});
                    vm.dsep12 = filter12[0];
                }
                if ($rootScope.globals.data.dsep18) {
                    var filter18 = $filter('filter')(vm.madreingresoestatusoptions, {'id': $rootScope.globals.data.dsep18});
                    vm.dsep18 = filter18[0];
                }
            } else {
                CatService.GetCatalogo("rangoingreso")
                    .then(function (data) {
                        $rootScope.globals.catrangoingreso = data;
                        vm.montomensualoptions = data.data;
                        vm.padreingresoestatusoptions = data.data;
                        vm.madreingresoestatusoptions = data.data;
                        if ($rootScope.globals.data.dsep5) {
                            var filter5 = $filter('filter')(vm.montomensualoptions, {'id': $rootScope.globals.data.dsep5});
                            vm.dsep5 = filter5[0];
                        }
                        if ($rootScope.globals.data.dsep12) {
                            var filter12 = $filter('filter')(vm.padreingresoestatusoptions, {'id': $rootScope.globals.data.dsep12});
                            vm.dsep12 = filter12[0];
                        }
                        if ($rootScope.globals.data.dsep18) {
                            var filter18 = $filter('filter')(vm.madreingresoestatusoptions, {'id': $rootScope.globals.data.dsep18});
                            vm.dsep18 = filter18[0];
                        }
                    }).catch(function (err) {
                    console.log(err);
                });
            }

            // condicion padre
            if ($rootScope.globals.catcondicion !== undefined) {
                vm.padrecondicionoptions = $rootScope.globals.catcondicion.data;
                vm.madrecondicionoptions = $rootScope.globals.catcondicion.data;
                if ($rootScope.globals.data.dsep14) {
                    var filter14 = $filter('filter')(vm.madrecondicionoptions, {'id': $rootScope.globals.data.dsep14});
                    vm.dsep14 = filter14[0];
                }
                if ($rootScope.globals.data.dsep8) {
                    var filter8 = $filter('filter')(vm.padrecondicionoptions, {'id': $rootScope.globals.data.dsep8});
                    vm.dsep8 = filter8[0];
                }
            } else {
                CatService.GetCatalogo("condicion")
                    .then(function (data) {
                        $rootScope.globals.catcondicion = data;
                        vm.padrecondicionoptions = data.data;
                        vm.madrecondicionoptions = data.data;
                        if ($rootScope.globals.data.dsep14) {
                            var filter14 = $filter('filter')(vm.madrecondicionoptions, {'id': $rootScope.globals.data.dsep14});
                            vm.dsep14 = filter14[0];
                        }
                        if ($rootScope.globals.data.dsep8) {
                            var filter8 = $filter('filter')(vm.padrecondicionoptions, {'id': $rootScope.globals.data.dsep8});
                            vm.dsep8 = filter8[0];
                        }
                    }).catch(function (err) {
                    console.log(err);
                });
            }
            // grado de estudios padre
            if ($rootScope.globals.catGradoestudios !== undefined) {
                vm.padreeducacionoptions = $rootScope.globals.catGradoestudios.data;
                vm.madreeducacionoptions = $rootScope.globals.catGradoestudios.data;
                if ($rootScope.globals.data.dsep9) {
                    var filter9 = $filter('filter')(vm.padreeducacionoptions, {'id': $rootScope.globals.data.dsep9});
                    vm.dsep9 = filter9[0];
                }
                if ($rootScope.globals.data.dsep15) {
                    var filter15 = $filter('filter')(vm.madreeducacionoptions, {'id': $rootScope.globals.data.dsep15});
                    vm.dsep15 = filter15[0];
                }
            } else {
                CatService.GetCatalogo("Gradoestudios")
                    .then(function (data) {
                        $rootScope.globals.catGradoestudios = data;
                        vm.padreeducacionoptions = data.data;
                        vm.madreeducacionoptions = data.data;
                        if ($rootScope.globals.data.dsep9) {
                            var filter9 = $filter('filter')(vm.padreeducacionoptions, {'id': $rootScope.globals.data.dsep9});
                            vm.dsep9 = filter9[0];
                        }
                        if ($rootScope.globals.data.dsep15) {
                            var filter15 = $filter('filter')(vm.madreeducacionoptions, {'id': $rootScope.globals.data.dsep15});
                            vm.dsep15 = filter15[0];
                        }

                    }).catch(function (err) {
                    console.log(err);
                });
            }
            // estatus educativo
            if ($rootScope.globals.catestatuseducativo !== undefined) {
                vm.padreeducacionestatusoptions = $rootScope.globals.catestatuseducativo.data;
                vm.madreeducacionestatusoptions = $rootScope.globals.catestatuseducativo.data;
                if ($rootScope.globals.data.dsep10) {
                    var filter10 = $filter('filter')(vm.padreeducacionestatusoptions, {'id': $rootScope.globals.data.dsep10});
                    vm.dsep10 = filter10[0];
                }
                if ($rootScope.globals.data.dsep16) {
                    var filter16 = $filter('filter')(vm.madreeducacionestatusoptions, {'id': $rootScope.globals.data.dsep16});
                    vm.dsep16 = filter16[0];
                }
            } else {
                CatService.GetCatalogo("estatuseducativo")
                    .then(function (data) {
                        $rootScope.globals.catestatuseducativo = data;
                        vm.padreeducacionestatusoptions = data.data;
                        vm.madreeducacionestatusoptions = data.data;
                        if ($rootScope.globals.data.dsep10) {
                            var filter10 = $filter('filter')(vm.padreeducacionestatusoptions, {'id': $rootScope.globals.data.dsep10});
                            vm.dsep10 = filter10[0];
                        }
                        if ($rootScope.globals.data.dsep16) {
                            var filter16 = $filter('filter')(vm.madreeducacionestatusoptions, {'id': $rootScope.globals.data.dsep16});
                            vm.dsep16 = filter16[0];
                        }

                    }).catch(function (err) {
                    console.log(err);
                });
            }
            //  fillData();
            restoreData();
        })();

        // restorin ready data
        function restoreData() {
            if ($rootScope.globals.data.dsep7) {
                vm.dsep7 = $rootScope.globals.data.dsep7;
            }
            if ($rootScope.globals.data.dsep11) {
                vm.dsep11 = $rootScope.globals.data.dsep11;
            }
            if ($rootScope.globals.data.dsep13) {
                vm.dsep13 = $rootScope.globals.data.dsep13;
            }
            if ($rootScope.globals.data.dsep17) {
                vm.dsep17 = $rootScope.globals.data.dsep17;
            }
        }


// deprecate
        function fillData() {
            CatService.datosGeneralesfill($rootScope.globals.currentUser.idsesion)
                .then(function (data) {

                    if (data.dsep7) {
                        vm.dsep7 = data.dsep7;
                    }
                    if (data.dsep11) {
                        vm.dsep11 = data.dsep11;
                    }
                    if (data.dsep13) {
                        vm.dsep13 = data.dsep13;
                    }
                    if (data.dsep17) {
                        vm.dsep17 = data.dsep17;
                    }
                    if (data.dsep1) {
                        var filter1 = $filter('filter')(vm.computadoracasaoptions, {'id': data.dsep1});
                        vm.dsep1 = filter1[0];
                    }
                    if (data.dsep2) {
                        var filter2 = $filter('filter')(vm.internetoptions, {'id': data.dsep2});
                        vm.dsep2 = filter2[0];
                    }
                    if (data.dsep3) {
                        var filter3 = $filter('filter')(vm.dependesecoptions, {'id': data.dsep3});
                        vm.dsep3 = filter3[0];
                    }
                    if (data.dsep4) {
                        var filter4 = $filter('filter')(vm.numdepenoptions, {'id': data.dsep4});
                        vm.dsep4 = filter4[0];
                    }
                    if (data.dsep5) {
                        var filter5 = $filter('filter')(vm.montomensualoptions, {'id': data.dsep5});
                        vm.dsep5 = filter5[0];
                    }
                    if (data.dsep6) {
                        var filter6 = $filter('filter')(vm.numhermanosoptions, {'id': data.dsep6});
                        vm.dsep6 = filter6[0];
                    }

                    if (data.dsep8) {
                        var filter8 = $filter('filter')(vm.padrecondicionoptions, {'id': data.dsep8});
                        vm.dsep8 = filter8[0];
                    }
                    if (data.dsep9) {
                        var filter9 = $filter('filter')(vm.padreeducacionoptions, {'id': data.dsep9});
                        vm.dsep9 = filter9[0];
                    }
                    if (data.dsep10) {
                        var filter10 = $filter('filter')(vm.padreeducacionestatusoptions, {'id': data.dsep10});
                        vm.dsep10 = filter10[0];
                    }

                    if (data.dsep12) {
                        var filter12 = $filter('filter')(vm.padreingresoestatusoptions, {'id': data.dsep12});
                        vm.dsep12 = filter12[0];
                    }

                    if (data.dsep14) {
                        var filter14 = $filter('filter')(vm.madrecondicionoptions, {'id': data.dsep14});
                        vm.dsep14 = filter14[0];
                    }
                    if (data.dsep15) {
                        var filter15 = $filter('filter')(vm.madreeducacionoptions, {'id': data.dsep15});
                        vm.dsep15 = filter15[0];
                    }
                    if (data.dsep16) {
                        var filter16 = $filter('filter')(vm.madreeducacionestatusoptions, {'id': data.dsep16});
                        vm.dsep16 = filter16[0];
                    }

                    if (data.dsep18) {
                        var filter18 = $filter('filter')(vm.madreingresoestatusoptions, {'id': data.dsep18});
                        vm.dsep18 = filter18[0];
                    }

                }).catch(function (err) {
                console.log(err);
            });
        }


        function saveData() {
            CatService.datosSocioEconomicosave(
                $rootScope.globals.currentUser.idsesion,
                vm.dsep1.id, vm.dsep2.id, vm.dsep3.id, vm.dsep4.id, vm.dsep5.id, vm.dsep6.id, vm.dsep7, vm.dsep8.id, vm.dsep9.id,
                vm.dsep10.id, vm.dsep11, vm.dsep12.id, vm.dsep13, vm.dsep14.id, vm.dsep15.id, vm.dsep16.id, vm.dsep17, vm.dsep18.id
            ).then(function (data) {
                console.log(data);
            }).catch(function (err) {
                console.log(err);
            });

        }


    }

})();
