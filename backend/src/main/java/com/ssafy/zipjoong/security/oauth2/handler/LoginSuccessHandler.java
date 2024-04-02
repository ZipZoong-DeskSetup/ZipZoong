package com.ssafy.zipjoong.security.oauth2.handler;

import com.google.gson.Gson;
import com.ssafy.zipjoong.security.jwt.utils.JwtConstants;
import com.ssafy.zipjoong.security.jwt.utils.JwtUtils;
import com.ssafy.zipjoong.security.oauth2.user.CustomOAuth2User;
import com.ssafy.zipjoong.user.service.UserService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
public class LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final UserService userService;

    private final String KAKAO_LOGIN_URL = "/login/oauth2/code/kakao";
    private final String GOOGLE_LOGIN_URL = "/login/oauth2/code/google";
    private final String NAVER_LOGIN_URL = "/login/oauth2/code/naver";

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("--------------------------- CommonLoginSuccessHandler ---------------------------");

        CustomOAuth2User customOAuth2User = (CustomOAuth2User) authentication.getPrincipal();

        log.info("authentication.getCustomOAuth2User() = {}", customOAuth2User);

        Map<String, Object> responseMap = customOAuth2User.getUserInfo();
        responseMap.put("accessToken", JwtUtils.generateToken(responseMap, JwtConstants.ACCESS_EXP_TIME));
        responseMap.put("refreshToken", JwtUtils.generateToken(responseMap, JwtConstants.REFRESH_EXP_TIME));

        Gson gson = new Gson();
        String json = gson.toJson(responseMap);

        response.setContentType("application/json; charset=UTF-8");

        PrintWriter writer = response.getWriter();
        writer.println(json);
        writer.flush();
    }
}
