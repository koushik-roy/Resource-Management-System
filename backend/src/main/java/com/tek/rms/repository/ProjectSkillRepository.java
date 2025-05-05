package com.tek.rms.repository;

import com.tek.rms.model.Project;
import com.tek.rms.model.ProjectSkill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface ProjectSkillRepository extends JpaRepository<ProjectSkill, Integer> {

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM project_skills e where e.project_id=?1 AND e.skill_set=?2" , nativeQuery = true)
    void deleteEmployeeSkillOne(String projectId, int  skill_set);









//    ProjectSkill findByprojectId(String projectId);

//    @Query(value = "DELETE FROM project_skills e where e.project_id=(:project_id) AND e.skill_set IN (:skill_set)" , nativeQuery = true)
//    void deleteEmployeeSkills(@Param("project_id") String project_id, @Param("skill_set") List<Integer> skill_set);
}
