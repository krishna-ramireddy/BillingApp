package com.usaa.billpayments.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.usaa.billpayments.models.BillingDetails;

@Repository
public interface BillingRepo extends JpaRepository<BillingDetails, Long> {

	List<BillingDetails> findByStatus(String status);

	List<BillingDetails> findByCustomerId(Long customerId);

}
