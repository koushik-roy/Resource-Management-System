package com.tek.rms.repository;

import com.tek.rms.model.Employee_project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;

public interface Employee_projectRepository extends JpaRepository<Employee_project,Integer> {

@Query("select a from Employee_project a where a.employee_id=?1")
    public Employee_project  findEmp(int employee_id);

    @Modifying
    @Transactional
    @Query(value = "UPDATE  employee_projects e SET isdeleted = 1 where e.employee_id=?1 AND e.project_id=?2" , nativeQuery = true)
    void deleteEmployeeProjects(int employeeId, String projectId);
    @Transactional
    @Modifying
    @Query(value = "UPDATE  employee_projects e SET isdeleted = 0 where e.employee_id=?1 AND e.project_id=?2" , nativeQuery = true)
    void updateEmployeeProjects(int employeeId, String projectId);
}
