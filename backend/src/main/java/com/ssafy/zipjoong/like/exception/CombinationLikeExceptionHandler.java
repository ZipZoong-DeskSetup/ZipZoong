package com.ssafy.zipjoong.like.exception;

import com.ssafy.zipjoong.util.dto.ResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CombinationLikeExceptionHandler {
    @ExceptionHandler(CombinationLikeException.class)
    protected ResponseEntity<ResponseDto> handleCombinationException(CombinationLikeException e){
        return ResponseEntity.status(e.combinationLikeErrorCode.getHttpStatus()).body(new ResponseDto(e.combinationLikeErrorCode.getMessage()));
    }

    @ExceptionHandler(ProductLikeException.class)
    protected ResponseEntity<ResponseDto> handleProductException(ProductLikeException e){
        return ResponseEntity.status(e.productLikeErrorCode.getHttpStatus()).body(new ResponseDto(e.productLikeErrorCode.getMessage()));
    }
}
