package com.tek.rms.controller;

import com.tek.rms.dto.ProjectDto;
import com.tek.rms.dto.ProjectSkillDto;
import com.tek.rms.mapper.ProjectMapper;
import com.tek.rms.mapper.ProjectSkillMapper;
import com.tek.rms.model.Project;
import com.tek.rms.model.ProjectSkill;
import com.tek.rms.service.ProjectService;
import com.tek.rms.util.RMSConstant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/project")
public class ProjectController {
    @Autowired
    ProjectService projectService;


@Autowired
    ProjectMapper projectMapper;

    @PostMapping("/addProject")
    public String addProject(@RequestBody ProjectDto projectDto) {

        return projectService.addProject(projectDto);
    }

    @GetMapping("/projects")
    public List<ProjectDto> getAllProjects() {
        return projectService.getAllProjects();
    }
@PutMapping("/update")
public String projectUpdate(@RequestBody ProjectDto projectDto)
{

    return projectService.updateProject(projectDto);
}




    @GetMapping("/{projectId}")
    public ProjectDto findByProjectId(@PathVariable(RMSConstant.PROJECTNAME) String projectId) {

        return projectService.findProjectById(projectId);
    }
    @DeleteMapping("/delete/{projectId}")
    public void deleteProjects(@PathVariable String projectId)

    {
        projectService.deleteProject(projectId);
    }








//    @DeleteMapping("/delete")
//    public void  deleteEmployeeSkills(@RequestBody String projectID , int[] skill_set){
//        projectService.deleteEmployeeProject(projectID,skill_set);
//
//
////        return projectService.deleteEmployeeProject(projectSkillDto.getProject_id(), Collections.singletonList(projectSkillDto.getSkill_set()));
//    }

//    @DeleteMapping("/deleting")
//    public ProjectDto removeClient(ProjectSkill projectSkill) {
//        projectSkill.RE
//    }
}



