package com.ssafy.zipjoong.like.repository;


import com.ssafy.zipjoong.like.domain.CombinationLike;
import com.ssafy.zipjoong.like.domain.ProductLike;
import com.ssafy.zipjoong.like.domain.ProductLikeId;
import com.ssafy.zipjoong.product.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductLikeRepository extends JpaRepository<ProductLike, ProductLikeId> {

    // 제품 좋아요 여부 확인
    boolean existsByUserUserIdAndProductLikeIdProductId(String userId, Integer productId);

    // 제품 좋아요 삭제
    Optional<ProductLike> deleteByUserUserIdAndProductLikeIdProductId(String userId, Integer productId);

    // 좋아요 제품 조회
    List<ProductLike> findByUserUserId(String userId);
}
