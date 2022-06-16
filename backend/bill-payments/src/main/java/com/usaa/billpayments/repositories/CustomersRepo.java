package com.usaa.billpayments.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.usaa.billpayments.models.Customers;

@Repository
public interface CustomersRepo extends JpaRepository<Customers, Long> {
	
}
