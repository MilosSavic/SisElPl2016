@echo off
:ADMINMERCHANTJS
FOR /f "tokens=5 delims= " %%P IN ('netstat -a -n -o ^| findstr :7000.*LISTENING') DO (
	@echo Killing AdminMerchantApp NodeJS application...
	TaskKill.exe /F /PID %%P
	goto :PAYMENTJS
	)
:PAYMENTJS
FOR /f "tokens=5 delims= " %%P IN ('netstat -a -n -o ^| findstr :8000.*LISTENING') DO (
	@echo Killing Payment NodeJS application...
	TaskKill.exe /F /PID %%P
	goto :MERCHANTJS
	)
:MERCHANTJS
FOR /f "tokens=5 delims= " %%P IN ('netstat -a -n -o ^| findstr :3000.*LISTENING') DO (
	@echo Killing Merchant NodeJS application...
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
	goto :EOF
	)