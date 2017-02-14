package rs.ac.uns.ftn.sep2016.model.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rs.ac.uns.ftn.sep2016.model.entity.TransactionOrder;
import rs.ac.uns.ftn.sep2016.model.repository.OrderRepository;
import rs.ac.uns.ftn.sep2016.model.service.OrderService;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

	@Autowired
	OrderRepository orderRepository;
	
	@Override
	public List<TransactionOrder> findAll() {
		return orderRepository.findAll();
	}

	@Override
	public TransactionOrder findById(long orderId) {
		return orderRepository.findOne(orderId);
	}

	@Override
	public void persist(TransactionOrder order) {
		orderRepository.saveAndFlush(order);
	}
	
}
