package com.ssafy.zipjoong.product.dto;

import com.ssafy.zipjoong.product.domain.Monitor;
import com.ssafy.zipjoong.product.domain.MonitorPanelFormType;
import com.ssafy.zipjoong.product.domain.MonitorPanelType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
public class MonitorResponse extends ProductResponse{
    private Integer size;
    private String resolution;
    private String aspectRatio;
    private Integer refreshRate;
    private MonitorPanelType panelType;
    private MonitorPanelFormType panelFormType;

    /* 모니터 entity -> 모니터 response(dto) */
    public static MonitorResponse toDto(Monitor monitor){
        MonitorResponse monitorResponse = MonitorResponse.builder()
                .category("MONITOR")
                .id(monitor.getProductId())
                .name(monitor.getProductName())
                .brand(monitor.getProductBrand())
                .img(monitor.getProductImg())
                .url(monitor.getProductUrl())
                .size(monitor.getMonitorSize())
                .resolution(monitor.getMonitorResolution())
                .aspectRatio(monitor.getMonitorAspectRatio())
                .refreshRate(monitor.getMonitorRefreshRate())
                .panelType(monitor.getMonitorPanelType())
                .panelFormType(monitor.getMonitorPanelForm())
                .build();

        monitorResponse.setPrice(monitor.getProductPrice());
        return monitorResponse;
    }
}
