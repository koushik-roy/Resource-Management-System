package com.tek.rms.mapper;
import com.tek.rms.dto.Employee_projectDto;
import com.tek.rms.dto.Employee_skillsDto;
import com.tek.rms.model.Employee_project;
import com.tek.rms.model.Employee_skills;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.stream.Collectors;
@Component
public class Employee_projectMapper {
    public Employee_projectDto entityToDto(Employee_project employee_project) {
        Employee_projectDto employee_projectDTO = new Employee_projectDto();
        if (employee_project.getEmployee_id() != 0)
            employee_projectDTO.setEmployee_id(employee_project.getEmployee_id());
        if (employee_project.getProject_id() != null)
            employee_projectDTO.setProject_id(employee_project.getProject_id());
        if (employee_project.getAllocation_percentage() != 0)
            employee_projectDTO.setAllocation_percentage(employee_project.getAllocation_percentage());
        if(employee_project.getAssignedDate()!=null)
            employee_projectDTO.setAssignedDate(employee_project.getAssignedDate());
        employee_projectDTO.setUpdatedDate(employee_project.getUpdatedDate());

        if(employee_projectDTO.getIsDeleted()!=0){
            employee_projectDTO.setIsDeleted((employee_project.getIsDeleted()));
        }
        return employee_projectDTO;
    }

    public List<Employee_projectDto> entityToDto(List<Employee_project> employee_project) {
        return employee_project.stream().map(this::entityToDto).collect(Collectors.toList());
    }

    public Employee_project DtoToEntity(Employee_projectDto employee_projectDTO) {
        Employee_project employee_project = new Employee_project();
        if (employee_projectDTO.getEmployee_id() != 0)
            employee_project.setEmployee_id(employee_projectDTO.getEmployee_id());
        if (employee_projectDTO.getProject_id() != null)
            employee_project.setProject_id(employee_projectDTO.getProject_id());
        if (employee_projectDTO.getAllocation_percentage() != 0)
            employee_project.setAllocation_percentage(employee_projectDTO.getAllocation_percentage());
        if(employee_projectDTO.getAssignedDate()!=null)
           employee_project.setAssignedDate(employee_projectDTO.getAssignedDate());
        employee_project.setUpdatedDate(employee_projectDTO.getUpdatedDate());
        if(employee_projectDTO.getIsDeleted()!=0){
            employee_project.setIsDeleted((employee_projectDTO.getIsDeleted()));
        }
        return employee_project;
    }

//    public List<Employee_project> dtoToEntity(List<Employee_projectDto>  employee_projectDTO)
//    {
//        return employee_projectDTO.stream().map(this::dtoToEntity).collect(Collectors.toList());
//    }
}