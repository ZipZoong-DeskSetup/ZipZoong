package com.ssafy.zipjoong.like.model;

import com.ssafy.zipjoong.product.model.Product;
import com.ssafy.zipjoong.user.model.User;
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
@Table(name = "product_like")
public class ProductLike extends EntityDate {
    @EmbeddedId
    private ProductLikeId productLikeId;

    // 좋아요한 유저
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    // 좋아요한 제품
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    private Product product;

    // 좋아요 취소 여부
    private Boolean productLikeIsDeleted;
}