package com.ssafy.zipjoong.recommand.model;

import com.ssafy.zipjoong.product.model.Product;
import com.ssafy.zipjoong.util.model.EntityDate;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "combination_product")
public class CombinationProduct extends EntityDate {
    @EmbeddedId
    private CombinationProductId combinationProductId;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("combinationId")
    @JoinColumn(name = "combination_id")
    private Combination combination;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    private Product product;

    private Integer combinationProductNum;
}
