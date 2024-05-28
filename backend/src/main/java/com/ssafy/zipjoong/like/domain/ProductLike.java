package com.ssafy.zipjoong.like.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.ssafy.zipjoong.product.domain.Product;
import com.ssafy.zipjoong.user.domain.User;
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
@Table(name = "product_like")
public class ProductLike extends EntityDate {
    @EmbeddedId
    private ProductLikeId productLikeId;

    // 좋아요한 유저
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    // 좋아요한 제품
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    private Product product;

    // 좋아요 취소 여부
    @Column(name="product_like_is_deleted")
    private Boolean productLikeIsDeleted;
}