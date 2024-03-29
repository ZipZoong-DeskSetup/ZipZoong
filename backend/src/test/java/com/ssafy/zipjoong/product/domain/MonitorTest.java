package com.ssafy.zipjoong.product.domain;

import com.ssafy.zipjoong.product.repository.MonitorRepository;
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
class MonitorTest {
    @Autowired
    private MonitorRepository monitorRepository;

    @Test
    @DisplayName("모니터 DB 저장 테스트")
    void saveMonitor(){
        // given
        Monitor mockMonitor = Monitor.builder()
                .productName("monitor")
                .productBrand("삼성")
                .productPrice(1000)
                .monitorPanelType(MonitorPanelType.OLED)
                .monitorPanelForm(MonitorPanelFormType.CURVED)
                .build();

        // when
        Monitor saveMonitor = monitorRepository.save(mockMonitor);

        // then
        Assertions.assertThat(mockMonitor).isEqualTo(saveMonitor); // 저장전 monitor와 저장후 monitor가 같은지
    }

    @Test
    @DisplayName("모니터 조회 테스트")
    void findMonitor(){
        // given
        Monitor saveMonitor = monitorRepository.save(Monitor.builder().productName("오디세이").build());
        Monitor saveMonitor2 = monitorRepository.save(Monitor.builder().productName("U34").build());

        // when
        Monitor findMonitor = monitorRepository.findById(saveMonitor.getProductId())
                .orElseThrow(() -> new IllegalArgumentException("Wrong productId : " + saveMonitor.getProductId()));
        Monitor findMonitor2 = monitorRepository.findById(saveMonitor2.getProductId())
                .orElseThrow(() -> new IllegalArgumentException("Wrong productId : " + saveMonitor2.getProductId()));

        // then
        Assertions.assertThat(saveMonitor).isSameAs(findMonitor); // 저장한 monitor가 조회한 monitor와 같은지 확인
        Assertions.assertThat(saveMonitor2).isSameAs(findMonitor2); // 저장한 monitor2가 조회한 monitor2와 같은지 확인
    }

    @Test
    @DisplayName("모니터 페이징 테스트")
    void pageMonitor(){
        // given
        Pageable pageable = PageRequest.of(0,3);

        // when
        Page<Monitor> pageMonitors = monitorRepository.findAll(pageable);

        // then
        Assertions.assertThat(pageMonitors.getSize()).isEqualTo(3); // 페이지 크기가 요청한대로 3인지 확인
        Assertions.assertThat(pageMonitors.getNumber()).isZero(); // 페이지 번호가 0(첫 번째 페이지)인지 확인
        Assertions.assertThat(pageMonitors.getContent()).hasSizeLessThanOrEqualTo(3); // 가져온 컨텐츠의 크기가 3 이하인지 확인
        Assertions.assertThat(pageMonitors.isFirst()).isTrue(); // 첫 번째 페이지인지 확인
    }
}