package com.tek.rms.repository;

import com.tek.rms.model.CustomerCategory;
import com.tek.rms.model.Employee_skills;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface Employee_skillsRepository extends JpaRepository<Employee_skills,Integer> {
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM employee_skills e where e.employee_id=?1 AND e.skill_set=?2" , nativeQuery = true)
    void deleteEmployeeSkills(int employeeId, int skillId);

}
