package com.tek.rms.model;

import java.util.Date;



import javax.persistence.*;


import org.hibernate.annotations.CreationTimestamp;

@Entity(name="user")

public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(name="user_name")
	private String username;
	@Column(name="password")
	private String password;
	@Column(name = "status")
    private UserEnStatus status;
	@Column(name = "login_status")
    private int login_status;

	
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_timestamp")
	private Date created_timestamp;


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public String getUsername() {
		return username;
	}


	public void setUsername(String username) {
		this.username = username;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public UserEnStatus getStatus() {
		return status;
	}


	public void setStatus(UserEnStatus status) {
		this.status = status;
	}


	public int getLogin_status() {
		return login_status;
	}


	public void setLogin_status(int login_status) {
		this.login_status = login_status;
	}


	public Date getCreated_timestamp() {
		return created_timestamp;
	}


	public void setCreated_timestamp(Date created_timestamp) {
		this.created_timestamp = created_timestamp;
	}


	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", password=" + password + ", status=" + status
				+ ", login_status=" + login_status + ", created_timestamp=" + created_timestamp + "]";
	}


}
