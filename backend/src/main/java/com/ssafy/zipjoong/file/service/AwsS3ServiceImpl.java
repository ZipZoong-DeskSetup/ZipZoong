package com.ssafy.zipjoong.file.service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AwsS3ServiceImpl implements AwsS3Service {
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private final AmazonS3 amazonS3;

    // 파일 종류에 따른 폴더 경로
    private static final String PROFILES_FOLDER = "profiles/";
    private static final String POSTS_FOLDER = "posts/";

    /* 단일 파일 업로드 */
    @Override
    public String uploadFileOne(MultipartFile multipartFile, String fileOwnerId, String fileType){
        String filePath = getFilePath(multipartFile, fileOwnerId, fileType);
        uploadS3(multipartFile, filePath);
        return getFileUrl(filePath);
    }

    /* 다중 파일 업로드 */
    /* 프로필 사진인 경우
    *   fileOwnerId => userId
    *   fileType => "profile"
    * 게시글에 첨부된 파일인 경우
    *   fileOwnerId => boardId
    *   fileType => "post"
    */
    @Override
    public List<String> uploadFiles(List<MultipartFile> multipartFiles, String fileOwnerId, String fileType) {
        List<String> fileUrlList = new ArrayList<>();

        multipartFiles.forEach(file -> {
            String filePath = getFilePath(file, fileOwnerId, fileType);
            uploadS3(file, filePath);
            String fileUrl = getFileUrl(filePath);
            fileUrlList.add(fileUrl);
        });
        return fileUrlList;
    }

    @Override
    /* S3에서 파일 삭제 */
    public void deleteFile(String filePath) {
        try {
            amazonS3.deleteObject(bucket, filePath);
        } catch (AmazonServiceException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 삭제 중 오류가 발생하였습니다.");
        }
    }

    @Override
    /* S3에서 다수의 파일 삭제 */
    public void deleteFiles(List<String> filePaths) {
        try {
            // 삭제할 파일들의 키 목록 생성
            List<DeleteObjectsRequest.KeyVersion> keys = filePaths.stream()
                    .map(DeleteObjectsRequest.KeyVersion::new)
                    .collect(Collectors.toList());

            // 삭제 요청 객체 생성
            DeleteObjectsRequest deleteObjectsRequest = new DeleteObjectsRequest(bucket)
                    .withKeys(keys);

            // 파일 삭제
            amazonS3.deleteObjects(deleteObjectsRequest);
        } catch (AmazonServiceException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 삭제 중 오류가 발생하였습니다.");
        }
    }

    /* S3에 파일 업로드 */
    private String uploadS3(MultipartFile file, String filePath) {
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(file.getSize());
        objectMetadata.setContentType(file.getContentType());

        try(InputStream inputStream = file.getInputStream()) {
            amazonS3.putObject(new PutObjectRequest(bucket, filePath, inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "파일 업로드에 실패하였습니다.");
        }

        return amazonS3.getUrl(bucket, filePath).toString();
    }

    /* S3에 저장될 파일 경로 반환 */
    private String getFilePath(MultipartFile file, String fileOwnerId, String fileType) {
        String fileName = createFileName(file.getOriginalFilename());
        String folderPath = getFolderPath(fileType);
        return folderPath + fileOwnerId + "/" + fileName;
    }

    /* 'UUID.확장자' 형식으로 fileName 생성 */
    public String createFileName(String fileName) {
        return UUID.randomUUID().toString().concat(getFileExtension(fileName));
    }

    /* 파일 확장자 반환 */
    private String getFileExtension(String fileName) {
        try {
            return fileName.substring(fileName.lastIndexOf("."));
        } catch (StringIndexOutOfBoundsException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "잘못된 형식의 파일 입니다.");
        }
    }

    /* 파일 타입에 따른 폴더 경로 반환 */
    private String getFolderPath(String fileType) {
        String folderPath = "";

        switch (fileType) {
            case "profile":
                folderPath = PROFILES_FOLDER;
                break;
            case "post":
                folderPath = POSTS_FOLDER;
                break;
            default:
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "지원하지 않는 파일 타입 입니다.");
        }

        return folderPath;
    }

    /* 파일 URL 반환 */
    public String getFileUrl(String filePath) {
        return amazonS3.getUrl(bucket, filePath).toString();
    }
}

