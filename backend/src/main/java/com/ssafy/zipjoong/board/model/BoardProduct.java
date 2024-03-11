package com.ssafy.zipjoong.board.model;

import com.ssafy.zipjoong.like.model.CombinationLikeId;
import com.ssafy.zipjoong.recommand.model.Product;
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
@Table(name = "board_product")
public class BoardProduct {
    @EmbeddedId
    private BoardProductId boardProductId;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    private Product product;

    // 게시글
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("boardId")
    @JoinColumn(name = "board_id")
    private Board board;

}