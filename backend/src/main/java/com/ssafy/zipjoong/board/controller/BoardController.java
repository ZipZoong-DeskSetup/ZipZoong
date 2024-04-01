package com.ssafy.zipjoong.board.controller;


import com.ssafy.zipjoong.board.dto.BoardCreateRequest;
import com.ssafy.zipjoong.board.dto.BoardFileRequest;
import com.ssafy.zipjoong.board.dto.BoardUpdateRequest;
import com.ssafy.zipjoong.board.service.BoardService;
import com.ssafy.zipjoong.security.jwt.utils.JwtUtils;
import com.ssafy.zipjoong.util.dto.ResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/board")
@Tag(name = "게시판 API", description = "게시판 API")
public class BoardController {
    private final BoardService boardService;

    // 게시글 작성
    @PostMapping
    @Operation(summary = "게시글 작성", description = "게시글 작성")
    public ResponseEntity<ResponseDto> createBoard(@RequestHeader("Authorization") String authorizationToken,
                                                   @RequestBody BoardCreateRequest boardCreateRequest) {
        String userId = findUserId(authorizationToken);
        boardService.createBoard(userId, boardCreateRequest);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 게시글을 등록하였습니다."));
    }

    // 게시글 수정
    @PutMapping("/{boardId}")
    @Operation(summary = "게시글 수정", description = "게시글 ID를 이용하여 게시글 수정")
    public ResponseEntity<ResponseDto> updateBoard(@PathVariable(name = "boardId") int boardId,
                                                   @RequestHeader("Authorization") String authorizationToken,
                                                   @RequestBody BoardUpdateRequest boardUpdateRequest) {
        String userId = findUserId(authorizationToken);
        boardService.updateBoard(boardId, userId, boardUpdateRequest);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 게시글을 수정하였습니다."));
    }

    // 게시글 삭제
    @PostMapping("/{boardId}")
    @Operation(summary = "게시글 삭제", description = "게시글 ID를 이용하여 게시글 삭제")
    public ResponseEntity<ResponseDto> deleteBoard(@PathVariable(name = "boardId") int boardId,
                                                   @RequestHeader("Authorization") String authorizationToken) {
        String userId = findUserId(authorizationToken);
        boardService.deleteBoard(boardId, userId);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 게시글을 삭제하였습니다."));
    }

    // 전체 게시글 목록 조회
    @GetMapping
    @Operation(summary = "전체 게시글 목록 조회", description = "전체 게시글 목록 조회")
    public ResponseEntity<ResponseDto> getAll() {
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 전체 게시글 목록을 조회하였습니다.", boardService.getAll()));
    }

    // 내가 쓴 게시글 목록 조회
    @GetMapping("/byUser")
    @Operation(summary = "내가 쓴 게시글 목록 조회", description = "내가 쓴 게시글 목록 조회")
    public ResponseEntity<ResponseDto> getAllByCreator(@RequestHeader("Authorization") String authorizationToken) {
        String userId = findUserId(authorizationToken);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 내가 쓴 게시글 목록을 조회하였습니다.", boardService.getAllByCreator(userId)));
    }

    // 게시글 상세 조회
    @GetMapping("/detail/{boardId}")
    @Operation(summary = "게시글 상세 조회", description = "게시글 ID를 이용하여 해당 게시글 상세 조회")
    public ResponseEntity<ResponseDto> getBoard(@PathVariable(name = "boardId") int boardId) {
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 게시글을 조회하였습니다.", boardService.getBoard(boardId)));
    }

    // 게시글 검색
    @GetMapping("/search/{keyword}")
    @Operation(summary = "게시글 검색", description = "제목에 키워드를 포함하는 게시글 검색")
    public ResponseEntity<ResponseDto> getAllByKeyword(@PathVariable(name = "keyword") String keyword) {
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 게시글을 검색하였습니다.", boardService.getAllByKeyword(keyword)));
    }

    // 조회수 증가
    @PostMapping("/hit/{boardId}")
    @Operation(summary = "조회수 증가", description = "조회수 증가")
    public ResponseEntity<ResponseDto> updateHit(@PathVariable(name = "boardId") int boardId) {
        boardService.updateHit(boardId);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 게시글의 조회수가 증가하였습니다."));
    }

    // 파일 업로드
    @PostMapping("/file")
    @Operation(summary = "파일 업로드", description = "파일 업로드")
    public ResponseEntity<ResponseDto> uploadFile(@RequestBody BoardFileRequest base64EncodedData) {
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 파일을 S3에 업로드하였습니다.", boardService.uploadFile(base64EncodedData.getBase64File())));
    }

    private String findUserId(String authorizationToken) {
        return JwtUtils.getUserId(authorizationToken);
    }
}
