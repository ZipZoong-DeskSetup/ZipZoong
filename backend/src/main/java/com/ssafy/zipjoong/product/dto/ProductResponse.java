package com.ssafy.zipjoong.product.dto;

import com.ssafy.zipjoong.product.domain.Product;
import lombok.Data;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
public class ProductResponse {
    private Integer id;
    private String name;
    private Integer price;
    private String img;
    private String brand;
    private String url;
    private String category;

    /* 제품 entity -> 제품 response(dto) */
    public static ProductResponse toDto(Product product){
        return ProductResponse.builder()
                .id(product.getProductId())
                .name(product.getProductName())
                .price(product.getProductPrice())
                .brand(product.getProductBrand())
                .img(product.getProductImg())
                .url(product.getProductUrl())
                .build();
    }
}
