package rs.ac.uns.ftn.sep2016;

import java.io.IOException;

import javax.annotation.PostConstruct;

import org.apache.catalina.connector.Connector;
import org.h2.server.web.WebServlet;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.boot.context.embedded.tomcat.TomcatEmbeddedServletContainerFactory;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.util.ResourceUtils;

@SpringBootApplication
@EnableAutoConfiguration
public class AcquirerBankWsApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(AcquirerBankWsApplication.class, args);
	}
	
	@Bean
	public ServletRegistrationBean h2servletRegistration() {
	    ServletRegistrationBean registration = new ServletRegistrationBean(new WebServlet());
	    registration.addUrlMappings("/database/*");
	    registration.addInitParameter("webAllowOthers", "true");
	    return registration;
	}
	
	@Bean
	public EmbeddedServletContainerCustomizer containerCustomizer() {
	    return new EmbeddedServletContainerCustomizer() {
	        @Override
	        public void customize(ConfigurableEmbeddedServletContainer container) {
	            if (container instanceof TomcatEmbeddedServletContainerFactory) {
	                TomcatEmbeddedServletContainerFactory containerFactory =
	                        (TomcatEmbeddedServletContainerFactory) container;

	                Connector connector = new Connector(TomcatEmbeddedServletContainerFactory.DEFAULT_PROTOCOL);
	                connector.setPort(8083);
	                containerFactory.addAdditionalTomcatConnectors(connector);
	            }
	        }
	    };
	}
	
	@PostConstruct
	public void postConstruct() throws IOException{
		if(System.getProperty("javax.net.ssl.trustStore") == null){
			System.setProperty("javax.net.ssl.trustStore", ResourceUtils.getFile("classpath:acquirer.jks").getCanonicalPath());
			System.setProperty("javax.net.ssl.trustStorePassword", "password");
			System.setProperty("javax.net.ssl.keyStore", ResourceUtils.getFile("classpath:acquirer.jks").getCanonicalPath());
			System.setProperty("javax.net.ssl.keyStorePassword", "password");
		}
	}
	
}
