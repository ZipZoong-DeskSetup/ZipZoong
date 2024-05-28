package com.ssafy.zipjoong.file.dto;

import com.ssafy.zipjoong.board.domain.Board;
import com.ssafy.zipjoong.file.domain.File;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FileRequest {
    private String filePath;
    private Integer boardId;

    public File toEntity(Board board) {
        return File.builder()
                .filePath(filePath)
                .board(board)
                .build();
    }
}
