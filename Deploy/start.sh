#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ackKeyPath=$DIR/keystore/acquirer.jks
issKeyPath=$DIR/keystore/issuer.jks
pccKeyPath=$DIR/keystore/pcc.jks
echo $ackKeyPath
echo $issKeyPath
echo $pccKeyPath

gnome-terminal -x sh -c "java -Djavax.net.ssl.trustStore="$ackKeyPath" -Djavax.net.ssl.trustStorePassword=password -Djavax.net.ssl.keyStore="$ackKeyPath" -Djavax.net.ssl.keyStorePassword=password -jar AcquirerBankWS.jar; bash"

gnome-terminal -x sh -c "java -Djavax.net.ssl.trustStore="$issKeyPath" -Djavax.net.ssl.trustStorePassword=password -Djavax.net.ssl.keyStore="$issKeyPath" -Djavax.net.ssl.keyStorePassword=password -jar IssuerBankWS.jar"

gnome-terminal -x sh -c "java -Djavax.net.ssl.trustStore="$pccKeyPath" -Djavax.net.ssl.trustStorePassword=password -Djavax.net.ssl.keyStore="$pccKeyPath" -Djavax.net.ssl.keyStorePassword=password -jar PaymentCardCenterWS.jar"
