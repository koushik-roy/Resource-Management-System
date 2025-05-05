package com.tek.rms.repository;

import com.tek.rms.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, String> {
    Project findByprojectId(String projectId);
//    @Modifying
//    @Transactional
//    @Query(value = "DELETE FROM project_skills e where e.projectId=(:projectId) AND e.skill_set IN (:skill_set)" , nativeQuery = true)
//    Project deleteEmployeeSkills(String projectId,int[] skill_set);







    //void deleteEmployeeSkills(@Param("project_id") String project_id, @Param("skill_set") List<Integer> skill_set);
//    Project findByProject_Project_skill_skill(int skill);
// Project deleteByProjectSkillList(List projectSkillList);
}
