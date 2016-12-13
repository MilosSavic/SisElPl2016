package rs.ac.uns.ftn.sep2016.util;

public class TransactionResult {

	String resultCode;
	String message;
	
	public TransactionResult(String resultCode, String message){
		this.resultCode = resultCode;
		this.message = message;
	}

	public String getResultCode() {
		return resultCode;
	}

	public void setResultCode(String resultCode) {
		this.resultCode = resultCode;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
	
	
}
