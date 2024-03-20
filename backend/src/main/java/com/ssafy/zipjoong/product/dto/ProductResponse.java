package com.ssafy.zipjoong.product.dto;

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
}
