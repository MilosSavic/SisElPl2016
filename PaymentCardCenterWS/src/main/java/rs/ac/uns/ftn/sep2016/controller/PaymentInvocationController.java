package rs.ac.uns.ftn.sep2016.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import rs.ac.uns.ftn.sep2016.exception.InvalidAuthentificationAndAuthorizationRequest;
import rs.ac.uns.ftn.sep2016.util.AuthRequest;

@RestController
@RequestMapping("/payment")
public class PaymentInvocationController {
	
	@RequestMapping(method = RequestMethod.POST)
	ResponseEntity<String> authenticateAndAuthorize(@RequestBody AuthRequest request) {
		try {
			AuthRequest.validate(request);
			return new ResponseEntity<String>("Transaction completed.", HttpStatus.OK);
		} catch (InvalidAuthentificationAndAuthorizationRequest e) {
			e.printStackTrace();
			return new ResponseEntity<String>("Request body was not properly authenticated.", HttpStatus.BAD_REQUEST);
		}
	}
	
}
