package com.ssafy.zipjoong.recommand.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Getter
@Builder
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class CombinationProductId implements Serializable {
    @Column(name="combination_id")
    private Long combinationId;
    @Column(name="product_id")
    private Integer productId;
}
