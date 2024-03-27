package com.ssafy.zipjoong.product.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@Entity
@Getter
@ToString
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "product")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "product_type", discriminatorType = DiscriminatorType.STRING)
public abstract class Product {
    @Id
    @Column(name="product_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer productId;

    // 제품 명
    @Column(name="product_name")
    private String productName;

    // 제품 가격
    @Column(name="product_price")
    private Integer productPrice;

    // 제품 이미지
    @Column(name="product_img")
    private String productImg;

    // 제조사
    @Column(name="product_brand")
    private String productBrand;

    // 제품 주소
    @Column(name="product_url")
    private String productUrl;

    public String getProductType() {
        return this.getClass().getAnnotation(DiscriminatorValue.class).value();
    }
}