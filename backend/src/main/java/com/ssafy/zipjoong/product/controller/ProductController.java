package com.ssafy.zipjoong.product.controller;

import com.ssafy.zipjoong.product.dto.ProductResponse;
import com.ssafy.zipjoong.product.service.ProductService;
import com.ssafy.zipjoong.util.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    /* 상품 조회 */
    @GetMapping("/{productId}")
    public ResponseEntity<ResponseDto> getProduct(@PathVariable int productId){
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 제품을 조회하였습니다.", productService.getProduct(productId)));
    }

    /* 키보드 목록 조회 (페이징 처리) */
    @GetMapping("/keyboard")
    public ResponseEntity<ResponseDto> getKeyboards(Pageable pageable){
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 키보드 목록을 조회하였습니다.", productService.getKeyboardWithPage(pageable)));
    }

    /* 모니터 목록 조회 (페이징 처리) */
    @GetMapping("/monitor")
    public ResponseEntity<ResponseDto> getMonitors(Pageable pageable){
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 모니터 목록을 조회하였습니다.", productService.getMonitorWithPage(pageable)));
    }

    /* 마우스 목록 조회 (페이징 처리) */
    @GetMapping("/mouse")
    public ResponseEntity<ResponseDto> getMouses(Pageable pageable){
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 마우스 목록을 조회하였습니다.", productService.getMouseWithPage(pageable)));
    }
}
