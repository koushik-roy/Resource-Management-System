package com.tek.rms.dto;

import com.tek.rms.model.Enstatus;
import com.tek.rms.model.ProjectSkill;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;


@Data
public class ProjectDto {
    private String projectId;
    private int customer_id;
    private String project_name;
    private int business_unit_id;
    private String project_description;
    private Enstatus status;
    private Date start_date;
    private Date end_date;
    private List<ProjectSkill> projectSkillList;
}

//to do adding  list of projectSkill id here