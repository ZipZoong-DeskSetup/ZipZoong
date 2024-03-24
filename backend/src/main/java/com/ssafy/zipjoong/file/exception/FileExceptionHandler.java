package com.ssafy.zipjoong.file.exception;

import com.ssafy.zipjoong.util.dto.ResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class FileExceptionHandler {
    @ExceptionHandler(FileException.class)
    protected ResponseEntity<ResponseDto> handleFileException(FileException e) {
        return ResponseEntity.status(e.fileErrorCode.getHttpStatus()).body(new ResponseDto(e.fileErrorCode.getMessage()));
    }
}