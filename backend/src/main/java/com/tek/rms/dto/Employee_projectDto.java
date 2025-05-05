package com.tek.rms.dto;
import lombok.Data;

import java.util.Date;

@Data
public class Employee_projectDto {
    private int employee_id;
    private String project_id;
    private int allocation_percentage;
    private Date assignedDate;
    private Date updatedDate;
    private int isDeleted;
}