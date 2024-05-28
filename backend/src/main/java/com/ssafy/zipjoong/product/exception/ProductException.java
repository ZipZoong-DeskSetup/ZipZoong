package com.ssafy.zipjoong.product.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProductException extends RuntimeException{
    ProductErrorCode productErrorCode;
}
