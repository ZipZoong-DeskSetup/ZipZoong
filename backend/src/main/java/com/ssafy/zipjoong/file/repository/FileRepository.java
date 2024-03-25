package com.ssafy.zipjoong.file.repository;

import com.ssafy.zipjoong.board.domain.Board;
import com.ssafy.zipjoong.file.domain.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileRepository extends JpaRepository<File, Long> {
    List<File> findAllByBoard(Board board);

    void deleteByBoard(Board board);
}
