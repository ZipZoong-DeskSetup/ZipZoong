package com.ssafy.zipjoong.comment.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum CommentErrorCode {
    /* 404 NOT_FOUND : Resource를 찾을 수 없음 */
    COMMENT_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 댓글을 찾을 수 없습니다."),
    ;
    private final HttpStatus httpStatus;
    private final String message;
}
