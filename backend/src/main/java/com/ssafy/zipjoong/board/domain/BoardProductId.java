package com.ssafy.zipjoong.board.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;


@Getter
@Builder
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class BoardProductId implements Serializable {
    @Column(name="product_id")
    private Integer productId;
    @Column(name="board_id")
    private Integer boardId;
}