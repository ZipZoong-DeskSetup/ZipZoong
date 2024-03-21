package com.ssafy.zipjoong.product.dto;

import com.ssafy.zipjoong.product.domain.ConnectionType;
import com.ssafy.zipjoong.product.domain.InterfaceType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
public class MouseResponse extends ProductResponse{
    private ConnectionType connect;
    private InterfaceType connectInterface;
    private String mouseType;
    private Integer dpi;
    private String color;
    private Float weight;
    private Float width;
    private Float length;
    private Float height;
    private Boolean isSound;
}
