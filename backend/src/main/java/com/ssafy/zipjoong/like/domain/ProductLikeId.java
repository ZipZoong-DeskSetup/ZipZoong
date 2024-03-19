package com.ssafy.zipjoong.like.domain;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Getter
@Builder
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class ProductLikeId implements Serializable {
    private String userId;
    private Integer productId;
}
