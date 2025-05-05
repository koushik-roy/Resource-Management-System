package com.tek.rms.dto;

import lombok.Data;

@Data
public class CustomerCategoryDto {
    private Long id;
    private String code;
    private String description;
    private int isDeleted;
}
