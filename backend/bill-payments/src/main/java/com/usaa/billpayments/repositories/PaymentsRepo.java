package com.usaa.billpayments.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.usaa.billpayments.models.PaymentsModel;

@Repository
public interface PaymentsRepo extends JpaRepository<PaymentsModel, Long>{

}
