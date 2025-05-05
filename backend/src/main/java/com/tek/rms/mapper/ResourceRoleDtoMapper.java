package com.tek.rms.mapper;

import com.tek.rms.dto.ResourceRoleDto;
import com.tek.rms.model.ResourceRole;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;


@Component
public class ResourceRoleDtoMapper {
	
	public ResourceRoleDto entityToDto(ResourceRole role) {
		ResourceRoleDto dto=new ResourceRoleDto();
		if(role.getId()!=0) {
			dto.setId(role.getId());
		}
		if(role.getCode() != null) {
			dto.setCode(role.getCode());
		}
		if(role.getDecsription() !=null) {
			dto.setDecsription(role.getDecsription());
		}
		if(role.getIsDeleted()!=0)
			dto.setIsDeleted(role.getIsDeleted());
		
		return dto;
	}
	public List<ResourceRoleDto> entityToDto(List<ResourceRole> role){
		return role.stream().map(x-> entityToDto(x)).collect(Collectors.toList());
	}
	 

	
	public ResourceRole dtoToEntity(ResourceRoleDto dto) {
		ResourceRole role=new ResourceRole();
		if(dto.getId() !=0) {
			role.setId(dto.getId());
		}
		if(dto.getCode() !=null) {
			role.setCode(dto.getCode());
		}
		if(dto.getDecsription() != null) {
			role.setDecsription(dto.getDecsription());
		}
		if(dto.getIsDeleted()!=0)
			role.setIsDeleted(dto.getIsDeleted());
		
		return role;
	}
	public List<ResourceRole> dtoToEntity(List<ResourceRoleDto> dto){
		return dto.stream().map(x-> dtoToEntity(x)).collect(Collectors.toList());
	}
	
	


}
