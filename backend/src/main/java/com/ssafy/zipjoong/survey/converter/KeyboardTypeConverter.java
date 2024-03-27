package com.ssafy.zipjoong.survey.converter;

import com.ssafy.zipjoong.survey.domain.KeyboardType;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class KeyboardTypeConverter implements AttributeConverter<KeyboardType, String> {

    @Override
    public String convertToDatabaseColumn(KeyboardType attribute) {
        if (attribute == null) {
            return null;
        }
        return attribute.name();
    }

    @Override
    public KeyboardType convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.isEmpty()) {
            return null;
        }
        try {
            return KeyboardType.valueOf(dbData.toUpperCase());
        } catch (IllegalArgumentException e) {
            return null;
        }
    }
}

