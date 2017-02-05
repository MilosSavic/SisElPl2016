package rs.ac.uns.ftn.sep2016.model.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rs.ac.uns.ftn.sep2016.model.entity.BankIdentificationNumber;
import rs.ac.uns.ftn.sep2016.model.repository.BankIdentificationNumberRepository;
import rs.ac.uns.ftn.sep2016.model.service.BankIdentificationNumberService;

@Service
@Transactional
public class BankIdentificationNumberServiceImpl implements BankIdentificationNumberService {

	@Autowired
	BankIdentificationNumberRepository bankIdentificationNumberRepository;
	
	@Override
	public List<BankIdentificationNumber> findAll() {
		return bankIdentificationNumberRepository.findAll();
	}

	@Override
	public BankIdentificationNumber findById(long binId) {
		return bankIdentificationNumberRepository.findOne(binId);
	}

	@Override
	public void persist(BankIdentificationNumber bin) {
		bankIdentificationNumberRepository.saveAndFlush(bin);
	}
}
