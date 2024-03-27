package com.ssafy.zipjoong.board.controller;


import com.ssafy.zipjoong.board.dto.BoardCreateRequest;
import com.ssafy.zipjoong.board.dto.BoardUpdateRequest;
import com.ssafy.zipjoong.board.service.BoardService;
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
@RequestMapping("/board")
public class BoardController {
    private final BoardService boardService;

    // 게시글 작성
    @PostMapping
    public ResponseEntity<ResponseDto> createBoard(@RequestHeader("Authorization") String authorizationToken,
                                                   @RequestBody BoardCreateRequest boardCreateRequest) {
        String userId = JwtUtils.getUserId(authorizationToken);
        boardService.createBoard(userId, boardCreateRequest);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 게시글을 등록하였습니다."));
    }

    // 게시글 수정
    @PutMapping("/{boardId}")
    public ResponseEntity<ResponseDto> updateBoard(@PathVariable(name = "boardId") int boardId,
                                                   @RequestHeader("Authorization") String authorizationToken,
                                                   @RequestBody BoardUpdateRequest boardUpdateRequest) {
        String userId = JwtUtils.getUserId(authorizationToken);
        boardService.updateBoard(boardId, userId, boardUpdateRequest);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 게시글을 수정하였습니다."));
    }

    // 게시글 삭제
    @PostMapping("/{boardId}")
    public ResponseEntity<ResponseDto> deleteBoard(@PathVariable(name = "boardId") int boardId,
                                                   @RequestHeader("Authorization") String authorizationToken) {
        String userId = JwtUtils.getUserId(authorizationToken);
        boardService.deleteBoard(boardId, userId);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 게시글을 삭제하였습니다."));
    }

    // 전체 게시글 목록 조회
    @GetMapping
    public ResponseEntity<ResponseDto> getAll() {
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 전체 게시글 목록을 조회하였습니다.", boardService.getAll()));
    }

    // 내가 쓴 게시글 목록 조회
    @GetMapping("/byUser")
    public ResponseEntity<ResponseDto> getAllByCreator(@RequestHeader("Authorization") String authorizationToken) {
        String userId = JwtUtils.getUserId(authorizationToken);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 내가 쓴 게시글 목록을 조회하였습니다.", boardService.getAllByCreator(userId)));
    }

    // 게시글 상세 조회
    @GetMapping("/{boardId}")
    public ResponseEntity<ResponseDto> getBoard(@PathVariable(name = "boardId") int boardId) {
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 게시글을 조회하였습니다.", boardService.getBoard(boardId)));
    }

    // 게시글 검색
    @GetMapping("/search/{keyword}")
    public ResponseEntity<ResponseDto> getAllByKeyword(@PathVariable(name = "keyword") String keyword) {
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 게시글을 검색하였습니다.", boardService.getAllByKeyword(keyword)));
    }

    // 조회수 증가
    @PostMapping("/hit/{boardId}")
    public ResponseEntity<ResponseDto> updateHit(@PathVariable(name = "boardId") int boardId) {
        boardService.updateHit(boardId);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 게시글의 조회수가 증가하였습니다."));
    }

}
