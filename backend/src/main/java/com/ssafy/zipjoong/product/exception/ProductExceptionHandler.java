package com.ssafy.zipjoong.product.exception;

import com.ssafy.zipjoong.util.dto.ResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ProductExceptionHandler {
    @ExceptionHandler(ProductException.class)
    protected ResponseEntity<ResponseDto> handleProductException(ProductException e){
        return ResponseEntity.status(e.productErrorCode.getHttpStatus()).body(new ResponseDto(e.productErrorCode.getMessage()));
    }
}
