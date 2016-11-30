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
					"NUMBER":"Only numbers are allowed.",
					"JMBG":"This field should contain exactly 13 numeric characters."
				}
			},

			"HOUSE": {

				"ERROR": {

					"REQUIRED":"This field is required.",
					"NUMBER":"Only numbers are allowed.",
					"EMAIL":"E-mail format is not valid.",
					"JMBG":"This field should contain exactly 13 numeric characters."
				}
			},

			"USER": {

				"ERROR": {

					"REQUIRED":"This field is required."
				}
			},

			"REGION": {

				"ERROR": {

					"REQUIRED":"This field is required."
				}
			},
			"LANGUAGE": "En"
		},
		"sr-latn": {
			"COMMON": {
				"SAVE":"Sačuvaj",
				"REVERT":"Poništi",
				"DELETE":"Obriši",
				"BACK":"Povratak"
			},

			/*"INSURANCE": {

				"ERROR": {
					"UNIQUE":"An employee with the given JMBG already exists.",
					"LENGTH13":"This field should contain exactly 13 characters.",
					"NUM":"Ovo polje mora sadrzati tacno 10 karaktera.",
					"EMAIL":"The email you have entered is not valid.",
					"REQUIRED":"Ovo polje je obavezno."
				}
			},*/
			"LANGUAGE": "Sr"
		},
	};

	angular
		.module('company-registry.i18n.constants')
		.constant("crTranslations", crTranslations);
})();