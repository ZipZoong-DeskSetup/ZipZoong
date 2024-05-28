package com.ssafy.zipjoong.file.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class FileException extends RuntimeException {
    FileErrorCode fileErrorCode;
}
