package com.tek.rms.converter.database;

import com.tek.rms.model.Enstatus;
import org.springframework.stereotype.Component;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.Optional;

/**
 * AttributeConvertEnItemTypeype, String>. Implements the following methods :
 * <ul>
 * <li>convertToDatabaseColumn : (given an Enum returns a String)
 * <li>convertToEntityAttribute : (given a String returns an Enum)
 * </ul>
 */
@Component
@Converter(autoApply = true)
public class StatusConverter implements AttributeConverter<Enstatus, String> {

    @Override
    public String convertToDatabaseColumn(final Enstatus attribute) {
        return Optional.ofNullable(attribute).map(Enstatus::getCode).orElse(null);
    }

    @Override
    public Enstatus convertToEntityAttribute(final String dbData) {

        return Enstatus.decode(dbData);
    }
}
