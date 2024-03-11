package com.ssafy.zipjoong;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class ZipJoongApplication {
    public static void main(String[] args) {
        SpringApplication.run(ZipJoongApplication.class, args);
    }

}
