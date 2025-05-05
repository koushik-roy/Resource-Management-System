package com.tek.rms.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import java.util.stream.Stream;

public enum UserEnStatus {

    TYPE1("ACTIVE"),
    TYPE2("IN-ACTIVE");
   

    private String code;

    private UserEnStatus(String code) {

        this.code = code;
    }

    @JsonCreator
    public static UserEnStatus decode(final String code) {
        return Stream.of(UserEnStatus.values()).filter(targetEnum -> targetEnum.code.equals(code)).findFirst().orElse(null);
    }

    @JsonValue
    public String getCode() {

        return code;
    }


}

