package com.ssafy.zipjoong.like.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Getter
@Builder
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class ProductLikeId implements Serializable {
    @Column(name="user_id")
    private String userId;
    @Column(name="product_id")
    private Integer productId;
}
