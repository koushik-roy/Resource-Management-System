package com.tek.rms.controller;
import com.tek.rms.dto.BusinessDto;
import com.tek.rms.dto.Employee_projectDto;
import com.tek.rms.dto.Employee_skillsDto;
import com.tek.rms.service.Employee_projectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/EmployeeProject")
public class Employee_projectController {
    @Autowired
    Employee_projectService employee_projectService;
    @PostMapping("/addProject/{project_id}")
    public void addEmployee_Project(@RequestBody Employee_projectDto employee_projectDTO, @PathVariable int project_id)
    {
        employee_projectService.addEmployee_Project(employee_projectDTO, project_id);
    }


    @PostMapping("/employee/{employee_id}")
    public void addEmployee(@RequestBody Employee_projectDto employee_projectDTO, @PathVariable int employee_id)
    {
        employee_projectService.addEmployee(employee_projectDTO, employee_id);
    }


    @GetMapping("/employeeProjects")
    public List<Employee_projectDto> findEmployeeProjectId()
    {
        return employee_projectService.findEmployeeProjects();
    }

    @PutMapping("/delete")
    public String deleteEmployeeProjects(@RequestBody Employee_projectDto employee_projectDto){
        return employee_projectService.deleteEmployeeProjects(employee_projectDto.getEmployee_id(), employee_projectDto.getProject_id());
    }

    @PutMapping("/updateExistingProject")
    public String updateEmployeeProjects(@RequestBody Employee_projectDto employee_projectDto){
        return employee_projectService.updateEmployeeProjects(employee_projectDto.getEmployee_id(), employee_projectDto.getProject_id());
    }
}