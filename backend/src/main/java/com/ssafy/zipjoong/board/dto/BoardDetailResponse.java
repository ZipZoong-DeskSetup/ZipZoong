package com.ssafy.zipjoong.board.dto;

import com.ssafy.zipjoong.board.domain.Board;
import com.ssafy.zipjoong.board.domain.BoardProduct;
import com.ssafy.zipjoong.file.domain.File;
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
    private String boardCreator;
    private String boardCreatorId;
    private String boardCreatorImg;
    private LocalDateTime boardCreatedAt;
    private List<BoardProduct> boardProducts;
    private List<File> boardFiles;

    public static BoardDetailResponse toDto(Board board) {
        return BoardDetailResponse.builder()
                .boardId(board.getBoardId())
                .boardTitle(board.getBoardTitle())
                .boardContent(board.getBoardContent())
                .boardHit(board.getBoardHit())
                .boardCreator(board.getUser().getUserNickname())
                .boardCreatorId(board.getUser().getUserId())
                .boardCreatorImg(board.getUser().getUserImg())
                .boardCreatedAt(board.getCreateAt())
                .boardProducts(board.getProducts())
                .boardFiles(board.getFiles())
                .build();
    }

}
