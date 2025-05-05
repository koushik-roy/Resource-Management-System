package com.tek.rms.service;
import com.tek.rms.dto.Employee_projectDto;
import com.tek.rms.dto.Employee_skillsDto;
import com.tek.rms.mapper.Employee_projectMapper;
import com.tek.rms.model.Business;
import com.tek.rms.model.Employee_project;
import com.tek.rms.model.Employee_skills;
import com.tek.rms.repository.Employee_projectRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Employee_projectService {
    @Autowired
    Employee_projectRepository employee_projectRepository;
    @Autowired
    Employee_projectMapper employee_projectMapper;

    public  List<Employee_projectDto> findEmployee_projects() {
        List<Employee_project> results = employee_projectRepository.findAll();
        return employee_projectMapper.entityToDto(results);
    }

    public void addEmployee_Project(Employee_projectDto employee_projectDTO, int project_id)
    {

        Employee_project employee_project=employee_projectRepository
                .save(employee_projectMapper.DtoToEntity(employee_projectDTO));
        employee_projectRepository.findById(project_id);
        employee_projectMapper.entityToDto(employee_project);
    }

    public void addEmployee(Employee_projectDto employee_projectDTO, int employee_id)
    {

        Employee_project employee_project=employee_projectRepository
                .save(employee_projectMapper.DtoToEntity(employee_projectDTO));
        employee_projectRepository.findById(employee_id);
        employee_projectMapper.entityToDto(employee_project);
    }

    public List<Employee_projectDto> findEmployeeProjects()
    {
        List<Employee_project> results=employee_projectRepository.findAll();
        return employee_projectMapper.entityToDto(results);
    }

    public String deleteEmployeeProjects(int employeeId, String projectId){
        employee_projectRepository.deleteEmployeeProjects(employeeId, projectId);
        return ("deleted successfully");
    }

    public String updateEmployeeProjects(int employeeId, String projectId){
        employee_projectRepository.updateEmployeeProjects(employeeId, projectId);
        return ("updated successfully");
    }


}