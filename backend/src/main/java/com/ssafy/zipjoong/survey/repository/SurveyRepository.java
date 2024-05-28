package com.ssafy.zipjoong.survey.repository;

import com.ssafy.zipjoong.survey.domain.Survey;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SurveyRepository extends JpaRepository<Survey,Integer> {
    /* 해당 유저에게 설문 기록이 있는지 확인 */
    boolean existsByUserId(String userId);

    /* 이전 설문 기록이 있으면 해당 기록 삭제 */
    void deleteByUserId(String userId);
}
