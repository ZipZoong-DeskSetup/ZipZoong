package com.ssafy.zipjoong.security.jwt.utils;

import com.ssafy.zipjoong.security.jwt.exception.CustomExpiredJwtException;
import com.ssafy.zipjoong.security.jwt.exception.CustomJwtException;
import com.ssafy.zipjoong.security.oauth2.user.CustomOAuth2User;
import com.ssafy.zipjoong.user.domain.User;
import com.ssafy.zipjoong.user.domain.UserRoleType;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.ZonedDateTime;
import java.util.Collections;
import java.util.Date;
import java.util.Map;
import java.util.Set;

@Component
@Slf4j
public class JwtUtils {

    public static String secretKey;

    public JwtUtils(@Value("${spring.jwt.secret}")String secret) {

        secretKey = secret;
    }

    // 헤더에 "Bearer XXX" 형식으로 담겨온 토큰을 추출하는 메서드
    public static String getTokenFromHeader(String header) {
        return header.split(" ")[1];
    }

    // 토큰 생성 메서드
    public static String generateToken(Map<String, Object> valueMap, int validTime) {
        SecretKey key = null;
        try {
            key = Keys.hmacShaKeyFor(JwtUtils.secretKey.getBytes(StandardCharsets.UTF_8));
        } catch(Exception e){
            throw new RuntimeException(e.getMessage());
        }
        return Jwts.builder()
                .setHeader(Map.of("typ","JWT"))
                .setClaims(valueMap)
                .setIssuedAt(Date.from(ZonedDateTime.now().toInstant()))
                .setExpiration(Date.from(ZonedDateTime.now().plusMinutes(validTime).toInstant()))
                .signWith(key)
                .compact();
    }

    // 토큰을 검증하고 Authentication 객체 생성하여 반환하는 메서드
    public static Authentication getAuthentication(String token) {
        Map<String, Object> claims = validateToken(token);

        String userId = (String) claims.get("userId");
        String role = (String) claims.get("role");
        UserRoleType userRole = UserRoleType.valueOf(role);

        User user = User.builder().userId(userId).userRole(userRole).build();
        Set<SimpleGrantedAuthority> authorities = Collections.singleton(new SimpleGrantedAuthority(user.getUserRole().toString()));
        CustomOAuth2User customOAuth2User = new CustomOAuth2User(user, authorities, false);

        return new UsernamePasswordAuthenticationToken(customOAuth2User, "", authorities);
    }

    // 토큰 유효성 체크 메서드
    public static Map<String, Object> validateToken(String token) {
        Map<String, Object> claim = null;
        try {
            SecretKey key = Keys.hmacShaKeyFor(JwtUtils.secretKey.getBytes(StandardCharsets.UTF_8));
            claim = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token) // 파싱 및 검증, 실패 시 에러
                    .getBody();
        } catch(ExpiredJwtException expiredJwtException){
            throw new CustomExpiredJwtException("토큰이 만료되었습니다", expiredJwtException);
        } catch(Exception e){
            throw new CustomJwtException("Error");
        }
        return claim;
    }

    // 토큰이 만료되었는지 판단하는 메서드
    public static boolean isExpired(String token) {
        try {
            validateToken(token);
        } catch (Exception e) {
            return (e instanceof CustomExpiredJwtException);
        }
        return false;
    }

    // 토큰의 남은 만료시간을 계산하여 분(minute) 단위로 반환하는 메서드
    public static long getTokenRemainTime(Integer expTime) {
        Date expDate = new Date((long) expTime * (1000));
        long remainMs = expDate.getTime() - System.currentTimeMillis();
        return remainMs / (1000 * 60);
    }

    // 토큰을 통해 userId를 반환하는 메서드
    public static String getUserId(String authorizationToken) {
        String token = JwtUtils.getTokenFromHeader(authorizationToken);
        Map<String, Object> claims = validateToken(token);
        return (String) claims.get("userId");
    }

}
