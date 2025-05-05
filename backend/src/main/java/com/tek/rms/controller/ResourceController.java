package com.tek.rms.controller;
import com.tek.rms.dto.ResourceDto;
import com.tek.rms.service.Employee_projectService;
import com.tek.rms.service.ResourceService;
import com.tek.rms.util.RMSConstant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController

@CrossOrigin(origins = "http://localhost:3000/")

@RequestMapping("/Resource")
public class ResourceController {
    @Autowired
    ResourceService resourceService;
    @Autowired
    Employee_projectService employee_projectService;
    @PostMapping("/addResource")
    public String newResource(@RequestBody ResourceDto resourceDTO) {

        return resourceService.addResource(resourceDTO);

    }

    @PutMapping("/updateResource")
    public String updateResource(@RequestBody ResourceDto resourceDTO) {
        return resourceService.updateResource(resourceDTO);
    }
    @PutMapping("/updateIsDelete/{id}")
    public String updateIsDelete(@PathVariable Long id) {
        return resourceService.updateIsDeleted(id);
    }

    @GetMapping("/{resourceId}")
    public ResourceDto findResourceById(@PathVariable(value = RMSConstant.ResourceName) Long employee_id) {
        return resourceService.findResourceById(employee_id);
    }
    @GetMapping("/resources")
    public List<ResourceDto> findResources()
    {
        return resourceService.findResources();
    }

    @DeleteMapping("/deleteResource/{employee_id}")
    public String deleteResource(@PathVariable Long employee_id){
        return resourceService.deleteResource(employee_id);
    }

}