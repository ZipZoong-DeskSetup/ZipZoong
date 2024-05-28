package com.ssafy.zipjoong.product.domain;

import com.ssafy.zipjoong.product.repository.ProductRepository;
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
class ProductTest {
    @Autowired
    private ProductRepository productRepository;

    @Test
    @DisplayName("상품 페이징 테스트")
    void pageProduct(){
        // given
        Pageable pageable = PageRequest.of(0,3);

        // when
        Page<Product> productPage = productRepository.findAll(pageable);

        // then
        Assertions.assertThat(productPage.getSize()).isEqualTo(3); // 페이지 크기가 요청한대로 3인지 확인
        Assertions.assertThat(productPage.getNumber()).isZero(); // 페이지 번호가 0(첫 번째 페이지)인지 확인
        Assertions.assertThat(productPage.getContent()).hasSizeLessThanOrEqualTo(3); // 가져온 컨텐츠의 크기가 3 이하인지 확인
        Assertions.assertThat(productPage.isFirst()).isTrue(); // 첫 번째 페이지인지 확인
    }
}