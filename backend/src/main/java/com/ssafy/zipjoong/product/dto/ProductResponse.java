package com.ssafy.zipjoong.product.dto;

import com.ssafy.zipjoong.product.domain.Product;
import lombok.Data;
import lombok.experimental.SuperBuilder;

import java.text.DecimalFormat;

@Data
@SuperBuilder
public class ProductResponse {
    private Integer id;
    private String name;
    private String price;
    private String img;
    private String brand;
    private String url;
    private String category;

    /* 가격 ',' 붙이기 */
    public void setPrice(int price){
        DecimalFormat formatter = new DecimalFormat("###,###");
        this.price = formatter.format(price);
    }

    /* 제품 entity -> 제품 response(dto) */
    public static ProductResponse toDto(Product product){
        ProductResponse productResponse =  ProductResponse.builder()
                .id(product.getProductId())
                .name(product.getProductName())
                .brand(product.getProductBrand())
                .img(product.getProductImg())
                .url(product.getProductUrl())
                .build();

        productResponse.setPrice(product.getProductPrice());

        return productResponse;
    }
}
