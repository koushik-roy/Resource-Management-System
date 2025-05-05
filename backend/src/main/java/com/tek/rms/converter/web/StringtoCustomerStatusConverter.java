package com.tek.rms.converter.web;

import com.tek.rms.model.CustomerStatus;
import org.springframework.core.convert.converter.Converter;

import java.lang.annotation.Annotation;

@RequestParameterConverter
public class StringtoCustomerStatusConverter implements Converter<String, CustomerStatus> {
    @Override
    public CustomerStatus convert(String source){
        return CustomerStatus.decode(source);
    }
}
