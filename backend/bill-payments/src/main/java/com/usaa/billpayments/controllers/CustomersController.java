package com.usaa.billpayments.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.usaa.billpayments.models.Customers;
import com.usaa.billpayments.services.CustomersService;

@RestController
@RequestMapping("/customers")
public class CustomersController {
	
	@Autowired
	private CustomersService customersService;
	
	@GetMapping
	public List<Customers> getCustomers() {
		return customersService.getCustomersList();
	}
}
