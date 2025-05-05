package com.tek.rms.controller;

import com.tek.rms.dto.ProjectDto;
import com.tek.rms.dto.ProjectSkillDto;
import com.tek.rms.service.ProjectSkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/projectSkill")
public class ProjectSkillController {

@Autowired
    ProjectSkillService projectSkillService;

    @DeleteMapping("/delete")
    public String deleteEmployeeSkills(@RequestBody ProjectSkillDto projectSkillDto){
        return projectSkillService.deleteEmployeeProjects(projectSkillDto.getProjectId(), projectSkillDto.getSkill_set());
    }

//    @PostMapping("/addProject")
//    public String addProject(@RequestBody ProjectDto projectDto) {
//
//        return projectService.addProject(projectDto);
//    }

}
