package com.ssafy.zipjoong.recommand.dto;

import com.ssafy.zipjoong.product.dto.ProductResponse;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CombinationResponse {
    private long combinationId;
    private List<ProductResponse> products;
    private int totalPrice;
}
