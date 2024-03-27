package com.ssafy.zipjoong.comment.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CommentException extends RuntimeException {
    CommentErrorCode commentErrorCode;
}
