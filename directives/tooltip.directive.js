(function () {
    var app = angular.module('app');
    // source
    // http://plnkr.co/edit/lT814woGPN4FB1CjBtfg?p=preview&preview

    app.directive('tooltip', function(){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                element.hover(function(){
                    // on mouseenter
                    element.tooltip('show');
                }, function(){
                    // on mouseleave
                    element.tooltip('hide');
                });
            }
        };
    });

}());