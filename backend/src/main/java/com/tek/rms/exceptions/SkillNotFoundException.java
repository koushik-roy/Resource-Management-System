package com.tek.rms.exceptions;

public class SkillNotFoundException extends RuntimeException{
    public SkillNotFoundException(int id){

        super("Could not found Skill with id " +id);
    }

}
