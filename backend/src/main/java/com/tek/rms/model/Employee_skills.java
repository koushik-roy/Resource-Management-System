package com.tek.rms.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Data
@Table(name = "employee_skills")
@IdClass(Employee_skills_Id.class)
public class Employee_skills implements Serializable {
    @Id
    @Column(name = "employee_id", nullable = false)
    private int employee_id;

    @Id
    @Column(name = "skill_set", nullable = false)
    private Integer skill_id;


}