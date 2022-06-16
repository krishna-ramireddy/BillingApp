package com.usaa.billpayments.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.usaa.billpayments.models.BillingDetails;
import com.usaa.billpayments.repositories.BillingRepo;

@Service
public class BillingDetailsService {

	@Autowired
	private BillingRepo billingRepo;

	public void createBilling(BillingDetails billingInfo) {
		billingInfo.setRequestRaisedOn(new Date());
		billingInfo.setStatus("Pending");
		billingRepo.save(billingInfo);
	}

	public List<BillingDetails> getAllBillingDetails() {
		return billingRepo.findAll();
	}

	public List<BillingDetails> getBillingDetailsByStatus(String status) {
		return billingRepo.findByStatus(status);
	}

	public void updateBilling(Long billingId, BillingDetails billingInfo) {
		Optional<BillingDetails> resultData = billingRepo.findById(billingId);
		if (!resultData.isPresent()) {
			throw new RuntimeException("Invalid Data");
		}
		BillingDetails data = resultData.get();
		data.setStatus(billingInfo.getStatus());
		data.setRemarks(billingInfo.getRemarks());
		billingRepo.save(billingInfo);
	}
}
