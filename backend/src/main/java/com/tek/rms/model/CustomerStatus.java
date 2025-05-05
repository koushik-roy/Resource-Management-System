package com.tek.rms.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import java.util.stream.Stream;

public enum CustomerStatus {
    TYPE1("ACTIVE"),
    TYPE2("INACTIVE");

    private String code;

    private CustomerStatus(String code){
        this.code=code;
    }

    @JsonCreator
    public static CustomerStatus decode(final String code){
        return Stream.of(CustomerStatus.values()).filter(x->x.code.equals(code)).findFirst().orElse(null);
    }

    @JsonValue
    public String getCode(){
        return code;
    }
}

