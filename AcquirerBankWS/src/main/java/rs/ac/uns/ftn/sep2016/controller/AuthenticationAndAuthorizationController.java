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
import org.springframework.http.ResponseEntity;
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

@RestController
@RequestMapping("/auth")
public class AuthenticationAndAuthorizationController {
	
	@Autowired
	private DestinationService destinationService;
	
	@Autowired
	private RestTemplateBuilder restTemplateBuilder;
	
	@RequestMapping(method = RequestMethod.POST)
	ResponseEntity<String> authenticateAndAuthorize(@RequestBody AuthRequest request) {
		try {
			AuthRequest.validate(request);
			ObjectMapper mapper = new ObjectMapper();
			String jsonRequest = mapper.writeValueAsString(request);
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_JSON);
			HttpEntity<String> requestBody = new HttpEntity<String>(jsonRequest, headers);
			ResponseEntity<String> response = restTemplateBuilder.build().exchange(destinationService.findById("PCC").getDestinationUri(), HttpMethod.POST, requestBody, String.class);
			return response;
		} catch (InvalidAuthentificationAndAuthorizationRequest e) {
			e.printStackTrace();
			return new ResponseEntity<String>("Request body was not properly authenticated.", HttpStatus.BAD_REQUEST);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			return new ResponseEntity<String>("Request body was not properly serialized.", HttpStatus.INTERNAL_SERVER_ERROR);
		} catch (RestClientException e){
			e.printStackTrace();
			return new ResponseEntity<String>("Request redirection failed.", HttpStatus.SERVICE_UNAVAILABLE);
		}
	}
	
	@RequestMapping(value = "/test/request", method = RequestMethod.GET)
	AuthRequest getTestRequest() {
		return new AuthRequest(1234567890, new Date(), "378282246310005", "123", "Vladimir Baumgartner", new Date(), 500.00);
	}
	
	@RequestMapping(value = "/test/destinations", method = RequestMethod.GET)
	List<Destination> getTestDestinations() {
		return destinationService.findAll();
	}
	
}
