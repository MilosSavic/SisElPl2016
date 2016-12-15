package rs.ac.uns.ftn.sep2016.exception;

public class InvalidAuthentificationAndAuthorizationRequest extends Exception {

	private static final long serialVersionUID = 8278088924084073317L;
	
	public InvalidAuthentificationAndAuthorizationRequest(String message){
		super(message);
	}

}
