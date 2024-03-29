package com.ssafy.zipjoong.board.repository;

import com.ssafy.zipjoong.board.domain.BoardCombination;
import com.ssafy.zipjoong.board.domain.BoardCombinationId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardCombinationRepository extends JpaRepository<BoardCombination, BoardCombinationId> {
    List<BoardCombination> findByBoardCombinationIdBoardId(Integer boardId);

}
