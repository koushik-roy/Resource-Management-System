package com.tek.rms.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="resource_role")

@SQLDelete(sql = "UPDATE resource_role SET isdeleted=1 WHERE id=?")

@Where(clause = "isdeleted=0")
public class ResourceRole {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private int id;
	@Column(name="code")
	private String code;
	@Column(name="decsription")
	private String decsription;
	@Column(name = "isdeleted")
	private int isDeleted;
}
