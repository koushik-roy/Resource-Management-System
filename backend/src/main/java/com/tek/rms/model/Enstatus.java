package com.tek.rms.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import java.util.stream.Stream;

public enum Enstatus {

    TYPE1("ON_HOLD"),
    TYPE2("ACTIVE"),
    TYPE3("COMPLETED");

    private String code;

    private Enstatus(String code) {

        this.code = code;
    }

    @JsonCreator
    public static Enstatus decode(final String code) {
        return Stream.of(Enstatus.values()).filter(targetEnum -> targetEnum.code.equals(code)).findFirst().orElse(null);
    }

    @JsonValue
    public String getCode() {

        return code;
    }


}
