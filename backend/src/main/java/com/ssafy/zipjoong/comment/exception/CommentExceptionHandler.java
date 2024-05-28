package com.ssafy.zipjoong.comment.exception;

import com.ssafy.zipjoong.util.dto.ResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CommentExceptionHandler {
    @ExceptionHandler(CommentException.class)
    protected ResponseEntity<ResponseDto> handleCommentException(CommentException e) {
        return ResponseEntity.status(e.commentErrorCode.getHttpStatus()).body(new ResponseDto(e.commentErrorCode.getMessage()));
    }
}
