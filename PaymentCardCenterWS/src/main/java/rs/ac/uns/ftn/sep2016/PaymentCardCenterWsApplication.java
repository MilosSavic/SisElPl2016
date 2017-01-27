package rs.ac.uns.ftn.sep2016;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PaymentCardCenterWsApplication {

	static
	{
		System.setProperty("javax.net.ssl.trustStore", "C:\\Users\\Vladimir\\git\\sep\\SisElPl2016\\PaymentCardCenterWS\\src\\main\\resources\\pcc.jks");
		System.setProperty("javax.net.ssl.trustStorePassword", "password");
		System.setProperty("javax.net.ssl.keyStore",  "C:\\Users\\Vladimir\\git\\sep\\SisElPl2016\\PaymentCardCenterWS\\src\\main\\resources\\pcc.jks");
		System.setProperty("javax.net.ssl.keyStorePassword", "password");
	}
	
	public static void main(String[] args) {
		SpringApplication.run(PaymentCardCenterWsApplication.class, args);
	}
}
