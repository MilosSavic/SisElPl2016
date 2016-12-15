package rs.ac.uns.ftn.sep2016.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClientException;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import rs.ac.uns.ftn.sep2016.exception.InvalidAuthentificationAndAuthorizationRequest;
import rs.ac.uns.ftn.sep2016.model.entity.Bank;
import rs.ac.uns.ftn.sep2016.model.service.BankService;
import rs.ac.uns.ftn.sep2016.util.AuthRequest;
import rs.ac.uns.ftn.sep2016.util.AuthResponse;

@RestController
@RequestMapping("/payment")
public class PaymentInvocationController {
	
	@Autowired
	BankService bankService;
	

	@Autowired
	private RestTemplateBuilder restTemplateBuilder;
	
	@RequestMapping(method = RequestMethod.POST)
	AuthResponse authenticateAndAuthorize(@RequestBody AuthRequest request) {
		try {
			AuthRequest.validate(request);
			String bankCode = request.getPan().substring(0, 3);
			Bank issuerBank = bankService.findByBankCode(bankCode);
			if (issuerBank == null)
				return new AuthResponse(request.getAcquirerOrderId(), request.getAcquirerTimestamp(), null, null, HttpStatus.BAD_REQUEST, "PCC: Issuer bank not found for code " + bankCode + ".");
			ObjectMapper mapper = new ObjectMapper();
			String jsonRequest = mapper.writeValueAsString(request);
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_JSON);
			HttpEntity<String> requestBody = new HttpEntity<String>(jsonRequest, headers);
			return restTemplateBuilder.build().exchange(issuerBank.getBankUri(), HttpMethod.POST, requestBody, AuthResponse.class).getBody();
		} catch (InvalidAuthentificationAndAuthorizationRequest e) {
			e.printStackTrace();
			return new AuthResponse(request.getAcquirerOrderId(), request.getAcquirerTimestamp(), null, null, HttpStatus.BAD_REQUEST, "PCC: Request body was not properly validated.");
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			return new AuthResponse(request.getAcquirerOrderId(), request.getAcquirerTimestamp(), null, null, HttpStatus.INTERNAL_SERVER_ERROR, "PCC: Request body was not properly serialized.");
		} catch (RestClientException e){
			e.printStackTrace();
			return new AuthResponse(request.getAcquirerOrderId(), request.getAcquirerTimestamp(), null, null, HttpStatus.SERVICE_UNAVAILABLE, "PCC: Request redirection failed.");
		}
	}
	
	@RequestMapping(value = "/test/banks", method = RequestMethod.GET)
	List<Bank> getTestDestinations() {
		return bankService.findAll();
	}
	
}
