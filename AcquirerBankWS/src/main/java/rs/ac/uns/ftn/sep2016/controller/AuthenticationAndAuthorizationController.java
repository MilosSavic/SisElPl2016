package rs.ac.uns.ftn.sep2016.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import rs.ac.uns.ftn.sep2016.model.entity.Destination;
import rs.ac.uns.ftn.sep2016.model.service.DestinationService;
import rs.ac.uns.ftn.sep2016.util.AuthRequest;
import rs.ac.uns.ftn.sep2016.util.TransactionResult;

@RestController
@RequestMapping("/auth")
public class AuthenticationAndAuthorizationController {

	@Autowired
	private DestinationService destinationService;
	
	@RequestMapping(method = RequestMethod.POST)
	TransactionResult authenticateAndAuthorize(@RequestBody AuthRequest request) {
		try {
			AuthRequest.validate(request);
		} catch (Exception e) {
			e.printStackTrace();
			return new TransactionResult("400", "Request body was not properly authenticated.");
		}
		return new TransactionResult("200", "Transaction successfully completed.");

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
