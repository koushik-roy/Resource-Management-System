package com.tek.rms.dto;
import lombok.Data;


@Data
public class SkillDto  {

    private int id;
    private String code;
    private String description;
    private int isDeleted;
}
