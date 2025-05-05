package com.tek.rms.controller;

import java.util.List;

import com.tek.rms.util.RMSConstant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.tek.rms.dto.ResourceRoleDto;
import com.tek.rms.service.ResourceRoleService;






@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/role")
public class ResourceRoleController {
	
	@Autowired
	private ResourceRoleService resourceRoleService;

	@PostMapping("/addRole")
	public String addRole(@RequestBody ResourceRoleDto roleDto) {
    return resourceRoleService.saveUser(roleDto);
	}
	
	@GetMapping("/roles")
    public List<ResourceRoleDto> findall() {
      
      return  resourceRoleService.findAll();
        
    }
    @PutMapping("/updateResourceRole")
    public String updateResourceRole(@RequestBody ResourceRoleDto resourceRoleDto)  {;
        return resourceRoleService.updateResourceRole(resourceRoleDto);
    }
    @GetMapping("/roleById/{id}")
    public ResourceRoleDto findById(@PathVariable(value = RMSConstant.ID) int id){
        return resourceRoleService.findById(id);
    }


    @DeleteMapping("/deleteRole/{id}")
    public String deleteResouceRole(@PathVariable int id){

        return resourceRoleService.deleteResourceRole(id);
    }

}
