package com.ssafy.zipjoong.like.service;

import com.ssafy.zipjoong.like.domain.CombinationLike;
import com.ssafy.zipjoong.like.domain.CombinationLikeId;
import com.ssafy.zipjoong.like.exception.ErrorCode;
import com.ssafy.zipjoong.like.exception.CombinationLikeException;
import com.ssafy.zipjoong.like.repository.CombinationLikeRepository;
import com.ssafy.zipjoong.recommand.domain.Combination;
import com.ssafy.zipjoong.recommand.exception.CombinationErrorCode;
import com.ssafy.zipjoong.recommand.exception.CombinationException;
import com.ssafy.zipjoong.recommand.repository.CombinationRepository;
import com.ssafy.zipjoong.user.domain.User;
import com.ssafy.zipjoong.user.exception.UserErrorCode;
import com.ssafy.zipjoong.user.exception.UserException;
import com.ssafy.zipjoong.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CombinationLikeService {
    private final CombinationLikeRepository combinationLikeRepository;
    private final CombinationRepository combinationRepository;
    private final UserRepository userRepository;


    // 조합 좋아요 추가
    @Transactional
    public CombinationLike likeCombination(String userId, Long combinationId) {
        if (combinationLikeRepository.existsByUserUserIdAndCombinationCombinationId(userId, combinationId))
            throw new CombinationLikeException(ErrorCode.COMBINATION_CONFLICT);

        Combination combination = combinationRepository.findById(combinationId)
                .orElseThrow(() -> new CombinationException(CombinationErrorCode.COMBINATION_NOT_FOUND));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserException(UserErrorCode.USER_NOT_FOUND));
        List<Long> givenProductIds = combinationLikeRepository.findProductIdsByCombinationId(combinationId)
                .orElseThrow(() -> new CombinationException(CombinationErrorCode.COMBINATION_NOT_FOUND));

        // 조합 제품 중복 비교
        if (!checkIfCombinationMatchesProductList(combinationId,givenProductIds))
            throw new CombinationLikeException(ErrorCode.COMBINATION_CONFLICT);

        CombinationLikeId combinationLikeId = new CombinationLikeId(userId, combinationId);

        CombinationLike combinationLike = combinationLikeRepository.save(CombinationLike.builder()
                .combinationLikeId(combinationLikeId)
                .combination(combination)
                .user(user)
                .combinationLikeIsDeleted(false)
                .build());

            combinationLikeRepository.save(combinationLike);
            return combinationLike;
    }

    // 조합 좋아요 제품 중복 검사
    public boolean checkIfCombinationMatchesProductList(Long combinationId, List<Long> givenProductIds) {
        // 조합 ID에 해당하는 제품 ID 목록 조회
        List<Long> combinationProductIds = combinationLikeRepository.findProductIdsByCombinationId(combinationId)
                // TODO: 이후 PRODUCT EXCEPTION 설정시 수정되어야 함
                .orElseThrow(() -> new CombinationLikeException(ErrorCode.COMBINATION_NOT_FOUND));

        // 주어진 제품 목록과 조합의 제품 목록 비교
        return new HashSet<>(givenProductIds).equals(new HashSet<>(combinationProductIds)) &&
                givenProductIds.size() == combinationProductIds.size();
    }

    // 조합 좋아요 취소
    @Transactional
    public Optional<CombinationLike> unlikeCombination(String userId, Long combinationId) {
        if (!combinationLikeRepository.existsByUserUserIdAndCombinationCombinationId(userId, combinationId))
            throw new CombinationLikeException(ErrorCode.COMBINATION_NOT_FOUND);
        return combinationLikeRepository.deleteByUserUserIdAndCombinationCombinationId(userId, combinationId);
    }
}
