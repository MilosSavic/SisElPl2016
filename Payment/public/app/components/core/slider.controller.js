(function() {
    "use strict";

    angular
        .module('payment-app.core')
        .controller('SliderController', SliderController);

    SliderController.$inject = ['$location','$state','$window','$stateParams','$scope','crTranslator', 'crTranslations'];
    function SliderController($location,$state,$window,$stateParams,$scope,crTranslator, crTranslations) {
        $scope.delay = 8000;
            $scope.slides = [
                {'title': 'pay1', 'class': 'animation-slide', 'image': './assets/img/payment1.png'},
                {'title': 'pay2', 'class': 'animation-fade', 'image': './assets/img/payment2.png'},
                {'title': 'pay3', 'class': 'animation-slide', 'image': './assets/img/payment3.png'},
                {'title': 'pay4', 'class': 'animation-fade', 'image': './assets/img/payment4.png'},
              
            ];
        

        
    }

})();