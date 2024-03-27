package com.ssafy.zipjoong.comment.controller;

import com.ssafy.zipjoong.comment.dto.CommentCreateRequest;
import com.ssafy.zipjoong.comment.dto.CommentUpdateRequest;
import com.ssafy.zipjoong.comment.service.CommentService;
import com.ssafy.zipjoong.security.jwt.utils.JwtUtils;
import com.ssafy.zipjoong.util.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/comment")
public class CommentController {
    private final CommentService commentService;

    // 게시글별 댓글 전체 조회
    @GetMapping("/byBoard/{boardId}")
    public ResponseEntity<ResponseDto> getCommentsByBoard(@PathVariable(name = "boardId") int boardId) {
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 해당 게시글의 댓글 목록을 조회하였습니다.", commentService.getAllByBoard(boardId)));
    }

    // 댓글 작성
    @PostMapping
    public ResponseEntity<ResponseDto> createComment(@RequestHeader("Authorization") String authorizationToken,
                                                   @RequestBody CommentCreateRequest commentCreateRequest) {
        String userId = JwtUtils.getUserId(authorizationToken);
        commentService.createComment(userId, commentCreateRequest);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 댓글을 등록하였습니다."));
    }

    // 댓글 수정
    @PutMapping("/{commentId}")
    public ResponseEntity<ResponseDto> updateComment(@PathVariable(name = "commentId") long commentId,
                                                   @RequestHeader("Authorization") String authorizationToken,
                                                   @RequestBody CommentUpdateRequest commentUpdateRequest) {
        String userId = JwtUtils.getUserId(authorizationToken);
        commentService.updateComment(commentId, userId, commentUpdateRequest);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 댓글을 수정하였습니다."));
    }

    // 댓글 삭제
    @PostMapping("/{commentId}")
    public ResponseEntity<ResponseDto> deleteComment(@PathVariable(name = "commentId") long commentId,
                                                   @RequestHeader("Authorization") String authorizationToken) {
        String userId = JwtUtils.getUserId(authorizationToken);
        commentService.deleteComment(commentId, userId);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 댓글을 삭제하였습니다."));
    }

}
