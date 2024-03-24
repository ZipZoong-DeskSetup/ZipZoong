package com.ssafy.zipjoong.file.service;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AwsS3Service {
    // 단일 파일 업로드
    String uploadFileOne(MultipartFile multipartFile, String fileOwnerId, String fileType);

    // 다중 파일 업로드
    List<String> uploadFiles(List<MultipartFile> multipartFiles, String fileOwnerId, String fileType);

    // S3에 저장된 파일 삭제
    void deleteFile(String filePath);
}
