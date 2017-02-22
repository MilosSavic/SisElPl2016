@echo off
setlocal EnableDelayedExpansion

set "ackKeyPath=%~dp0keystore\acquirer.jks"
set "issKeyPath=%~dp0keystore\issuer.jks"
set "pccKeyPath=%~dp0keystore\pcc.jks"
start cmd /k java -Djavax.net.ssl.trustStore="!ackKeyPath!" -Djavax.net.ssl.trustStorePassword=password -Djavax.net.ssl.keyStore="!ackKeyPath!" -Djavax.net.ssl.keyStorePassword=password -jar AcquirerBankWS.jar
start cmd /k java -Djavax.net.ssl.trustStore="!issKeyPath!" -Djavax.net.ssl.trustStorePassword=password -Djavax.net.ssl.keyStore="!issKeyPath!" -Djavax.net.ssl.keyStorePassword=password -jar IssuerBankWS.jar
start cmd /k java -Djavax.net.ssl.trustStore="!pccKeyPath!" -Djavax.net.ssl.trustStorePassword=password -Djavax.net.ssl.keyStore="!pccKeyPath!" -Djavax.net.ssl.keyStorePassword=password -jar PaymentCardCenterWS.jar