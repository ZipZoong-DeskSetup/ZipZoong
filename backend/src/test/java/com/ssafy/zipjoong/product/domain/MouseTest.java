package com.ssafy.zipjoong.product.domain;

import com.ssafy.zipjoong.product.repository.MouseRepository;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.jdbc.Sql;

@Slf4j
@Sql("/productData.sql")
@DataJpaTest
class MouseTest {
    @Autowired
    private MouseRepository mouseRepository;
    
    @Test
    @DisplayName("키보드 DB 저장 테스트")
    void saveMouse(){
        // given
        Mouse mockMouse = Mouse.builder()
                .productName("mouse")
                .productBrand("삼성")
                .productPrice(1000)
                .mouseConnect(ConnectionType.BOTH)
                .mouseInterface(InterfaceType.BOTH)
                .build();

        // when
        Mouse saveMouse = mouseRepository.save(mockMouse);

        // then
        Assertions.assertThat(mockMouse).isEqualTo(saveMouse); // 저장전 mouse와 저장후 mouse가 같은지
    }

    @Test
    @DisplayName("키보드 조회 테스트")
    void findMouse(){
        // given
        Mouse saveMouse = mouseRepository.save(Mouse.builder().productName("G304").build());
        Mouse saveMouse2 = mouseRepository.save(Mouse.builder().productName("H150").build());

        // when
        Mouse findMouse = mouseRepository.findById(saveMouse.getProductId())
                .orElseThrow(() -> new IllegalArgumentException("Wrong productId : " + saveMouse.getProductId()));
        Mouse findMouse2 = mouseRepository.findById(saveMouse2.getProductId())
                .orElseThrow(() -> new IllegalArgumentException("Wrong productId : " + saveMouse2.getProductId()));

        // then
        Assertions.assertThat(saveMouse).isSameAs(findMouse); // 저장한 mouse가 조회한 mouse와 같은지 확인
        Assertions.assertThat(saveMouse2).isSameAs(findMouse2); // 저장한 mouse2가 조회한 mouse2와 같은지 확인
    }

    @Test
    @DisplayName("모니터 페이징 테스트")
    void pageMouse(){
        // given
        Pageable pageable = PageRequest.of(0,3);

        // when
        Page<Mouse> pageMouses = mouseRepository.findAll(pageable);

        // then
        Assertions.assertThat(pageMouses.getSize()).isEqualTo(3); // 페이지 크기가 요청한대로 3인지 확인
        Assertions.assertThat(pageMouses.getNumber()).isZero(); // 페이지 번호가 0(첫 번째 페이지)인지 확인
        Assertions.assertThat(pageMouses.getContent()).hasSizeLessThanOrEqualTo(3); // 가져온 컨텐츠의 크기가 3 이하인지 확인
        Assertions.assertThat(pageMouses.isFirst()).isTrue(); // 첫 번째 페이지인지 확인
    }
}