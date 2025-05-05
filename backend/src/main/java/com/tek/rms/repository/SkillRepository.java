package com.tek.rms.repository;

import com.tek.rms.controller.SkillController;
import com.tek.rms.dto.SkillDto;
import com.tek.rms.model.Business;
import com.tek.rms.model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SkillRepository extends JpaRepository<Skill, Integer> {
Skill findBycode(String code);
    @Query(value = "select * FROM skill_set s where s.isdeleted=0", nativeQuery = true)
    List<Skill> findAllSkills();
}
