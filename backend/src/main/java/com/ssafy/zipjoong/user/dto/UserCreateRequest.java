package com.ssafy.zipjoong.user.dto;

import com.ssafy.zipjoong.user.domain.User;
import com.ssafy.zipjoong.user.domain.UserRoleType;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Getter
public class UserCreateRequest {
    private String userNickname;
    private MultipartFile userImg;

    public User toEntity(String userImgPath) {
        return User.builder()
                .userNickname(userNickname)
                .userImg(userImgPath)
                .userRole(UserRoleType.ROLE_USER)
                .build();
    }
}
