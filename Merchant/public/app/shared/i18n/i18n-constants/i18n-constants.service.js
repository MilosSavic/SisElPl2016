(function() {
	"use strict";

	var crTranslations = {
		"en": {
			"COMMON": {
				"SAVE":"Save",
				"REVERT":"Revert",
				"DELETE":"Delete",
				"BACK":"Back"
			},

			"INSURANCE": {

				"ERROR": {
					"UNIQUE":"An employee with the given JMBG already exists.",
					"LENGTH13":"This field should contain exactly 13 characters.",
					"NUM":"This field should contain exactly 10 characters.",
					"EMAIL":"The email you have entered is not valid.",
					"REQUIRED":"This field is required."
				}
			},

			"CAR": {

				"ERROR": {

					"REQUIRED":"This field is required.",
					"PATTERN":"Only numbers are allowed."
				}
			},

			"HOUSE": {

				"ERROR": {

					"REQUIRED":"This field is required.",
					"PATTERN":"Only numbers are allowed."
				}
			},

			"USER": {

				"ERROR": {

					"REQUIRED":"This field is required."
				}
			},
			"LANGUAGE": "English"
		},
		"sr-latn": {
			"COMMON": {
				"SAVE":"Sačuvaj",
				"REVERT":"Poništi",
				"DELETE":"Obriši",
				"BACK":"Povratak"
			},

			"INSURANCE": {

				"ERROR": {
					"UNIQUE":"An employee with the given JMBG already exists.",
					"LENGTH13":"This field should contain exactly 13 characters.",
					"NUM":"Ovo polje mora sadrzati tacno 10 karaktera.",
					"EMAIL":"The email you have entered is not valid.",
					"REQUIRED":"Ovo polje je obavezno."
				}
			},
			"LANGUAGE": "Srpski"
		},
	};

	angular
		.module('company-registry.i18n.constants')
		.constant("crTranslations", crTranslations);
})();