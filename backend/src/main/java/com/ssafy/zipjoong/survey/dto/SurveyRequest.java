package com.ssafy.zipjoong.survey.dto;


import com.ssafy.zipjoong.survey.domain.*;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SurveyRequest {
    private int totalPrice;
    private SurveyDetail surveyDetail;
    private int monitorPrice;
    private int keyboardPrice;
    private int mousePrice;
    private int monitorUsage;
    private int keyboardUsage;
    private int mouseUsage;
    private Color keyboardColor;
    private Color mouseColor;
    private int monitorCount;
    private int keyboardLayout;
    private ConnectionType keyboardConnection;
    private ConnectionType mouseConnection;
    private boolean keyboardHealth;
    private boolean mouseHealth;
    private Integer monitorSize;
    private Integer monitorRatio;
    private PanelType monitorPanel;
    private KeyboardType keyboardType;
    private KeyboardSound keyboardSound;
    private Boolean mouseSound;
}
