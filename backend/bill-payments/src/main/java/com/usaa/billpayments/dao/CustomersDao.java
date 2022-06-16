package com.usaa.billpayments.dao;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.LongStream;

import org.springframework.stereotype.Component;

import com.usaa.billpayments.models.Customers;

@Component
public class CustomersDao {

	public List<Customers> getCustomers() {
		return LongStream.rangeClosed(1, 10)
		.mapToObj(id -> new Customers(id, "Customer "+ id, "Customer"+ id + "@email.com", String.valueOf(id + Long.valueOf(5884721451L)), "Customer "+ id + "Address", new Date()))
		.collect(Collectors.toList());
	}
}
