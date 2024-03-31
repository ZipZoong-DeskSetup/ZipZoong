package com.ssafy.zipjoong.board.dto;

import com.ssafy.zipjoong.board.domain.Board;
import com.ssafy.zipjoong.user.domain.User;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Getter
public class BoardCreateRequest {
    private String boardTitle;
    private String boardContent;
    private String boardCreatorId;
    private String boardThumbnail;
    private List<Long> combinationIdList = new ArrayList<>();

    public Board toEntity(User user) {
        Board board = Board.builder()
                .boardTitle(boardTitle)
                .boardContent(boardContent)
                .boardHit(0)
                .boardThumbnail(boardThumbnail)
                .boardIsDeleted(false)
                .user(user)
                .build();

        return board;
    }
}

