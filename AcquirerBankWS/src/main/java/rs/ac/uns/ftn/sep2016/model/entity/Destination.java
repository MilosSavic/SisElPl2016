package rs.ac.uns.ftn.sep2016.model.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity(name="DESTINATION")
public class Destination implements Serializable {

	private static final long serialVersionUID = -5554125135498036600L;

	@Id
	@Column(name = "DESTINATION_ID")
	String destinationId;
	
	@Column(name = "DESTINATION_NAME")
	String destinationName;
	
	@Column(name = "DESTINATION_URI")
	String destinationUri;
	
	public Destination(){
		
	}
	
	public Destination(String destinationId, String destinationName, String destinationUri) {
		super();
		this.destinationId = destinationId;
		this.destinationName = destinationName;
		this.destinationUri = destinationUri;
	}

	public String getDestinationId() {
		return destinationId;
	}

	public void setDestinationId(String destinationId) {
		this.destinationId = destinationId;
	}

	public String getDestinationName() {
		return destinationName;
	}

	public void setDestinationName(String destinationName) {
		this.destinationName = destinationName;
	}

	public String getDestinationUri() {
		return destinationUri;
	}

	public void setDestinationUri(String destinationUri) {
		this.destinationUri = destinationUri;
	}
	
	
	
}
