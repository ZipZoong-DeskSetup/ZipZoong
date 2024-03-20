package com.ssafy.zipjoong.util.dto;

import lombok.Data;

@Data
public class ResponseDto {
    private String message;
    private Object data;

    public ResponseDto(String message) {
        this.message = message;
    }
}
