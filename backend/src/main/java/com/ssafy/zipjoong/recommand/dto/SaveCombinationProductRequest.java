package com.ssafy.zipjoong.recommand.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SaveCombinationProductRequest {
    private int productId;
    private int num;
}
