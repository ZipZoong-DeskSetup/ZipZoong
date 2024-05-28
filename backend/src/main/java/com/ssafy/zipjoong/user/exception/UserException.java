package com.ssafy.zipjoong.user.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserException extends RuntimeException{
    UserErrorCode userErrorCode;
}