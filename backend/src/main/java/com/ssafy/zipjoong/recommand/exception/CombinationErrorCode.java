package com.ssafy.zipjoong.recommand.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum CombinationErrorCode {
    /* 404 NOT_FOUND : Resource를 찾을 수 없음 */
    COMBINATION_NOT_FOUND(HttpStatus.NOT_FOUND, "해당하는 정보의 조합을 찾을 수 없습니다."),

    /* 409 CONFLICT : 데이터 중복 */
    COMBINATION_CONFLICT(HttpStatus.CONFLICT, "이미 조합에 존재하는 상품입니다."),

    RECOMMEND_FAIL(HttpStatus.INTERNAL_SERVER_ERROR, "추천을 위한 외부 프로세스 실행 중 에러가 발생하였습니다."),
    ;
    private final HttpStatus httpStatus;
    private final String message;
}
