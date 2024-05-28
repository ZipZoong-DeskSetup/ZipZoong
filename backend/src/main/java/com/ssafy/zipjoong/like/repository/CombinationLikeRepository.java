package com.ssafy.zipjoong.like.repository;

import com.ssafy.zipjoong.like.domain.CombinationLike;
import com.ssafy.zipjoong.like.domain.CombinationLikeId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CombinationLikeRepository extends JpaRepository<CombinationLike, CombinationLikeId> {
    // 조합 좋아요 여부 확인
    boolean existsByUserUserIdAndCombinationCombinationId(String userId, Long combinationId);

    // 조합 제품 리스트 확인
    @Query("SELECT cp.product.productId FROM CombinationProduct cp WHERE cp.combination.combinationId = :combinationId")
    Optional<List<Long>> findProductIdsByCombinationId(Long combinationId);

    // 조합 좋아요 삭제
    Optional<CombinationLike> deleteByUserUserIdAndCombinationCombinationId(String userId, Long combinationId);
}