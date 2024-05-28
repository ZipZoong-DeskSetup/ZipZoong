package com.ssafy.zipjoong.product.domain;

import jakarta.persistence.*;
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
    @Column(name="monitor_size")
    private Integer monitorSize;

    // 해상도
    @Column(name="monitor_resolution")
    private String monitorResolution;

    // 화면 비율
    @Column(name="monitor_aspect_ratio")
    private String monitorAspectRatio;

    // 주사율
    @Column(name="monitor_refresh_rate")
    private Integer monitorRefreshRate;

    // 패널 종류
    @Column(name="monitor_panel_type")
    @Enumerated(EnumType.STRING)
    private MonitorPanelType monitorPanelType;

    // 패널 형태
    @Column(name="monitor_panel_form")
    @Enumerated(EnumType.STRING)
    private MonitorPanelFormType monitorPanelForm;
}
