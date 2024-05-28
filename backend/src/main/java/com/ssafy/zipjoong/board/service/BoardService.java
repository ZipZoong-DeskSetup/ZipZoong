package com.ssafy.zipjoong.board.service;

import com.ssafy.zipjoong.board.dto.BoardCreateRequest;
import com.ssafy.zipjoong.board.dto.BoardDetailResponse;
import com.ssafy.zipjoong.board.dto.BoardResponse;
import com.ssafy.zipjoong.board.dto.BoardUpdateRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface BoardService {
    // 게시글 작성
    void createBoard(String userId, BoardCreateRequest boardCreateRequest);

    // 게시글 수정
    void updateBoard(int boardId, String userId, BoardUpdateRequest boardUpdateRequest);

    // 게시글 삭제
    void deleteBoard(int boardId, String userId);

    // 전체 게시글 목록 조회
    List<BoardResponse> getAll();

    // 내가 쓴 게시글 목록 조회
    List<BoardResponse> getAllByCreator(String userId);

    // 게시글 상세 조회
    BoardDetailResponse getBoard(int boardId);

    // 게시글 검색
    List<BoardResponse> getAllByKeyword(String keyword);

    // 조회수 증가
    void updateHit(int boardId);

    // 파일 업로드
    String uploadFile(String base64EncodedData);

}
