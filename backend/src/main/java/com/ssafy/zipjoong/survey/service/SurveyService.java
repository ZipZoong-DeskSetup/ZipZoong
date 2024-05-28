package com.ssafy.zipjoong.survey.service;

import com.ssafy.zipjoong.survey.domain.*;
import com.ssafy.zipjoong.survey.dto.SurveyRequest;
import com.ssafy.zipjoong.survey.repository.SurveyRepository;
import com.ssafy.zipjoong.user.exception.UserErrorCode;
import com.ssafy.zipjoong.user.exception.UserException;
import com.ssafy.zipjoong.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SurveyService {
    private final SurveyRepository surveyRepository;
    private final UserRepository userRepository;


    /**
     * 사용자 설문 생성 함수
     */
    @Transactional
    public Survey createSurvey(SurveyRequest surveyRequest, String userId) {
       if(!userRepository.existsById(userId))
           throw new UserException(UserErrorCode.USER_NOT_FOUND);

       // 이전 설문을 삭제
        deletePastSurvey(userId);

        int totalPrice=checkTotalPrice(surveyRequest.getTotalPrice());

        return surveyRepository.save(Survey.builder()
                .userId(userId)
                .surveyDetail(surveyRequest.getSurveyDetail()!=null ? surveyRequest.getSurveyDetail() : SurveyDetail.SIMPLE)
                .totalPrice(totalPrice)
                .monitorPrice(getMonitorPrice(totalPrice))
                .keyboardPrice(getKeyboardPrice(totalPrice))
                .mousePrice(getMousePrice(totalPrice))
                .monitorUsage(surveyRequest.getMonitorUsage()!= 0 ? surveyRequest.getMonitorUsage() : 16)
                .keyboardUsage(surveyRequest.getKeyboardUsage()!= 0 ? surveyRequest.getKeyboardUsage() : 10)
                .mouseUsage(surveyRequest.getMouseUsage()!= 0 ? surveyRequest.getMouseUsage() : 16)
                .keyboardColor(surveyRequest.getKeyboardColor()!=null ? surveyRequest.getKeyboardColor() : Color.NONE)
                .mouseColor(surveyRequest.getMouseColor()!= null ? surveyRequest.getMouseColor() : Color.NONE)
                .monitorCount(surveyRequest.getMonitorCount()!= 0 ? surveyRequest.getMonitorCount() : 1)
                .keyboardLayout(surveyRequest.getKeyboardLayout()!= 0 ? surveyRequest.getKeyboardLayout() : 4)
                .keyboardConnection(surveyRequest.getKeyboardConnection()!= null ? surveyRequest.getKeyboardConnection() : ConnectionType.BOTH)
                .mouseConnection(surveyRequest.getMouseConnection()!= null ? surveyRequest.getMouseConnection() : ConnectionType.BOTH)
                .keyboardHealth(surveyRequest.isKeyboardHealth())
                .mouseHealth(surveyRequest.isMouseHealth())
                .monitorSize(surveyRequest.getMonitorSize() != null ? surveyRequest.getMonitorSize():3)
                .monitorRatio(surveyRequest.getMonitorRatio() != null ? surveyRequest.getMonitorRatio():1)
                .monitorPanel(surveyRequest.getMonitorPanel() != null ? surveyRequest.getMonitorPanel(): PanelType.FLAT)
                .keyboardType(surveyRequest.getKeyboardType() != null ? surveyRequest.getKeyboardType(): KeyboardType.MECHANICAL)
                .keyboardSound(surveyRequest.getKeyboardSound()!= null ? surveyRequest.getKeyboardSound(): KeyboardSound.RED)
                .mouseSound(surveyRequest.getMouseSound()!= null ? surveyRequest.getMouseSound() : Boolean.TRUE)
                .build());
    }


    /**
     * 과거 설문 삭제 함수
     */
    public void deletePastSurvey(String userId) {
        if (surveyRepository.existsByUserId(userId)){
           surveyRepository.deleteByUserId(userId);
        }
    }

    /**
     * 모니터/마우스/키보드 가격 계산 함수
     */
    public int getMonitorPrice (int total) {
        return (int) Math.round(total*0.6);
    }

    public int getMousePrice(int total){
        return (int) Math.round(total*0.1);
    }

    public int getKeyboardPrice(int total){
        return (int) Math.round(total*0.3);
    }


    /**
     * total 금액 확인 함수
     */
    public int checkTotalPrice(int total){
        if (total==0) return 10;
        return Math.min(total, 500);
    }


}
