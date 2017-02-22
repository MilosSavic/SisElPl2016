@ECHO off
setlocal EnableDelayedExpansion

SET "JAVA_HOME=C:\Program Files\Java\jdk1.8.0_111"
SET "MAVEN_HOME=C:\Users\Vladimir Baumgartner\Downloads\apache-maven-3.3.9"
SET "NODE_HOME=C:\Program Files\nodejs"
SET "BOWER_HOME=C:\Users\Vladimir Baumgartner\AppData\Roaming\npm"
SET "GULP_HOME=C:\Users\Vladimir Baumgartner\AppData\Roaming\npm"
SET "MONGO_HOME=C:\Program Files\MongoDB\Server\3.4\bin"

@echo Java home: !JAVA_HOME!
@echo Maven home: !MAVEN_HOME!
@echo Node home: !NODE_HOME!
@echo Bower home: !BOWER_HOME!
@echo Gulp home: !GULP_HOME!
@echo Mongo home: !MONGO_HOME!

del /q "%~dp0\Deploy\Node\Merchant\*"
FOR /D %%p IN ("%~dp0\Deploy\Node\Merchant\*.*") DO rmdir "%%p" /s /q

cd Merchant
cd public
call "!GULP_HOME!\gulp" production
cd ..
cd ..
call xcopy /s "%~dp0\Merchant\cert" "%~dp0\Deploy\Node\Merchant\cert\"
call xcopy /s "%~dp0\Merchant\controllers" "%~dp0\Deploy\Node\Merchant\controllers\"
call xcopy /s "%~dp0\Merchant\logs" "%~dp0\Deploy\Node\Merchant\logs\"
call xcopy /s "%~dp0\Merchant\models" "%~dp0\Deploy\Node\Merchant\models\"
call xcopy /s "%~dp0\Merchant\routes" "%~dp0\Deploy\Node\Merchant\routes\"
call xcopy /s "%~dp0\Merchant\rules" "%~dp0\Deploy\Node\Merchant\rules\"
call xcopy /s "%~dp0\Merchant\public\dist" "%~dp0\Deploy\Node\Merchant\public\"
call xcopy /y "%~dp0\Merchant\package.json" "%~dp0\Deploy\Node\Merchant"
call xcopy /y "%~dp0\Merchant\server.js" "%~dp0\Deploy\Node\Merchant\"
call xcopy /y "%~dp0\Merchant\public\bower.json" "%~dp0\Deploy\Node\Merchant\public\"
call xcopy /y "%~dp0\Merchant\public\favicon.ico" "%~dp0\Deploy\Node\Merchant\public\"
call xcopy /y "%~dp0\Merchant\public\package.json" "%~dp0\Deploy\Node\Merchant\public\"

cd Deploy\Node\Merchant\
call "!NODE_HOME!\npm" install --production
cd public
call "!BOWER_HOME!\bower" install --production
cd ..
cd ..
cd ..
cd ..

del /q "%~dp0\Deploy\Node\Payment\*"
FOR /D %%p IN ("%~dp0\Deploy\Node\Payment\*.*") DO rmdir "%%p" /s /q

cd Payment
cd public
call "!GULP_HOME!\gulp" production
cd ..
cd ..
call xcopy /s "%~dp0\Payment\cert" "%~dp0\Deploy\Node\Payment\cert\"
call xcopy /s "%~dp0\Payment\controllers" "%~dp0\Deploy\Node\Payment\controllers\"
call xcopy /s "%~dp0\Payment\logs" "%~dp0\Deploy\Node\Payment\logs\"
call xcopy /s "%~dp0\Payment\models" "%~dp0\Deploy\Node\Payment\models\"
call xcopy /s "%~dp0\Payment\routes" "%~dp0\Deploy\Node\Payment\routes\"
call xcopy /s "%~dp0\Payment\rules" "%~dp0\Deploy\Node\Payment\rules\"
call xcopy /s "%~dp0\Payment\public\dist" "%~dp0\Deploy\Node\Payment\public\"
call xcopy /y "%~dp0\Payment\package.json" "%~dp0\Deploy\Node\Payment"
call xcopy /y "%~dp0\Payment\server.js" "%~dp0\Deploy\Node\Payment\"
call xcopy /y "%~dp0\Payment\public\bower.json" "%~dp0\Deploy\Node\Payment\public\"
call xcopy /y "%~dp0\Payment\public\favicon.ico" "%~dp0\Deploy\Node\Payment\public\"
call xcopy /y "%~dp0\Payment\public\package.json" "%~dp0\Deploy\Node\Payment\public\"

cd Deploy\Node\Payment\
call "!NODE_HOME!\npm" install --production
cd public
call "!BOWER_HOME!\bower" install --production
cd ..
cd ..
cd ..
cd ..

del /q "%~dp0\Deploy\Node\AdminMerchantApp\*"
FOR /D %%p IN ("%~dp0\Deploy\Node\AdminMerchantApp\*.*") DO rmdir "%%p" /s /q

cd AdminMerchantApp
cd public
call "!GULP_HOME!\gulp" production
cd ..
cd ..
call xcopy /s "%~dp0\AdminMerchantApp\cert" "%~dp0\Deploy\Node\AdminMerchantApp\cert\"
call xcopy /s "%~dp0\AdminMerchantApp\controllers" "%~dp0\Deploy\Node\AdminMerchantApp\controllers\"
call xcopy /s "%~dp0\AdminMerchantApp\logs" "%~dp0\Deploy\Node\AdminMerchantApp\logs\"
call xcopy /s "%~dp0\AdminMerchantApp\models" "%~dp0\Deploy\Node\AdminMerchantApp\models\"
call xcopy /s "%~dp0\AdminMerchantApp\routes" "%~dp0\Deploy\Node\AdminMerchantApp\routes\"
call xcopy /s "%~dp0\AdminMerchantApp\rules" "%~dp0\Deploy\Node\AdminMerchantApp\rules\"
call xcopy /s "%~dp0\AdminMerchantApp\public\dist" "%~dp0\Deploy\Node\AdminMerchantApp\public\"
call xcopy /y "%~dp0\AdminMerchantApp\package.json" "%~dp0\Deploy\Node\AdminMerchantApp"
call xcopy /y "%~dp0\AdminMerchantApp\server.js" "%~dp0\Deploy\Node\AdminMerchantApp\"
call xcopy /y "%~dp0\AdminMerchantApp\public\bower.json" "%~dp0\Deploy\Node\AdminMerchantApp\public\"
call xcopy /y "%~dp0\AdminMerchantApp\public\favicon.ico" "%~dp0\Deploy\Node\AdminMerchantApp\public\"
call xcopy /y "%~dp0\AdminMerchantApp\public\package.json" "%~dp0\Deploy\Node\AdminMerchantApp\public\"

cd Deploy\Node\AdminMerchantApp\
call "!NODE_HOME!\npm" install --production
cd public
call "!BOWER_HOME!\bower" install --production
cd ..
cd ..
cd ..
cd ..

del /q "%~dp0\Deploy\Spring\*.*"
del /q "%~dp0\Deploy\Spring\keystore\*.*"

cd AcquirerBankWS
call "!MAVEN_HOME!\bin\mvn" dependency:copy-dependencies
call "!MAVEN_HOME!\bin\mvn" clean install
cd ..
rename "%~dp0\AcquirerBankWS\target\*.jar" AcquirerBankWS.jar
call xcopy /s /y "%~dp0\AcquirerBankWS\target\AcquirerBankWS.jar" "%~dp0\Deploy\Spring"
call xcopy /s /y "%~dp0\AcquirerBankWS\src\main\resources\acquirer.jks" "%~dp0\Deploy\Spring\keystore"

cd PaymentCardCenterWS
call "!MAVEN_HOME!\bin\mvn" dependency:copy-dependencies
call "!MAVEN_HOME!\bin\mvn" clean install
cd ..
rename "%~dp0\PaymentCardCenterWS\target\*.jar" PaymentCardCenterWS.jar
call xcopy /s /y "%~dp0\PaymentCardCenterWS\target\PaymentCardCenterWS.jar" "%~dp0\Deploy\Spring"
call xcopy /s /y "%~dp0\PaymentCardCenterWS\src\main\resources\pcc.jks" "%~dp0\Deploy\Spring\keystore"

cd IssuerBankWS
call "!MAVEN_HOME!\bin\mvn" dependency:copy-dependencies
call "!MAVEN_HOME!\bin\mvn" clean install
cd ..
rename "%~dp0\IssuerBankWS\target\*.jar" IssuerBankWS.jar
call xcopy /s /y "%~dp0\IssuerBankWS\target\IssuerBankWS.jar" "%~dp0\Deploy\Spring"
call xcopy /s /y "%~dp0\IssuerBankWS\src\main\resources\issuer.jks" "%~dp0\Deploy\Spring\keystore"
