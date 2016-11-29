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

			"EMPLOYEE": {
				"LIST":"Employee list",
				"JMBG":"Jmbg",
				"NAME":"Name",
				"SURNAME":"Surname",
				"EMAIL":"E-mail",
				"PLACEOFBIRTH":"Place of birth",
				"DATEOFBIRTH":"Date of birth",
				"NEW":"Add new employee",

				"ADD":"Add employee",
				"EDIT":"Edit employee with id ",

				"ERROR": {
					"UNIQUE":"An employee with the given JMBG already exists.",
					"LENGTH13":"This field should contain exactly 13 characters.",
					"NUM":"Ovo polje mora sadrzati tacno 10 karaktera.",
					"EMAIL":"The email you have entered is not valid.",
					"REQUIRED":"Ovo polje je obavezno."
				}
			},

			"PAYMENT": {

				"ERROR": {
					"UNIQUE":"An employee with the given JMBG already exists.",
					"LENGTH13":"This field should contain exactly 13 characters.",
					"NUM":"This field should contain exactly 10 characters.",
					"EMAIL":"The email you have entered is not valid.",
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

			"EMPLOYEE": {
				"LIST":"Lista zaposlenih",
				"JMBG":"Jmbg",
				"NAME":"Ime",
				"SURNAME":"Prezime",
				"EMAIL":"E-mail",
				"PLACEOFBIRTH":"Mesto rođenja",
				"DATEOFBIRTH":"Datum rođenja",
				"NEW":"Dodaj novog zaposlenog",

				"ADD":"Dodaj zaposlenog",
				"EDIT":"Izmeni zaposlenog sa id-om ",

				"ERROR": {
 					"UNIQUE":"Radnik sa navedenim JMBG-om već postoji u listi.",
 					"LENGTH13":"Ovo polje mora imati tačno 13 karaktera.",
 					"NUM":"Ovo polje treba da sadrži 13 cifri.",
 					"EMAIL":"Email koji ste uneli nije validan.",
 					"REQUIRED":"Ovo polje je obavezno."
				}
			},

			"PAYMENT": {

				"ERROR": {
					"UNIQUE":"An employee with the given JMBG already exists.",
					"LENGTH13":"This field should contain exactly 13 characters.",
					"NUM":"Ovo polje mora sadrzati tacno 10 karaktera.",
					"EMAIL":"The email you have entered is not valid.",
					"REQUIRED":"Ovo polje je obavezno."
				}
			},
			"LANGUAGE": "Sr"
		},
	};

	angular
		.module('company-registry.i18n.constants')
		.constant("crTranslations", crTranslations);
})();