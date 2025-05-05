package com.tek.rms.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "skill_set")
@SQLDelete(sql = "UPDATE skill_set SET isdeleted = 1 WHERE id=?")
@Where(clause = "isdeleted=0")
public class Skill {

    @Id
    private int id;

    @Column(name = "code")
    private String code;

    @Column(name = "description")
    private String description;

    @Column(name = "isdeleted")
    private int isDeleted;
}
