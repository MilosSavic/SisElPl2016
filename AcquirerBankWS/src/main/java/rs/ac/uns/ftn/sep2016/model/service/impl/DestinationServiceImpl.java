package rs.ac.uns.ftn.sep2016.model.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import rs.ac.uns.ftn.sep2016.model.entity.Destination;
import rs.ac.uns.ftn.sep2016.model.repository.DestinationRepository;
import rs.ac.uns.ftn.sep2016.model.service.DestinationService;

@Service
@Transactional
public class DestinationServiceImpl implements DestinationService{

	@Autowired
	DestinationRepository destinationRepository;
	
	@Override
	public List<Destination> findAll() {
		return destinationRepository.findAll();
	}

	@Override
	public Destination findById(String id) {
		return destinationRepository.findOne(id);
	}

}
