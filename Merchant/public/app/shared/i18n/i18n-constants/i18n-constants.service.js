(function() {
	"use strict";

	var crTranslations = {
		"en": {
			"COMMON": {
				"SAVE":"Save",
				"REVERT":"Revert",
				"DELETE":"Delete",
				"BACK":"Back",
				"HOME":"Home",
				"ABOUT":"About",
				"ADDREGION":"Add region",
				"ADDSPORTS":"Add sports",
				"ADDAMOUNT":"Add amount",
				"ADDHOUSEINSURANCECATEGORY":"Add house insurance category",
				"INSURANCESALE":"Insurance sale",
				"NEXT":"Next",
				"NEXTUSER":"Next user",
				
			},

			"SIDEBAR": {

				"INSURANCE":"Insurance",
				"USERS":"Users",
				"USER":"User",
				"HOUSEINSURANCE":"House insurance",
				"CARINSURANCE":"Car insurance",
				"YOURDATA":"Your data",
			},



			"INSURANCE": {

				"INSURANCESTARDATE":"Insurance start date",
				"INSURANCEENDDATE":"Insurance end date",
				"INSURANCEVALUE":"Insurance value",
				"REGION":"Region",
				"NUMBEROFUSERS":"Number of users",


				"ERROR": {

					"NUMBER":"Only numbers are allowed.",
					"EMAIL":"The email you have entered is not valid.",
					"REQUIRED":"This field is required.",
					"AMOUNT":"There are no amounts.",
					"REGION":"There are no regions.",
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

				"NAME":"Name",
				"SURNAME":"Surname",
				"JMBG":"JMBG",
				"PASSPORTNUMBER":"Passport number",
				"ADDRESS":"Address",
				"TELEPHONENUMBER":"Telephone number",
				"AGE":"Age",
				"SPORT":"Sport",
				"EMAIL":"Email",

				"ERROR": {

					"REQUIRED":"This field is required.",
					"NUMBER":"Only numbers are allowed.",
					"EMAIL":"E-mail format is not valid.",
					"JMBG":"This field should contain exactly 13 numeric characters.",
					"SPORT":"Your don't have any sports.",
				}
			},

			"REGION": {

				"ERROR": {

					"REQUIRED":"This field is required.",
					"NUMBER":"Only numbers are allowed."
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
				"HOME":"Početna",
				"ABOUT":"O nama",
				"ADDREGION":"Dodaj region",
				"ADDSPORTS":"Dodaj sport",
				"ADDAMOUNT":"Dodaj iznos",
				"ADDHOUSEINSURANCECATEGORY":"Dodaj kategoriju kućnog osiguranja",
				"INSURANCESALE":"Prodaja osiguranja",
				"NEXT":"Dalje",
				"NEXTUSER":"Sledeći korisnik",
			},

			"SIDEBAR": {

				"INSURANCE":"Osiguranje",
				"USERS":"Korisnici",
				"USER":"Korisnik",
				"HOUSEINSURANCE":"Kućno osiguranje",
				"CARINSURANCE":"Putno osiguranje",
				"YOURDATA":"Vaši podaci",
			},



			"INSURANCE": {

				"INSURANCESTARDATE":"Početni datum osiguranja",
				"INSURANCEENDDATE":"Krajnji datum osiguranja",
				"INSURANCEVALUE":"Vrednost osiguranja",
				"REGION":"Region",
				"NUMBEROFUSERS":"Broj korisnika",

				"ERROR": {
					"NUMBER":"Samo brojevi su dozvoljeni.",
					"EMAIL":"Email koji ste uneli nije validan.",
					"REQUIRED":"Ovo polje je obavezno.",
					"AMOUNT":"Ne postoje vrednosti.",
					"REGION":"Ne postoje regioni.",
				}
			},

			"USER": {

				"NAME":"Ime",
				"SURNAME":"Prezime",
				"JMBG":"JMBG",
				"PASSPORTNUMBER":"Broj pasoša",
				"ADDRESS":"Adresa",
				"TELEPHONENUMBER":"Broj telefona",
				"AGE":"Starost",
				"SPORT":"Sport",
				"EMAIL":"Email",

				"ERROR": {

					"REQUIRED":"Ovo polje je obavezno.",
					"NUMBER":"Samo brojevi su dozvoljeni.",
					"EMAIL":"Email koji ste uneli nije validan.",
					"JMBG":"Ovo polje mora da sadrži tačno 13 numeričkih karaktera.",
					"SPORT":"Ne postoji nijedan sport.",
				}
			},

			"LANGUAGE": "Sr"
		},
	};

	angular
		.module('company-registry.i18n.constants')
		.constant("crTranslations", crTranslations);
})();