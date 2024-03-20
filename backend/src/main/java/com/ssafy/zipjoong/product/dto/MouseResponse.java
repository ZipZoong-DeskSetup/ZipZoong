package com.ssafy.zipjoong.product.dto;

import com.ssafy.zipjoong.product.domain.ConnectionType;
import com.ssafy.zipjoong.product.domain.InterfaceType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
public class MouseResponse extends ProductResponse{
    private ConnectionType connect;
    private InterfaceType connectInterface;
    private String type;
    private Integer dpi;
    private String color;
    private Float weight;
    private float width;
    private float length;
    private float height;
    private boolean isSound;
}
