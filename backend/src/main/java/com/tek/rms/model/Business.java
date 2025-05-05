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
@Entity(name = "business_unit")
@Table(name = "business_unit")
@SQLDelete(sql = "UPDATE business_unit SET isdeleted = 1 WHERE id=?")
@Where(clause = "isdeleted=0")
public class Business {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(unique = true, name = "unit_code")
	private String code;
	private String unit_description;
	@Column(name = "isdeleted")
	private int isDeleted;

}