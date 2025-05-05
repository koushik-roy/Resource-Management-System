package com.tek.rms.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.List;
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Employee_skills_Id implements Serializable {
    @Id
    @Column(name = "employee_id", nullable = false)
    private int employee_id;

    @Id
    @Column(name = "skill_set", nullable = false)
    private Integer skill_id;
}
