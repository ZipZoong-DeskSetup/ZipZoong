package com.ssafy.zipjoong.like.exception;

import com.ssafy.zipjoong.util.dto.ResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;

@ControllerAdvice
public class ExceptionHandler {
    @org.springframework.web.bind.annotation.ExceptionHandler(CombinationLikeException.class)
    protected ResponseEntity<ResponseDto> handleCombinationException(CombinationLikeException e){
        return ResponseEntity.status(e.combinationLikeErrorCode.getHttpStatus()).body(new ResponseDto(e.combinationLikeErrorCode.getMessage()));
    }

    @org.springframework.web.bind.annotation.ExceptionHandler(ProductLikeException.class)
    protected ResponseEntity<ResponseDto> handleProductException(ProductLikeException e){
        return ResponseEntity.status(e.productLikeErrorCode.getHttpStatus()).body(new ResponseDto(e.productLikeErrorCode.getMessage()));
    }

    @org.springframework.web.bind.annotation.ExceptionHandler(ProductTypeException.class)
    protected ResponseEntity<ResponseDto> handleProductTypeException(ProductTypeException e,String type){
        return ResponseEntity.status(e.productTypeErrorCode.getHttpStatus()).body(new ResponseDto(e.productTypeErrorCode.getMessage(),type));
    }

}
