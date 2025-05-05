package com.tek.rms.dto;

import com.tek.rms.model.CustomerStatus;
import lombok.Data;

@Data
public class CustomerDto {
    private Long id;
    private String name;
    private int category;
    private String description;
    private CustomerStatus status;
    private int isDeleted;

}
