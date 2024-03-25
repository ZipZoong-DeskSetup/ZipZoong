package com.ssafy.zipjoong.like.service;

import com.ssafy.zipjoong.like.domain.ProductLike;
import com.ssafy.zipjoong.like.dto.LikeProductsResponse;
import com.ssafy.zipjoong.like.exception.LikeErrorCode;
import com.ssafy.zipjoong.like.exception.ProductLikeException;
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
import com.ssafy.zipjoong.recommand.dto.CombinationResponse;
import com.ssafy.zipjoong.recommand.exception.CombinationErrorCode;
import com.ssafy.zipjoong.recommand.exception.CombinationException;
import com.ssafy.zipjoong.user.domain.User;
import com.ssafy.zipjoong.user.exception.UserErrorCode;
import com.ssafy.zipjoong.user.exception.UserException;
import com.ssafy.zipjoong.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductLikeService {
    private final ProductLikeRepository productLikeRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    // 제품 좋아요 추가
    @Transactional
    public ProductLike likeProduct(String userId, Integer productId) {
        if (productLikeRepository.existsByUserUserIdAndProductProductId(userId,productId))
            throw new ProductLikeException(LikeErrorCode.PRODUCT_CONFLICT);

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductException(ProductErrorCode.PRODUCT_NOT_FOUND));
        User user = userRepository.findById(userId)
                        .orElseThrow(() -> new UserException(UserErrorCode.COMBINATION_NOT_FOUND));

        ProductLike productLike = productLikeRepository.save(ProductLike.builder()
                .product(product)
                .user(user)
                .build());

        productLikeRepository.save(productLike);
        return productLike;
    }

    // 제품 좋아요 취소
    @Transactional
    public Optional<ProductLike> unlikeProduct(String userId, Integer productId) {
        if (!productLikeRepository.existsByUserUserIdAndProductProductId(userId,productId))
            throw new ProductLikeException(LikeErrorCode.PRODUCT_NOT_FOUND);
        return productLikeRepository.deleteByUserUserIdAndProductProductId(userId,productId);
    }


    // 관심 제품 조회
    public LikeProductsResponse getLikeProducts(String userId) {
        List<MonitorResponse> monitorResponseList = new ArrayList<>();
        List<KeyboardResponse> keyboardResponsesList = new ArrayList<>();
        List<MouseResponse> mouseResponsesList = new ArrayList<>();
        productLikeRepository.findByUserUserId(userId)
                .orElseThrow(() -> new CombinationException(CombinationErrorCode.COMBINATION_NOT_FOUND))
                .forEach(productLike -> {
                    Product product=productLike.getProduct();
                    if (product.getProductType().equals("KEYBORD")) {
                        keyboardResponsesList.add(KeyboardResponse.toDto((Keyboard)product));
                    } else if (product.getProductType().equals("MONITOR")) {
                        monitorResponseList.add(MonitorResponse.toDto((Monitor)product));
                    } else if (product.getProductType().equals("MOUSE")) {
                        mouseResponsesList.add(MouseResponse.toDto((Mouse)product));
                    } else {
                        // throw new
                    }
                });

        return LikeProductsResponse.builder()
                .keyboards(keyboardResponsesList)
                .monitors(monitorResponseList)
                .mouse(mouseResponsesList)
                .build();
    }



}
