package rs.ac.uns.ftn.sep2016;

import java.io.IOException;

import javax.annotation.PostConstruct;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.util.ResourceUtils;

@SpringBootApplication
@EnableAutoConfiguration
public class AcquirerBankWsApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(AcquirerBankWsApplication.class, args);
	}
	
	@PostConstruct
	public void postConstruct() throws IOException{
		System.setProperty("javax.net.ssl.trustStore", ResourceUtils.getFile("classpath:acquirer.jks").getCanonicalPath());
		System.setProperty("javax.net.ssl.trustStorePassword", "password");
		System.setProperty("javax.net.ssl.keyStore", ResourceUtils.getFile("classpath:acquirer.jks").getCanonicalPath());
		System.setProperty("javax.net.ssl.keyStorePassword", "password");
		
	}
	
}
