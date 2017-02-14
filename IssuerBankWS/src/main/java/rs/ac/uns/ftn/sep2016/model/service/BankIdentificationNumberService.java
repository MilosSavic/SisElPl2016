package rs.ac.uns.ftn.sep2016.model.service;

import java.util.List;

import rs.ac.uns.ftn.sep2016.model.entity.BankIdentificationNumber;

public interface BankIdentificationNumberService {

	public List<BankIdentificationNumber> findAll();
	
	public BankIdentificationNumber findById(long id);
	
	public void persist(BankIdentificationNumber order);
	
}
