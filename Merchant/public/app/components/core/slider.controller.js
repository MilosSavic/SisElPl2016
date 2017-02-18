(function() {
    "use strict";

    angular
        .module('merchant-app.core')
        .controller('SliderController', SliderController);

    SliderController.$inject = ['$location','$state','$window','$stateParams','$scope','crTranslator', 'crTranslations'];
    function SliderController($location,$state,$window,$stateParams,$scope,crTranslator, crTranslations) {
        $scope.delay = 2000;
            $scope.slides = [
                {'title': 'ins1', 'class': 'animation-slide', 'image': './assets/img/insurance1.png'},
                {'title': 'ins2', 'class': 'animation-fade', 'image': './assets/img/insurance2.png'},
                {'title': 'ins3', 'class': 'animation-slide', 'image': './assets/img/insurance3.png'},
                {'title': 'ins4', 'class': 'animation-fade', 'image': './assets/img/insurance4.png'},
              
            ];

          
    }

})();