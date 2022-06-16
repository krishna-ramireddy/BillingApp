package com.usaa.billpayments.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.usaa.billpayments.models.AccountDetails;
import com.usaa.billpayments.repositories.AccountDetailsRepo;

@Service
public class AccountDetailsService {
	
	@Autowired
	private AccountDetailsRepo accountRepo;
	
	public List<AccountDetails> getAccountDetails(Long customerId) {
		return accountRepo.findByCustomerId(customerId);
	}

}
