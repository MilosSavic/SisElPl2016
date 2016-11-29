(function() {
	"use strict";
	
	angular
		.module('company-registry.i18n')
		.factory('crTranslator', crTranslator);

	crTranslator.$inject = ['$translate'];
	function crTranslator($translate) {
		var translator = {
			setLanguage: setLanguage,
			getLanguage: getLanguage
		};

		return translator;

		function setLanguage(l) {
			$translate.use(l);
		}

		function getLanguage() {
			return $translate.use();
		}
	}
})();