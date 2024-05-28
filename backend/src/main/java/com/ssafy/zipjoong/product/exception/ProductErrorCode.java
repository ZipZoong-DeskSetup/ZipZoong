package com.ssafy.zipjoong.product.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ProductErrorCode {
    /* 404 NOT_FOUND : Resource를 찾을 수 없음 */
    PRODUCT_NOT_FOUND(HttpStatus.NOT_FOUND, "해당하는 정보의 제품을 찾을 수 없습니다."),
    KEYBOARD_NOT_FOUND(HttpStatus.NOT_FOUND, "키보드 목록을 조회할 수 없습니다."),
    MONITOR_NOT_FOUND(HttpStatus.NOT_FOUND, "모니터 목록을 조회할 수 없습니다."),
    MOUSE_NOT_FOUND(HttpStatus.NOT_FOUND, "마우스 목록을 조회할 수 없습니다."),
    ;
    private final HttpStatus httpStatus;
    private final String message;
}
