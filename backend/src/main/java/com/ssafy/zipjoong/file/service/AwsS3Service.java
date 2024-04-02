package com.ssafy.zipjoong.file.service;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AwsS3Service {
    // 단일 파일 업로드
    String uploadFileOne(MultipartFile multipartFile, String fileType);

    // 다중 파일 업로드
    List<String> uploadFiles(List<MultipartFile> multipartFiles, String fileType);

    // S3에서 파일 삭제
    void deleteFile(String filePath);

    // S3에서 다수의 파일 삭제
    void deleteFiles(List<String> filePaths);

}
