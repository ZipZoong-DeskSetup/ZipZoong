package com.ssafy.zipjoong.board.domain;

import com.ssafy.zipjoong.product.domain.Product;
import com.ssafy.zipjoong.recommand.domain.Combination;
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
@Table(name = "board_combination")
public class BoardCombination {
    @EmbeddedId
    private BoardCombinationId boardCombinationId;

    // 조합
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("combinationId")
    @JoinColumn(name = "combination_id")
    private Combination combination;

    // 게시글
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("boardId")
    @JoinColumn(name = "board_id")
    private Board board;

}