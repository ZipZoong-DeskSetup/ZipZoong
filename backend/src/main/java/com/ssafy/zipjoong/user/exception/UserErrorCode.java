package com.ssafy.zipjoong.user.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum UserErrorCode {
    /* 401 UNAUTHORIZED: 해당 리소스에 유효한 인증 자격 증명이 없음 */
    USER_UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "로그인이 필요합니다."),
    /* 403 FORBIDDEN: 권한이 없어 요청이 거부되었음 */
    USER_FORBIDDEN(HttpStatus.FORBIDDEN, "요청한 작업을 수행할 권한이 없는 유저 입니다."),
    /* 404 NOT_FOUND : Resource를 찾을 수 없음 */
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 유저를 찾을 수 없습니다.");
    private final HttpStatus httpStatus;
    private final String message;
}
