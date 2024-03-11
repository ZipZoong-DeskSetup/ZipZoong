package com.ssafy.zipjoong.recommand.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;


@Entity
@Getter
@SuperBuilder
@NoArgsConstructor
@DiscriminatorValue("MONITOR")
public class Monitor extends Product {

    // 사이즈
    private Integer monitorSize;

    // 해상도
    private String monitorResolution;

    // 화면 비율
    private String monitorAspectRatio;

    // 주사율
    private String monitorRefreshRate;

    // 패널 종류
    @Enumerated(EnumType.STRING)
    private MonitorPanelType monitorPanelType;

    // 패널 형태
    private MonitorPanelFormType monitorPanelForm;
}
