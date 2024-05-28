package com.ssafy.zipjoong.like.controller;

import com.ssafy.zipjoong.like.service.ProductLikeService;
import com.ssafy.zipjoong.security.jwt.utils.JwtUtils;
import com.ssafy.zipjoong.util.dto.ResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/product-like")
@RequiredArgsConstructor
@Tag(name = "관심 제품 API", description = "관심 제품 좋아요를 생성/제거/조회 하는 API")
public class ProductLikeController {

    private final ProductLikeService productLikeService;


    /* 관심 제품 좋아요 */
    @PostMapping("/{productId}")
    @Operation(summary = "관심 제품 좋아요 추가", description = "관심 제품을 추가하는 API")
    public ResponseEntity<ResponseDto> saveLikeCombination(@RequestHeader("Authorization") String authorizationToken, @PathVariable Integer productId) {
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 관심 제품을 추가하였습니다.",productLikeService.likeProduct(findUserId(authorizationToken), productId)));
    }

    /* 관심 조합 좋아요 삭제 */
    @DeleteMapping("/{productId}")
    @Operation(summary = "관심 제품 좋아요 삭제", description = "관심 제품을 삭제하는 API")
    public ResponseEntity<ResponseDto>  deleteLikeProduct(@RequestHeader("Authorization") String authorizationToken, @PathVariable Integer productId) {
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 관심 제품을 삭제하였습니다.",productLikeService.unlikeProduct(findUserId(authorizationToken), productId)));
    }

    /* 관심 제품 조회 */
    @GetMapping("")
    @Operation(summary = "관심 제품 조회", description = "관심 제품을 조회하는 API")
    public ResponseEntity<ResponseDto> getLikeProduct(@RequestHeader("Authorization") String authorizationToken) {
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 관심 제품을 조회하였습니다.",productLikeService.getLikeProducts(findUserId(authorizationToken))));
    }


    private String findUserId(String authorizationToken) {
        return JwtUtils.getUserId(authorizationToken);
    }

}
