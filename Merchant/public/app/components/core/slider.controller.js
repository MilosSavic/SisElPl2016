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

            var sc = this;

        

        var lang=$stateParams.language;
        var jezik;

        console.log($stateParams.language);

        if($stateParams.language!=undefined){

            if(lang=='Sr'){
                jezik='sr-latn';

            }else{
                jezik='en';
            }

            crTranslator.setLanguage(jezik);
            sc.currentLanguage = crTranslations[crTranslator.getLanguage()].LANGUAGE;

        }else{

             sc.currentLanguage = crTranslations[crTranslator.getLanguage()].LANGUAGE;
             sc.setLanguage = setLanguage;
        }

        function setLanguage(language) {
            crTranslator.setLanguage(language);
            sc.currentLanguage = crTranslations[language].LANGUAGE;
            $state.reload();
        }
    }

})();