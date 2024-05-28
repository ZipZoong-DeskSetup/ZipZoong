package com.ssafy.zipjoong.recommand.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CombinationProductRequest {
    private int productId;
    private long combinationId;
}
