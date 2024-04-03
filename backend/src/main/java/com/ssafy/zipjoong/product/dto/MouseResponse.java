package com.ssafy.zipjoong.product.dto;

import com.ssafy.zipjoong.product.domain.ConnectionType;
import com.ssafy.zipjoong.product.domain.InterfaceType;
import com.ssafy.zipjoong.product.domain.Mouse;
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

    /* 마우스 entity -> 마우스 response(dto) */
    public static MouseResponse toDto(Mouse mouse){
        MouseResponse mouseResponse = MouseResponse.builder()
                .category("MOUSE")
                .id(mouse.getProductId())
                .name(mouse.getProductName())
                .brand(mouse.getProductBrand())
                .img(mouse.getProductImg())
                .url(mouse.getProductUrl())
                .connect(mouse.getMouseConnect())
                .connectInterface(mouse.getMouseInterface())
                .mouseType(mouse.getMouseType())
                .dpi(mouse.getMouseDpi())
                .color(mouse.getMouseColor())
                .weight(mouse.getMouseWeight())
                .width(mouse.getMouseWidth())
                .length(mouse.getMouseLength())
                .height(mouse.getMouseHeight())
                .isSound(mouse.getMouseIsSound())
                .build();

        mouseResponse.setPrice(mouse.getProductPrice());
        return mouseResponse;
    }
}
