(function () {
    var app = angular.module('app');
    // source
    // http://plnkr.co/edit/lT814woGPN4FB1CjBtfg?p=preview&preview

    app.directive('onlyNumbers', function () {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs, ctrl) {
                elm.on('keydown', function (event) {
                    console.log(event.which);
                    if (event.shiftKey) {
                        event.preventDefault();
                        return false;
                    }
                    //console.log(event.which);
                    if ([8, 13, 27, 37, 38, 39, 40].indexOf(event.which) > -1) {
                        // backspace, enter, escape, arrows
                        return true;
                    } else if (event.which >= 48 && event.which <= 57) {
                        // numbers
                        return true;
                    } else if (event.which >= 95 && event.which <= 105) {
                        // numpad number
                        return true;
                    }
                        // else if ([110, 190].indexOf(event.which) > -1) {
                        //     // dot and numpad dot
                        //     return true;
                    // }
                    else {
                        event.preventDefault();
                        return false;
                    }
                });
            }
        }
    });

    app.directive('noFloat', function () {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs, ctrl) {
                elm.on('keydown', function (event) {
                    if ([110, 190].indexOf(event.which) > -1) {
                        // dot and numpad dot
                        event.preventDefault();
                        return false;
                    } else {
                        return true;
                    }
                });
            }
        }
    });

}());