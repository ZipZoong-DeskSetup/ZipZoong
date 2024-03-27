package com.ssafy.zipjoong.user.service;

import com.ssafy.zipjoong.file.service.AwsS3ServiceImpl;
import com.ssafy.zipjoong.user.domain.User;
import com.ssafy.zipjoong.user.dto.UserNicknameUpdateRequest;
import com.ssafy.zipjoong.user.dto.UserResponse;
import com.ssafy.zipjoong.user.exception.UserErrorCode;
import com.ssafy.zipjoong.user.exception.UserException;
import com.ssafy.zipjoong.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final AwsS3ServiceImpl awsS3Service;

    /* 내 정보 조회 */
    @Override
    public UserResponse getUserInfo(String userId) {
        User user = findUser(userId);
        return UserResponse.toDto(user);
    }

    /* 닉네임 중복 여부 확인 */
    @Override
    public boolean checkNicknameDuplication(String nickname) {
        // 해당 닉네임이 존재하는 경우 true, 존재하지 않는 경우 false 반환
        return userRepository.existsByUserNickname(nickname);
    }

    /* 닉네임 변경 */
    @Transactional
    @Override
    public void updateNickname(String userId, UserNicknameUpdateRequest updateRequest) {
        User user = findUser(userId);
        String newNickname = updateRequest.getNickname();
        user.updateUserNickname(newNickname);
    }

    /* 프로필 사진 변경 */
    @Transactional
    @Override
    public void updateUserImg(String userId, MultipartFile newUserImg) {
        User user = findUser(userId);

        // S3에서 기존 프로필 사진 삭제
        String userImg = user.getUserImg();
        if (userImg != null && !userImg.isEmpty()) {
            awsS3Service.deleteFile(userImg);
        }

        // 새 프로필 사진을 S3에 업로드
        String newImgUrl = awsS3Service.uploadFileOne(newUserImg, userId, "profile");

        // 프로필 사진 경로 업데이트
        user.updateUserImg(newImgUrl);
    }

    private User findUser(String userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserException(UserErrorCode.USER_NOT_FOUND));
    }

}
