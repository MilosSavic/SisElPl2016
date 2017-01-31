# SisElPl2016

Projekat iz sistema elektronskog plaćanja. U pitanju su aplikacije koje omogućavaju kupovinu putnog osiguranja. Postoje odvojene aplikacije za biranje osiguranja i unos ličnih podataka (Merchant), za plaćanje (Payment/Acquirer), kao i veb servisi za proveru korektnosti unetih podataka, za autorizaciju transakcije, itd. (AcquirerWS, IssuerWS, PaymentCardCenterWS).

## Pre pokretanja
Neophodno je imati instalirane NodeJS i MongoDB
## Pokretanje
### Merchant
1. Pokrenuti MongoDB
2. Otvoriti cmd u folderu Merchant
3. Izvršiti `npm install` komandu
4. Prebaciti se u Merchant/public folder
5. Izvršiti `bower install` komandu
6. Vratiti se u Merchant folder
7. Izvršiti `node server` komandu
8. Otvoriti https://localhost:3000/ u browseru

### Payment/Acquirer
1. Pokrenuti MongoDB
2. Otvoriti cmd u folderu Payment
3. Izvršiti `npm install` komandu
4. Prebaciti se u Payment/public folder
5. Izvršiti `bower install` komandu
6. Vratiti se u Payment folder
7. Izvršiti `node server` komandu
8. Otvoriti https://localhost:8000/ u browseru

### AcquirerWS
1. Otvoriti cmd u folderu AcquirerWS
2. Izvršiti `mvn dependency:copy-dependencies` komandu, jednom po serveru
3. Pokrenuti server preko 'mvn spring-boot:run'

### IssuerWS
1. Otvoriti cmd u folderu IssuerWS
2. Izvršiti `mvn dependency:copy-dependencies` komandu, jednom po serveru
3. Pokrenuti server preko 'mvn spring-boot:run'

### PaymentCardCenterWS
1. Otvoriti cmd u folderu PaymentCardCenterWS
2. Izvršiti `mvn dependency:copy-dependencies` komandu, jednom po serveru
3. Pokrenuti server preko 'mvn spring-boot:run'

### Unit testovi
1. Otvoriti cmd u folderu Merchant/public ili Payment/public
2. Izvršiti `npm install -g karma-cli` komandu, ovo se radi jednom po racunaru
3. Izvršiti `npm install karma jasmine-core karma-jasmine --save-dev` komandu
4. Izvršiti `bower install angular-mocks --save-dev` komandu
4. Izvršiti `npm install` komandu ukoliko nije ranije izvrsena
5. Izvršiti `bower install` komandu ukoliko nije ranije izvrsena
6. Pokrenuti testove preko 'karma start tests\karma.conf.js'

## Upotreba

## Licenca

## Članovi tima 
Miloš Savić, Rajko Ilić i Vladimir Baumgartner
