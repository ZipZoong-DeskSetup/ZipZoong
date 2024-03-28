package com.ssafy.zipjoong.board.repository;

import com.ssafy.zipjoong.board.domain.BoardProduct;
import com.ssafy.zipjoong.board.domain.BoardProductId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardProductRepository extends JpaRepository<BoardProduct, BoardProductId> {

}
