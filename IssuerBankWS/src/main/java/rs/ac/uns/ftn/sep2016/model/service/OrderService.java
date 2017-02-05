package rs.ac.uns.ftn.sep2016.model.service;

import java.util.List;

import rs.ac.uns.ftn.sep2016.model.entity.TransactionOrder;

public interface OrderService {

	public List<TransactionOrder> findAll();
	
	public TransactionOrder findById(long id);
	
	public void persist(TransactionOrder order);
	
}
