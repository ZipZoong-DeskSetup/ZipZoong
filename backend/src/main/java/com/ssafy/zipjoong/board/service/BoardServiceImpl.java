package com.ssafy.zipjoong.board.service;

import com.ssafy.zipjoong.board.domain.Board;
import com.ssafy.zipjoong.board.domain.BoardProduct;
import com.ssafy.zipjoong.board.dto.BoardCreateRequest;
import com.ssafy.zipjoong.board.dto.BoardDetailResponse;
import com.ssafy.zipjoong.board.dto.BoardResponse;
import com.ssafy.zipjoong.board.dto.BoardUpdateRequest;
import com.ssafy.zipjoong.board.exception.BoardErrorCode;
import com.ssafy.zipjoong.board.exception.BoardException;
import com.ssafy.zipjoong.board.repository.BoardProductRepository;
import com.ssafy.zipjoong.board.repository.BoardRepository;
import com.ssafy.zipjoong.file.domain.File;
import com.ssafy.zipjoong.file.dto.FileRequest;
import com.ssafy.zipjoong.file.repository.FileRepository;
import com.ssafy.zipjoong.file.service.AwsS3ServiceImpl;
import com.ssafy.zipjoong.product.domain.Product;
import com.ssafy.zipjoong.product.exception.ProductErrorCode;
import com.ssafy.zipjoong.product.exception.ProductException;
import com.ssafy.zipjoong.product.repository.ProductRepository;
import com.ssafy.zipjoong.user.domain.User;
import com.ssafy.zipjoong.user.exception.UserErrorCode;
import com.ssafy.zipjoong.user.exception.UserException;
import com.ssafy.zipjoong.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;
    private final FileRepository fileRepository;
    private final AwsS3ServiceImpl awsS3Service;
    private final ProductRepository productRepository;
    private final BoardProductRepository boardProductRepository;

    /* 게시글 작성 */
    @Transactional
    @Override
    public void createBoard(String userId, BoardCreateRequest boardCreateRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserException(UserErrorCode.USER_NOT_FOUND));

        // 게시글 엔티티 생성 및 저장
        Board board = boardCreateRequest.toEntity(user);
        board = boardRepository.save(board);

        // 게시글의 각 제품에 대한 BoardProduct 엔티티를 생성하고 저장
        for (Integer productId : boardCreateRequest.getProductIdList()) {
            Product product = productRepository.findById(productId).orElseThrow(() -> new ProductException(ProductErrorCode.PRODUCT_NOT_FOUND));
            BoardProduct boardProduct = BoardProduct.builder()
                    .board(board)
                    .product(product)
                    .build();
            boardProductRepository.save(boardProduct);
        }

        // S3에 첨부 파일 업로드
        List<String> fileUrlList = awsS3Service.uploadFiles(boardCreateRequest.getFileList(), String.valueOf(board.getBoardId()),"post" );

        // 첨부 파일들로 File 엔티티를 생성하고 저장
        for (String fileUrl : fileUrlList) {
            FileRequest fileRequest = FileRequest.builder()
                    .filePath(fileUrl)
                    .boardId(board.getBoardId())
                    .build();

            File file = fileRequest.toEntity(board);
            fileRepository.save(file);
        }
    }

    /* 게시글 수정 */
    @Transactional
    @Override
    public void updateBoard(int boardId, String userId, BoardUpdateRequest boardUpdateRequest) {
        Board board = findBoard(boardId);
        String creatorId = board.getUser().getUserId();
        if(!Objects.equals(creatorId, userId)) {
            throw new UserException(UserErrorCode.USER_FORBIDDEN);
        }
        board.update(boardUpdateRequest);
    }

    /* 게시글 삭제 */
    @Transactional
    @Override
    public void deleteBoard(int boardId, String userId) {
        Board board = findBoard(boardId);
        String creatorId = board.getUser().getUserId();
        if(!Objects.equals(creatorId, userId)) {
            throw new UserException(UserErrorCode.USER_FORBIDDEN);
        }
        board.delete();
    }

    /* 전체 게시글 목록 조회 */
    @Override
    public List<BoardResponse> getAll() {
        return boardRepository.findAll().stream()
                .filter(board -> !Boolean.TRUE.equals(board.getBoardIsDeleted()))
                .map(BoardResponse::toDto)
                .toList();
    }

    /* 내가 쓴 게시글 목록 조회 */
    @Override
    public List<BoardResponse> getAllByCreator(String userId) {
        return boardRepository.findByUserUserId(userId).stream()
                .filter(board -> !Boolean.TRUE.equals(board.getBoardIsDeleted()))
                .map(BoardResponse::toDto)
                .toList();
    }

    /* 게시글 상세 조회 */
    @Override
    public BoardDetailResponse getBoard(int boardId) {
        Board board = findBoard(boardId);
        return BoardDetailResponse.toDto(board);
    }

    /* 게시글 검색 */
    @Override
    public List<BoardResponse> getAllByKeyword(String keyword) {
        return boardRepository.findByBoardTitleContaining(keyword).stream()
                .filter(board -> !Boolean.TRUE.equals(board.getBoardIsDeleted()))
                .map(BoardResponse::toDto)
                .toList();
    }

    /* 조회수 증가 */
    @Transactional
    @Override
    public void updateHit(int boardId) {
        Board board = findBoard(boardId);
        boardRepository.updateHit(boardId);
    }

    private Board findBoard(int boardId) {
        return boardRepository.findById(boardId)
                .orElseThrow(() -> new BoardException(BoardErrorCode.BOARD_NOT_FOUND));
    }

}

