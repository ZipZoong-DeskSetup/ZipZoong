package com.ssafy.zipjoong.recommand.domain;

import com.ssafy.zipjoong.product.domain.Product;
import com.ssafy.zipjoong.util.domain.EntityDate;
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

    @ManyToOne()
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(name="combination_product_num")
    private Integer combinationProductNum;
}
