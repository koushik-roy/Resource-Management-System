package com.tek.rms.repository;

import com.tek.rms.model.Business;
import com.tek.rms.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    public List<Customer> findByCategory(int category);

    @Query(value = "select * FROM customer c where c.isdeleted=0", nativeQuery = true)
    List<Business> findAllCustomers();
}