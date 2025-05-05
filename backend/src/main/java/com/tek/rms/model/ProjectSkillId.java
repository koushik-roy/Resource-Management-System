package com.tek.rms.model;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;

public class ProjectSkillId implements Serializable {
    @Id
    @Column(name = "project_id")
    private String projectId;
    @Id
    @Column(name = "skill_set")
    private int skill_set;
}
