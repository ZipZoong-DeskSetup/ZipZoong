package com.ssafy.zipjoong.like.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProductLikeException extends RuntimeException{
    ErrorCode productLikeErrorCode;
}