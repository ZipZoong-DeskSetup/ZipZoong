package com.ssafy.zipjoong.like.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProductTypeException extends RuntimeException {
    ErrorCode productTypeErrorCode;
    String type;
}
