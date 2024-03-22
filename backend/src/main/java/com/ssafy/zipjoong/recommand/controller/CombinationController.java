package com.ssafy.zipjoong.recommand.controller;

import com.ssafy.zipjoong.recommand.dto.CombinationProductRequest;
import com.ssafy.zipjoong.recommand.dto.SaveCombinationProductRequest;
import com.ssafy.zipjoong.recommand.service.CombinationService;
import com.ssafy.zipjoong.security.jwt.utils.JwtUtils;
import com.ssafy.zipjoong.util.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/combination")
@RequiredArgsConstructor
public class CombinationController {

    private final CombinationService combinationService;

    /* 조합 등록 */
    @PostMapping("")
    public ResponseEntity<ResponseDto> saveCombination(@RequestBody List<SaveCombinationProductRequest> requestList){
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 조합을 등록하였습니다.", combinationService.saveCombination(requestList)));
    }
    @PostMapping("/product")
    public ResponseEntity<ResponseDto> saveCombinationProduct(@RequestBody CombinationProductRequest productRequest){
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 조합을 등록하였습니다.", combinationService.addCombinationProduct(productRequest)));
    }

    /* 조합 조회 */
    @GetMapping("/{combinationId}")
    public ResponseEntity<ResponseDto> getCombination(@PathVariable long combinationId){
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 조합을 조회하였습니다.", combinationService.getCombination(combinationId)));
    }

    /* 해당 유저의 조합 목록 조회 */
    @GetMapping("")
    public ResponseEntity<ResponseDto> getUserCombinations(@RequestHeader("Authorization") String authorizationToken){
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 유저의 조합을 조회하였습니다.", combinationService.getUserCombinations(findUserId(authorizationToken))));
    }

    /* 추천 조합 조회 프로토타입 */
    @GetMapping("/recommend")
    public ResponseEntity<ResponseDto> getRecommendCombinations(){
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 조합을 추천받았습니다.", combinationService.getRecommendCombinations()));
    }

    /* 추천 조합 상세 조회 프로토타입 */
    @GetMapping("/recommend/info")
    public ResponseEntity<ResponseDto> getRecommendCombinationInfos(){
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 조합의 상세 정보를 조회하였습니다.", combinationService.getRecommendCombinationInfos()));
    }

    @DeleteMapping("/{combinationId}")
    public ResponseEntity<ResponseDto> removeCombination(@PathVariable long combinationId){
        combinationService.removeCombination(combinationId);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 조합을 제거하였습니다."));
    }
    @DeleteMapping("/{combinationId}/product/{productId}")
    public ResponseEntity<ResponseDto> removeCombinationProduct(@PathVariable long combinationId, @PathVariable int productId){
        combinationService.removeCombinationProduct(combinationId, productId);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 조합의 제품을 제거하였습니다."));
    }
    private String findUserId(String authorizationToken) {
        return JwtUtils.getUserId(authorizationToken);
    }
}
