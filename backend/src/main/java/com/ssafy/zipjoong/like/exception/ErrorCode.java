package com.ssafy.zipjoong.like.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    /* 404 NOT_FOUND : 해당 조합 찾을 수 없음 */
    COMBINATION_NOT_FOUND(HttpStatus.NOT_FOUND, "해당하는 정보의 조합을 찾을 수 없습니다."),
    /* 409 CONFLICT : 조합 데이터 중복 */
    COMBINATION_CONFLICT(HttpStatus.CONFLICT, "이미 좋아요한 조합입니다."),
    /* 404 NOT_FOUND : 해당 제품 찾을 수 없음 */
    PRODUCT_NOT_FOUND(HttpStatus.NOT_FOUND, "해당하는 정보의 제품을 찾을 수 없습니다."),
    /* 409 CONFLICT : 제품 데이터 중복 */
    PRODUCT_CONFLICT(HttpStatus.CONFLICT, "이미 좋아요한 제품입니다."),
    /* 404 NOT_FOUND : product type을 찾을 수 없음 */
    PRODUCT_TYPE_NOT_FOUND(HttpStatus.NOT_FOUND, "$해당 타입을 찾을 수 없습니다.");

    private final HttpStatus httpStatus;
    private final String message;
}
