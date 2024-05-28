package com.ssafy.zipjoong.file.dto;

import com.ssafy.zipjoong.file.domain.File;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FileResponse {
    private Long fileId;
    private String filePath;
    private int boardId;

    public static FileResponse toDto(File file) {
        return FileResponse.builder()
                .fileId(file.getFileId())
                .filePath(file.getFilePath())
                .boardId(file.getBoard().getBoardId())
                .build();
    }
}
