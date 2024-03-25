package com.ssafy.zipjoong.product.controller;

import com.ssafy.zipjoong.product.dto.ProductResponse;
import com.ssafy.zipjoong.product.service.ProductService;
import com.ssafy.zipjoong.util.dto.ResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
@Tag(name = "제품 API", description = "키보드, 모니터, 마우스들의 정보를 제공하는 API")
public class ProductController {

    private final ProductService productService;

    /* 상품 조회 */
    @GetMapping("/{productId}")
    @Operation(summary = "제품 조회", description = "제품 ID 값을 이용하여 제품 조회")
    public ResponseEntity<ResponseDto> getProduct(@PathVariable int productId){
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 제품을 조회하였습니다.", productService.getProduct(productId)));
    }

    /* 키보드 목록 조회 (페이징 처리) */
    @GetMapping("/keyboard")
    @Operation(summary = "키보드 목록 조회", description = "키보드 목록 조회")
    public ResponseEntity<ResponseDto> getKeyboards(@RequestParam(name = "page", defaultValue = "0") int page, @RequestParam(name = "size", defaultValue = "10") int size){
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 키보드 목록을 조회하였습니다.", productService.getKeyboardWithPage(PageRequest.of(page, size))));
    }

    /* 모니터 목록 조회 (페이징 처리) */
    @GetMapping("/monitor")
    @Operation(summary = "모니터 목록 조회", description = "모니터 목록 조회")
    public ResponseEntity<ResponseDto> getMonitors(@RequestParam(name = "page", defaultValue = "0") int page, @RequestParam(name = "size", defaultValue = "10") int size){
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 모니터 목록을 조회하였습니다.", productService.getMonitorWithPage(PageRequest.of(page, size))));
    }

    /* 마우스 목록 조회 (페이징 처리) */
    @GetMapping("/mouse")
    @Operation(summary = "마우스 목록 조회", description = "마우스 목록 조회")
    public ResponseEntity<ResponseDto> getMouses(@RequestParam(name = "page", defaultValue = "0") int page, @RequestParam(name = "size", defaultValue = "10") int size){
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 마우스 목록을 조회하였습니다.", productService.getMouseWithPage(PageRequest.of(page, size))));
    }
}
