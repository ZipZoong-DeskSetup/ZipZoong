package com.ssafy.zipjoong.comment.dto;

import com.ssafy.zipjoong.comment.domain.Comment;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class CommentResponse {
    private Long commentId;
    private String commentContent;
    private String commentCreator;
    private String commentCreatorId;
    private String commentCreatorImg;
    private LocalDateTime commentCreatedAt;

    public static CommentResponse toDto(Comment comment) {
        return CommentResponse.builder()
                .commentId(comment.getCommentId())
                .commentContent(comment.getCommentContent())
                .commentCreator(comment.getUser().getUserNickname())
                .commentCreatorId(comment.getUser().getUserId())
                .commentCreatorImg(comment.getUser().getUserImg())
                .commentCreatedAt(comment.getCreateAt())
                .build();
    }
}

