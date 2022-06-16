package com.usaa.billpayments.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.usaa.billpayments.models.BillingDetails;
import com.usaa.billpayments.services.BillingDetailsService;

@RestController
@RequestMapping("/billings")
public class ManageBillingsController {

	@Autowired
	private BillingDetailsService billingService;

	@GetMapping
	public List<BillingDetails> getAllBillings() {
		return billingService.getAllBillingDetails();
	}

	@GetMapping("/status/{statusVal}")
	public List<BillingDetails> getAllBillings(@PathVariable String statusVal) {
		return billingService.getBillingDetailsByStatus(statusVal);
	}

	@PostMapping
	public void createBilling(@RequestBody BillingDetails billingInfo) {
		billingService.createBilling(billingInfo);
	}

	@PutMapping("/{billingId}")
	public void updateBilling(@PathVariable Long billingId, @RequestBody BillingDetails billingInfo) {
		billingService.updateBilling(billingId, billingInfo);
	}
}
