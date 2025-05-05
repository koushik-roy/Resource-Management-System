package com.tek.rms.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "employee_projects")
@SQLDelete(sql = "UPDATE employee_projects SET isdeleted = 1 WHERE id=?")
@Where(clause = "isdeleted=0")
@IdClass(Employee_project_Id.class)
public class Employee_project implements Serializable {
    @Id
    @Column(nullable = false)
    private int employee_id;

    @Id
    @Column(nullable = false)
    private String project_id;

    private int allocation_percentage;

    @CreationTimestamp
    @Column(name = "assigned_date")
    private Date assignedDate;

    @UpdateTimestamp
    @Column(name = "updated_date")
    private Date updatedDate;

    @Column(name = "isdeleted")
    private int isDeleted;
}