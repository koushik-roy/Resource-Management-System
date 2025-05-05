package com.tek.rms.converter.database;

import com.tek.rms.model.CustomerStatus;
import com.tek.rms.model.DeleteStatus;
import org.springframework.stereotype.Component;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.Optional;

@Component
@Converter(autoApply = true)
public class DeleteStatusConverter implements AttributeConverter<DeleteStatus, String> {
    @Override
    public String convertToDatabaseColumn(DeleteStatus attribute) {
        return Optional.ofNullable(attribute).map(DeleteStatus::getCode).orElse(null);
    }

    @Override
    public DeleteStatus convertToEntityAttribute(String dbData) {
        return DeleteStatus.decode(dbData);
    }
}
