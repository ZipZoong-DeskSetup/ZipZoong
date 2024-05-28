package com.ssafy.zipjoong.board.dto;

import com.ssafy.zipjoong.board.domain.Board;
import com.ssafy.zipjoong.recommand.dto.CombinationResponse;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class BoardDetailResponse {
    private Integer boardId;
    private String boardTitle;
    private String boardContent;
    private Integer boardHit;
    private String boardThumbnail;
    private String boardCreator;
    private String boardCreatorId;
    private String boardCreatorImg;
    private LocalDateTime boardCreatedAt;
    private List<CombinationResponse> boardCombinations;

    public static BoardDetailResponse toDto(Board board, List<CombinationResponse> combinationResponses) {
        return BoardDetailResponse.builder()
                .boardId(board.getBoardId())
                .boardTitle(board.getBoardTitle())
                .boardContent(board.getBoardContent())
                .boardHit(board.getBoardHit())
                .boardThumbnail(board.getBoardThumbnail())
                .boardCreator(board.getUser().getUserNickname())
                .boardCreatorId(board.getUser().getUserId())
                .boardCreatorImg(board.getUser().getUserImg())
                .boardCreatedAt(board.getCreateAt())
                .boardCombinations(combinationResponses)
                .build();
    }

}
