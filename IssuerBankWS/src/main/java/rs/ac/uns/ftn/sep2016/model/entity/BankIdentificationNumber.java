package rs.ac.uns.ftn.sep2016.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity(name="BANK_IDENTIFICATION_NUMBER")
public class BankIdentificationNumber {

	@Id
	@Column(name = "BIN_ID") 
	private long binId;

	public BankIdentificationNumber() {
	}

	public long getBinId() {
		return binId;
	}

	public void setBinId(long binId) {
		this.binId = binId;
	}
	
}
