package rs.ac.uns.ftn.sep2016.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import rs.ac.uns.ftn.sep2016.exception.InvalidAuthentificationAndAuthorizationRequest;
import rs.ac.uns.ftn.sep2016.model.entity.UserAccount;
import rs.ac.uns.ftn.sep2016.model.service.UserAccountService;
import rs.ac.uns.ftn.sep2016.util.AuthRequest;
import rs.ac.uns.ftn.sep2016.util.AuthResponse;

@RestController
@RequestMapping("/res")
public class ResourceReservationController {

	@Autowired
	UserAccountService userAccountService;
	
	@RequestMapping(method = RequestMethod.POST)
	AuthResponse authenticateAndAuthorize(@RequestBody AuthRequest request) {
		try {
			AuthRequest.validate(request);
			String userAccountPanCode = request.getPan();
			UserAccount userAccount = userAccountService.findById(userAccountPanCode);
			if (userAccount == null)
				return new AuthResponse(request.getAcquirerOrderId(), request.getAcquirerTimestamp(), null, null, HttpStatus.BAD_REQUEST, "Issuer: User account not found for pan code " + userAccountPanCode + ".");
			if (userAccount.getAccountAmount() >= request.getTransactionAmount()){
				userAccount.setAccountAmount(userAccount.getAccountAmount() - request.getTransactionAmount());
				userAccount.setReservationAmount(userAccount.getReservationAmount() + request.getTransactionAmount());
				userAccountService.persist(userAccount);
				//issuer order id stavljam 1 000 000 000 kao konstantu. OBAVEZNO PROMENITI!
				return new AuthResponse(request.getAcquirerOrderId(), request.getAcquirerTimestamp(), 1000000000, new Date(), HttpStatus.OK, "Issuer: Transaction completed. " + request.getTransactionAmount() + " was successfully reserved from account " + request.getPan());
			} else {
				return new AuthResponse(request.getAcquirerOrderId(), request.getAcquirerTimestamp(), null, null, HttpStatus.BAD_REQUEST, "Issuer: Transaction failed. Pan code account doesn't have " + request.getTransactionAmount() + " or more resources");
			}
		} catch (InvalidAuthentificationAndAuthorizationRequest e) {
			e.printStackTrace();
			return new AuthResponse(request.getAcquirerOrderId(), request.getAcquirerTimestamp(), null, null, HttpStatus.BAD_REQUEST, "Issuer: Request body was not properly validated.");
		}
	}
	
	@RequestMapping(value = "/test/users", method = RequestMethod.GET)
	List<UserAccount> getTestDestinations() {
		return userAccountService.findAll();
	}

	
}
