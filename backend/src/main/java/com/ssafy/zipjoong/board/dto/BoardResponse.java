package com.ssafy.zipjoong.board.dto;

import com.ssafy.zipjoong.board.domain.Board;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class BoardResponse {
    private Integer boardId;
    private String boardTitle;
    private String boardContent;
    private Integer boardHit;
    private String boardThumbnail;
    private String boardCreator;
    private String boardCreatorId;
    private String boardCreatorImg;
    private LocalDateTime boardCreatedAt;

    public static BoardResponse toDto(Board board) {
        return BoardResponse.builder()
                .boardId(board.getBoardId())
                .boardTitle(board.getBoardTitle())
                .boardContent(board.getBoardContent())
                .boardHit(board.getBoardHit())
                .boardThumbnail(board.getBoardThumbnail())
                .boardCreator(board.getUser().getUserNickname())
                .boardCreatorId(board.getUser().getUserId())
                .boardCreatorImg(board.getUser().getUserImg())
                .boardCreatedAt(board.getCreateAt())
                .build();
    }

}
