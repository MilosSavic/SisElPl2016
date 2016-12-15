package rs.ac.uns.ftn.sep2016.model.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rs.ac.uns.ftn.sep2016.model.entity.UserAccount;
import rs.ac.uns.ftn.sep2016.model.repository.UserAccountRepository;
import rs.ac.uns.ftn.sep2016.model.service.UserAccountService;

@Service
@Transactional
public class UserAccountServiceImpl implements UserAccountService {

	@Autowired
	UserAccountRepository userAccountRepository;
	
	@Override
	public List<UserAccount> findAll() {
		return userAccountRepository.findAll();
	}

	@Override
	public UserAccount findById(String pan) {
		return userAccountRepository.findOne(pan);
	}

	@Override
	public void persist(UserAccount userAccount) {
		userAccountRepository.saveAndFlush(userAccount);
	}

}
