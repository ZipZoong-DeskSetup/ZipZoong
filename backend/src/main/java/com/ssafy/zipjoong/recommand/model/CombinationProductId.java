package com.ssafy.zipjoong.recommand.model;

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
    private Long combinationId;
    private Integer productId;
}
