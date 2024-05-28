package com.ssafy.zipjoong.product.controller;

import com.jayway.jsonpath.DocumentContext;
import com.jayway.jsonpath.JsonPath;
import com.ssafy.zipjoong.product.dto.KeyboardResponse;
import com.ssafy.zipjoong.product.dto.MonitorResponse;
import com.ssafy.zipjoong.product.dto.MouseResponse;
import com.ssafy.zipjoong.product.service.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Slf4j
@WithMockUser
@MockBean(JpaMetamodelMappingContext.class)
@WebMvcTest(controllers = ProductController.class)
class ProductControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductService productService;

    @Test
    @DisplayName("상품 조회 테스트")
    void getProduct() throws Exception {
        // given
        KeyboardResponse keyboardResponse = KeyboardResponse.builder().category("KEYBOARD").name("rainy75").build();
        when(productService.getProduct(1)).thenReturn(keyboardResponse);

        // when
        MvcResult result = mockMvc.perform(get("/product/1"))
                .andExpect(status().isOk())
                .andDo(print()).andReturn();

        // then
        DocumentContext documentContext = JsonPath.parse(result.getResponse().getContentAsString());
        Assertions.assertThat(documentContext.read("$.message", String.class)).isEqualTo("성공적으로 제품을 조회하였습니다.");
        Assertions.assertThat(documentContext.read("$.data.name", String.class)).isEqualTo("rainy75");
        Assertions.assertThat(documentContext.read("$.data.category", String.class)).isEqualTo("KEYBOARD");
    }

    @Test
    void getKeyboards() throws Exception {
        // given
        Pageable pageable = PageRequest.of(0, 3);
        List<KeyboardResponse> keyboardResponseList = new ArrayList<>();
        keyboardResponseList.add(KeyboardResponse.builder().name("keyboard1").build());
        keyboardResponseList.add(KeyboardResponse.builder().name("keyboard2").build());
        keyboardResponseList.add(KeyboardResponse.builder().name("keyboard3").build());
        Page<KeyboardResponse> keyboardResponsePage = new PageImpl<>(keyboardResponseList, pageable, keyboardResponseList.size());

        when(productService.getKeyboardWithPage(pageable)).thenReturn(keyboardResponsePage);

        // when & then
        mockMvc.perform(get("/product/keyboard?page=0&size=3"))
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.data.pageable.pageSize").value(3))
                .andExpect(jsonPath("$.data.content[0].name").value("keyboard1"))
                .andExpect(jsonPath("$.data.content[1].name").value("keyboard2"))
                .andExpect(jsonPath("$.data.content[2].name").value("keyboard3"));
    }

    @Test
    void getMonitors() throws Exception {
        // given
        Pageable pageable = PageRequest.of(0, 3);
        /* 모니터 page */
        List<MonitorResponse> monitorResponseList = new ArrayList<>();
        monitorResponseList.add(MonitorResponse.builder().name("monitor1").build());
        monitorResponseList.add(MonitorResponse.builder().name("monitor2").build());
        monitorResponseList.add(MonitorResponse.builder().name("monitor3").build());
        Page<MonitorResponse> monitorResponsePage = new PageImpl<>(monitorResponseList, pageable, monitorResponseList.size());

        when(productService.getMonitorWithPage(pageable)).thenReturn(monitorResponsePage);

        // when & then
        mockMvc.perform(get("/product/monitor?page=0&size=3"))
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.data.pageable.pageSize").value(3))
                .andExpect(jsonPath("$.data.content[0].name").value("monitor1"))
                .andExpect(jsonPath("$.data.content[1].name").value("monitor2"))
                .andExpect(jsonPath("$.data.content[2].name").value("monitor3"));
    }

    @Test
    void getMouses() throws Exception {
        // given
        Pageable pageable = PageRequest.of(0, 3);
        /* 마우스 page */
        List<MouseResponse> mouseResponseList = new ArrayList<>();
        mouseResponseList.add(MouseResponse.builder().name("mouse1").build());
        mouseResponseList.add(MouseResponse.builder().name("mouse2").build());
        mouseResponseList.add(MouseResponse.builder().name("mouse3").build());
        Page<MouseResponse> mouseResponsePage = new PageImpl<>(mouseResponseList, pageable, mouseResponseList.size());

        when(productService.getMouseWithPage(pageable)).thenReturn(mouseResponsePage);

        // when & then
        mockMvc.perform(get("/product/mouse?page=0&size=3"))
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.data.pageable.pageSize").value(3))
                .andExpect(jsonPath("$.data.content[0].name").value("mouse1"))
                .andExpect(jsonPath("$.data.content[1].name").value("mouse2"))
                .andExpect(jsonPath("$.data.content[2].name").value("mouse3"));
    }
}