package rs.ac.uns.ftn.sep2016.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
//OBRISATI KASNIJE!!!
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClientException;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import rs.ac.uns.ftn.sep2016.exception.InvalidAuthentificationAndAuthorizationRequest;
import rs.ac.uns.ftn.sep2016.model.entity.Destination;
import rs.ac.uns.ftn.sep2016.model.service.DestinationService;
import rs.ac.uns.ftn.sep2016.util.AuthRequest;
import rs.ac.uns.ftn.sep2016.util.AuthResponse;


@RestController
@RequestMapping("/payment")
public class AuthenticationAndAuthorizationController {
	
	@Autowired
	private DestinationService destinationService;
	
	@Autowired
	private RestTemplateBuilder restTemplateBuilder;
	
	@CrossOrigin(origins = "https://localhost:8000")
	@RequestMapping(value = "/authorize", method = RequestMethod.POST)
	AuthResponse authenticateAndAuthorize(@RequestBody AuthRequest request) {
		try {
			//Validacija polja zahteva
			AuthRequest.validate(request);
			//Slanje zahteva
			ObjectMapper mapper = new ObjectMapper();
			String jsonRequest = mapper.writeValueAsString(request);
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_JSON);
			HttpEntity<String> requestBody = new HttpEntity<String>(jsonRequest, headers);
			return restTemplateBuilder.build().exchange(destinationService.findById("PCC").getDestinationUri(), HttpMethod.POST, requestBody, AuthResponse.class).getBody();
		} catch (InvalidAuthentificationAndAuthorizationRequest e) {
			e.printStackTrace();
			return new AuthResponse(request.getAcquirerOrderId(), request.getAcquirerTimestamp(), null, null, HttpStatus.BAD_REQUEST, "Request body was not properly validated.");
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			return new AuthResponse(request.getAcquirerOrderId(), request.getAcquirerTimestamp(), null, null, HttpStatus.INTERNAL_SERVER_ERROR, "Request body was not properly serialized.");
		} catch (RestClientException e){
			e.printStackTrace();
			return new AuthResponse(request.getAcquirerOrderId(), request.getAcquirerTimestamp(), null, null, HttpStatus.SERVICE_UNAVAILABLE, "Request redirection failed.");
		}
	}
	
	@RequestMapping(value = "/test/exampleauthorization/valid", method = RequestMethod.GET)
	AuthRequest getExampleValid() {
		return new AuthRequest((long) 1000000000, new Date(), "4319403171195344", "477", "Ipce Ahmedovski", "12/22", 1000.0);
	}

	@RequestMapping(value = "/test/exampleauthorization/invalid", method = RequestMethod.GET)
	AuthRequest getExampleInvalid() {
		return new AuthRequest((long) 1000000000, new Date(), "4319408996487255", "444", "Milos Bojanic", "12/02", 1000.0);
	}
	
	@RequestMapping(value = "/test/destinations", method = RequestMethod.GET)
	List<Destination> getTestDestinations() {
		return destinationService.findAll();
	}
	
	@RequestMapping(value = "/test/ssl", method = RequestMethod.GET)
	AuthResponse getSSLResponse() {
		AuthRequest request = new AuthRequest(new Long(1000000000), new Date(), "4319403171195344", "477", "Ipce Ahmedovski", "12/22", 500.00);
		try {
			//Validacija polja zahteva
			AuthRequest.validate(request);
			//Slanje zahteva
			ObjectMapper mapper = new ObjectMapper();
			String jsonRequest = mapper.writeValueAsString(request);
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_JSON);
			HttpEntity<String> requestBody = new HttpEntity<String>(jsonRequest, headers);
			return restTemplateBuilder.build().exchange(destinationService.findById("PCC").getDestinationUri(), HttpMethod.POST, requestBody, AuthResponse.class).getBody();
		} catch (InvalidAuthentificationAndAuthorizationRequest e) {
			e.printStackTrace();
			return new AuthResponse(request.getAcquirerOrderId(), request.getAcquirerTimestamp(), null, null, HttpStatus.BAD_REQUEST, "Request body was not properly validated.");
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			return new AuthResponse(request.getAcquirerOrderId(), request.getAcquirerTimestamp(), null, null, HttpStatus.INTERNAL_SERVER_ERROR, "Request body was not properly serialized.");
		} catch (RestClientException e){
			e.printStackTrace();
			return new AuthResponse(request.getAcquirerOrderId(), request.getAcquirerTimestamp(), null, null, HttpStatus.SERVICE_UNAVAILABLE, "Request redirection failed.");
		}
	}
	
}
