package com.ssafy.zipjoong.recommand.exception;

import com.ssafy.zipjoong.util.dto.ResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CombinationExceptionHandler {
    @ExceptionHandler(CombinationException.class)
    protected ResponseEntity<ResponseDto> handleProductException(CombinationException e){
        return ResponseEntity.status(e.combinationErrorCode.getHttpStatus()).body(new ResponseDto(e.combinationErrorCode.getMessage()));
    }
}
