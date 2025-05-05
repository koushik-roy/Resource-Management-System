package com.tek.rms.converter.web;


import org.springframework.core.convert.converter.Converter;

import com.tek.rms.model.UserEnStatus;


public class StringToUserStatusConverter implements Converter<String, UserEnStatus> {

    @Override
    public UserEnStatus convert(String source) {

        return UserEnStatus.decode(source);
    }
}

