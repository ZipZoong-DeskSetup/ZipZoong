package com.ssafy.zipjoong.product.service;

import com.ssafy.zipjoong.product.domain.*;
import com.ssafy.zipjoong.product.dto.KeyboardResponse;
import com.ssafy.zipjoong.product.dto.MonitorResponse;
import com.ssafy.zipjoong.product.dto.MouseResponse;
import com.ssafy.zipjoong.product.dto.ProductResponse;
import com.ssafy.zipjoong.product.repository.KeyboardRepository;
import com.ssafy.zipjoong.product.repository.MonitorRepository;
import com.ssafy.zipjoong.product.repository.MouseRepository;
import com.ssafy.zipjoong.product.repository.ProductRepository;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@Slf4j
@ExtendWith(MockitoExtension.class)
class ProductServiceTest {
    @Mock
    private ProductRepository productRepository;

    @Mock
    private KeyboardRepository keyboardRepository;

    @Mock
    private MouseRepository mouseRepository;

    @Mock
    private MonitorRepository monitorRepository;

    @InjectMocks
    private ProductService productService;

    private List<Keyboard> mockKeyboards;
    private List<Monitor> mockMonitors;
    private List<Mouse> mockMouse;

    @BeforeEach
    void setUp(){
        /* 키보드 데이터 */
        mockKeyboards = new ArrayList<>();
        mockKeyboards.add(Keyboard.builder().productName("keyboard1").build());
        mockKeyboards.add(Keyboard.builder().productName("keyboard2").build());
        mockKeyboards.add(Keyboard.builder().productName("keyboard3").build());
        mockKeyboards.add(Keyboard.builder().productName("keyboard4").build());
        mockKeyboards.add(Keyboard.builder().productName("keyboard5").build());
        /* 모니터 데이터 */
        mockMonitors = new ArrayList<>();
        mockMonitors.add(Monitor.builder().productName("monitor1").build());
        mockMonitors.add(Monitor.builder().productName("monitor2").build());
        mockMonitors.add(Monitor.builder().productName("monitor3").build());
        mockMonitors.add(Monitor.builder().productName("monitor4").build());
        mockMonitors.add(Monitor.builder().productName("monitor5").build());
        /* 마우스 데이터 */
        mockMouse = new ArrayList<>();
        mockMouse.add(Mouse.builder().productName("mouse1").build());
        mockMouse.add(Mouse.builder().productName("mouse2").build());
        mockMouse.add(Mouse.builder().productName("mouse3").build());
        mockMouse.add(Mouse.builder().productName("mouse4").build());
        mockMouse.add(Mouse.builder().productName("mouse5").build());
    }

    @Test
    @Transactional
    @DisplayName("상품 조회 테스트")
    void getProduct() {
        // given
        Integer mockKeyboardId = 1;
        Keyboard mockKeyboard = Keyboard.builder()
                .productId(mockKeyboardId) // 상속받은 Product의 ID 설정
                .productName("keyboard")
                .productBrand("삼성")
                .productPrice(1000)
                .keyboardConnect(ConnectionType.BOTH)
                .keyboardInterface(InterfaceType.BOTH)
                .build();

        Integer mockMonitorId = 2;
        Monitor mockMonitor = Monitor.builder()
                .productId(mockMonitorId)
                .productName("monitor")
                .productBrand("삼성")
                .productPrice(1000)
                .monitorPanelType(MonitorPanelType.OLED)
                .monitorPanelForm(MonitorPanelFormType.CURVED)
                .build();

        Integer mockMouseId = 3;
        Mouse mockMouse = Mouse.builder()
                .productId(mockMouseId)
                .productName("mouse")
                .productBrand("삼성")
                .productPrice(1000)
                .mouseConnect(ConnectionType.BOTH)
                .mouseInterface(InterfaceType.BOTH)
                .build();

        when(productRepository.findById(mockKeyboardId)).thenReturn(Optional.of(mockKeyboard));
        when(productRepository.findById(mockMonitorId)).thenReturn(Optional.of(mockMonitor));
        when(productRepository.findById(mockMouseId)).thenReturn(Optional.of(mockMouse));

        // when
        ProductResponse productResponseKeyboard = productService.getProduct(mockKeyboardId);
        ProductResponse productResponseMonitor = productService.getProduct(mockMonitorId);
        ProductResponse productResponseMouse = productService.getProduct(mockMouseId);

        // then
        assertNotNull(productResponseKeyboard);
        assertEquals("keyboard", productResponseKeyboard.getName());
        assertNotNull(productResponseMonitor);
        assertEquals("monitor", productResponseMonitor.getName());
        assertNotNull(productResponseMouse);
        assertEquals("mouse", productResponseMouse.getName());
    }

    @Test
    @DisplayName("키보드 페이징 테스트")
    void getKeyboardWithPage() {
        // given
        Pageable pageable = PageRequest.of(0, 3);
        Page<Keyboard> mockPage = new PageImpl<>(mockKeyboards, pageable, mockKeyboards.size());
        when(keyboardRepository.findAll(pageable)).thenReturn(mockPage);

        // when
        Page<KeyboardResponse> keyboardResponsePage = productService.getKeyboardWithPage(pageable);

        // then
        Assertions.assertThat(keyboardResponsePage.getSize()).isEqualTo(3);
        Assertions.assertThat(keyboardResponsePage.getNumber()).isZero();
        Assertions.assertThat(keyboardResponsePage.getTotalElements()).isEqualTo(mockKeyboards.size());
        Assertions.assertThat(keyboardResponsePage.getContent()).hasSizeLessThanOrEqualTo(5);
        Assertions.assertThat(keyboardResponsePage.isFirst()).isTrue();
    }

    @Test
    @DisplayName("모니터 페이징 테스트")
    void getMonitorWithPage() {
        // given
        Pageable pageable = PageRequest.of(0, 3);
        Page<Monitor> mockPage = new PageImpl<>(mockMonitors, pageable, mockMonitors.size());
        when(monitorRepository.findAll(pageable)).thenReturn(mockPage);

        // when
        Page<MonitorResponse> monitorResponsePage = productService.getMonitorWithPage(pageable);

        // then
        Assertions.assertThat(monitorResponsePage.getSize()).isEqualTo(3);
        Assertions.assertThat(monitorResponsePage.getNumber()).isZero();
        Assertions.assertThat(monitorResponsePage.getTotalElements()).isEqualTo(mockMonitors.size());
        Assertions.assertThat(monitorResponsePage.getContent()).hasSizeLessThanOrEqualTo(5);
        Assertions.assertThat(monitorResponsePage.isFirst()).isTrue();
    }

    @Test
    @DisplayName("마우스 페이징 테스트")
    void getMouseWithPage() {
        // given
        Pageable pageable = PageRequest.of(0, 3);
        Page<Mouse> mockPage = new PageImpl<>(mockMouse, pageable, mockMouse.size());
        when(mouseRepository.findAll(pageable)).thenReturn(mockPage);

        // when
        Page<MouseResponse> mouseResponsePage = productService.getMouseWithPage(pageable);

        // then
        Assertions.assertThat(mouseResponsePage.getSize()).isEqualTo(3);
        Assertions.assertThat(mouseResponsePage.getNumber()).isZero();
        Assertions.assertThat(mouseResponsePage.getTotalElements()).isEqualTo(mockMouse.size());
        Assertions.assertThat(mouseResponsePage.getContent()).hasSizeLessThanOrEqualTo(5);
        Assertions.assertThat(mouseResponsePage.isFirst()).isTrue();
    }
}