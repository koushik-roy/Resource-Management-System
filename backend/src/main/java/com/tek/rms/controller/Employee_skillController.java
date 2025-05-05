package com.tek.rms.controller;
import com.tek.rms.dto.Employee_skillsDto;
import com.tek.rms.service.Employee_skillsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/EmployeeSkills")
public class Employee_skillController {
    @Autowired
    Employee_skillsService employee_skillsService;
    @PostMapping("/addSkill/{skill_id}")
    public String addEmployee_skill(@RequestBody Employee_skillsDto employee_skillsDTO, @PathVariable List<Integer> skill_id)
    {
        return employee_skillsService.addEmployee_skill(employee_skillsDTO, skill_id);
    }

    @DeleteMapping("/delete")
    public String deleteEmployeeSkills(@RequestBody Employee_skillsDto employee_skillsDto){
        if(employee_skillsDto.getSkill_id()==0)
            return ("id Not found");
        return employee_skillsService.deleteEmployeeSkills(employee_skillsDto.getEmployee_id(), employee_skillsDto.getSkill_id());

    }

}