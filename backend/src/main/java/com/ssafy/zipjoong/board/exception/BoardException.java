package com.ssafy.zipjoong.board.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class BoardException extends RuntimeException{
    BoardErrorCode boardErrorCode;
}
