package rs.ac.uns.ftn.sep2016.util;

import java.io.Serializable;
import java.util.Date;

import rs.ac.uns.ftn.sep2016.exception.InvalidAuthentificationAndAuthorizationRequest;

public class AuthRequest implements Serializable {

	private static final long serialVersionUID = -4151214170561144062L;

	private Long acquirerOrderId;
	private Date acquirerTimestamp;
	private String pan;
	private String securityCode;
	private String cardHolderName;
	private String expirationDate;
	private Double transactionAmount;
	
	public AuthRequest(){
		
	}
	
	public AuthRequest(Long acquirerOrderId, Date acquirerTimestamp, String pan, String securityCode,
			String cardHolderName, String expirationDate, Double transactionAmount) {
		super();
		this.acquirerOrderId = acquirerOrderId;
		this.acquirerTimestamp = acquirerTimestamp;
		this.pan = pan;
		this.securityCode = securityCode;
		this.cardHolderName = cardHolderName;
		this.expirationDate = expirationDate;
		this.transactionAmount = transactionAmount;
	}

	public static void validate(AuthRequest request) throws InvalidAuthentificationAndAuthorizationRequest  {
		if(request.getAcquirerOrderId() == null || request.getAcquirerOrderId() < 1000000000L || request.getAcquirerOrderId() > 9999999999L){
			  throw new InvalidAuthentificationAndAuthorizationRequest("Invalid acquirer order identification format.");
		}
		if(request.getAcquirerTimestamp() == null){
			  throw new InvalidAuthentificationAndAuthorizationRequest("Invalid acquirer order timestamp format.");
		}
		if(request.getSecurityCode() == null || request.getSecurityCode().equals("")){
			  throw new InvalidAuthentificationAndAuthorizationRequest("Invalid security code format.");
		}
		if(request.getCardHolderName() == null || request.getCardHolderName().equals("")){
			  throw new InvalidAuthentificationAndAuthorizationRequest("Invalid card holder name format.");
		}
		if(request.getExpirationDate() == null || request.getExpirationDate().equals("")){
			  throw new InvalidAuthentificationAndAuthorizationRequest("Invalid expiration date format.");
		}
		if(request.getTransactionAmount() == null){
			  throw new InvalidAuthentificationAndAuthorizationRequest("Invalid transaction amount format.");
		}
		if(request.getPan() == null || request.getPan().equals("")){
			  throw new InvalidAuthentificationAndAuthorizationRequest("Invalid pan number format.");
		}
		String luhn = request.getPan();
		int luhnDigit = Integer.parseInt(luhn.substring(luhn.length() - 1, luhn.length()));
		String luhnLess = luhn.substring(0, luhn.length() - 1);
		if (calculate(luhnLess) != luhnDigit) {
		  throw new InvalidAuthentificationAndAuthorizationRequest("Invalid pan number format. Luhn verification failed.");
		}
	}
	
	public static int calculate(String luhn) {
		int sum = 0;
		for (int i = 0; i < luhn.length(); i++) {
		  sum += Integer.parseInt(luhn.substring(i, i+1));
		}
		int[] delta = {0, 1, 2, 3, 4, -4, -3, -2, -1, 0};
		for (int i = luhn.length() - 1; i >= 0; i-=2) {       
		  int deltaIndex = Integer.parseInt(luhn.substring(i, i+1));
		  int deltaValue = delta[deltaIndex]; 
		  sum += deltaValue;
		}   
		int mod10 = sum % 10;
		mod10 = 10 - mod10; 
		if (mod10 == 10) {      
		  mod10 = 0;
		}
		return mod10;
	}

	public Long getAcquirerOrderId() {
		return acquirerOrderId;
	}

	public void setAcquirerOrderId(Long acquirerOrderId) {
		this.acquirerOrderId = acquirerOrderId;
	}

	public Date getAcquirerTimestamp() {
		return acquirerTimestamp;
	}

	public void setAcquirerTimestamp(Date acquirerTimestamp) {
		this.acquirerTimestamp = acquirerTimestamp;
	}

	public String getPan() {
		return pan;
	}

	public void setPan(String pan) {
		this.pan = pan;
	}

	public String getSecurityCode() {
		return securityCode;
	}

	public void setSecurityCode(String securityCode) {
		this.securityCode = securityCode;
	}

	public String getCardHolderName() {
		return cardHolderName;
	}

	public void setCardHolderName(String cardHolderName) {
		this.cardHolderName = cardHolderName;
	}

	public String getExpirationDate() {
		return expirationDate;
	}

	public void setExpirationDate(String expirationDate) {
		this.expirationDate = expirationDate;
	}

	public Double getTransactionAmount() {
		return transactionAmount;
	}

	public void setTransactionAmount(Double transactionAmount) {
		this.transactionAmount = transactionAmount;
	}
	
}
