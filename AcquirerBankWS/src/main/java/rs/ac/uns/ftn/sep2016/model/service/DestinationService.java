package rs.ac.uns.ftn.sep2016.model.service;

import java.util.List;

import rs.ac.uns.ftn.sep2016.model.entity.Destination;

public interface DestinationService {
	
	public List<Destination> findAll();
	
	public Destination findById(String id);

}
