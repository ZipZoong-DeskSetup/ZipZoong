package com.ssafy.zipjoong.recommand.service;

import com.ssafy.zipjoong.product.domain.Keyboard;
import com.ssafy.zipjoong.product.domain.Monitor;
import com.ssafy.zipjoong.product.domain.Mouse;
import com.ssafy.zipjoong.product.domain.Product;
import com.ssafy.zipjoong.product.dto.KeyboardResponse;
import com.ssafy.zipjoong.product.dto.MonitorResponse;
import com.ssafy.zipjoong.product.dto.MouseResponse;
import com.ssafy.zipjoong.product.dto.ProductResponse;
import com.ssafy.zipjoong.product.exception.ProductErrorCode;
import com.ssafy.zipjoong.product.exception.ProductException;
import com.ssafy.zipjoong.product.repository.KeyboardRepository;
import com.ssafy.zipjoong.product.repository.MonitorRepository;
import com.ssafy.zipjoong.product.repository.MouseRepository;
import com.ssafy.zipjoong.product.repository.ProductRepository;
import com.ssafy.zipjoong.recommand.domain.Combination;
import com.ssafy.zipjoong.recommand.domain.CombinationProduct;
import com.ssafy.zipjoong.recommand.domain.CombinationProductId;
import com.ssafy.zipjoong.recommand.dto.*;
import com.ssafy.zipjoong.recommand.exception.CombinationErrorCode;
import com.ssafy.zipjoong.recommand.exception.CombinationException;
import com.ssafy.zipjoong.recommand.repository.CombinationProductRepository;
import com.ssafy.zipjoong.recommand.repository.CombinationRepository;
import com.ssafy.zipjoong.user.domain.User;
import com.ssafy.zipjoong.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CombinationService {

    private final UserRepository userRepository;

    private final CombinationRepository combinationRepository;

    private final CombinationProductRepository combinationProductRepository;

    private final KeyboardRepository keyboardRepository;
    private final MonitorRepository monitorRepository;
    private final MouseRepository mouseRepository;

    private final ProductRepository productRepository;

    /* 조합 등록 -> 추후 유저정보 담아야함*/
    @Transactional
    public CombinationResponse saveCombination(List<SaveCombinationProductRequest> requests){
        Combination combination = combinationRepository.save(Combination.builder().build());
        int totalPrice = 0;
        for(SaveCombinationProductRequest request : requests){

            CombinationProductId combinationProductId = CombinationProductId.builder()
                    .combinationId(combination.getCombinationId()).
                    productId(request.getProductId())
                    .build();

            if(!productRepository.existsById(request.getProductId()))
                throw new ProductException(ProductErrorCode.PRODUCT_NOT_FOUND);

            if(combinationProductRepository.existsById(combinationProductId))
                throw new CombinationException(CombinationErrorCode.COMBINATION_CONFLICT);

            CombinationProduct combinationProduct = combinationProductRepository.save(CombinationProduct.builder()
                    .combinationProductId(combinationProductId)
                    .combinationProductNum(request.getNum())
                    .build());

            totalPrice += combinationProduct.getProduct().getProductPrice();
        }

        combination.setCombinationPrice(totalPrice);
        combinationRepository.save(combination);

        return CombinationResponse.builder()
                .combinationId(combination.getCombinationId())
                .products(getProducts(combination, true)) // 상품 정보 디테일까지 가져오기
                .totalPrice(combination.getCombinationPrice())
                .build();
    }

    /* 조합내 상품 추가 */
    @Transactional
    public CombinationResponse addCombinationProduct(CombinationProductRequest addId){
        CombinationProductId combinationProductId = CombinationProductId.builder().combinationId(addId.getCombinationId()).productId(addId.getProductId()).build();
        if(!combinationProductRepository.existsById(combinationProductId))
            throw new CombinationException(CombinationErrorCode.COMBINATION_NOT_FOUND);

        combinationProductRepository.save(CombinationProduct.builder().combinationProductId(combinationProductId).build());

        Combination combination = combinationRepository.findById(combinationProductId.getCombinationId())
                .orElseThrow(() -> new CombinationException(CombinationErrorCode.COMBINATION_NOT_FOUND));

        return CombinationResponse.builder()
                .combinationId(combination.getCombinationId())
                .products(getProducts(combination, true)) // 상품 정보 디테일까지 가져오기
                .totalPrice(combination.getCombinationPrice())
                .build();
    }


    /* 조합 조회 */
    public CombinationResponse getCombination(long combinationId){
        Combination combination = combinationRepository.findById(combinationId)
                .orElseThrow(() -> new CombinationException(CombinationErrorCode.COMBINATION_NOT_FOUND));

        return CombinationResponse.builder()
                .combinationId(combination.getCombinationId())
                .products(getProducts(combination, true)) // 상품 정보 디테일까지 가져오기
                .totalPrice(combination.getCombinationPrice())
                .build();
    }

    /* 해당 유저의 조합 목록 조회 */
    public List<CombinationResponse> getUserCombinations(String userId){
        User user = userRepository.findById(userId).orElseThrow();
        List<CombinationResponse> combinationResponseList = new ArrayList<>();
        combinationRepository.findByUser(user)
                .orElseThrow(() -> new CombinationException(CombinationErrorCode.COMBINATION_NOT_FOUND))
                .forEach(combination -> {
                    combinationResponseList.add(CombinationResponse.builder()
                                    .combinationId(combination.getCombinationId())
                                    .totalPrice(combination.getCombinationPrice())
                                    .products(getProducts(combination, false)) // 상품 정보 디테일 없이 가져오기
                            .build());
                });
        return combinationResponseList;
    }

    /* 추천 조합 조회 프로토타입 */
    public List<CombinationResponse> getRecommendCombinations(){
        List<CombinationResponse> combinationResponseList = new ArrayList<>();

        Pageable pageable = PageRequest.of(0, 5);
        Page<Keyboard> keyboardPage =  keyboardRepository.findAll(pageable);
        Page<Monitor> monitorPage = monitorRepository.findAll(pageable);
        Page<Mouse> mousePage = mouseRepository.findAll(pageable);

        for(int i = 0; i < 5; i++){
            List<ProductResponse> productResponses = new ArrayList<>();
            productResponses.add(ProductResponse.toDto(keyboardPage.getContent().get(i)));
            productResponses.add(ProductResponse.toDto(monitorPage.getContent().get(i)));
            productResponses.add(ProductResponse.toDto(mousePage.getContent().get(i)));
            int totalPrice = keyboardPage.getContent().get(i).getProductPrice()
                    + monitorPage.getContent().get(i).getProductPrice()
                    + mousePage.getContent().get(i).getProductPrice();

            combinationResponseList.add(CombinationResponse.builder()
                    .products(productResponses)
                    .totalPrice(totalPrice)
                    .build());
        }

        return combinationResponseList;
    }

    /* 추천 조합 상세 조회 프로토타입 */
    public RecommendRespone getRecommendCombinationInfos(){
        Pageable pageable = PageRequest.of(0, 5);
        Page<Keyboard> keyboardPage =  keyboardRepository.findAll(pageable);
        Page<Monitor> monitorPage = monitorRepository.findAll(pageable);
        Page<Mouse> mousePage = mouseRepository.findAll(pageable);

        // 추천 상품
        List<ProductResponse> productResponses = new ArrayList<>();
        productResponses.add(ProductResponse.toDto(keyboardPage.getContent().get(0)));
        productResponses.add(ProductResponse.toDto(monitorPage.getContent().get(0)));
        productResponses.add(ProductResponse.toDto(mousePage.getContent().get(0)));

        // 총 가격
        int totalPrice = keyboardPage.getContent().get(0).getProductPrice()
                + monitorPage.getContent().get(0).getProductPrice()
                + mousePage.getContent().get(0).getProductPrice();

        // 상품별 유사 상품
        Map<String, List<ProductResponse>> similarProduct = new HashMap<>();
        similarProduct.put(keyboardPage.getContent().get(0).getProductName(), new ArrayList<>());
        similarProduct.put(monitorPage.getContent().get(0).getProductName(), new ArrayList<>());
        similarProduct.put(mousePage.getContent().get(0).getProductName(), new ArrayList<>());

        for(int i = 1; i < 5; i++){
            similarProduct.get(keyboardPage.getContent().get(0).getProductName()).add(KeyboardResponse.toDto(keyboardPage.getContent().get(i)));
            similarProduct.get(monitorPage.getContent().get(0).getProductName()).add(MonitorResponse.toDto(monitorPage.getContent().get(i)));
            similarProduct.get(mousePage.getContent().get(0).getProductName()).add(MouseResponse.toDto(mousePage.getContent().get(i)));
        }

        return RecommendRespone.builder()
                .combinationId(0)
                .products(productResponses)
                .similarProduct(similarProduct)
                .totalPrice(totalPrice)
                .build();
    }

    /* 조합 삭제 */
    public void removeCombination(long combinationId){
        if(!combinationRepository.existsById(combinationId))
            throw new CombinationException(CombinationErrorCode.COMBINATION_NOT_FOUND);
        combinationRepository.deleteById(combinationId);
    }

    /* 조합내 상품 삭제 */
    public void removeCombinationProduct(long combinationId ,int productId){
        CombinationProductId combinationProductId = CombinationProductId.builder().combinationId(combinationId).productId(productId).build();

        if(!combinationProductRepository.existsById(combinationProductId))
            throw new CombinationException(CombinationErrorCode.COMBINATION_NOT_FOUND);

        combinationProductRepository.deleteById(combinationProductId);
    }

    /* 상품 정보 가져오기 (isDeep true -> 마우스, 키보드, 모니터 세부 정보까지 false -> 제품 공통 정보까지만)*/
    public List<ProductResponse> getProducts(Combination combination, boolean isDeep){
        List<ProductResponse> products = new ArrayList<>();
        combination.getCombinationProducts().forEach( combinationProduct -> {
            Product product = combinationProduct.getProduct();
            if (isDeep && product instanceof Keyboard)
                products.add(KeyboardResponse.toDto((Keyboard) product));
            else if (isDeep && product instanceof Monitor)
                products.add(MonitorResponse.toDto((Monitor) product));
            else if (isDeep && product instanceof Mouse)
                products.add(MouseResponse.toDto((Mouse) product));
            else
                products.add(ProductResponse.toDto(product));
        });
        return products;
    }

}
