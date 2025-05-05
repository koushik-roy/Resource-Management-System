package com.tek.rms.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "customer")
@SQLDelete(sql = "UPDATE customer SET isdeleted = 1 WHERE id=?")
@Where(clause = "isdeleted=0")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private int category;
    private String description;
    @Column(name = "status")
    private CustomerStatus status;
    @Column(name = "isdeleted")
    private int isDeleted;


}