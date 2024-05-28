package com.ssafy.zipjoong.comment.dto;

import com.ssafy.zipjoong.board.domain.Board;
import com.ssafy.zipjoong.comment.domain.Comment;
import com.ssafy.zipjoong.user.domain.User;
import lombok.Getter;

@Getter
public class CommentCreateRequest {
    private String commentContent;
    private int boardId;

    public Comment toEntity(Board board, User user) {
        return Comment.builder()
                .commentContent(commentContent)
                .board(board)
                .user(user)
                .commentIsDeleted(false)
                .build();
    }

}
