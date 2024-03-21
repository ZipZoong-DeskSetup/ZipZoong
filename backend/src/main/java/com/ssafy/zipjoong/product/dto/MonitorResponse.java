package com.ssafy.zipjoong.product.dto;

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
}
