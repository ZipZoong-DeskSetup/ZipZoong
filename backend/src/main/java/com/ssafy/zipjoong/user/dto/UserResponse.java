package com.ssafy.zipjoong.user.dto;

import com.ssafy.zipjoong.user.domain.User;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class UserResponse {
    private String userId;
    private String userNickname;
    private String userImg;
    private LocalDateTime userCreatedAt;
    private LocalDateTime userUpdatedAt;

    public static UserResponse toDto(User user) {
        return UserResponse.builder()
                .userId(user.getUserId())
                .userNickname(user.getUserNickname())
                .userImg(user.getUserImg())
                .userCreatedAt(user.getCreateAt())
                .userUpdatedAt(user.getUpdateAt())
                .build();
    }
}