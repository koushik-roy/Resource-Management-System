package com.tek.rms.service;
import com.tek.rms.dto.Employee_skillsDto;
import com.tek.rms.mapper.Employee_skillsMapper;
import com.tek.rms.model.Employee_skills;
import com.tek.rms.model.Employee_skills_Id;
import com.tek.rms.repository.Employee_skillsRepository;

import com.tek.rms.util.RMSConstant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Employee_skillsService {
    @Autowired
    Employee_skillsMapper employee_skillsMapper;
    @Autowired
    Employee_skillsRepository employee_skillsRepository;
    public String addEmployee_skill(Employee_skillsDto employee_skillsDTO, List<Integer> skill_id)
    {
        Employee_skills employee_skills=employee_skillsRepository.save(employee_skillsMapper.dtoToEntity(employee_skillsDTO));
        employee_skillsRepository.findAllById(skill_id);
        employee_skillsMapper.entityToDto(employee_skills);
        return RMSConstant.ADD1;
    }

    public String deleteEmployeeSkills(int employeeId, int skillId){
        employee_skillsRepository.deleteEmployeeSkills(employeeId, skillId);
        return ("deleted successfully");
    }

}