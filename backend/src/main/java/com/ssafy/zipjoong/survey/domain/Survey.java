package com.ssafy.zipjoong.survey.domain;

import com.ssafy.zipjoong.survey.converter.ColorConverter;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "survey")
@ToString
public class Survey implements Serializable {

    @Id
    @Column(name = "survey_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int surveyId;

    @Column(name = "user_id", nullable = false, length = 50)
    private String userId;

    @Column(name = "total_price", nullable = false)
    private int totalPrice;

    @Enumerated(EnumType.STRING)
    @Column(name = "survey_detail", nullable = false)
    private SurveyDetail surveyDetail;

    @Column(name = "monitor_price", nullable = false)
    private int monitorPrice;

    @Column(name = "keyboard_price", nullable = false)
    private int keyboardPrice;

    @Column(name = "mouse_price", nullable = false)
    private int mousePrice;

    @Column(name = "monitor_usage", nullable = false)
    private int monitorUsage;

    @Column(name = "keyboard_usage", nullable = false)
    private int keyboardUsage;

    @Column(name = "mouse_usage", nullable = false)
    private int mouseUsage;

    @Enumerated(EnumType.STRING)
    @Convert(converter = ColorConverter.class)
    @Column(name = "keyboard_color", nullable = false)
    private Color keyboardColor;

    @Enumerated(EnumType.STRING)
    @Convert(converter = ColorConverter.class)
    @Column(name = "mouse_color", nullable = false)
    private Color mouseColor;

    @Column(name = "monitor_count", nullable = false)
    private int monitorCount;

    @Column(name = "keyboard_layout", nullable = false)
    private int keyboardLayout;

    @Enumerated(EnumType.STRING)
    @Column(name = "keyboard_connection", nullable = false)
    private ConnectionType keyboardConnection;

    @Enumerated(EnumType.STRING)
    @Column(name = "mouse_connection", nullable = false)
    private ConnectionType mouseConnection;

    @Column(name = "keyboard_health", nullable = false)
    private boolean keyboardHealth;

    @Column(name = "mouse_health", nullable = false)
    private boolean mouseHealth;

    @Column(name = "monitor_size")
    private Integer monitorSize;

    @Column(name = "monitor_ratio")
    private Integer monitorRatio;

    @Enumerated(EnumType.STRING)
    @Column(name = "monitor_panel", nullable = false)
    private PanelType monitorPanel;

    @Enumerated(EnumType.STRING)
    @Column(name = "keyboard_type", nullable = false)
    private KeyboardType keyboardType;

    @Enumerated(EnumType.STRING)
    @Column(name = "keyboard_sound", nullable = false)
    private KeyboardSound keyboardSound;

    @Column(name = "mouse_sound")
    private Boolean mouseSound;

}


