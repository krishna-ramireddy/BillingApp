package com.usaa.billpayments.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.usaa.billpayments.models.Customers;
import com.usaa.billpayments.repositories.CustomersRepo;

@Service
public class CustomersService {
	
	@Autowired
	private CustomersRepo customersRepo;
	
	public List<Customers> getCustomersList() {
		return customersRepo.findAll();
	}
}
