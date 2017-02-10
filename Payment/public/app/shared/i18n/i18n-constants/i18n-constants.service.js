(function() {
	"use strict";

	var crTranslations = {
		"en": {
			"COMMON": {
				"SAVE":"Save",
				"REVERT":"Revert",
				"DELETE":"Delete",
				"BACK":"Back",
				"ABOUT1":"This is the site for the transfer of funds between users.",
				"ABOUT2":"You can also contact us at the following e-mail addresses:",

			},
			
			"PAYMENT": {

				"PAN":"PAN",
				"SECURITYCODE":"Security code",
				"CARDHOLDERNAME":"Card holder name",
				"EXPIRYDATE":"Expiry date",
				"PAYMENT":"Payment",
				"PAYMENTSITE":"Payment site",
				"HOME":"Home",
				"ABOUT":"About",

				"ERROR": {

					"NUMBER":"Only numbers are allowed.",
					"EMAIL":"The email you have entered is not valid.",
					"REQUIRED":"This field is required.",
					"PAN":"This field should contain exactly 15 numeric characters.",
					"SECURITYCODE":"This field should contain exactly 3 numeric characters.",
					"EXPIRYDATE":"You must enter expiry date",

				}
			},
			"LANGUAGE": "En"
		},
		"sr-latn": {
			"COMMON": {
				"SAVE":"Sačuvaj",
				"REVERT":"Poništi",
				"DELETE":"Obriši",
				"BACK":"Povratak",
				"ABOUT1":"Ovo je sajt za razmenu novčanih sredstava izmedju korisnika.",
				"ABOUT2":"Možete nam se obratiti na sledećim e-mail adresama: ",
			},
			

			"PAYMENT": {

				"PAN":"PAN",
				"SECURITYCODE":"Sigurnosni kod",
				"CARDHOLDERNAME":"Ime vlasnika kartice",
				"EXPIRYDATE":"Datum isteka",
				"PAYMENT":"Naplata",
				"PAYMENTSITE":"Sajt za naplatu",
				"HOME":"Početna",
				"ABOUT":"O nama",
				


				"ERROR": {
			
					"NUMBER":"Samo brojevi su dozvoljeni.",
					"EMAIL":"The email you have entered is not valid.",
					"REQUIRED":"Ovo polje je obavezno.",
					"PAN":"Ovo polje mora da sadrži tačno 15 numeričkih karaktera.",
					"SECURITYCODE":"Ovo polje mora da sadrži tačno 3 numerička karaktera.",
					"EXPIRYDATE":"Morate uneti datum isteka.",
				}
			},
			"LANGUAGE": "Sr"
		},
	};

	angular
		.module('payment-app.i18n.constants')
		.constant("crTranslations", crTranslations);
})();