package com.ssafy.zipjoong.file.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum FileErrorCode {
    /* 404 NOT_FOUND : Resource를 찾을 수 없음 */
    FILE_NOT_FOUND(HttpStatus.NOT_FOUND, "해당하는 파일을 찾을 수 없습니다."),
            ;
    private final HttpStatus httpStatus;
    private final String message;
}
