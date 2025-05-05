package com.tek.rms.service;

import com.tek.rms.mapper.ProjectSkillMapper;
import com.tek.rms.repository.ProjectSkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectSkillService {
    @Autowired
    ProjectSkillRepository projectSkillRepository;

    public String deleteEmployeeProjects(String projectId, int skill_set){
        projectSkillRepository.deleteEmployeeSkillOne(projectId, skill_set);
        return ("deleted successfully");
    }
}
