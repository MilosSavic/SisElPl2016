(function() {
	"use strict";
	
	angular
		.module('merchant-admin-app.i18n')
		.config(config);

	config.$inject = ['$translateProvider', 'crTranslations'];
	function config($translateProvider, crTranslations) {
		$translateProvider.useSanitizeValueStrategy('escape');
		//na ključ "ime jezika" postavljamo vrednost objekat prevoda
		$translateProvider.translations('sr-latn', crTranslations["sr-latn"]);
		$translateProvider.translations('en', crTranslations.en);
		$translateProvider.preferredLanguage('en');
	}
})();