package com.ssafy.zipjoong.product.dto;

import com.ssafy.zipjoong.product.domain.ConnectionType;
import com.ssafy.zipjoong.product.domain.InterfaceType;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
public class KeyboardResponse extends ProductResponse{
    private ConnectionType connect;
    private InterfaceType connectInterface;
    private String keySwitch;
    private String led;
    private Integer num;
    private Integer force;
    private String color;
    private String form;
    private String contact;
}
