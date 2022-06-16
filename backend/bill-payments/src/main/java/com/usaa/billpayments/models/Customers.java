package com.usaa.billpayments.models;

import java.lang.Long;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.data.annotation.ReadOnlyProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Customers {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@ReadOnlyProperty
	@Column(name = "id", insertable = false, updatable = false, unique = true)
	private Long id;

	private String customerName;
	private String email;
	private String phoneNo;
	private String address;
	private Date dateRegisterd;
}
