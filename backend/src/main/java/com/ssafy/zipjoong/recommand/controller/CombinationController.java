package com.ssafy.zipjoong.recommand.controller;

import com.ssafy.zipjoong.recommand.dto.CombinationProductRequest;
import com.ssafy.zipjoong.recommand.dto.ProductRequest;
import com.ssafy.zipjoong.recommand.service.CombinationService;
import com.ssafy.zipjoong.recommand.service.RecommendService;
import com.ssafy.zipjoong.security.jwt.utils.JwtUtils;
import com.ssafy.zipjoong.util.dto.ResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/combination")
@RequiredArgsConstructor
@Tag(name = "조합, 추천 API", description = "키보드, 모니터, 마우스 의 조합 및 추천 정보를 제공 하는 API")
public class CombinationController {

    private final CombinationService combinationService;

    private final RecommendService recommendService;

    /* 조합 등록 */
    @PostMapping("")
    @Operation(summary = "관심 조합 목록에 추가", description = "추천 받은 조합을 저장 하거나 조합 생성시 저장 /n리스트로 제품의 id(productId)값을 넘겨주세요")
    public ResponseEntity<ResponseDto> saveCombination(Principal principal, @RequestBody List<ProductRequest> requestList){
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 조합을 등록하였습니다.", combinationService.saveCombination(requestList, principal.getName())));
    }

    /* 조합에 제품 추가*/
    @PostMapping("/product")
    @Operation(summary = "조합에 제품 추가", description = "기존의 조합에 제품을 추가")
    public ResponseEntity<ResponseDto> saveCombinationProduct(@RequestBody CombinationProductRequest productRequest){
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 조합에 제품을 추가 하였습니다.", combinationService.addCombinationProduct(productRequest)));
    }

    /* 조합 조회 */
    @GetMapping("/{combinationId}")
    @Operation(summary = "조합 조회", description = "조합의 세부 내용 조회")
    public ResponseEntity<ResponseDto> getCombination(@PathVariable long combinationId){
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 조합을 조회하였습니다.", combinationService.getCombination(combinationId)));
    }

    /* 해당 유저의 조합 목록 조회 */
    @GetMapping("")
    @Operation(summary = "관심 조합 목록 조회", description = "자신이 저장한 조합 목록 조회 ")
    public ResponseEntity<ResponseDto> getUserCombinations(Principal principal){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 유저의 조합을 조회하였습니다.", combinationService.getUserCombinations(authentication.getName())));
    }

    /* 추천 조합 조회 */
    @GetMapping("/recommend")
    @Operation(summary = "추천 받기", description = "설문 기반 추천 서비스")
    public ResponseEntity<ResponseDto> getRecommendCombinations(Principal principal){
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 조합을 추천받았습니다.", recommendService.getRecommendCombinations(principal.getName())));
    }

    /* 추천 조합 상세 조회 */
    @PostMapping("/recommend/info")
    @Operation(summary = "추천 받은 조합 세부 내용 조회", description = "추천 조합 상세 조회 및 유사 제품 추천")
    public ResponseEntity<ResponseDto> getRecommendCombinationInfos(@RequestBody List<ProductRequest> requestList){
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 조합의 상세 정보를 조회하였습니다.", recommendService.getRecommendCombinationInfo(requestList)));
    }

    @DeleteMapping("/{combinationId}")
    @Operation(summary = "관심 조합 목록에서 삭제", description = "개인이 저장한 조합 제거 api")
    public ResponseEntity<ResponseDto> removeCombination(@PathVariable long combinationId){
        combinationService.removeCombination(combinationId);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 조합을 제거하였습니다."));
    }
    @DeleteMapping("/{combinationId}/product/{productId}")
    @Operation(summary = "조합내의 제품 제거", description = "조합을 수정 시 개별적으로 조합에서 제품을 제거하는 api")
    public ResponseEntity<ResponseDto> removeCombinationProduct(@PathVariable long combinationId, @PathVariable int productId){
        combinationService.removeCombinationProduct(combinationId, productId);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 조합의 제품을 제거하였습니다."));
    }

}
