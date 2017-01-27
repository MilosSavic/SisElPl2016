package rs.ac.uns.ftn.sep2016;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableAutoConfiguration
public class AcquirerBankWsApplication {

	static
	{
		System.setProperty("javax.net.ssl.trustStore", "C:\\Users\\Vladimir\\git\\sep\\SisElPl2016\\AcquirerBankWS\\src\\main\\resources\\acquirer.jks");
		System.setProperty("javax.net.ssl.trustStorePassword", "password");
		System.setProperty("javax.net.ssl.keyStore",  "C:\\Users\\Vladimir\\git\\sep\\SisElPl2016\\AcquirerBankWS\\src\\main\\resources\\acquirer.jks");
		System.setProperty("javax.net.ssl.keyStorePassword", "password");
	}
	
	public static void main(String[] args) {
		SpringApplication.run(AcquirerBankWsApplication.class, args);
	}
}
