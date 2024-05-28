package com.ssafy.zipjoong.recommand.domain;

import com.ssafy.zipjoong.recommand.repository.CombinationRepository;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
@Slf4j
@DataJpaTest
class CombinationTest {
    @Autowired
    private CombinationRepository combinationRepository;

    @Test
    @DisplayName("조합 등록 테스트")
    void saveCombination(){
        // given
        Combination mockCombination = Combination.builder().combinationPrice(1000).build();

        // when
        Combination saveCombination = combinationRepository.save(mockCombination);

        // then
        Assertions.assertThat(mockCombination).isEqualTo(saveCombination);
    }

    @Test
    @DisplayName("조합 조회 테스트")
    void findCombination(){
        // given
        Combination saveCombination = combinationRepository.save(Combination.builder().combinationPrice(1000).build());
        Combination saveCombination2 = combinationRepository.save(Combination.builder().combinationPrice(2000).build());

        // when
        Combination findCombination = combinationRepository.findById(saveCombination.getCombinationId())
                .orElseThrow(() -> new IllegalArgumentException("Wrong combinationId : " + saveCombination.getCombinationId()));
        Combination findCombination2 = combinationRepository.findById(saveCombination2.getCombinationId())
                .orElseThrow(() -> new IllegalArgumentException("Wrong combinationId : " + saveCombination2.getCombinationId()));

        // then
        Assertions.assertThat(saveCombination).isEqualTo(findCombination);
        Assertions.assertThat(saveCombination2).isEqualTo(findCombination2);
    }

    @Test
    @DisplayName("조합 목록 조회 테스트")
    void getCombinations(){
        // given
        for (int i = 0; i < 5; i++)
            combinationRepository.save(Combination.builder().build());
        Pageable pageable = PageRequest.of(0, 3);

        // when
        Page<Combination> combinationPage = combinationRepository.findAll(pageable);

        // then
        Assertions.assertThat(combinationPage.getSize()).isEqualTo(3); // 페이지 크기가 요청한대로 3인지 확인
        Assertions.assertThat(combinationPage.getNumber()).isZero(); // 페이지 번호가 0(첫 번째 페이지)인지 확인
        Assertions.assertThat(combinationPage.getContent()).hasSizeLessThanOrEqualTo(3); // 가져온 컨텐츠의 크기가 3 이하인지 확인
        Assertions.assertThat(combinationPage.isFirst()).isTrue(); // 첫 번째 페이지인지 확인

    }

}