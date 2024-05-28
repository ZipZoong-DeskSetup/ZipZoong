package com.ssafy.zipjoong.file.domain;

import com.ssafy.zipjoong.board.domain.Board;
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
@Table(name = "file")
public class File extends EntityDate {
    @Id
    @Column(name="file_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fileId;

    // 파일경로
    @Column(name = "file_path", length = 128)
    private String filePath;

    // 게시글
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id", nullable = false)
    private Board board;
}
