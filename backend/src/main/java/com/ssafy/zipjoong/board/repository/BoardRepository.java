package com.ssafy.zipjoong.board.repository;

import com.ssafy.zipjoong.board.domain.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, Integer> {

    List<Board> findByUserUserId(String userId);

    List<Board> findByBoardTitleContaining(String keyword);

    @Modifying
    @Query("update Board b set b.boardHit = b.boardHit + 1 where b.boardId = :boardId")
    int updateHit(@Param("boardId") Integer boardId);

}
