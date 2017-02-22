#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
JAVA_HOME=/usr/local/jdk1.8.0_121
MAVEN_HOME=/home/baum/apache-maven-3.3.9

cd AcquirerBankWS
$MAVEN_HOME/bin/mvn dependency:copy-dependencies
$MAVEN_HOME/bin/mvn clean install
cd ..
mv AcquirerBankWS/target/*.jar AcquirerBankWS/target/AcquirerBankWS.jar
cp AcquirerBankWS/target/AcquirerBankWS.jar Deploy/Spring/
cp AcquirerBankWS/src/main/resources/acquirer.jks Deploy/Spring/keystore/

cd PaymentCardCenterWS
$MAVEN_HOME/bin/mvn dependency:copy-dependencies
$MAVEN_HOME/bin/mvn clean install
cd ..
mv PaymentCardCenterWS/target/*.jar PaymentCardCenterWS/target/PaymentCardCenterWS.jar
cp PaymentCardCenterWS/target/PaymentCardCenterWS.jar Deploy/Spring/
cp PaymentCardCenterWS/src/main/resources/pcc.jks Deploy/Spring/keystore/

cd IssuerBankWS
$MAVEN_HOME/bin/mvn dependency:copy-dependencies
$MAVEN_HOME/bin/mvn clean install
cd ..
mv IssuerBankWS/target/*.jar IssuerBankWS/target/IssuerBankWS.jar
cp IssuerBankWS/target/IssuerBankWS.jar Deploy/Spring/
cp IssuerBankWS/src/main/resources/issuer.jks Deploy/Spring/keystore/


