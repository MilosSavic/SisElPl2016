(function() {
    "use strict";

    angular
        .module('merchant-app.core')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['crTranslator', 'crTranslations','$location','$state','$window'];
    function HeaderController(crTranslator, crTranslations,$location,$state,$window) {
        var hc = this;
        hc.currentLanguage = crTranslations[crTranslator.getLanguage()].LANGUAGE;
        hc.setLanguage = setLanguage;

        function setLanguage(language) {
            crTranslator.setLanguage(language);
            hc.currentLanguage = crTranslations[language].LANGUAGE;
            $state.reload();
        }
    }
})();