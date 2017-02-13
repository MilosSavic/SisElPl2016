(function() {
    "use strict";

    angular
        .module('merchant-app.core')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['crTranslator', 'crTranslations','$location','$state','$window','$stateParams'];
    function HeaderController(crTranslator, crTranslations,$location,$state,$window,$stateParams) {
        var hc = this;

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
            hc.currentLanguage = crTranslations[crTranslator.getLanguage()].LANGUAGE;

        }else{

             hc.currentLanguage = crTranslations[crTranslator.getLanguage()].LANGUAGE;
             hc.setLanguage = setLanguage;
        }

        function setLanguage(language) {
            crTranslator.setLanguage(language);
            hc.currentLanguage = crTranslations[language].LANGUAGE;
            $state.reload();
        }
    }
})();