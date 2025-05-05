package com.tek.rms.service;

import java.util.List;

import com.tek.rms.exceptions.InvalidBusinessException;
import com.tek.rms.mapper.ResourceRoleDtoMapper;

import com.tek.rms.util.RMSConstant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tek.rms.dto.ResourceRoleDto;
import com.tek.rms.exceptions.RoleNotFoundException;
import com.tek.rms.model.ResourceRole;
import com.tek.rms.repository.ResourceRoleRepository;






@Service
public class ResourceRoleService {
	
	@Autowired
	private  ResourceRoleRepository roleRepository;
	
	@Autowired
	ResourceRoleDtoMapper resourceMapper;
	
	public String saveUser(ResourceRoleDto roleDto) throws RoleNotFoundException {
		ResourceRole role=resourceMapper.dtoToEntity(roleDto);
		if (!roleRepository.existsByCode(role.getCode())) {
			role = roleRepository.save(role);
		} else {
			throw new RoleNotFoundException("already exists");
		}
		return "Successfully Added";
		 
}
	public List < ResourceRoleDto > findAll() {

		List<ResourceRole> findAll= roleRepository.findAllResource_role();

		return resourceMapper.entityToDto(findAll);
    }
	
	

	public ResourceRoleDto findById(int id){
        ResourceRole result=roleRepository.findById(id).orElseThrow(() -> new RoleNotFoundException("role not found with id :" + id));
        
        return resourceMapper.entityToDto(result);
    }


	public String updateResourceRole(ResourceRoleDto resourceRoleDto) {

		ResourceRole role=resourceMapper.dtoToEntity(resourceRoleDto);
		ResourceRole existingResourceRole=roleRepository.findById(role.getId()).orElse(null);
		if(role.getCode()!=null)
		{
			existingResourceRole.setCode(role.getCode());
		}
		if(role.getDecsription()!=null)
		{
			existingResourceRole.setDecsription(role.getDecsription());
		}

		existingResourceRole=roleRepository.save(existingResourceRole);
		resourceMapper.entityToDto(existingResourceRole);
		return RMSConstant.UPDATEROLE;

	}


	public String deleteResourceRole(int id){
		ResourceRole result=roleRepository.findById(id).orElse(null);
		assert result != null;
		roleRepository.deleteById(result.getId());

		return ("successfully deleted");
	}
	


}
