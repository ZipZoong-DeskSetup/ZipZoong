package com.ssafy.zipjoong.product.domain;

import com.ssafy.zipjoong.product.repository.KeyboardRepository;
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
class KeyboardTest {
    @Autowired
    private KeyboardRepository keyboardRepository;

    @Test
    @DisplayName("키보드 DB 저장 테스트")
    void saveKeyboard(){
        // given
        Keyboard mockKeyboard = Keyboard.builder()
                .productName("keyboard")
                .productBrand("삼성")
                .productPrice(1000)
                .keyboardConnect(ConnectionType.BOTH)
                .keyboardInterface(InterfaceType.BOTH)
                .build();

        // when
        Keyboard saveKeyboard = keyboardRepository.save(mockKeyboard);

        // then
        Assertions.assertThat(mockKeyboard).isEqualTo(saveKeyboard); // 저장전 keyboard와 저장후 keyboard가 같은지
    }

    @Test
    @DisplayName("키보드 조회 테스트")
    void findKeyboard(){
        // given
        Keyboard saveKeyboard = keyboardRepository.save(Keyboard.builder().productName("Rainy").build());
        Keyboard saveKeyboard2 = keyboardRepository.save(Keyboard.builder().productName("Turtle ship").build());

        // when
        Keyboard findKeyboard = keyboardRepository.findById(saveKeyboard.getProductId())
                .orElseThrow(() -> new IllegalArgumentException("Wrong productId : " + saveKeyboard.getProductId()));
        Keyboard findKeyboard2 = keyboardRepository.findById(saveKeyboard2.getProductId())
                .orElseThrow(() -> new IllegalArgumentException("Wrong productId : " + saveKeyboard2.getProductId()));

        // then
        Assertions.assertThat(saveKeyboard).isSameAs(findKeyboard); // 저장한 keyboard가 조회한 keyboard와 같은지 확인
        Assertions.assertThat(saveKeyboard2).isSameAs(findKeyboard2); // 저장한 keyboard2가 조회한 keyboard2와 같은지 확인
    }

    @Test
    @DisplayName("키보드 페이징 테스트")
    void pageKeyboard(){
        // given
        Pageable pageable = PageRequest.of(0,3);

        // when
        Page<Keyboard> pageKeyboards = keyboardRepository.findAll(pageable);

        // then
        Assertions.assertThat(pageKeyboards.getSize()).isEqualTo(3); // 페이지 크기가 요청한대로 3인지 확인
        Assertions.assertThat(pageKeyboards.getNumber()).isZero(); // 페이지 번호가 0(첫 번째 페이지)인지 확인
        Assertions.assertThat(pageKeyboards.getContent()).hasSizeLessThanOrEqualTo(3); // 가져온 컨텐츠의 크기가 3 이하인지 확인
        Assertions.assertThat(pageKeyboards.isFirst()).isTrue(); // 첫 번째 페이지인지 확인
    }
}