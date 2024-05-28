//package com.ssafy.zipjoong.like.controller;
//
//import com.ssafy.zipjoong.like.service.CombinationLikeService;
//import com.ssafy.zipjoong.recommand.dto.SaveCombinationProductRequest;
//import com.ssafy.zipjoong.security.jwt.utils.JwtUtils;
//import com.ssafy.zipjoong.util.dto.ResponseDto;
//import io.swagger.v3.oas.annotations.Operation;
//import io.swagger.v3.oas.annotations.tags.Tag;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//
//@RestController
//@RequestMapping("/combination-like")
//@RequiredArgsConstructor
//@Tag(name = "관심 조합 API", description = "[사용안함|예비]관심 조합 좋아요를  생성 및 제거하는 API")
//public class CombinationLikeController {
//
//    private final CombinationLikeService combinationLikeService;
//
//
//    /* 관심 조합 좋아요 */
//    @PostMapping("/{combinationId}")
//    @Operation(summary = "관심 조합 좋아요 추가", description = "관심 조합을 추가하는 API")
//    public ResponseEntity<ResponseDto> saveLikeCombination(@RequestHeader("Authorization") String authorizationToken, @PathVariable Long combinationId) {
//        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 관심 조합을 추가하였습니다.",combinationLikeService.likeCombination(findUserId(authorizationToken), combinationId)));
//    }
//
//    /* 관심 조합 좋아요  삭제 */
//    @DeleteMapping("/{combinationId}")
//    @Operation(summary = "관심 조합 좋아요 삭제", description = "관심 조합을 삭제하는 API")
//    public ResponseEntity<ResponseDto>  deleteLikeCombination(@RequestHeader("Authorization") String authorizationToken, @PathVariable Long combinationId) {
//        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 관심 조합을 삭제하였습니다.",combinationLikeService.unlikeCombination(findUserId(authorizationToken), combinationId)));
//    }
//
//    private String findUserId(String authorizationToken) {
//        return JwtUtils.getUserId(authorizationToken);
//    }
//}
