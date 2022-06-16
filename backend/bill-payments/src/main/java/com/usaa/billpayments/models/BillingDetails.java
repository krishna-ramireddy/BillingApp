package com.usaa.billpayments.models;

import java.lang.Long;
import java.util.Date;

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
@Entity(name = "BillingDetails")
public class BillingDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@ReadOnlyProperty
	@Column(name = "id", insertable = false, updatable = false, unique = true)
	private Long id;
	private Long customerId;
	private Double amount;
	private String status;
	private Date requestRaisedOn;
	private String remarks;
	
	@ManyToOne()
	@JoinColumn(name="customerId", referencedColumnName = "id", insertable = false, updatable = false)    
	private Customers customerDetails;
}
