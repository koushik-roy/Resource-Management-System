package com.tek.rms.model;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;

public class Employee_project_Id implements Serializable {
    @Id
    @Column(nullable = false)
    private int employee_id;

    @Id
    @Column(nullable = false)
    private String project_id;
}
