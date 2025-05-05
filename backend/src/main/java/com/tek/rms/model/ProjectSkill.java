package com.tek.rms.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "project_skills")
@IdClass(ProjectSkillId.class)
public class ProjectSkill implements Serializable {

    @Id
    @Column(name = "project_id")
    private String projectId;

    @Id
    @Column(name = "skill_set")
    private int skill_set ;

    @Column(name = "required_number")
    private int required_number;


}
