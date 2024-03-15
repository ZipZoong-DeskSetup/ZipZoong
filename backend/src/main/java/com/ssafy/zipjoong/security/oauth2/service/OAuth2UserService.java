package com.ssafy.zipjoong.security.oauth2.service;

import com.ssafy.zipjoong.security.oauth2.user.CustomOAuth2User;
import com.ssafy.zipjoong.security.oauth2.user.KakaoOAuth2UserInfo;
import com.ssafy.zipjoong.security.oauth2.user.OAuth2UserInfo;
import com.ssafy.zipjoong.user.model.User;
import com.ssafy.zipjoong.user.model.UserRoleType;
import com.ssafy.zipjoong.user.repository.UserRepository;
import com.ssafy.zipjoong.util.model.EntityDate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class OAuth2UserService  extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        Map<String, Object> attributes = oAuth2User.getAttributes();

        log.info("OAuth2USer = {}", oAuth2User);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();

        OAuth2UserInfo oAuth2UserInfo = null;

        if(registrationId.equals("kakao")) {
            oAuth2UserInfo = new KakaoOAuth2UserInfo(attributes);
        } else {
            return null;
        }

        // 리소스 서버에서 발급받은 정보로 userId 생성
        String userId = oAuth2UserInfo.getProvider() + " " + oAuth2UserInfo.getProviderId();

        // 유저 조회, 없다면 사용자 생성
        Optional<User> byUserId = userRepository.findById(userId);
        User user = byUserId.orElseGet(() -> saveUser(userId));

        return new CustomOAuth2User(user, Collections.singleton(new SimpleGrantedAuthority(user.getUserRole().toString())), attributes);
    }

    // userId에 해당하는 유저가 없으면 새로운 유저를 생성하여 저장
    public User saveUser(String userId) {
        User newUser = User.builder()
                .userId(userId)
                .userRole(UserRoleType.ROLE_USER)
                .userIsDeleted(false).build();
        return userRepository.save(newUser);
    }

}
