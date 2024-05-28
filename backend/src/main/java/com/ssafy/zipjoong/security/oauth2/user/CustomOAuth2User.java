package com.ssafy.zipjoong.security.oauth2.user;

import com.ssafy.zipjoong.user.domain.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

public class CustomOAuth2User implements UserDetails, OAuth2User {

    private User user;
    private Collection<? extends GrantedAuthority> authorities;
    private Map<String, Object> attributes;

    private final boolean isNewUser;

    public CustomOAuth2User(User user, Collection<? extends GrantedAuthority> authorities, boolean isNewUser) {
        this.user = user;
        this.authorities = authorities;
        this.isNewUser = isNewUser;
    }

    public CustomOAuth2User(User user, Collection<? extends GrantedAuthority> authorities, Map<String, Object> attributes, boolean isNewUser) {
        this.user = user;
        this.authorities = authorities;
        this.attributes = attributes;
        this.isNewUser = isNewUser;
    }

    public Map<String, Object> getUserInfo() {
        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("userId", user.getUserId());
        userInfo.put("role", user.getUserRole());
        return userInfo;
    }

    @Override
    public String getName() {
        return user.getUserNickname();
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return user.getUserId();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public boolean isNewUser() {
        return isNewUser;
    }
}
