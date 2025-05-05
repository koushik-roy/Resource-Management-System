package com.tek.rms.service;

import com.tek.rms.dto.ProjectDto;
import com.tek.rms.dto.ProjectSkillDto;
import com.tek.rms.mapper.ProjectMapper;
import com.tek.rms.mapper.ProjectSkillMapper;
import com.tek.rms.model.Project;
import com.tek.rms.model.ProjectSkill;
import com.tek.rms.repository.ProjectRepository;
import com.tek.rms.repository.ProjectSkillRepository;
import com.tek.rms.util.RMSConstant;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ProjectService {
    @Autowired
    ProjectRepository projectRepository;
    @Autowired
    ProjectSkillRepository projectSkillRepository;
    @Autowired
    ProjectMapper projectMapper;


    @Autowired
    ProjectSkillMapper projectSkillMapper;

    public String addProject(ProjectDto projectDto) {
        Project project=projectRepository.save(projectMapper.dtoToEntity(projectDto));
        projectMapper.entityToDto(project);
        return RMSConstant.ADDPROJECT;

    }

    public List<ProjectDto> getAllProjects()
    {
        List<Project> results=projectRepository.findAll();
        return projectMapper.entityToDto(results);
    }

    public String updateProject(ProjectDto projectDto) {

        Project project=projectRepository.save(projectMapper.dtoToEntity(projectDto));
        projectMapper.entityToDto(project);
        return RMSConstant.UPDATEPROJECT;

    }

//    public void processChildDto(Project project , List<ProjectSkillDto> projectSkillDtos)
//    {
//        List<ProjectSkill> projectSkills=new ArrayList<>();
//        for(ProjectSkillDto dto:projectSkillDtos)
//        {
//            ProjectSkill projectSkill;
//            if(dto.getProjectId()==null)
//            {
//                projectSkill =new ProjectSkill();
//                projectSkill.setProject(project);
//            }
//            else {
//
//                projectSkill=projectSkillRepository.findByprojectId(dto.getProjectId());
//            }
//            BeanUtils.copyProperties(dto,projectSkill);
//            projectSkills.add(projectSkill);
//
//        }
//        project.getProjectSkillList().clear();
//        project.getProjectSkillList().addAll(projectSkills);
//        projectRepository.save(project);
//    }






    //    public ProjectDto deleteproject(List  projectSkillList)
//    {
//        Project result =projectRepository.deleteByProjectSkillList(projectSkillList);
//       return projectMapper.entityToDto(result);
//
//    }
//    public List<ProjectDto> findByProject_Project_skill_skill(final int skill) {
//        List<Project > result=projectRepository.findByProject_Project_skill_skill(skill)
//        return  projectMapper.entityToDto(result);
//    }

    public ProjectDto findProjectById(String projectId)
    {
        Project result=projectRepository.findByprojectId(projectId);
        return projectMapper.entityToDto(result);
    }


//    public void deleteEmployeeProject(String projectId, int[] skill_set) {
//
//            Project result = projectRepository.deleteEmployeeSkills(projectId,skill_set);
//    }
    public void deleteProject(String projectId)
    {
        Project result=projectRepository.findByprojectId(projectId);
        projectRepository.delete(result);

    }
}
