package com.ssafy.zipjoong.security.jwt.config;

import com.ssafy.zipjoong.security.oauth2.handler.LoginFailHandler;
import com.ssafy.zipjoong.security.oauth2.handler.LoginSuccessHandler;
import com.ssafy.zipjoong.security.jwt.filter.JwtVerifyFilter;
import com.ssafy.zipjoong.security.oauth2.service.OAuth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final OAuth2UserService oAuth2UserService;

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration corsConfiguration = new CorsConfiguration();

        corsConfiguration.setAllowedOriginPatterns(List.of("*"));
        corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"));
        corsConfiguration.setAllowedHeaders(List.of("Authorization", "Cache-Control", "Content-Type"));
        corsConfiguration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration); // 모든 경로에 대해서 CORS 설정을 적용

        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public LoginSuccessHandler commonLoginSuccessHandler() {
        return new LoginSuccessHandler();
    }

    @Bean
    public LoginFailHandler commonLoginFailHandler() {
        return new LoginFailHandler();
    }

    @Bean
    public JwtVerifyFilter jwtVerifyFilter() {
        return new JwtVerifyFilter();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {

        httpSecurity.cors(httpSecurityCorsConfigurer -> httpSecurityCorsConfigurer.configurationSource(corsConfigurationSource()));

        httpSecurity.csrf(AbstractHttpConfigurer::disable);

        httpSecurity.sessionManagement(httpSecuritySessionManagementConfigurer -> {
            httpSecuritySessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.NEVER);
        });

        httpSecurity.authorizeHttpRequests(authorizationManagerRequestMatcherRegistry ->
                authorizationManagerRequestMatcherRegistry
                        .requestMatchers("/").permitAll()
                        .requestMatchers("/oauth2/login").permitAll()
                        .requestMatchers("/recommend/**").permitAll()
                        .requestMatchers("/survey/**").permitAll()
                        .requestMatchers("/connect/**").permitAll()
                        .requestMatchers("/product/**").permitAll()
                        .requestMatchers("/swagger-resources/**").permitAll()
                        .requestMatchers("/swagger-ui/**").permitAll()
                        .requestMatchers("/v3/api-docs").permitAll()
                        .requestMatchers("/v3/api-docs/**").permitAll()
                        .requestMatchers("/api-docs/**").permitAll()
                        .requestMatchers("/combination").permitAll()
                        .requestMatchers("/combination/**").permitAll()
                        .requestMatchers("/user/nickname/check").permitAll()
                        .requestMatchers("/board").permitAll() // 전체 게시글 목록 조회
                        .requestMatchers("/board/detail/*").permitAll() // 게시글 상세 조회
                        .requestMatchers("/board/search/*").permitAll() // 게시글 검색
                        .requestMatchers("/board/hit/*").permitAll() // 조회수 증가
                        .requestMatchers("/board/file/*").permitAll() // 파일 업로드
                        .anyRequest().permitAll());

        httpSecurity.addFilterBefore(jwtVerifyFilter(), UsernamePasswordAuthenticationFilter.class);

        httpSecurity.oauth2Login(httpSecurityOAuth2LoginConfigurer ->
                httpSecurityOAuth2LoginConfigurer.loginPage("/oauth2/login")
                        .successHandler(commonLoginSuccessHandler())
                        .userInfoEndpoint(userInfoEndpointConfig ->
                                userInfoEndpointConfig.userService(oAuth2UserService)));

        return httpSecurity.build();
    }
}
