package rs.ac.uns.ftn.sep2016.model.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rs.ac.uns.ftn.sep2016.model.entity.Bank;
import rs.ac.uns.ftn.sep2016.model.repository.BankRepository;
import rs.ac.uns.ftn.sep2016.model.service.BankService;

@Service
@Transactional
public class BankServiceImpl implements BankService {

	@Autowired
	BankRepository bankRepository;
	
	@Override
	public List<Bank> findAll() {
		return bankRepository.findAll();
	}

	@Override
	public Bank findById(String id) {
		return bankRepository.findOne(id);
	}

	@Override
	public Bank findByBankCode(String code) {
		return bankRepository.findByBankCode(code);
	}

}
