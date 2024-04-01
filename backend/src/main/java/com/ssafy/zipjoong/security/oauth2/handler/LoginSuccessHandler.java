package com.ssafy.zipjoong.security.oauth2.handler;

import com.google.gson.Gson;
import com.ssafy.zipjoong.security.jwt.utils.JwtConstants;
import com.ssafy.zipjoong.security.jwt.utils.JwtUtils;
import com.ssafy.zipjoong.security.oauth2.user.CustomOAuth2User;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@Slf4j
//@RequiredArgsConstructor
public class LoginSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {
    private RequestCache requestCache = new HttpSessionRequestCache();

    private final String KAKAO_LOGIN_URL = "/login/oauth2/code/kakao";
    private final String GOOGLE_LOGIN_URL = "/login/oauth2/code/google";
    private final String NAVER_LOGIN_URL = "/login/oauth2/code/naver";

    private final String LOGIN_URL = "/user/login";
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("--------------------------- CommonLoginSuccessHandler ---------------------------");
        CustomOAuth2User customOAuth2User = (CustomOAuth2User) authentication.getPrincipal();
        log.info("authentication.getCustomOAuth2User() = {}", customOAuth2User);

        Map<String, Object> responseMap = customOAuth2User.getUserInfo();
        String accessToken = JwtUtils.generateToken(responseMap, JwtConstants.ACCESS_EXP_TIME);
        String refreshToken = JwtUtils.generateToken(responseMap, JwtConstants.REFRESH_EXP_TIME);

        String encodedName = URLEncoder.encode(customOAuth2User.getName(), StandardCharsets.UTF_8.toString());
        String encodedToken = URLEncoder.encode(accessToken, StandardCharsets.UTF_8.toString());

        log.info("encodedName = {}", encodedName);
        log.info("encodedToken = {}", encodedToken);

        // SavedRequest를 사용하여 이전 요청 정보 가져오기
        SavedRequest savedRequest = requestCache.getRequest(request, response);
        String redirectUrl = (savedRequest != null) ? savedRequest.getRedirectUrl() : "/";

        // 추가 파라미터 설정
        if (redirectUrl.equals(LOGIN_URL)) {
            redirectUrl += "?userId=" + encodedName + "&accessToken=" + encodedToken;
        }

        log.info("Redirect URL = {}", redirectUrl);

        // 리다이렉트 수행
        getRedirectStrategy().sendRedirect(request, response, redirectUrl);
    }
}

//public class LoginSuccessHandler implements AuthenticationSuccessHandler {
//
//    private final String KAKAO_LOGIN_URL = "/login/oauth2/code/kakao";
//    private final String GOOGLE_LOGIN_URL = "/login/oauth2/code/google";
//    private final String NAVER_LOGIN_URL = "/login/oauth2/code/naver";
//
//    @Override
//    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
//        log.info("--------------------------- CommonLoginSuccessHandler ---------------------------");
//
//        CustomOAuth2User customOAuth2User = (CustomOAuth2User) authentication.getPrincipal();
//
//        log.info("authentication.getCustomOAuth2User() = {}", customOAuth2User);
//
//        Map<String, Object> responseMap = customOAuth2User.getUserInfo();
//        String accessToken = JwtUtils.generateToken(responseMap, JwtConstants.ACCESS_EXP_TIME);
//        String refreshToken = JwtUtils.generateToken(responseMap, JwtConstants.REFRESH_EXP_TIME);
//
//        String referer = (String) request.getSession().getAttribute("referer");
//
//        if (KAKAO_LOGIN_URL.equals(request.getRequestURI()) && referer != null) {
//            log.info("Login Referer: " + referer);
//        }
//
////        String redirectUrl = referer;
////        if(referer.equals(KAKAO_LOGIN_URL)) {
////            redirectUrl = KAKAO_LOGIN_URL;
////        }
//        String redirectUrl = KAKAO_LOGIN_URL;
//
//        log.info("Referer = {}", referer);
//        log.info("RequestURI = {}", request.getRequestURI());
////        log.info("redirectUrl = {}", redirectUrl);
//
//
//        String encodedName = URLEncoder.encode(customOAuth2User.getName(), StandardCharsets.UTF_8.toString());
//        String encodedToken = URLEncoder.encode(accessToken, StandardCharsets.UTF_8.toString());
//
//        log.info("encodedName = {}", encodedName);
//        log.info("encodedToken = {}", encodedToken);
//
////        response.sendRedirect(redirectUrl + "?userId=" + encodedName + "&accessToken=" + encodedToken);
//
////        response.sendRedirect(redirectUrl+"?userId="+customOAuth2User.getName()+"&accessToken="+accessToken);
//
//
//
////        Map<String, Object> responseMap = customOAuth2User.getUserInfo();
////        responseMap.put("accessToken", JwtUtils.generateToken(responseMap, JwtConstants.ACCESS_EXP_TIME));
////        responseMap.put("refreshToken", JwtUtils.generateToken(responseMap, JwtConstants.REFRESH_EXP_TIME));
//
//
////        Gson gson = new Gson();
////        String json = gson.toJson(responseMap);
////
////        response.setContentType("application/json; charset=UTF-8");
////        response.getWriter().write(json);
//
//
//    }
//}



//            String accessToken = JwtUtils.generateToken(responseMap, JwtConstants.ACCESS_EXP_TIME);
//            String refreshToken = JwtUtils.generateToken(responseMap, JwtConstants.REFRESH_EXP_TIME);
//
//            // 응답 헤더에 토큰 추가
//            response.setHeader("Authorization", "Bearer " + accessToken);
//            response.setHeader("Refresh-Token", refreshToken);


//        if (isNewUser) {
//            // 회원가입
//            responseMap.put("isNewUser", true);
//        } else {
//            // 로그인
//            responseMap.put("isNewUser", false);
//            responseMap.put("accessToken", JwtUtils.generateToken(responseMap, JwtConstants.ACCESS_EXP_TIME));
//            responseMap.put("refreshToken", JwtUtils.generateToken(responseMap, JwtConstants.REFRESH_EXP_TIME));
//        }
//
//        Gson gson = new Gson();
//        String json = gson.toJson(responseMap);
//
//        response.setContentType("application/json; charset=UTF-8");
//
//        PrintWriter writer = response.getWriter();
//        writer.println(json);
//        writer.flush();