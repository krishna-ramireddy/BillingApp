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
@Entity(name = "Payments")
public class PaymentsModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@ReadOnlyProperty
	@Column(name = "id", insertable = false, updatable = false, unique = true)
	private Long id;
	private Long billId;
	private String paymentStatus;
	private Date processedDate;
	
	@ManyToOne()
	@JoinColumn(name="billId", referencedColumnName = "id", insertable = false, updatable = false)    
	private BillingDetails billingDetails;
}
