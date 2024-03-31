package com.ssafy.zipjoong.board.domain;

import com.ssafy.zipjoong.board.dto.BoardUpdateRequest;
import com.ssafy.zipjoong.comment.domain.Comment;
import com.ssafy.zipjoong.file.domain.File;
import com.ssafy.zipjoong.user.domain.User;
import com.ssafy.zipjoong.util.domain.EntityDate;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "board")
public class Board extends EntityDate {
    @Id
    @Column(name = "board_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer boardId;

    // 제목
    @Column(name = "board_title", length = 200)
    private String boardTitle;

    // 내용
    @Column(name = "board_content", columnDefinition = "TEXT")
    private String boardContent;

    // 조회수
    @Column(name="board_hit")
    private Integer boardHit;

    // 썸네일
    @Column(name = "board_thumbnail", length = 255)
    private String boardThumbnail;

    // 삭제 여부
    @Column(name="board_is_deleted")
    private Boolean boardIsDeleted;

    // 작성자
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    // 댓글 목록
    @OneToMany(mappedBy = "board")
    private List<Comment> comments;

    // 조합 목록
    @OneToMany(mappedBy = "board")
    private List<BoardCombination> combinations;

    // 파일 목록
    @OneToMany(mappedBy = "board")
    private List<File> files;

    public void update(BoardUpdateRequest request) {
        if (request.getBoardTitle() != null && !request.getBoardTitle().isEmpty()) {
            this.boardTitle = request.getBoardTitle();
        }
        if (request.getBoardContent() != null && !request.getBoardContent().isEmpty()) {
            this.boardContent = request.getBoardContent();
        }

        if (request.getBoardThumbnail() != null && !request.getBoardThumbnail().isEmpty()) {
            this.boardThumbnail = request.getBoardThumbnail();
        }
    }

    public void delete() {
        this.boardIsDeleted = true;
    }
}
