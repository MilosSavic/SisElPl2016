package rs.ac.uns.ftn.sep2016.model.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity(name="USER_ACCOUNT")
public class UserAccount implements Serializable {

	private static final long serialVersionUID = 4574264098830551619L;

	@Id
	@Column(name = "ACCOUNT_NUMBER")
	private long accountNumber;
	
	@Column(name = "SECURITY_CODE")
	private String securityCode;
	
	@Column(name = "CARD_HOLDER_NAME")
	private String cardHolderName;
	
	@Column(name = "EXPIRATION_DATE")
	private String expirationDate;
	
	@Column(name = "ACCOUNT_AMOUNT")
	private Double accountAmount;
	
	@Column(name = "RESERVATION_AMOUNT")
	private Double reservationAmount;
	
	public UserAccount(){
		
	}

	public UserAccount(long accountNumber, String securityCode, String cardHolderName, String expirationDate,
			Double accountAmount, Double reservationAmount) {
		super();
		this.accountNumber = accountNumber;
		this.securityCode = securityCode;
		this.cardHolderName = cardHolderName;
		this.expirationDate = expirationDate;
		this.accountAmount = accountAmount;
		this.reservationAmount = reservationAmount;
	}

	public long getAccountNumber() {
		return accountNumber;
	}

	public void setAccountNumber(long accountNumber) {
		this.accountNumber = accountNumber;
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

	public Double getAccountAmount() {
		return accountAmount;
	}

	public void setAccountAmount(Double accountAmount) {
		this.accountAmount = accountAmount;
	}

	public Double getReservationAmount() {
		return reservationAmount;
	}

	public void setReservationAmount(Double reservationAmount) {
		this.reservationAmount = reservationAmount;
	}
	
}
