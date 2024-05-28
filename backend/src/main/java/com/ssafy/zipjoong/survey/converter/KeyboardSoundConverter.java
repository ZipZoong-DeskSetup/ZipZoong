package com.ssafy.zipjoong.survey.converter;

import com.ssafy.zipjoong.survey.domain.KeyboardSound;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class KeyboardSoundConverter implements AttributeConverter<KeyboardSound, String> {

    @Override
    public String convertToDatabaseColumn(KeyboardSound attribute) {
        if (attribute == null) {
            return null;
        }
        return attribute.name();
    }

    @Override
    public KeyboardSound convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.isEmpty()) {
            return null;
        }
        try {
            return KeyboardSound.valueOf(dbData.toUpperCase());
        } catch (IllegalArgumentException e) {
            return null;
        }
    }
}

