package rs.ac.uns.ftn.sep2016.model.service;

import java.util.List;

import rs.ac.uns.ftn.sep2016.model.entity.Bank;

public interface BankService {

	public List<Bank> findAll();
	
	public Bank findById(String id);
	
}
