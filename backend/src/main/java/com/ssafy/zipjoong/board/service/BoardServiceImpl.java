package com.ssafy.zipjoong.board.service;

import com.ssafy.zipjoong.board.domain.Board;
import com.ssafy.zipjoong.board.domain.BoardCombination;
import com.ssafy.zipjoong.board.domain.BoardCombinationId;
import com.ssafy.zipjoong.board.dto.BoardCreateRequest;
import com.ssafy.zipjoong.board.dto.BoardDetailResponse;
import com.ssafy.zipjoong.board.dto.BoardResponse;
import com.ssafy.zipjoong.board.dto.BoardUpdateRequest;
import com.ssafy.zipjoong.board.exception.BoardErrorCode;
import com.ssafy.zipjoong.board.exception.BoardException;
import com.ssafy.zipjoong.board.repository.BoardCombinationRepository;
import com.ssafy.zipjoong.board.repository.BoardRepository;
import com.ssafy.zipjoong.file.service.AwsS3ServiceImpl;
import com.ssafy.zipjoong.recommand.domain.Combination;
import com.ssafy.zipjoong.recommand.dto.CombinationResponse;
import com.ssafy.zipjoong.recommand.exception.CombinationErrorCode;
import com.ssafy.zipjoong.recommand.exception.CombinationException;
import com.ssafy.zipjoong.recommand.repository.CombinationRepository;
import com.ssafy.zipjoong.recommand.service.CombinationService;
import com.ssafy.zipjoong.user.domain.User;
import com.ssafy.zipjoong.user.exception.UserErrorCode;
import com.ssafy.zipjoong.user.exception.UserException;
import com.ssafy.zipjoong.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.codec.binary.Base64;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.format.DateTimeFormatter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;
    private final UserRepository userRepository;
    private final CombinationRepository combinationRepository;
    private final BoardCombinationRepository boardCombinationRepository;
    private final CombinationService combinationService;
    private final AwsS3ServiceImpl awsS3Service;

    /* 게시글 작성 */
    @Transactional
    @Override
    public void createBoard(String userId, BoardCreateRequest boardCreateRequest) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserException(UserErrorCode.USER_NOT_FOUND));

        Board board = boardCreateRequest.toEntity(user);
        board = boardRepository.save(board);

        // 게시글의 각 조합에 대한 BoardCombination 엔티티를 생성하고 저장
        for (Long combinationId : boardCreateRequest.getCombinationIdList()) {
            BoardCombination boardCombination = createBoardCombination(board, combinationId);
            boardCombinationRepository.save(boardCombination);
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

        // 기존에 저장된 조합 확인
        List<BoardCombination> existingCombinations = boardCombinationRepository.findByBoardCombinationIdBoardId(boardId);
        Set<Long> existingCombinationIds = existingCombinations.stream()
                .map(bc -> bc.getCombination().getCombinationId())
                .collect(Collectors.toSet());

        // boardUpdateRequest의 combinationIdList에 포함된 조합이 기존 조합 리스트에 없다면,
        // 새로운 BoardCombination 엔티티를 생성하고 저장
        for (Long newCombinationId : boardUpdateRequest.getCombinationIdList()) {
            if (!existingCombinationIds.contains(newCombinationId)) {
                BoardCombination newBoardCombination = createBoardCombination(board, newCombinationId);
                boardCombinationRepository.save(newBoardCombination);
            }
        }

        // 기존 조합 리스트에는 있지만, boardUpdateRequest의 combinationIdList에는 없는 조합이 있다면,
        // 해당 BoardCombination를 삭제
        existingCombinations.forEach(existingCombination -> {
            if (!boardUpdateRequest.getCombinationIdList().contains(existingCombination.getCombination().getCombinationId())) {
                boardCombinationRepository.delete(existingCombination);
            }
        });
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

        // 해당 게시글의 각 조합의 상세 정보 조회
        List<CombinationResponse> combinationResponses = new ArrayList<>();
        for (BoardCombination boardCombination : board.getCombinations()) {
            Combination combination = boardCombination.getCombination();
            CombinationResponse combinationResponse = combinationService.getCombination(combination.getCombinationId());
            combinationResponses.add(combinationResponse);
        }

        return BoardDetailResponse.toDto(board, combinationResponses);
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


    public String uploadFile(String base64EncodedData) {
        // MIME 타입과 파일 확장자 추출
        String mimeType = extractMimeType(base64EncodedData);
        String extension = extractFileExtension(mimeType);
        byte[] decodedBytes = decodeBase64File(base64EncodedData);
        String fileName = generateFileName(extension);

        // S3에 파일 업로드 및 URL 반환
        return awsS3Service.uploadBase64File(decodedBytes, fileName, "post");
    }


    /**
     *  Base64 이미지 파일 업로드
     **/

    // Base64 데이터에서 MIME 타입 추출 (예: "data:image/png;base64,...")
    private String extractMimeType(String base64EncodedData) {
        return base64EncodedData.split(":")[1].split(";")[0];
    }
    private String extractFileExtension(String mimeType) {
        return mimeType.split("/")[1];
    }
    // Base64 데이터에서 실제 파일 데이터만 분리 (예: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...")
    private byte[] decodeBase64File(String base64EncodedData) {
        String encodedFile = base64EncodedData.substring(base64EncodedData.indexOf(",") + 1);
        return Base64.decodeBase64(encodedFile);
    }
    private String generateFileName(String extension) {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        return now.format(formatter) + "." + extension;
    }



    /* combinationId을 이용하여 BoardCombination 생성  */
    private BoardCombination createBoardCombination(Board board, Long combinationId) {
        Combination combination = combinationRepository.findById(combinationId)
                .orElseThrow(() -> new CombinationException(CombinationErrorCode.COMBINATION_NOT_FOUND));

        BoardCombinationId boardCombinationId = new BoardCombinationId(combination.getCombinationId(), board.getBoardId());

        return BoardCombination.builder()
                .boardCombinationId(boardCombinationId)
                .board(board)
                .combination(combination)
                .build();
    }

    private Board findBoard(int boardId) {
        return boardRepository.findById(boardId)
                .orElseThrow(() -> new BoardException(BoardErrorCode.BOARD_NOT_FOUND));
    }

}

