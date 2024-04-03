package com.ssafy.zipjoong.comment.service;

import com.ssafy.zipjoong.board.domain.Board;
import com.ssafy.zipjoong.board.exception.BoardErrorCode;
import com.ssafy.zipjoong.board.exception.BoardException;
import com.ssafy.zipjoong.board.repository.BoardRepository;
import com.ssafy.zipjoong.comment.domain.Comment;
import com.ssafy.zipjoong.comment.dto.CommentCreateRequest;
import com.ssafy.zipjoong.comment.dto.CommentResponse;
import com.ssafy.zipjoong.comment.dto.CommentUpdateRequest;
import com.ssafy.zipjoong.comment.exception.CommentErrorCode;
import com.ssafy.zipjoong.comment.exception.CommentException;
import com.ssafy.zipjoong.comment.repository.CommentRepository;
import com.ssafy.zipjoong.user.domain.User;
import com.ssafy.zipjoong.user.exception.UserErrorCode;
import com.ssafy.zipjoong.user.exception.UserException;
import com.ssafy.zipjoong.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;

    /* 게시글별 댓글 전체 조회 */
    @Override
    public List<CommentResponse> getAllByBoard(int boardId) {
        return commentRepository.findByBoardBoardId(boardId).stream()
                .filter(comment -> !Boolean.TRUE.equals(comment.getCommentIsDeleted()))
                .map(CommentResponse::toDto)
                .toList();
    }

    /* 댓글 작성 */
    @Transactional
    @Override
    public void createComment(String userId, CommentCreateRequest commentCreateRequest) {
        Board board = boardRepository.findById(commentCreateRequest.getBoardId())
                .orElseThrow(() -> new BoardException(BoardErrorCode.BOARD_NOT_FOUND));
        User user = userRepository.findById(userId)
                        .orElseThrow(() -> new UserException(UserErrorCode.USER_NOT_FOUND));
        commentRepository.save(commentCreateRequest.toEntity(board, user));
    }

    /* 댓글 수정 */
    @Transactional
    @Override
    public void updateComment(long commentId, String userId, CommentUpdateRequest commentUpdateRequest) {
        Comment comment = findComment(commentId);
        String creatorId = comment.getUser().getUserId();
        if (!Objects.equals(creatorId, userId)) {
            throw new UserException(UserErrorCode.USER_FORBIDDEN);
        }
        comment.update(commentUpdateRequest);
    }

    /* 댓글 삭제 */
    @Transactional
    @Override
    public void deleteComment(long commentId, String userId) {
        Comment comment = findComment(commentId);
        String creatorId = comment.getUser().getUserId();
        if (!Objects.equals(creatorId, userId)) {
            throw new UserException(UserErrorCode.USER_FORBIDDEN);
        }
        comment.delete();
    }

    private Comment findComment(long commentId) {
        return commentRepository.findById(commentId)
                .orElseThrow(() -> new CommentException(CommentErrorCode.COMMENT_NOT_FOUND));
    }

}
