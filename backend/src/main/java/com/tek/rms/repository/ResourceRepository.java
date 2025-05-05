package com.tek.rms.repository;

import com.tek.rms.model.CustomerCategory;
import com.tek.rms.model.Resource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResourceRepository extends JpaRepository<Resource,Long> {
    @Query(value = "select * FROM resource r where r.isdeleted=0", nativeQuery = true)
    List<Resource> findAllResources();
}
