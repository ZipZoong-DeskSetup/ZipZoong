package com.ssafy.zipjoong.security.oauth2.service;

import com.ssafy.zipjoong.security.oauth2.user.CustomOAuth2User;
import com.ssafy.zipjoong.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        log.info("--------------------------- UserDetailsServiceImpl ---------------------------");
        log.info("username = {}", userId);

        return userRepository.findById(userId)
                .map(user -> new CustomOAuth2User(user, Collections.singleton(new SimpleGrantedAuthority(user.getUserRole().toString())), false))
                .orElseThrow(() -> new UsernameNotFoundException("등록되지 않은 사용자입니다"));
    }
}