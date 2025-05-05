package com.tek.rms.dto;
import com.tek.rms.model.Employee_project;
import com.tek.rms.model.Employee_skills;
import lombok.Data;
import java.util.Date;
import java.util.List;

@Data
public class ResourceDto {
    private Long employee_id;
    private Long peoplesoft_id;
    private int role_id;
    private String first_name;
    private String last_name;
    private String mail_id;
    private long business_unit_id;
    private Date created_timestamp;
    private Date updated_timestamp;
    private int isDeleted;
    private List<Employee_project> employee_projects;
    private List<Employee_skills> employee_skills;
}

