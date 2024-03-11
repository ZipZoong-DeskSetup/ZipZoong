package com.ssafy.zipjoong.connect;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/connect")
public class ConnectController {
    @GetMapping //운동클럽  피드 조회
    public ResponseEntity<String> connectTest(){
        return ResponseEntity.status(HttpStatus.OK).body("성공적으로 연결되었습니다.");
    }
}

