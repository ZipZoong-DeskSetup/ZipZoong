package com.ssafy.zipjoong.recommand.dto;

import com.ssafy.zipjoong.product.dto.ProductResponse;
import lombok.Builder;
import lombok.Data;

import java.text.DecimalFormat;
import java.util.List;
import java.util.Map;

@Data
@Builder
public class RecommendRespone {
    private long combinationId;
    private List<ProductResponse> monitors;
    private ProductResponse keyboard;
    private ProductResponse mouse;
    private Map<String, List<ProductResponse>> similarProduct;
    private String totalPrice;

    /* 가격 ',' 붙이기 */
    public void setPrice(int price){
        DecimalFormat formatter = new DecimalFormat("###,###");
        this.totalPrice = formatter.format(price);
    }
}
