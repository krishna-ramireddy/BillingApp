package com.usaa.billpayments.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.usaa.billpayments.models.AccountDetails;

@Repository
public interface AccountDetailsRepo extends JpaRepository<AccountDetails, Long> {
	List<AccountDetails> findByCustomerId(Long customerId);
}
