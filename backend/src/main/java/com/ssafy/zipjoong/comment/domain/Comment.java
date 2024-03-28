package com.ssafy.zipjoong.comment.domain;

import com.ssafy.zipjoong.board.domain.Board;
import com.ssafy.zipjoong.comment.dto.CommentUpdateRequest;
import com.ssafy.zipjoong.user.domain.User;
import com.ssafy.zipjoong.util.domain.EntityDate;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "comment")
public class Comment extends EntityDate {
    @Id
    @Column(name="comment_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    // 내용
    @Column(name = "comment_content", length = 500)
    private String commentContent;

    // 삭제여부
    @Column(name="comment_is_deleted")
    private Boolean commentIsDeleted;

    // 작성자
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // 게시글
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id", nullable = false)
    private Board board;

    public void update(CommentUpdateRequest request) {
        if (request.getCommentContent() != null && !request.getCommentContent().isEmpty()) {
            this.commentContent = request.getCommentContent();
        }
    }

    public void delete() {
        this.commentIsDeleted = true;
    }

}
