package com.tek.rms.repository;

import com.tek.rms.model.Business;
import org.springframework.data.jpa.repository.JpaRepository;

import com.tek.rms.model.ResourceRole;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface ResourceRoleRepository extends JpaRepository<ResourceRole,Integer> {
    boolean existsByCode(String code);
    @Query(value = "select * FROM resource_role r where r.isdeleted=0", nativeQuery = true)

    List<ResourceRole> findAllResource_role();


}
