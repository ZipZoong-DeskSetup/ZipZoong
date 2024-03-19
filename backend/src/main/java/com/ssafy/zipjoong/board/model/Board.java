package com.ssafy.zipjoong.board.model;

import com.ssafy.zipjoong.user.model.User;
import com.ssafy.zipjoong.util.model.EntityDate;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "board")
public class Board extends EntityDate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer boardId;

    // 제목
    @Column(length = 200)
    private String boardTitle;

    // 내용
    @Column(columnDefinition = "TEXT")
    private String boardContent;

    // 조회수
    private Integer boardHit;

    // 임시저장 여부
    private Boolean boardIsDraft;

    // 삭제 여부
    private Boolean boardIsDeleted;

    // 작성자
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    // 댓글 목록
    @OneToMany(mappedBy = "board")
    private List<Comment> comments;

    // 제품 목록
    @OneToMany(mappedBy = "board")
    private List<BoardProduct> products;
}
