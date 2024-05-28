package com.ssafy.zipjoong.like.service;

import com.ssafy.zipjoong.like.domain.CombinationLikeId;
import com.ssafy.zipjoong.like.domain.ProductLike;
import com.ssafy.zipjoong.like.domain.ProductLikeId;
import com.ssafy.zipjoong.like.dto.LikeProductsResponse;
import com.ssafy.zipjoong.like.exception.ErrorCode;
import com.ssafy.zipjoong.like.exception.ProductLikeException;
import com.ssafy.zipjoong.like.exception.ProductTypeException;
import com.ssafy.zipjoong.like.repository.ProductLikeRepository;
import com.ssafy.zipjoong.product.domain.Keyboard;
import com.ssafy.zipjoong.product.domain.Monitor;
import com.ssafy.zipjoong.product.domain.Mouse;
import com.ssafy.zipjoong.product.domain.Product;
import com.ssafy.zipjoong.product.dto.KeyboardResponse;
import com.ssafy.zipjoong.product.dto.MonitorResponse;
import com.ssafy.zipjoong.product.dto.MouseResponse;
import com.ssafy.zipjoong.product.exception.ProductErrorCode;
import com.ssafy.zipjoong.product.exception.ProductException;
import com.ssafy.zipjoong.product.repository.ProductRepository;
import com.ssafy.zipjoong.user.domain.User;
import com.ssafy.zipjoong.user.exception.UserErrorCode;
import com.ssafy.zipjoong.user.exception.UserException;
import com.ssafy.zipjoong.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
@Transactional
public class ProductLikeService {
    private final ProductLikeRepository productLikeRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    // 제품 좋아요 추가
    @Transactional
    public ProductLike likeProduct(String userId, Integer productId) {
        if (productLikeRepository.existsByUserUserIdAndProductLikeIdProductId(userId,productId))
            throw new ProductLikeException(ErrorCode.PRODUCT_CONFLICT);

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductException(ProductErrorCode.PRODUCT_NOT_FOUND));
        User user = userRepository.findById(userId)
                        .orElseThrow(() -> new UserException(UserErrorCode.USER_NOT_FOUND));

        ProductLikeId productLikeId = new ProductLikeId(userId, productId);

        return productLikeRepository.save(ProductLike.builder()
                .productLikeId(productLikeId)
                .product(product)
                .user(user)
                .productLikeIsDeleted(false)
                .build());
    }

    // 제품 좋아요 취소
    @Transactional
    public Optional<ProductLike> unlikeProduct(String userId, Integer productId) {
        if (!productLikeRepository.existsByUserUserIdAndProductLikeIdProductId(userId,productId))
            throw new ProductLikeException(ErrorCode.PRODUCT_NOT_FOUND);
        return productLikeRepository.deleteByUserUserIdAndProductLikeIdProductId(userId,productId);
    }


    // 관심 제품 조회
    public LikeProductsResponse getLikeProducts(String userId) {
        List<MonitorResponse> monitorResponseList = new ArrayList<>();
        List<KeyboardResponse> keyboardResponsesList = new ArrayList<>();
        List<MouseResponse> mouseResponsesList = new ArrayList<>();
        productLikeRepository.findByUserUserId(userId)
                .forEach(productLike -> {
                    System.out.println("test");
                    Product product = productLike.getProduct();
                    switch (product.getProductType()) {
                        case "KEYBOARD":
                            keyboardResponsesList.add(KeyboardResponse.toDto((Keyboard) Hibernate.unproxy(product)));
                            break;
                        case "MONITOR":
                            monitorResponseList.add(MonitorResponse.toDto((Monitor) Hibernate.unproxy(product)));
                            break;
                        case "MOUSE":
                            mouseResponsesList.add(MouseResponse.toDto((Mouse) Hibernate.unproxy(product)));
                            break;
                        default:
                            throw new ProductTypeException(ErrorCode.PRODUCT_TYPE_NOT_FOUND, product.getProductType());
                    }
                });

        return LikeProductsResponse.builder()
                .keyboards(keyboardResponsesList)
                .monitors(monitorResponseList)
                .mouse(mouseResponsesList)
                .build();
    }



}
