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
@DiscriminatorValue("KEYBOARD")
public class Keyboard extends Product {
    // 연결 방식
    @Enumerated(EnumType.STRING)
    private ConnectionType keyboardConnect;

    // 연결 인터페이스
    @Enumerated(EnumType.STRING)
    private InterfaceType keyboardInterface;

    // 스위치
    private String keyboardSwitch;

    // led 색상
    private String keyboardLed;

    // 배열
    private String keyboardLayout;

    // 색상
    private String keyboardColor;

    // 형태
    private String keyboardForm;

    // 접점 방식
    private String keyboardContact;
}