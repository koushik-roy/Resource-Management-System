package com.tek.rms.mapper;
import com.tek.rms.dto.Employee_skillsDto;
import com.tek.rms.model.Employee_skills;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.stream.Collectors;
@Component
public class Employee_skillsMapper {
    public Employee_skillsDto entityToDto(Employee_skills employee_skills)
    {
        Employee_skillsDto employee_skillsDTO=new Employee_skillsDto();
        if(employee_skills.getEmployee_id()!=0)
            employee_skillsDTO.setEmployee_id(employee_skills.getSkill_id());
        if(employee_skills.getSkill_id()!=0)
            employee_skillsDTO.setSkill_id(employee_skills.getSkill_id());
        return employee_skillsDTO;
    }
    public List<Employee_skillsDto> entityToDto(List<Employee_skills> employee_skills)
    {
        return employee_skills.stream().map(this::entityToDto).collect(Collectors.toList());
    }

    public Employee_skills dtoToEntity(Employee_skillsDto employee_skillsDTO)
    {
        Employee_skills employee_skills=new Employee_skills();
        if(employee_skillsDTO.getEmployee_id()!=0)
            employee_skills.setEmployee_id(employee_skillsDTO.getEmployee_id());
        if(employee_skillsDTO.getSkill_id()!=0)
            employee_skills.setSkill_id(employee_skillsDTO.getSkill_id());
        return employee_skills;
    }
    public List<Employee_skills> dtoToEntity(List<Employee_skillsDto>  employee_skillsDTO)
    {
        return employee_skillsDTO.stream().map(this::dtoToEntity).collect(Collectors.toList());
    }

}