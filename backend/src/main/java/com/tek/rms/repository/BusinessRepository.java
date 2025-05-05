package com.tek.rms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.tek.rms.model.Business;

import java.util.List;

@Repository
public interface BusinessRepository extends JpaRepository<Business, Long> {
    boolean existsByCode(String code);
    @Query(value = "select * FROM business_unit b where b.isdeleted=0", nativeQuery = true)
    List<Business> findAllBusiness();
//    @Modifying
//    @Query(value = "UPDATE business_unit b SET b.isDeleted = 1 WHERE b.id = ?1")
//    void deleteBusiness(Long id);

}