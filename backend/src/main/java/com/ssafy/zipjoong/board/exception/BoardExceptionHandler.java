package com.ssafy.zipjoong.board.exception;

import com.ssafy.zipjoong.util.dto.ResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class BoardExceptionHandler {

    @ExceptionHandler(BoardException.class)
    protected ResponseEntity<ResponseDto> handleBoardException(BoardException e) {
        return ResponseEntity.status(e.boardErrorCode.getHttpStatus()).body(new ResponseDto(e.boardErrorCode.getMessage()));
    }
}
