package com.ssafy.zipjoong.security.jwt.controller;

import com.ssafy.zipjoong.security.jwt.exception.CustomJwtException;
import com.ssafy.zipjoong.security.jwt.utils.JwtConstants;
import com.ssafy.zipjoong.security.jwt.utils.JwtUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@Tag(name = "토큰 API", description = "토큰 API")
public class JwtController {

    @PostMapping("/refresh")
    @Operation(summary = "토큰 재발급", description = "토큰 재발급")
    public Map<String, Object> refresh(@RequestHeader("Authorization") String authHeader, String refreshToken) {
        log.info("Refresh Token = {}", refreshToken);
        if (authHeader == null) {
            throw new CustomJwtException("Access Token이 존재하지 않습니다");
        } else if (!authHeader.startsWith(JwtConstants.JWT_TYPE)) {
            throw new CustomJwtException("올바르지 않은 토큰 형식입니다. 토큰은 Bearer로 시작해야 합니다.");
        }

        String accessToken = JwtUtils.getTokenFromHeader(authHeader);

        // Access Token이 유효한 경우
        if (!JwtUtils.isExpired(accessToken)) {
            return Map.of("Access Token", accessToken, "Refresh Token", refreshToken);
        }

        // Access Token이 만료된 경우
        // refreshToken 검증 후 새로운 토큰 생성하여 전달
        Map<String, Object> claims = JwtUtils.validateToken(refreshToken);
        String newAccessToken = JwtUtils.generateToken(claims, JwtConstants.ACCESS_EXP_TIME);

        String newRefreshToken = refreshToken;
        long expTime = JwtUtils.getTokenRemainTime((Integer) claims.get("exp"));   // Refresh Token 남은 만료 시간
        log.info("Refresh Token Remain Expire Time = {}", expTime);
        // Refresh Token의 만료 시간이 한 시간도 남지 않은 경우
        if (expTime <= 60) {
            newRefreshToken = JwtUtils.generateToken(claims, JwtConstants.REFRESH_EXP_TIME);
        }

        return Map.of("accessToken", newAccessToken, "refreshToken", newRefreshToken);
    }
}
