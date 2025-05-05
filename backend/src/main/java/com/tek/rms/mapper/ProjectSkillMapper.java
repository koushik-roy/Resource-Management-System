package com.tek.rms.mapper;

import com.tek.rms.dto.ProjectDto;
import com.tek.rms.dto.ProjectSkillDto;
import com.tek.rms.dto.SkillDto;
import com.tek.rms.model.ProjectSkill;
import com.tek.rms.model.Skill;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ProjectSkillMapper {
    public ProjectSkillDto entityToDto(ProjectSkill projectSkill){
        ProjectSkillDto dto=new ProjectSkillDto();
        if(projectSkill.getProjectId()!=null){
            dto.setProjectId(projectSkill.getProjectId());
        }
        if (projectSkill.getSkill_set()!=0){
            dto.setSkill_set(projectSkill.getSkill_set());
        }
        if (projectSkill.getRequired_number()!=0){
            dto.setRequired_number(projectSkill.getRequired_number());
        }
        return dto;
    }

    public List<ProjectSkillDto> entityToDto(List<ProjectSkill> projectSkillList){
        return projectSkillList.stream().map(this::entityToDto).collect(Collectors.toList());
    }

    public ProjectSkill dtoToEntity(ProjectSkillDto projectSkillDto){
        ProjectSkill entity=new ProjectSkill();
        if(entity.getProjectId()!=null){
            entity.setProjectId(projectSkillDto.getProjectId());
        }
        if (entity.getSkill_set()!=0){
            entity.setSkill_set(projectSkillDto.getSkill_set());
        }
        if(entity.getRequired_number()!=0){
            entity.setRequired_number(projectSkillDto.getRequired_number());
        }
        return entity;
    }

    public List<ProjectSkill> dtoToEntity(List<ProjectSkillDto> projectSkillDtos){
        return projectSkillDtos.stream().map(this::dtoToEntity).collect(Collectors.toList());
    }
}
