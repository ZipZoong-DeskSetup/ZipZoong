package com.ssafy.zipjoong.product.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@ToString(callSuper = true)
@SuperBuilder
@NoArgsConstructor
@DiscriminatorValue("KEYBOARD")
public class Keyboard extends Product {
    // 연결 방식
    @Column(name="keyboard_connect")
    @Enumerated(EnumType.STRING)
    private ConnectionType keyboardConnect;

    // 연결 인터페이스
    @Column(name="keyboard_interface")
    @Enumerated(EnumType.STRING)
    private InterfaceType keyboardInterface;

    // 스위치
    @Column(name="keyboard_switch")
    private String keyboardSwitch;

    // led 색상
    @Column(name="keyboard_led")
    private String keyboardLed;

    // 키 수
    @Column(name="keyboard_num")
    private Integer keyboardNum;

    // 키 압
    @Column(name="keyboard_force")
    private Integer keyboardForce;

    // 색상
    @Column(name="keyboard_color")
    private String keyboardColor;

    // 형태
    @Column(name="keyboard_form")
    private String keyboardForm;

    // 접점 방식
    @Column(name="keyboard_contact")
    private String keyboardContact;
}