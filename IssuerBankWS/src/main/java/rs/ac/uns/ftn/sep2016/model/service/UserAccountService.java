package rs.ac.uns.ftn.sep2016.model.service;

import java.util.List;

import rs.ac.uns.ftn.sep2016.model.entity.UserAccount;

public interface UserAccountService {
	
	public List<UserAccount> findAll();
	
	public UserAccount findById(long id);
	
	public void persist(UserAccount userAccount);
}
