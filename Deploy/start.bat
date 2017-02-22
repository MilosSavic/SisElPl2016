@echo off
setlocal EnableDelayedExpansion

SET "NODE_HOME=C:\Program Files\nodejs"

set "ackKeyPath=%~dp0Spring\keystore\acquirer.jks"
set "issKeyPath=%~dp0Spring\keystore\acquirerkeystore\issuer.jks"
set "pccKeyPath=%~dp0Spring\keystore\pcc.jks"
start cmd /k java -Djavax.net.ssl.trustStore="!ackKeyPath!" -Djavax.net.ssl.trustStorePassword=password -Djavax.net.ssl.keyStore="!ackKeyPath!" -Djavax.net.ssl.keyStorePassword=password -jar Spring\AcquirerBankWS.jar
start cmd /k java -Djavax.net.ssl.trustStore="!issKeyPath!" -Djavax.net.ssl.trustStorePassword=password -Djavax.net.ssl.keyStore="!issKeyPath!" -Djavax.net.ssl.keyStorePassword=password -jar Spring\IssuerBankWS.jar
start cmd /k java -Djavax.net.ssl.trustStore="!pccKeyPath!" -Djavax.net.ssl.trustStorePassword=password -Djavax.net.ssl.keyStore="!pccKeyPath!" -Djavax.net.ssl.keyStorePassword=password -jar Spring\PaymentCardCenterWS.jar

cd Node/AdminMerchantApp
start cmd /k "!NODE_HOME!\node" server
cd ../..
cd Node/Payment
start cmd /k "!NODE_HOME!\node" server
cd ../..
cd Node/Merchant
start cmd /k "!NODE_HOME!\node" server
cd ../..