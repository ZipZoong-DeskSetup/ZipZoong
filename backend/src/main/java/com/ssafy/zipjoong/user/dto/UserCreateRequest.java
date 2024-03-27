package com.ssafy.zipjoong.user.dto;

import com.ssafy.zipjoong.user.domain.User;
import com.ssafy.zipjoong.user.domain.UserRoleType;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Getter
public class UserCreateRequest {
    private String userId;
    private String userNickname;
    private MultipartFile userImg;
    private UserRoleType userRole;

    public User toEntity(String userId, String userImgPath) {
        return User.builder()
                .userId(userId)
                .userNickname(userNickname)
                .userImg(userImgPath)
                .userRole(userRole)
                .build();
    }
}
