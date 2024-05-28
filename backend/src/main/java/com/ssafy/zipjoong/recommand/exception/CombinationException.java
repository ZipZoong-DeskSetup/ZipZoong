package com.ssafy.zipjoong.recommand.exception;

import com.ssafy.zipjoong.product.exception.ProductErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CombinationException  extends RuntimeException{
    CombinationErrorCode combinationErrorCode;
}