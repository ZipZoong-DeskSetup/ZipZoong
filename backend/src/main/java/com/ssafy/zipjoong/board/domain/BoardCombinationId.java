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
public class BoardCombinationId implements Serializable {
    @Column(name="combination_id")
    private Long combinationId;
    @Column(name="board_id")
    private Integer boardId;
}
