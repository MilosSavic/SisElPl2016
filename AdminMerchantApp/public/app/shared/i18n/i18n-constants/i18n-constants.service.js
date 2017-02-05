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
				"ADDCARINSURANCESERVICE" : "Add car insurance service",
				"ADDMERCHANT" : "Add merchant",
				"ADMIN":"Admin merchant app",
				"INSURANCESALE":"Insurance sale",
				"NEXT":"Next",
				"NEXTUSER":"Next user",
				"SUBMIT":"Submit",
				"SKIP":"Skip",
				"REMOVEUSER":"Remove user",
				"BUY":"Buy",
				"ABOUT1":"Web app for buying insurance.",
				"ABOUT2":"Our company works more than 10 years and our customers are very satisfied with the services which we offer them.",
				"ABOUT3":"You can also contact us at the following e-mail addresses:",
				

				
			},

			"SIDEBAR": {

				"INSURANCE":"Insurance",
				"USERS":"Users",
				"USER":"User",
				"HOUSEINSURANCE":"House insurance",
				"CARINSURANCE":"Car insurance",
				"YOURDATA":"Your data",
			},

			"AMOUNT": {

				"AMOUNT":"Amount",

				"ERROR": {

					"REQUIRED":"This field is required.",
					"NUMBER":"Only numbers are allowed.",
				}
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
					"MIN":"Number of users must be greater than 0",
				}
			},

			"CAR": {

				"DURATION":"Duration",
				"SERVICE":"Service",
				"VEHICLE":"Vehicle",
				"VEHICLEYEAR":"Vehicle year",
				"PLATENUMBER":"Plate number",
				"CHASSISNUMBER":"Chassis number",
				"OWNERFN":"Owner first name",
				"OWNERLN":"Owner last name",
				"OWNERJMBG":"Owner JMBG",


				"ERROR": {

					"REQUIRED":"This field is required.",
					"NUMBER":"Only numbers are allowed.",
					"JMBG":"This field should contain exactly 13 numeric characters."
				}
			},

			"CARSERVICE": {

				"NAME_ENG":"Name in English",
				"NAME_SER":"Name in Serbian",
				"GROUP":"Group",
				"RISKFACTOR":"Risk factor",
				"CARINSURANCESERVICE":"Car insurance service",

				"ERROR": {

					"REQUIRED":"This field is required.",
					"NUMBER":"Only numbers are allowed.",
				}
			},

			"HOUSE": {

				"SIZE":"Size",
				"AGE":"Age",
				"ESTIMATEDVALUE":"Estimated value",
				"ADDRESS":"Address",
				"OWNERFN":"Owner first name",
				"OWNERLN":"Owner last name",
				"OWNERJMBG":"Owner JMBG",
				"INSURANCE":"Insurance",

				"ERROR": {

					"REQUIRED":"This field is required.",
					"NUMBER":"Only numbers are allowed.",
					"EMAIL":"E-mail format is not valid.",
					"JMBG":"This field should contain exactly 13 numeric characters."
				}
			},

			"HOUSECATEGORY": {

				"NAME_ENG":"Name in English",
				"NAME_SER":"Name in Serbian",
				"RISKFACTOR":"Risk factor",
				"HOUSEINSURANCECATEGORY":"House insurance category",

				"ERROR": {

					"REQUIRED":"This field is required.",
					"NUMBER":"Only numbers are allowed.",
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

				"NAME_ENG":"Name in English",
				"NAME_SER":"Name in Serbian",
				"RISK":"Risk",

				"ERROR": {

					"REQUIRED":"This field is required.",
					"NUMBER":"Only numbers are allowed."
				}
			},

			"SPORT": {

				"NAME_ENG":"Name in English",
				"NAME_SER":"Name in Serbian",
				"COEFFICIENT":"Coefficient",

				"ERROR": {

					"REQUIRED":"This field is required.",
					"NUMBER":"Only numbers are allowed."
				}
			},

			"DATA": {

				"START":"Insurance start",
				"END":"Insurance end",
				"HOUSE":"House insurance",
				"CAR":"Car insurance",
				"AMOUNT":"Insurance amount",
				"REGION":"Region",
				"USERS":"Users",
				"TOTAL":"Total price",
				"AREYOUSURE":"Are you sure ?",
				"YES":"Yes",
				"NO":"No",
				"CANCEL":"Cancel",
				"MORE":"More",
				"LESS":"Less",
				"B_PRICE":"Base price",
				"HI_PRICE":"House insurance price",
				"CI_PRICE":"Car insurance price",
			},

			"MERCHANT": {

				"MERCHANT":"Merchant",
				"NAME":"Name",
				"SURNAME":"Surname",
				"USERNAME":"Username",
				"PASSWORD":"Password",

				"ERROR": {

					"REQUIRED":"This field is required.",
					"NUMBER":"Only numbers are allowed."
				}
			},

			/*"SELECT": {

				"CHECKALL":"Check All",
				"UNCHECKALL":"Uncheck All",
				"CHECKED":"checked",
				"SELECT":"Select",
			},*/


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
				"ADDCARINSURANCESERVICE" : "Dodaj paket za pomoć na putu",
				"ADDMERCHANT" : "Dodaj trgovca",
				"ADMIN":"Administratorska prava",
				"INSURANCESALE":"Prodaja osiguranja",
				"NEXT":"Dalje",
				"NEXTUSER":"Sledeći korisnik",
				"SUBMIT":"Potvrdi",
				"SKIP":"Preskoči",
				"REMOVEUSER":"Izbriši korisnika",
				"BUY":"Kupi",
				"ABOUT1":"Web aplikacija za kupovinu osiguranja.",
				"ABOUT2":"Naša kompanija radi više od 10 godina i naši kupci su veoma zadovoljni sa uslugama koje im nudimo. ",
				"ABOUT3":"Možete nam se obratiti na sledećim e-mail adresama:",
				
			},

			"SIDEBAR": {

				"INSURANCE":"Osiguranje",
				"USERS":"Korisnici",
				"USER":"Korisnik",
				"HOUSEINSURANCE":"Kućno osiguranje",
				"CARINSURANCE":"Putno osiguranje",
				"YOURDATA":"Vaši podaci",
			},


			"AMOUNT": {

				"AMOUNT":"Iznos",


				"ERROR": {

					"REQUIRED":"Ovo polje je obavezno.",
					"NUMBER":"Samo brojevi su dozvoljeni.",
				}
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
					"MIN":"Broj korisnika mora biti veći od 0",
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

			"HOUSE": {

				"SIZE":"Veličina",
				"AGE":"Starost",
				"ESTIMATEDVALUE":"Procenjena vrednost",
				"ADDRESS":"Adresa",
				"OWNERFN":"Ime vlasnika",
				"OWNERLN":"Prezime vlasnika",
				"OWNERJMBG":"JMBG vlasnika",
				"INSURANCE":"Osiguranje",

				"ERROR": {

					"REQUIRED":"Ovo polje je obavezno.",
					"NUMBER":"Samo brojevi su dozvoljeni.",
					"EMAIL":"Email koji ste uneli nije validan.",
					"JMBG":"Ovo polje mora da sadrži tačno 13 numeričkih karaktera.",
				}
			},

			

			"CAR": {

				"DURATION":"Trajanje",
				"SERVICE":"Usluga",
				"VEHICLE":"Vozilo",
				"VEHICLEYEAR":"Godina proizvodnje",
				"PLATENUMBER":"Broj registarske tablice",
				"CHASSISNUMBER":"Broj šasije",
				"OWNERFN":"Ime vlasnika",
				"OWNERLN":"Prezime vlasnika",
				"OWNERJMBG":"JMBG vlasnika",


				"ERROR": {

					"REQUIRED":"Ovo polje je obavezno.",
					"NUMBER":"Samo brojevi su dozvoljeni.",
					"JMBG":"Ovo polje mora da sadrži tačno 13 numeričkih karaktera.",
				}
			},

			"DATA": {

				"START":"Početak osiguranja",
				"END":"Kraj osiguranja",
				"HOUSE":"Kućno osiguranje",
				"CAR":"Putno osiguranje",
				"AMOUNT":"Iznos osiguranja",
				"REGION":"Region",
				"USERS":"Korisnici",
				"TOTAL":"Ukupna cena",
				"AREYOUSURE":"Da li ste sigurni ?",
				"YES":"Da",
				"NO":"Ne",
				"CANCEL":"Odustani",
				"MORE":"Više",
				"LESS":"Manje",
				"B_PRICE":"Bazna cena",
				"HI_PRICE":"Cena kućnog osiguranja",
				"CI_PRICE":"Cena putnog osiguranja",
			},

			"REGION": {

				"NAME_ENG":"Naziv na engleskom",
				"NAME_SER":"Naziv na srpskom",
				"RISK":"Rizik",

				"ERROR": {

					"REQUIRED":"Ovo polje je obavezno.",
					"NUMBER":"Samo brojevi su dozvoljeni.",
				}
			},

			"SPORT": {

				"NAME_ENG":"Naziv na engleskom",
				"NAME_SER":"Naziv na srpskom",
				"COEFFICIENT":"Koeficijent",


				"ERROR": {

					"REQUIRED":"Ovo polje je obavezno.",
					"NUMBER":"Samo brojevi su dozvoljeni.",
				}
			},

			"HOUSECATEGORY": {

				"NAME_ENG":"Naziv na engleskom",
				"NAME_SER":"Naziv na srpskom",
				"RISKFACTOR":"Faktor rizika",
				"HOUSEINSURANCECATEGORY":"Kategorija kućnog osiguranja",

				"ERROR": {

					"REQUIRED":"Ovo polje je obavezno.",
					"NUMBER":"Samo brojevi su dozvoljeni.",
				}
			},

			"CARSERVICE": {

				"NAME_ENG":"Naziv na engleskom",
				"NAME_SER":"Naziv na srpskom",
				"GROUP":"Grupa",
				"RISKFACTOR":"Faktor rizika",
				"CARINSURANCESERVICE":"Paket za pomoć na putu",

				"ERROR": {

					"REQUIRED":"Ovo polje je obavezno.",
					"NUMBER":"Samo brojevi su dozvoljeni.",
				}
			},

			"MERCHANT": {

				"MERCHANT":"Trgovac",
				"NAME":"Ime",
				"SURNAME":"Prezime",
				"USERNAME":"Korisnicko ime",
				"PASSWORD":"Sifra",

				"ERROR": {

					"REQUIRED":"Ovo polje je obavezno.",
					"NUMBER":"Samo brojevi su dozvoljeni.",
				}
			},



			"LANGUAGE": "Sr"
		},
	};

	angular
		.module('merchant-admin-app.i18n.constants')
		.constant("crTranslations", crTranslations);
})();