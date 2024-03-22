package com.ssafy.zipjoong.recommand.dto;

import com.ssafy.zipjoong.product.dto.ProductResponse;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@Builder
public class RecommendRespone {
    private long combinationId;
    private List<ProductResponse> products;
    private Map<String, List<ProductResponse>> similarProduct;
    private int totalPrice;
}
