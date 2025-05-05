package com.tek.rms.mapper;

import com.tek.rms.dto.SkillDto;
import com.tek.rms.model.Skill;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class SkillMapper {
	
	public SkillDto entityToDto(Skill skill)
	{
		SkillDto dto=new SkillDto();
		if(skill.getId()!=0)
		{
		dto.setId(skill.getId());
		}
		if(skill.getCode()!=null)
		{
		dto.setCode(skill.getCode());
		}
		if(skill.getDescription()!=null)
		{
		dto.setDescription(skill.getDescription());
		}
		if(skill.getIsDeleted()!=0)
			dto.setIsDeleted(skill.getIsDeleted());
		return dto;
		
	}
	public List<SkillDto> entityToDto(List<Skill> skill)
	{
		return  skill.stream().map(x->entityToDto(x)).collect(Collectors.toList());
	}
 public Skill dtoToEntity(SkillDto dto)
 {
	 Skill s=new Skill();
	 if(dto.getId()!=0)
	 {
	 s.setId(dto.getId());
	 }
	 if(dto.getCode()!=null)
	 {
	 s.setCode(dto.getCode());
	 }
	 if(dto.getDescription()!=null)
	 {
	 s.setDescription(dto.getDescription());
	 }
	 if(dto.getIsDeleted()!=0)
		 s.setIsDeleted(dto.getIsDeleted());
	 return s;
 }
 public List<Skill> dtoToEntity(List<SkillDto> dto)
 {
	 return dto.stream()
			 .map(x->dtoToEntity(x)).collect(Collectors.toList());
 }
}