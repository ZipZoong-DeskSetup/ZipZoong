package com.ssafy.zipjoong.security.oauth2.user;

import lombok.extern.slf4j.Slf4j;

import java.util.Map;

public class NaverOAuth2UserInfo implements OAuth2UserInfo{

    private final Map<String, Object> attributes;

    public NaverOAuth2UserInfo(Map<String, Object> attributes) {

        this.attributes = (Map<String, Object>) attributes.get("response");
    }

    @Override
    public String getProvider() {
        return "naver";
    }

    @Override
    public String getProviderId() {
        return attributes.get("id").toString();
    }
}
