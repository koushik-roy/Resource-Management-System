package com.tek.rms.converter.web;

import com.tek.rms.model.Enstatus;
import org.springframework.core.convert.converter.Converter;

@RequestParameterConverter


public class StringToStatusConverter implements Converter<String, Enstatus> {

    @Override
    public Enstatus convert(String source) {
        return Enstatus.decode(source);
    }

}