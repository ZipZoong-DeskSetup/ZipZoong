package com.ssafy.zipjoong.recommand.service;

import com.ssafy.zipjoong.product.domain.Keyboard;
import com.ssafy.zipjoong.product.domain.Product;
import com.ssafy.zipjoong.product.repository.ProductRepository;
import com.ssafy.zipjoong.recommand.domain.Combination;
import com.ssafy.zipjoong.recommand.domain.CombinationProduct;
import com.ssafy.zipjoong.recommand.domain.CombinationProductId;
import com.ssafy.zipjoong.recommand.dto.CombinationProductRequest;
import com.ssafy.zipjoong.recommand.dto.CombinationResponse;
import com.ssafy.zipjoong.recommand.dto.ProductRequest;
import com.ssafy.zipjoong.recommand.repository.CombinationProductRepository;
import com.ssafy.zipjoong.recommand.repository.CombinationRepository;
import com.ssafy.zipjoong.user.domain.User;
import com.ssafy.zipjoong.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class CombinationServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private CombinationRepository combinationRepository;

    @Mock
    private CombinationProductRepository combinationProductRepository;

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private CombinationService combinationService;

    private User user;
    private Product product;
    private Combination combination;
    private CombinationProduct combinationProduct;
    private List<ProductRequest> requests;

    @BeforeEach
    void setUp() {
        // 기본 사용자 및 조합 설정
        user = User.builder().userId("user1").userNickname("Test User").build();

        combination = Combination.builder()
                .combinationId(1L)
                .combinationPrice(0)
                .user(user)
                .build();

        product = Keyboard.builder().productId(1).productName("keyboard").productPrice(1000).build();

        CombinationProductId combinationProductId = CombinationProductId.builder()
                .combinationId(combination.getCombinationId())
                .productId(product.getProductId())
                .build();

        combinationProduct = CombinationProduct.builder()
                .combinationProductId(combinationProductId)
                .product(product)
                .build();

        combination.addCombinationProduct(combinationProduct);
    }

    @Test
    @DisplayName("조합 저장 테스트")
    void saveCombinationTest() {
        // given
        when(userRepository.findById(any(String.class))).thenReturn(Optional.of(user));
        when(combinationRepository.save(any(Combination.class))).thenReturn(combination);
        when(productRepository.findById(any(Integer.class))).thenReturn(Optional.of(product));
        when(combinationProductRepository.save(any(CombinationProduct.class))).thenReturn(combinationProduct);

        // 상품 저장 요청 목록
        requests = new ArrayList<>();
        ProductRequest request = ProductRequest
                .builder()
                .productId(1)
                .build();

        requests.add(request);

        // when
        CombinationResponse response = combinationService.saveCombination(requests, "user1");

        // then
        assertNotNull(response);
        assertEquals(1L, response.getCombinationId());
        assertEquals(1, response.getKeyboard().getId());
        assertEquals(1000, response.getTotalPrice());
    }

    @Test
    @DisplayName("조합 내 제품 추가 테스트")
    void addCombinationProduct(){
        // given
        when(combinationRepository.findById(any(Long.class))).thenReturn(Optional.of(combination));
        when(productRepository.findById(any(Integer.class))).thenReturn(Optional.of(product));
        when(combinationProductRepository.save(any(CombinationProduct.class))).thenReturn(combinationProduct);
        when(combinationRepository.save(any(Combination.class))).thenReturn(combination);

        // 추가할 상품
        CombinationProductRequest productRequest = CombinationProductRequest.builder().combinationId(1L).productId(1).build();

        // when
        CombinationResponse response = combinationService.addCombinationProduct(productRequest);

        // then
        assertNotNull(response);
        assertEquals(1L, response.getCombinationId());
        assertEquals(1, response.getKeyboard().getId());
        assertEquals(1000, response.getTotalPrice());

    }

    @Test
    @DisplayName("제품 상세 조회 테스트")
    void getCombinationTest() {
        // given
        when(combinationRepository.findById(anyLong())).thenReturn(Optional.of(combination));

        // when
        CombinationResponse response = combinationService.getCombination(1L);

        // then
        assertNotNull(response);
        assertEquals(1L, response.getCombinationId());
    }

    @Test
    @DisplayName("유저 조합 조회 테스트")
    void getUserCombination(){
        // given
        List<Combination> combinations = new ArrayList<>();
        combinations.add(combination);

        when(userRepository.findById(any(String.class))).thenReturn(Optional.of(user));
        when(combinationRepository.findByUser(any(User.class))).thenReturn(Optional.of(combinations));

        // when
        List<CombinationResponse> combinationResponses = combinationService.getUserCombinations("user1");

        // then
        assertNotNull(combinationResponses);
        assertEquals(1L, combinationResponses.get(0).getCombinationId());
    }

}