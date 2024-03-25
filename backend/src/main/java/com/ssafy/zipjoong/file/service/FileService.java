package com.ssafy.zipjoong.file.service;

import com.ssafy.zipjoong.board.domain.Board;
import com.ssafy.zipjoong.file.dto.FileRequest;
import com.ssafy.zipjoong.file.dto.FileResponse;

import java.util.List;

public interface FileService {
    // 파일 저장
    void saveFile(FileRequest fileRequest);

    // 파일 삭제
    void deleteFile(Board board);

    // 게시글의 파일 목록 조회
    List<FileResponse> getAllByBoard(Board board);
}
