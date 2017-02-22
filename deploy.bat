@ECHO off
setlocal EnableDelayedExpansion

SET "JAVA_HOME=C:\Program Files\Java\jdk1.8.0_111"
SET "MAVEN_HOME=C:\Users\Vladimir Baumgartner\Downloads\apache-maven-3.3.9"
SET "NODE_HOME=C:\Program Files\nodejs"
SET "BOWER_HOME=C:\Users\Vladimir Baumgartner\AppData\Roaming\npm"
SET "MONGO_HOME=C:\Program Files\MongoDB\Server\3.4\bin"

@echo Java home: !JAVA_HOME!
@echo Maven home: !MAVEN_HOME!
@echo Node home: !NODE_HOME!
@echo Bower home: !BOWER_HOME!
@echo Mongo home: !MONGO_HOME!

GOTO :COMMENT
start cmd /k "!MONGO_HOME!\mongod"
@echo Waiting 10 seconds for MongoDB to start...
ping 127.0.0.1 -n 10 > nul
cd Merchant
call "!NODE_HOME!\npm" install
cd public
call "!BOWER_HOME!\bower" install
cd ..
start cmd /k "!NODE_HOME!\node" server
cd ..

cd Payment
call "!NODE_HOME!\npm" install
cd public
call "!BOWER_HOME!\bower" install
cd ..
start cmd /k "!NODE_HOME!\node" server
cd ..

cd AdminMerchantApp
call "!NODE_HOME!\npm" install
cd public
call "!BOWER_HOME!\bower" install
cd ..
start cmd /k "!NODE_HOME!\node" server
cd ..
:COMMENT

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


