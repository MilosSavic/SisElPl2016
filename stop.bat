@echo off
:MERCHANTJS
FOR /f "tokens=5 delims= " %%P IN ('netstat -a -n -o ^| findstr :3000.*LISTENING') DO (
	@echo Killing Merchant NodeJS application...
	TaskKill.exe /F /PID %%P
	goto :PAYMENTJS
	)
:PAYMENTJS
FOR /f "tokens=5 delims= " %%P IN ('netstat -a -n -o ^| findstr :8000.*LISTENING') DO (
	@echo Killing Payment NodeJS application...
	TaskKill.exe /F /PID %%P
	goto :ADMIN
	)
:ADMIN
FOR /f "tokens=5 delims= " %%P IN ('netstat -a -n -o ^| findstr :7000.*LISTENING') DO (
	@echo Killing AdminMerchant NodeJS application...
	TaskKill.exe /F /PID %%P
	goto :MERCHANT
	)
:MERCHANT
FOR /f "tokens=5 delims= " %%P IN ('netstat -a -n -o ^| findstr :8443.*LISTENING') DO (
	@echo Killing MerchantBankWS SpringBoot application...
	TaskKill.exe /F /PID %%P
	goto :PCC
	)
:PCC
FOR /f "tokens=5 delims= " %%P IN ('netstat -a -n -o ^| findstr :8444.*LISTENING') DO (
	@echo Killing PaymentCardCenterWS SpringBoot application...
	TaskKill.exe /F /PID %%P
	goto :ISSUER
	)
:ISSUER
FOR /f "tokens=5 delims= " %%P IN ('netstat -a -n -o ^| findstr :8445.*LISTENING') DO (
	@echo Killing IssuerBankWS SpringBoot application...
	TaskKill.exe /F /PID %%P
	goto :MONGO
	)
:MONGO
FOR /f "tokens=5 delims= " %%P IN ('netstat -a -n -o ^| findstr :27017.*LISTENING') DO (
	@echo Killing MongoDB SpringBoot application...
	TaskKill.exe /F /PID %%P
	goto :EOF
	)