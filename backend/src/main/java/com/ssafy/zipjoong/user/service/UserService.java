package com.ssafy.zipjoong.user.service;

import com.ssafy.zipjoong.user.dto.UserNicknameUpdateRequest;
import com.ssafy.zipjoong.user.dto.UserResponse;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
    // 회원가입
    void signUp(String userId, String nickname, MultipartFile userImg);

    // 신규 유저 여부 확인
    boolean isNewUser(String userId);

    // 내 정보 조회
    UserResponse getUserInfo(String userId);

    // 닉네임 중복 여부 확인
    boolean checkNicknameDuplication(String nickname);

    // 닉네임 변경
    void updateNickname(String userId, UserNicknameUpdateRequest updateRequest);

    // 프로필 사진 변경
    void updateUserImg(String userId, MultipartFile newUserImg);

}
