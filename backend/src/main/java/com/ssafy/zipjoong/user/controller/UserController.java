package com.ssafy.zipjoong.user.controller;

import com.ssafy.zipjoong.security.jwt.utils.JwtUtils;
import com.ssafy.zipjoong.user.dto.UserNicknameUpdateRequest;
import com.ssafy.zipjoong.user.service.UserService;
import com.ssafy.zipjoong.util.dto.ResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@Tag(name = "유저 API", description = "유저 API")
public class UserController {
    private final UserService userService;

    // 내 정보 조회
    @GetMapping("/info")
    @Operation(summary = "내 정보 조회", description = "내 정보 조회")
    public ResponseEntity<ResponseDto> getUserInfo(@RequestHeader("Authorization") String authorizationToken) {
        String userId = JwtUtils.getUserId(authorizationToken);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 유저 정보를 조회하였습니다.", userService.getUserInfo(userId)));
    }

    // 닉네임 중복 여부 확인
    @GetMapping("/nickname/check/{nickname}")
    @Operation(summary = "닉네임 중복 여부 확인", description = "닉네임 중복 여부 확인")
    public ResponseEntity<ResponseDto> checkNicknameDuplication(@PathVariable(name = "nickname") String nickname) {
        boolean isAvailable = !userService.checkNicknameDuplication(nickname);
        Map<String, Boolean> response = Collections.singletonMap("isAvailable", isAvailable);

        if(isAvailable) {
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("사용가능한 닉네임 입니다.", response));
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ResponseDto("중복된 닉네임 입니다.", response));
        }
    }

    // 닉네임 변경
    @PostMapping("/nickname")
    @Operation(summary = "닉네임 변경", description = "닉네임 변경")
    public ResponseEntity<ResponseDto> updateNickname(@RequestHeader("Authorization") String authorizationToken,
                                                      @RequestBody UserNicknameUpdateRequest updateRequest) {
        String userId = JwtUtils.getUserId(authorizationToken);
        userService.updateNickname(userId, updateRequest);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 닉네임을 변경하였습니다."));
    }

    // 프로필 사진 변경
    @PostMapping("/profile")
    @Operation(summary = "프로필 사진 변경", description = "프로필 사진 변경")
    public ResponseEntity<ResponseDto> updateProfile(@RequestHeader("Authorization") String authorizationToken,
                                                     @RequestPart MultipartFile userImg) {
        String userId = JwtUtils.getUserId(authorizationToken);
        userService.updateUserImg(userId, userImg);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto("성공적으로 프로필 사진을 변경하였습니다."));
    }

}
