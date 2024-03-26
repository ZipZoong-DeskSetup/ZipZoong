package com.ssafy.zipjoong.like.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CombinationLikeException extends RuntimeException{
    ErrorCode combinationLikeErrorCode;
}