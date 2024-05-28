package com.ssafy.zipjoong.user.exception;

import com.ssafy.zipjoong.util.dto.ResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class UserExceptionHandler {
    @ExceptionHandler(UserException.class)
    protected ResponseEntity<ResponseDto> handleProductException(UserException e) {
        return ResponseEntity.status(e.userErrorCode.getHttpStatus()).body(new ResponseDto(e.userErrorCode.getMessage()));
    }
}
