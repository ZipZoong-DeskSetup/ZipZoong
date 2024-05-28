package com.ssafy.zipjoong.survey.converter;

import com.ssafy.zipjoong.survey.domain.ConnectionType;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class ConnectionTypeConverter implements AttributeConverter<ConnectionType, String> {

    @Override
    public String convertToDatabaseColumn(ConnectionType attribute) {
        if (attribute == null) {
            return null;
        }
        return attribute.name();
    }

    @Override
    public ConnectionType convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.isEmpty()) {
            return null;
        }
        try {
            return ConnectionType.valueOf(dbData.toUpperCase());
        } catch (IllegalArgumentException e) {
            return null;
        }
    }
}

