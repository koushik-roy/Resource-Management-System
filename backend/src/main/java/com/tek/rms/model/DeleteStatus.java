package com.tek.rms.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import java.util.stream.Stream;

public enum DeleteStatus {
    TYPE1("0"),
    TYPE2("1");

    private String code;

    private DeleteStatus(String code) {
        this.code = code;
    }

    @JsonCreator
    public static DeleteStatus decode(final String code) {
        return Stream.of(DeleteStatus.values()).filter(targetEnum -> targetEnum.code.equals(code)).findFirst().orElse(null);
    }

    @JsonValue
    public String getCode() {

        return code;
    }


}

