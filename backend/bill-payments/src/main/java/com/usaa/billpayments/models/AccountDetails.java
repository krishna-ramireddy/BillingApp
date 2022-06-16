package com.usaa.billpayments.models;

import java.lang.Long;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.springframework.data.annotation.ReadOnlyProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "AccountDetails")
public class AccountDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@ReadOnlyProperty
	@Column(name = "id", insertable = false, updatable = false, unique = true)
	private Long id;
	private Long  customerId;
	private String bankName;
	private String AccountNo;
	
	@ManyToOne()
	@JoinColumn(name="customerId", referencedColumnName = "id", insertable = false, updatable = false)    
	private Customers customerDetails;
}
