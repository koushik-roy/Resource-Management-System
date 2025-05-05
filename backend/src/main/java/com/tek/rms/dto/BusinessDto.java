package com.tek.rms.dto;
import com.tek.rms.model.DeleteStatus;
import lombok.Data;
@Data
public class BusinessDto  {
    private Long id;
    private String code;
    private String unit_description;
    private int isDeleted;

}