package com.ssafy.zipjoong.product.dto;

import com.ssafy.zipjoong.product.domain.ConnectionType;
import com.ssafy.zipjoong.product.domain.InterfaceType;
import com.ssafy.zipjoong.product.domain.Keyboard;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@ToString(callSuper = true)
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

    /* 키보드 entity -> 키보드 response(dto) */
    public static KeyboardResponse toDto(Keyboard keyboard) {
        KeyboardResponse keyboardResponse = KeyboardResponse.builder()
                .category("KEYBOARD")
                .id(keyboard.getProductId())
                .name(keyboard.getProductName())
                .brand(keyboard.getProductBrand())
                .img(keyboard.getProductImg())
                .url(keyboard.getProductUrl())
                .connect(keyboard.getKeyboardConnect())
                .connectInterface(keyboard.getKeyboardInterface())
                .keySwitch(keyboard.getKeyboardSwitch())
                .led(keyboard.getKeyboardLed())
                .num(keyboard.getKeyboardNum())
                .force(keyboard.getKeyboardForce())
                .color(keyboard.getKeyboardColor())
                .form(keyboard.getKeyboardForm())
                .contact(keyboard.getKeyboardContact())
                .build();
        keyboardResponse.setPrice(keyboard.getProductPrice());
        return keyboardResponse;
    }
}
