package com.ssafy.zipjoong.comment.service;

import com.ssafy.zipjoong.comment.dto.CommentCreateRequest;
import com.ssafy.zipjoong.comment.dto.CommentResponse;
import com.ssafy.zipjoong.comment.dto.CommentUpdateRequest;

import java.util.List;

public interface CommentService {
    // 게시글별 댓글 전체 조회
    List<CommentResponse> getAllByBoard(int boardId);

    // 댓글 작성
    void createComment(String userId, CommentCreateRequest commentCreateRequest);

    // 댓글 수정
    void updateComment(long commentId, String userId, CommentUpdateRequest commentUpdateRequest);

    // 댓글 삭제
    void deleteComment(long commentId, String userId);
}
