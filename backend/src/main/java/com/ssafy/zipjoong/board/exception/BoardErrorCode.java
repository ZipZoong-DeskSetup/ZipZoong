package com.ssafy.zipjoong.board.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum BoardErrorCode {
    /* 404 NOT_FOUND : Resource를 찾을 수 없음 */
    BOARD_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 게시글을 찾을 수 없습니다."),

    ;
    private final HttpStatus httpStatus;
    private final String message;
}
