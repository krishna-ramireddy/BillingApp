package com.usaa.billpayments.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.usaa.billpayments.models.AccountDetails;
import com.usaa.billpayments.services.AccountDetailsService;

@RestController
@RequestMapping("/accounts")
public class AccountDetailsController {

	@Autowired
	private AccountDetailsService accountService;
	@GetMapping("/{customerId}")
	public List<AccountDetails> getCustomerAccountDetails(@PathVariable Long customerId) {
		return accountService.getAccountDetails(customerId);
	}
}
