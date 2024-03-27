package com.ssafy.zipjoong.survey.converter;

import com.ssafy.zipjoong.survey.domain.PanelType;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class PanelTypeConverter implements AttributeConverter<PanelType, String> {

    @Override
    public String convertToDatabaseColumn(PanelType attribute) {
        if (attribute == null) {
            return null;
        }
        return attribute.name();
    }

    @Override
    public PanelType convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.isEmpty()) {
            return null;
        }
        try {
            return PanelType.valueOf(dbData.toUpperCase());
        } catch (IllegalArgumentException e) {
            return null;
        }
    }
}


