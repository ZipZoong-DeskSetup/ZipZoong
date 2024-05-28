package com.ssafy.zipjoong.product.domain;

import jakarta.persistence.*;
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
    @Column(name="mouse_connect")
    @Enumerated(EnumType.STRING)
    private ConnectionType mouseConnect;

    // 연결 인터페이스 (bluetooth, receiver 등)
    @Column(name="mouse_interface")
    @Enumerated(EnumType.STRING)
    private InterfaceType mouseInterface;

    // 종류
    @Column(name="mouse_type")
    private String mouseType;

    // 최대 dpi
    @Column(name="mouse_dpi")
    private Integer mouseDpi;

    // 색상
    @Column(name="mouse_color")
    private String mouseColor;

    // 무게
    @Column(name="mouse_weight")
    private Float mouseWeight;

    // 가로 길이
    @Column(name="mouse_width")
    private Float mouseWidth;

    // 세로 길이
    @Column(name="mouse_length")
    private Float mouseLength;

    // 높이
    @Column(name="mouse_height")
    private Float mouseHeight;

    // 소음 유무
    @Column(name="mouse_is_sound")
    private Boolean mouseIsSound;
}
