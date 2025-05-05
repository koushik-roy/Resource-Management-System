package com.tek.rms.converter.database;


import org.springframework.stereotype.Component;

import com.tek.rms.model.UserEnStatus;

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
public class UserStatusConverter implements AttributeConverter<UserEnStatus, String> {

    @Override
    public String convertToDatabaseColumn(final UserEnStatus attribute) {
        return Optional.ofNullable(attribute).map(UserEnStatus::getCode).orElse(null);
    }

    @Override
    public UserEnStatus convertToEntityAttribute(final String dbData) {

        return UserEnStatus.decode(dbData);
    }
}
