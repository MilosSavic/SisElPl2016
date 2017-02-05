package rs.ac.uns.ftn.sep2016.model.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity(name="BANK")
public class Bank implements Serializable{

	private static final long serialVersionUID = 5965345277949812946L;

	@Column(name = "BANK_ID")
	private String bankId;
	
	@Id
	@Column(name = "BANK_CODE")
	private String bankCode;
	
	@Column(name = "BANK_NAME")
	private String bankName;
	
	@Column(name = "BANK_URI")
	private String bankUri;
	
	public Bank(){
		
	}
	
	public Bank(String id, String code, String name, String uri) {
		super();
		this.bankId = id;
		this.bankCode = code;
		this.bankName = name;
		this.bankUri = uri;
	}
	
	public String getBankId() {
		return bankId;
	}
	public void setBankId(String id) {
		this.bankId = id;
	}
	public String getBankCode() {
		return bankCode;
	}
	public void setBankCode(String code) {
		this.bankCode = code;
	}
	public String getBankName() {
		return bankName;
	}
	public void setBankName(String name) {
		this.bankName = name;
	}
	public String getBankUri() {
		return bankUri;
	}
	public void setBankUri(String uri) {
		this.bankUri = uri;
	}
}
