package com.ssafy.zipjoong.product.domain;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@SuperBuilder
@NoArgsConstructor
@DiscriminatorValue("MOUSE")
public class Mouse extends Product {
    // 연결 방식
    @Enumerated(EnumType.STRING)
    private ConnectionType mouseConnect;

    // 연결 인터페이스 (bluetooth, receiver 등)
    @Enumerated(EnumType.STRING)
    private InterfaceType mouseInterface;

    // 종류
    private String mouseType;

    // 최대 dpi
    private Integer mouseDpi;

    // 색상
    private String mouseColor;

    // 무게
    private Float mouseWeight;

    // 가로 길이
    private Float mouseWidth;

    // 세로 길이
    private Float mouseLength;

    // 높이
    private Float mouseHeight;
}
