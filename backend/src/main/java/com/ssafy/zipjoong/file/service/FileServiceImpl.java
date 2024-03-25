package com.ssafy.zipjoong.file.service;

import com.ssafy.zipjoong.board.domain.Board;
import com.ssafy.zipjoong.board.exception.BoardErrorCode;
import com.ssafy.zipjoong.board.exception.BoardException;
import com.ssafy.zipjoong.board.repository.BoardRepository;
import com.ssafy.zipjoong.file.domain.File;
import com.ssafy.zipjoong.file.dto.FileRequest;
import com.ssafy.zipjoong.file.dto.FileResponse;
import com.ssafy.zipjoong.file.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FileServiceImpl implements FileService{
    private FileRepository fileRepository;
    private BoardRepository boardRepository;

    /* 파일 저장 */
    @Transactional
    @Override
    public void saveFile(FileRequest fileRequest) {
        Board board = boardRepository.findById(fileRequest.getBoardId())
                .orElseThrow(() -> new BoardException(BoardErrorCode.BOARD_NOT_FOUND));
        File file = fileRequest.toEntity(board);
        fileRepository.save(file);
    }

    /* 파일 삭제 */
    @Transactional
    @Override
    public void deleteFile(Board board) {
        fileRepository.deleteByBoard(board);
    }

    /* 게시글의 파일 목록 조회 */
    @Override
    public List<FileResponse> getAllByBoard(Board board) {
        List<File> files = fileRepository.findAllByBoard(board);
        return files.stream()
                .map(FileResponse::toDto)
                .collect(Collectors.toList());
    }
}
