package rs.ac.uns.ftn.sep2016.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import rs.ac.uns.ftn.sep2016.exception.InvalidAuthentificationAndAuthorizationRequest;
import rs.ac.uns.ftn.sep2016.model.entity.BankIdentificationNumber;
import rs.ac.uns.ftn.sep2016.model.entity.TransactionOrder;
import rs.ac.uns.ftn.sep2016.model.entity.UserAccount;
import rs.ac.uns.ftn.sep2016.model.service.BankIdentificationNumberService;
import rs.ac.uns.ftn.sep2016.model.service.OrderService;
import rs.ac.uns.ftn.sep2016.model.service.UserAccountService;
import rs.ac.uns.ftn.sep2016.util.AuthRequest;
import rs.ac.uns.ftn.sep2016.util.AuthResponse;

@RestController
@RequestMapping("/payment")
public class ResourceReservationController {

	@Autowired
	UserAccountService userAccountService;
	
	@Autowired
	BankIdentificationNumberService bankIdentificationNumberService;
	
	@Autowired
	OrderService orderService;
	
	@RequestMapping(value = "/reservation", method = RequestMethod.POST)
	AuthResponse authenticateAndAuthorize(@RequestBody AuthRequest request) {
		try {
			//Validacija polja zahteva
			AuthRequest.validate(request);
			//Provera ispravnosti BIN-a
			long bankIdentificationNumber = Long.parseLong(request.getPan().substring(0, 6));
			BankIdentificationNumber bin = bankIdentificationNumberService.findById(bankIdentificationNumber);
			if(bin == null)
				return new AuthResponse(request.getAcquirerOrderId(), request.getAcquirerTimestamp(), null, null, HttpStatus.BAD_REQUEST, "Issuer: Bank Identification Number invalid for pan code " + request.getPan() + " (" + bankIdentificationNumber + ").");
			//Provera ispravnosti broja korisnickog naloga
			long userAccountNumber = Long.parseLong(request.getPan().substring(6, request.getPan().length() - 1));
			UserAccount userAccount = userAccountService.findById(userAccountNumber);
			if (userAccount == null)
				return new AuthResponse(request.getAcquirerOrderId(), request.getAcquirerTimestamp(), null, null, HttpStatus.BAD_REQUEST, "Issuer: User account not found for pan code " + request.getPan() + " (" + userAccountNumber + ").");
			//Provera datuma isteka
			if (!userAccount.getExpirationDate().equals(request.getExpirationDate()))
				return new AuthResponse(request.getAcquirerOrderId(), request.getAcquirerTimestamp(), null, null, HttpStatus.BAD_REQUEST, "Issuer: Card expiration date does not match (" + request.getExpirationDate() + ").");
			//Provera vazenja kartice
			SimpleDateFormat ccDateFormat = new SimpleDateFormat("MM/YY");
			if(ccDateFormat.parse(ccDateFormat.format(new Date())).after(ccDateFormat.parse(request.getExpirationDate()))){
				return new AuthResponse(request.getAcquirerOrderId(), request.getAcquirerTimestamp(), null, null, HttpStatus.BAD_REQUEST, "Issuer: Card expired (" + ccDateFormat.format(new Date()) + " - " + request.getExpirationDate() + ").");
			}
			//Provera sigurnosnog koda
			if (!userAccount.getSecurityCode().equals(request.getSecurityCode()))
				return new AuthResponse(request.getAcquirerOrderId(), request.getAcquirerTimestamp(), null, null, HttpStatus.BAD_REQUEST, "Issuer: Security code not valid (" + request.getSecurityCode() + ").");
			//Provera vlasnika kartice
			if (!userAccount.getCardHolderName().equals(request.getCardHolderName()))
				return new AuthResponse(request.getAcquirerOrderId(), request.getAcquirerTimestamp(), null, null, HttpStatus.BAD_REQUEST, "Issuer: Credit card holder check failed (" + request.getCardHolderName() + ").");
			//Provera sume transakcije
			if (userAccount.getAccountAmount() >= request.getTransactionAmount()){
				userAccount.setAccountAmount(userAccount.getAccountAmount() - request.getTransactionAmount());
				userAccount.setReservationAmount(userAccount.getReservationAmount() + request.getTransactionAmount());
				userAccountService.persist(userAccount);
				TransactionOrder order = new TransactionOrder(new Date(), request.getAcquirerOrderId(), request.getAcquirerTimestamp(), request.getTransactionAmount(), userAccount, bin);
				orderService.persist(order);
				return new AuthResponse(request.getAcquirerOrderId(), request.getAcquirerTimestamp(), order.getIssuerOrderId(), order.getIssuerTimestamp(), HttpStatus.OK, "Issuer: Transaction completed. " + request.getTransactionAmount() + " was successfully reserved from account " + request.getPan());
			} else {
				return new AuthResponse(request.getAcquirerOrderId(), request.getAcquirerTimestamp(), null, null, HttpStatus.BAD_REQUEST, "Issuer: Transaction failed. Pan code account doesn't have " + request.getTransactionAmount() + " or more resources");
			}
		} catch (InvalidAuthentificationAndAuthorizationRequest | ParseException e) {
			e.printStackTrace();
			return new AuthResponse(request.getAcquirerOrderId(), request.getAcquirerTimestamp(), null, null, HttpStatus.BAD_REQUEST, "Issuer: Request body was not properly validated.");
		}
	}
	
	@RequestMapping(value = "/test/useraccounts", method = RequestMethod.GET)
	List<UserAccount> getUserAccounts() {
		return userAccountService.findAll();
	}
	
	@RequestMapping(value = "/test/orders", method = RequestMethod.GET)
	List<TransactionOrder> getOrders() {
		return orderService.findAll();
	}
	
	@RequestMapping(value = "/test/bins", method = RequestMethod.GET)
	List<BankIdentificationNumber> getBins() {
		return bankIdentificationNumberService.findAll();
	}
	
	@RequestMapping(value = "/test/exampleauthorization/valid", method = RequestMethod.GET)
	AuthRequest getExampleValid() {
		return new AuthRequest((long) 1000000000, new Date(), "4319403171195344", "477", "Ipce Ahmedovski", "12/22", 1000.0);
	}

	@RequestMapping(value = "/test/exampleauthorization/invalid", method = RequestMethod.GET)
	AuthRequest getExampleInvalid() {
		return new AuthRequest((long) 1000000000, new Date(), "4319408996487255", "444", "Milos Bojanic", "12/02", 1000.0);
	}
}
