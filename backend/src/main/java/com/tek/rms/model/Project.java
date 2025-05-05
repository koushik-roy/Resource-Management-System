package com.tek.rms.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "project")
public class Project {

    @Id

    @Column(name = "project_id")
    private String projectId;

    @Column(name = "customer_id")
    private int customer_id;

    @Column(name = "business_unit_id")
    private int business_unit_id;

    @Column(name = "project_name")
    private String project_name;

    @Column(name = "project_description")
    private String project_description;

    @Column(name = "status")
    private Enstatus status;

    @Column(name = "start_date")
    private Date start_date;

    @Column(name = "end_date")
    private Date end_date;

    @OneToMany(targetEntity = ProjectSkill.class, cascade = {CascadeType.ALL },orphanRemoval = true)
    @JoinColumn(name = "project_id", referencedColumnName = "project_id")
    private List<ProjectSkill> projectSkillList;


    }

