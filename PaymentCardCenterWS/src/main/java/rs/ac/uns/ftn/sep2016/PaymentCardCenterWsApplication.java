package rs.ac.uns.ftn.sep2016;

import java.io.FileNotFoundException;

import javax.annotation.PostConstruct;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.util.ResourceUtils;

@SpringBootApplication
public class PaymentCardCenterWsApplication {


	public static void main(String[] args) {
		SpringApplication.run(PaymentCardCenterWsApplication.class, args);
	}
	
	@PostConstruct
	public void postConstruct() throws FileNotFoundException{
		System.setProperty("javax.net.ssl.trustStore", ResourceUtils.getFile("classpath:pcc.jks").getAbsolutePath());
		System.setProperty("javax.net.ssl.trustStorePassword", "password");
		System.setProperty("javax.net.ssl.keyStore", ResourceUtils.getFile("classpath:pcc.jks").getAbsolutePath());
		System.setProperty("javax.net.ssl.keyStorePassword", "password");
	}
}
