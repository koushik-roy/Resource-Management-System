package com.tek.rms.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "resource")
@SQLDelete(sql = "UPDATE resource SET isdeleted = 1 WHERE id=?")
@Where(clause = "isdeleted=0")
public class Resource {
    @Id
    @Column(name = "employee_id")
    private Long employee_id;
    @Column(name = "peoplesoft_id",updatable = false)
    private Long peoplesoft_id;
    private int role_id;
    private String first_name;
    private String last_name;
    private String mail_id;
    private long business_unit_id;
    @CreationTimestamp
    private Date created_timestamp;
    @UpdateTimestamp
    private Date updated_timestamp;
    @Column(name = "isdeleted")
    private int isDeleted;

    @OneToMany(targetEntity = Employee_project.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "employee_id", referencedColumnName = "employee_id")
    private List<Employee_project> employee_projects;

    @OneToMany(targetEntity = Employee_skills.class, cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name = "employee_id", referencedColumnName = "employee_id")
    private List<Employee_skills> employee_skills;
}