package com.tek.rms.converter.database;

import com.tek.rms.model.CustomerStatus;
import org.springframework.stereotype.Component;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.Optional;

@Component
@Converter(autoApply = true)
public class CustomerStatusConverter implements AttributeConverter<CustomerStatus, String> {

    @Override
    public String convertToDatabaseColumn(CustomerStatus attribute) {
        return Optional.ofNullable(attribute).map(CustomerStatus::getCode).orElse(null);
    }

    @Override
    public CustomerStatus convertToEntityAttribute(String dbData) {
        return CustomerStatus.decode(dbData);
    }
}
