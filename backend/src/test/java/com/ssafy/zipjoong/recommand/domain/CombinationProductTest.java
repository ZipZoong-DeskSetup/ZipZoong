package com.ssafy.zipjoong.recommand.domain;

import com.ssafy.zipjoong.recommand.repository.CombinationProductRepository;
import com.ssafy.zipjoong.recommand.repository.CombinationRepository;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.jdbc.Sql;

@Slf4j
@DataJpaTest
@Sql("/productData.sql")
class CombinationProductTest {
    @Autowired
    private CombinationRepository combinationRepository;

    @Autowired
    private CombinationProductRepository combinationProductRepository;

    @Test
    @DisplayName("조합 제품 등록 테스트")
    void saveCombinationProduct(){
        // given
        Combination combination = combinationRepository.save(Combination.builder().build());
        CombinationProductId combinationProductId = CombinationProductId.builder().combinationId(combination.getCombinationId()).productId(1).build();
        CombinationProduct mockCombinationProduct = CombinationProduct.builder().combinationProductId(combinationProductId).build();

        // when
        CombinationProduct saveCombinationProduct = combinationProductRepository.save(mockCombinationProduct);

        // then
        Assertions.assertThat(mockCombinationProduct).isEqualTo(saveCombinationProduct);
    }

    @Test
    @DisplayName("조합 제품 조회 테스트")
    void findCombinationProduct(){
        // given
        Combination combination = combinationRepository.save(Combination.builder().build());
        CombinationProductId combinationProductId = CombinationProductId.builder().combinationId(combination.getCombinationId()).productId(1).build();
        CombinationProduct saveCombinationProduct = combinationProductRepository.save(CombinationProduct.builder().combinationProductId(combinationProductId).build());
        CombinationProductId combinationProductId2 = CombinationProductId.builder().combinationId(combination.getCombinationId()).productId(2).build();
        CombinationProduct saveCombinationProduct2 = combinationProductRepository.save(CombinationProduct.builder().combinationProductId(combinationProductId2).build());

        // when
        CombinationProduct findCombinationProduct = combinationProductRepository.findById(combinationProductId)
                .orElseThrow(() -> new IllegalArgumentException("Wrong combinationProductId : " + combinationProductId));
        CombinationProduct findCombinationProduct2 = combinationProductRepository.findById(combinationProductId2)
                .orElseThrow(() -> new IllegalArgumentException("Wrong combinationProductId : " + combinationProductId2));

        // then
        Assertions.assertThat(saveCombinationProduct).isEqualTo(findCombinationProduct);
        Assertions.assertThat(saveCombinationProduct2).isEqualTo(findCombinationProduct2);
    }
}