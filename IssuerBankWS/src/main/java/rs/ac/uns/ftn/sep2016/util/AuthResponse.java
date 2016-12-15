package rs.ac.uns.ftn.sep2016.util;

import java.io.Serializable;
import java.util.Date;

import org.springframework.http.HttpStatus;

public class AuthResponse implements Serializable {

	private static final long serialVersionUID = 1883782881767272235L;
	private Integer acquirerOrderId;
	private Date acquirerTimestamp;
	private Integer issuerOrderId;
	private Date issuerTimestamp;
	private HttpStatus httpStatus;
	private String message;
	
	public AuthResponse(){
		
	}
	
	public AuthResponse(Integer acquirerOrderId, Date acquirerTimestamp, Integer issuerOrderId, Date issuerTimestamp,
			HttpStatus httpStatus, String message) {
		super();
		this.acquirerOrderId = acquirerOrderId;
		this.acquirerTimestamp = acquirerTimestamp;
		this.issuerOrderId = issuerOrderId;
		this.issuerTimestamp = issuerTimestamp;
		this.httpStatus = httpStatus;
		this.message = message;
	}

	public Integer getAcquirerOrderId() {
		return acquirerOrderId;
	}

	public void setAcquirerOrderId(Integer acquirerOrderId) {
		this.acquirerOrderId = acquirerOrderId;
	}

	public Date getAcquirerTimestamp() {
		return acquirerTimestamp;
	}

	public void setAcquirerTimestamp(Date acquirerTimestamp) {
		this.acquirerTimestamp = acquirerTimestamp;
	}

	public Integer getIssuerOrderId() {
		return issuerOrderId;
	}

	public void setIssuerOrderId(Integer issuerOrderId) {
		this.issuerOrderId = issuerOrderId;
	}

	public Date getIssuerTimestamp() {
		return issuerTimestamp;
	}

	public void setIssuerTimestamp(Date issuerTimestamp) {
		this.issuerTimestamp = issuerTimestamp;
	}

	public HttpStatus getHttpStatus() {
		return httpStatus;
	}

	public void setHttpStatus(HttpStatus httpStatus) {
		this.httpStatus = httpStatus;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}
