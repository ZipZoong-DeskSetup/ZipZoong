package com.ssafy.zipjoong.security.jwt.config;

import com.ssafy.zipjoong.security.handler.LoginFailHandler;
import com.ssafy.zipjoong.security.handler.LoginSuccessHandler;
import com.ssafy.zipjoong.security.jwt.filter.JwtVerifyFilter;
import com.ssafy.zipjoong.security.oauth2.service.OAuth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final OAuth2UserService oAuth2UserService;

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

        httpSecurity.csrf(AbstractHttpConfigurer::disable);

        httpSecurity.sessionManagement(httpSecuritySessionManagementConfigurer -> {
            httpSecuritySessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.NEVER);
        });

        httpSecurity.authorizeHttpRequests(authorizationManagerRequestMatcherRegistry ->
                authorizationManagerRequestMatcherRegistry.anyRequest().permitAll());

        httpSecurity.addFilterBefore(jwtVerifyFilter(), UsernamePasswordAuthenticationFilter.class);

        httpSecurity.oauth2Login(httpSecurityOAuth2LoginConfigurer ->
                httpSecurityOAuth2LoginConfigurer.loginPage("/oauth2/login")
                        .successHandler(commonLoginSuccessHandler())
                        .userInfoEndpoint(userInfoEndpointConfig ->
                                userInfoEndpointConfig.userService(oAuth2UserService)));

        return httpSecurity.build();
    }
}
