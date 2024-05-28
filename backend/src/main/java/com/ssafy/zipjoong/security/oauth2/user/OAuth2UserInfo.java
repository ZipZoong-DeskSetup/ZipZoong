package com.ssafy.zipjoong.security.oauth2.user;

public interface OAuth2UserInfo {

    // 서비스 제공자 (google, naver, kakao)
    String getProvider();

    // 서비스 제공자가 발급해주는 아이디
    String getProviderId();
}
