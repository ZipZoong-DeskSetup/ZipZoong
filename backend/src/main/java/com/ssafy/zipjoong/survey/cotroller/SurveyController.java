package com.ssafy.zipjoong.survey.cotroller;

import com.ssafy.zipjoong.recommand.dto.CombinationProductRequest;
import com.ssafy.zipjoong.security.jwt.utils.JwtUtils;
import com.ssafy.zipjoong.survey.dto.SurveyRequest;
import com.ssafy.zipjoong.survey.service.SurveyService;
import com.ssafy.zipjoong.util.dto.ResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/survey")
@RequiredArgsConstructor
@Tag(name = "설문 API", description = "사용자 설문 정보를 저장하는 API")
public class SurveyController {

    private final SurveyService surveyService;


    /* 사용자 설문 내역 DB 저장 */
    @PostMapping("")
    @Operation(summary = "사용자 설문 저장", description = "사용자 설문을 저장하는 API")
    public ResponseEntity<ResponseDto> saveSurvey(@RequestBody SurveyRequest surveyRequest, @RequestHeader("Authorization") String authorizationToken) {
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 사용자 설문을 저장했습니다.", surveyService.createSurvey(surveyRequest, findUserId(authorizationToken))));
    }

    private String findUserId(String authorizationToken) {
        return JwtUtils.getUserId(authorizationToken);
    }
}
