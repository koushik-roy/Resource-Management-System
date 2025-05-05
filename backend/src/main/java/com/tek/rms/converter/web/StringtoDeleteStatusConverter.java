package com.tek.rms.converter.web;

import com.tek.rms.model.DeleteStatus;
import com.tek.rms.model.Enstatus;
import org.springframework.core.convert.converter.Converter;

@RequestParameterConverter
public class StringtoDeleteStatusConverter implements Converter<String, DeleteStatus> {
    @Override
    public DeleteStatus convert(String source) {
        return DeleteStatus.decode(source);
    }
}
