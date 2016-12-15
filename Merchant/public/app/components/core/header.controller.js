(function() {
    "use strict";

    angular
        .module('merchant-app.core')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['crTranslator', 'crTranslations'];
    function HeaderController(crTranslator, crTranslations) {
        var hc = this;
        hc.currentLanguage = crTranslations[crTranslator.getLanguage()].LANGUAGE;
        hc.setLanguage = setLanguage;

        function setLanguage(language) {
            crTranslator.setLanguage(language);
            hc.currentLanguage = crTranslations[language].LANGUAGE;
        }
    }
})();