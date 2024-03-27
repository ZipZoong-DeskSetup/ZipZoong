package com.ssafy.zipjoong.survey.converter;


import com.ssafy.zipjoong.survey.domain.Color;
import com.ssafy.zipjoong.survey.domain.SurveyDetail;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;


@Converter(autoApply = true)
public class SurveyDetailConverter implements AttributeConverter<SurveyDetail, String> {
    @Override
    public String convertToDatabaseColumn(SurveyDetail attribute) {
        if (attribute == null) {
            return null;
        }
        return attribute.name();
    }

    @Override
    public SurveyDetail convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.isEmpty()) {
            return null;
        }
        try {
            return SurveyDetail.valueOf(dbData.toUpperCase());
        } catch (IllegalArgumentException e) {
            return null;
        }
    }
}
