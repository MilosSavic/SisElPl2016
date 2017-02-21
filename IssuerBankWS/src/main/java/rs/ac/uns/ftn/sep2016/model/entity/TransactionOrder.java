package rs.ac.uns.ftn.sep2016.model.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;

@Entity(name="TRANSACTION_ORDER")
public class TransactionOrder implements Serializable {

	private static final long serialVersionUID = -5849569981192422545L;

	@Id
	@Column(name = "ISSUER_ORDER_ID")
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_gen") 
	@SequenceGenerator(name="seq_gen", sequenceName = "ORDER_ID_SEQ", allocationSize = 1000000000)
	private long issuerOrderId;
	
	@Column(name = "ISSUER_TIMESTAMP")
	private Date issuerTimestamp;

	@Column(name = "ACQUIRER_ORDER_ID")
	private long acquirerOrderId;

	@Column(name = "ACQUIRER_TIMESTAMP")
	private Date acquirerTimestamp;
	
	@Column(name = "ORDER_AMOUNT")
	private Double orderAmount;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name = "ORDER_USER_ACCOUNT")
	private UserAccount orderUserAccount;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name = "ORDER_BIN")
	private BankIdentificationNumber orderBin;
	
	public TransactionOrder(){
		
	}
	
	public TransactionOrder(Date issuerTimestamp, long acquirerOrderId, Date acquirerTimestamp, Double orderAmount, UserAccount orderUserAccount, BankIdentificationNumber orderBin){
		this.issuerTimestamp = issuerTimestamp;
		this.acquirerOrderId = acquirerOrderId;
		this.acquirerTimestamp = acquirerTimestamp;
		this.orderAmount = orderAmount;
		this.orderUserAccount = orderUserAccount;
		this.orderBin = orderBin;
	}

	public long getIssuerOrderId() {
		return issuerOrderId;
	}

	public void setIssuerOrderId(long issuerOrderId) {
		this.issuerOrderId = issuerOrderId;
	}

	public Date getIssuerTimestamp() {
		return issuerTimestamp;
	}

	public void setIssuerTimestamp(Date issuerTimestamp) {
		this.issuerTimestamp = issuerTimestamp;
	}

	public long getAcquirerOrderId() {
		return acquirerOrderId;
	}

	public void setAcquirerOrderId(long acquirerOrderId) {
		this.acquirerOrderId = acquirerOrderId;
	}

	public Date getAcquirerTimestamp() {
		return acquirerTimestamp;
	}

	public void setAcquirerTimestamp(Date acquirerTimestamp) {
		this.acquirerTimestamp = acquirerTimestamp;
	}

	public Double getOrderAmount() {
		return orderAmount;
	}

	public void setOrderAmount(Double orderAmount) {
		this.orderAmount = orderAmount;
	}

	public UserAccount getOrderUserAccount() {
		return orderUserAccount;
	}

	public void setOrderUserAccount(UserAccount orderUserAccount) {
		this.orderUserAccount = orderUserAccount;
	}

	public BankIdentificationNumber getOrderBin() {
		return orderBin;
	}

	public void setOrderBin(BankIdentificationNumber orderBin) {
		this.orderBin = orderBin;
	}
	
}
