package com.tek.rms.repository;

import com.tek.rms.model.Customer;
import com.tek.rms.model.CustomerCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerCategoryRepository extends JpaRepository<CustomerCategory, Long> {
CustomerCategory findBycode(String code);
    @Query(value = "select * FROM customer_category c where c.isdeleted=0", nativeQuery = true)
    List<CustomerCategory> findAllCustomerCategories();
}