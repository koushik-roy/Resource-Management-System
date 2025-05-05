package com.tek.rms.mapper;

import com.tek.rms.dto.ProjectDto;
import com.tek.rms.model.Project;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;
@Component
public class ProjectMapper {

    public ProjectDto entityToDto(Project project)
    {
        ProjectDto dto=new ProjectDto();
        if(project.getProjectId()!=null)
        {
        dto.setProjectId(project.getProjectId());
        }
        if(project.getCustomer_id()!=0)
        {
        dto.setCustomer_id(project.getCustomer_id());
        }
        if(project.getBusiness_unit_id()!=0)
        {
        dto.setBusiness_unit_id(project.getBusiness_unit_id());
        }
        if(project.getProject_name()!=null){
            dto.setProject_name(project.getProject_name());
        }
        if(project.getProject_description()!=null)
        {
        dto.setProject_description(project.getProject_description());
        }
        if(project.getStatus()!=null)
        {
        dto.setStatus(project.getStatus());
        }
        if(project.getStart_date()!=null)
        {
        dto.setStart_date(project.getStart_date());
        }
        if(project.getEnd_date()!=null)
        {
        dto.setEnd_date(project.getEnd_date());
        }
        if(project.getProjectSkillList()!=null)
            dto.setProjectSkillList(project.getProjectSkillList());
        return dto;

    }
    public List<ProjectDto> entityToDto(List<Project> project)
    {
        return  project.stream().map(this::entityToDto).collect(Collectors.toList());
    }
    public Project dtoToEntity(ProjectDto dto)
    {
        Project p=new Project();
        if(dto.getProjectId()!=null)
        {
        p.setProjectId(dto.getProjectId());
        }
        if(dto.getCustomer_id()!=0)
        {
        p.setCustomer_id(dto.getCustomer_id());
        }
        if(dto.getBusiness_unit_id()!=0)
        {
        p.setBusiness_unit_id(dto.getBusiness_unit_id());
        }
        if(dto.getProject_name()!=null){
            p.setProject_name(dto.getProject_name());
        }
        if(dto.getProject_description()!=null)
        {
        p.setProject_description(dto.getProject_description());
        }
        if(dto.getStatus()!=null)
        {
        p.setStatus(dto.getStatus());
        }
        if(dto.getStart_date()!=null)
        {
        p.setStart_date(dto.getStart_date());
        }
        if(dto.getEnd_date()!=null)
        {
        p.setEnd_date(dto.getEnd_date());
        }
        if(dto.getProjectSkillList()!=null){
            p.setProjectSkillList(dto.getProjectSkillList());
        }
        return p;
    }
    public List<Project> dtoToEntity(List<ProjectDto> dto)
    {
        return dto.stream()
                .map(this::dtoToEntity).collect(Collectors.toList());
    }
}
