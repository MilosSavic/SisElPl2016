(function() {
    "use strict";

    angular
        .module('payment-app.shared')
        .directive('crTooltip', crTooltip);

    crTooltip.$inject = ['$compile'];
    function crTooltip($compile) {
        return {
            restrict: "A",
            scope: {
                //može i da se preuzme u link funkciji putem attrs
                tooltipData: "="
            },
            link: function(scope, element, attrs){
                //proširujemo scope (koji je izolovan)
                scope.hidden = true;
                //koristimo angular.element da napravimo jquery element
                var tooltipElement = angular.element("<div ng-hide='hidden'><span>{{tooltipData}}</span></div>");
                //pristupamo roditelju od html elementa i dodajemo tooltipElement 
                element.parent().append(tooltipElement);
                element
                .on('mouseenter', function() {
                    scope.hidden = false;
                    //digest je potrebno pozvati da se registruje promena na interfejsu
                    scope.$digest(); 
                })
                .on('mouseleave', function() {
                    scope.hidden = true;
                    scope.$digest();
                });
                //koristimo $compile i prosleđujemo scope da formiramo HTML element
                $compile(tooltipElement)(scope);
            }
        };
    }
})();