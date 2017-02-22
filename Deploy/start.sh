#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ackKeyPath=$DIR/Spring/keystore/acquirer.jks
issKeyPath=$DIR/Spring/keystore/issuer.jks
pccKeyPath=$DIR/Spring/keystore/pcc.jks
echo $ackKeyPath
echo $issKeyPath
echo $pccKeyPath

gnome-terminal -x sh -c "java -Djavax.net.ssl.trustStore="$ackKeyPath" -Djavax.net.ssl.trustStorePassword=password -Djavax.net.ssl.keyStore="$ackKeyPath" -Djavax.net.ssl.keyStorePassword=password -jar Spring/AcquirerBankWS.jar; bash"

gnome-terminal -x sh -c "java -Djavax.net.ssl.trustStore="$issKeyPath" -Djavax.net.ssl.trustStorePassword=password -Djavax.net.ssl.keyStore="$issKeyPath" -Djavax.net.ssl.keyStorePassword=password -jar Spring/IssuerBankWS.jar"

gnome-terminal -x sh -c "java -Djavax.net.ssl.trustStore="$pccKeyPath" -Djavax.net.ssl.trustStorePassword=password -Djavax.net.ssl.keyStore="$pccKeyPath" -Djavax.net.ssl.keyStorePassword=password -jar Spring/PaymentCardCenterWS.jar"
